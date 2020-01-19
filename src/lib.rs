mod utils;

use rand::rngs::SmallRng;
use rand::seq::SliceRandom;
use rand::{Rng, SeedableRng};
use wasm_bindgen::prelude::*;
use wasm_bindgen::Clamped;
use wasm_bindgen::JsCast;
use web_sys::{CanvasRenderingContext2d, HtmlCanvasElement, HtmlImageElement, ImageData};

const DPI: u32 = 72;

// A macro to provide `println!(..)`-style syntax for `console.log` logging.
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

fn performance_now() -> f64 {
    web_sys::window()
        .expect("Could not get window")
        .performance()
        .expect("performance should be available")
        .now()
        .round()
}

fn log_performance(label: &'static str, since: f64) {
    let t = performance_now();
    log!("{} took {}ms", label, t - since);
}

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {}

#[wasm_bindgen]
pub fn debug() {
    log!("Enabling panic hook");
    utils::set_panic_hook();
}

#[derive(Clone, Debug)]
pub struct Color {
    pub r: u8,
    pub g: u8,
    pub b: u8,
}

impl Color {
    fn new(r: u8, g: u8, b: u8) -> Self {
        Color { r, g, b }
    }

    fn random(rng: &mut SmallRng) -> Self {
        let cs = 50;
        let ce = 180;

        Self::new(
            rng.gen_range(cs, ce),
            rng.gen_range(cs, ce),
            rng.gen_range(cs, ce),
        )
    }
}

fn separation(z: f32, mu: f32, e: f32) -> i32 {
    ((1.0 - mu * z) * e * (2.0 - mu * z)).round() as i32
}

type DepthMap = Vec<Vec<f32>>;
type PixelsMap = Vec<Vec<Color>>;
type Colors = Vec<Color>;

#[allow(clippy::needless_range_loop)]
fn ctx_to_depth_map(ctx: &CanvasRenderingContext2d, w: u32, h: u32, inverted: bool) -> DepthMap {
    let mut result: DepthMap = vec![vec![1.0; w as usize]; h as usize];
    let image_data = ctx
        .get_image_data(0.0, 0.0, w as f64, h as f64)
        .expect("Could not get image data")
        .data();

    for y in 0..(h as usize) {
        let offset = (w * y as u32 * 4) as usize;
        for x in 0..(w as usize) {
            result[y][x] = image_data[offset + (x as usize * 4)] as f32 / 255.0;
            if inverted {
                result[y][x] = 1.0 - result[y][x];
            }
        }
    }

    result
}

pub fn canvas_to_depth_map(canvas: &HtmlCanvasElement, w: u32, h: u32, inverted: bool) -> DepthMap {
    let ctx = canvas
        .get_context("2d")
        .unwrap()
        .unwrap()
        .dyn_into::<web_sys::CanvasRenderingContext2d>()
        .unwrap();

    ctx_to_depth_map(&ctx, w, h, inverted)
}

pub fn img_to_depth_map(img: &HtmlImageElement, w: u32, h: u32, inverted: bool) -> DepthMap {
    let document = web_sys::window().unwrap().document().unwrap();
    let canvas = document
        .create_element("canvas")
        .unwrap()
        .dyn_into::<web_sys::HtmlCanvasElement>()
        .unwrap();

    canvas.set_width(w);
    canvas.set_height(h);

    let ctx = canvas
        .get_context("2d")
        .unwrap()
        .unwrap()
        .dyn_into::<web_sys::CanvasRenderingContext2d>()
        .unwrap();

    ctx.draw_image_with_html_image_element(img, 0.0, 0.0)
        .unwrap();

    ctx_to_depth_map(&ctx, w, h, inverted)
}

fn reset_canvas(ctx: &CanvasRenderingContext2d, mut pixel_data: Vec<u8>, w: u32, h: u32) {
    let image_data = ImageData::new_with_u8_clamped_array_and_sh(Clamped(&mut pixel_data), w, h)
        .expect("Could not create image data");

    ctx.put_image_data(&image_data, 0.0, 0.0)
        .expect("Could not put image data");

    log!("Finished rendering!");
}

fn gen_colors(n: u32, rng: &mut SmallRng) -> Colors {
    let mut colors = vec![];
    for _ in 0..n {
        colors.push(Color::random(rng));
    }

    colors
}

fn gen_pixels_map(w: u32, h: u32, n_colors: u32, seed: String) -> PixelsMap {
    let original_seed = seed.clone();
    let mut seed_str = seed.clone();
    while seed_str.len() < 16 {
        seed_str.push_str(&original_seed);
    }

    log!("Using \"{}\" as a seed", seed_str[0..16].to_string());

    let mut seed = [0; 16];
    seed.copy_from_slice(seed_str[0..16].as_bytes());

    let mut rng = SmallRng::from_seed(seed);
    let colors = gen_colors(n_colors, &mut rng);
    let width = w as usize;
    let height = h as usize;

    let mut pix = vec![vec![colors[0].clone(); width]; height];

    for col in &mut pix {
        for px in col {
            *px = colors
                .choose(&mut rng)
                .expect("Colud not get random color")
                .clone();
        }
    }

    pix
}

#[wasm_bindgen]
pub fn render_canvas(
    canvas: &HtmlCanvasElement,
    ctx: &CanvasRenderingContext2d,
    w: u32,
    h: u32,
    inverted: bool,
    n_colors: u32,
    seed: String,
) {
    let depth_map = canvas_to_depth_map(canvas, w, h, inverted);
    let pixels_map = gen_pixels_map(w, h, n_colors, seed);
    let stereo = Stereogram::new(w, h, DPI, pixels_map, depth_map);
    let pixel_data = stereo.generate_pixel_data();

    reset_canvas(ctx, pixel_data, w, h);
}

#[wasm_bindgen]
pub fn render_img(
    img: &HtmlImageElement,
    ctx: &CanvasRenderingContext2d,
    w: u32,
    h: u32,
    inverted: bool,
    n_colors: u32,
    seed: String,
) {
    let depth_map = img_to_depth_map(img, w, h, inverted);
    let pixels_map = gen_pixels_map(w, h, n_colors, seed);
    let stereo = Stereogram::new(w, h, DPI, pixels_map, depth_map);
    let pixel_data = stereo.generate_pixel_data();

    reset_canvas(ctx, pixel_data, w, h);
}

struct Stereogram {
    w: u32,
    h: u32,
    dpi: u32,
    depth_map: DepthMap,
    pixels_map: PixelsMap,
}

impl Stereogram {
    pub fn new(w: u32, h: u32, dpi: u32, pixels_map: PixelsMap, depth_map: DepthMap) -> Self {
        Self {
            w,
            h,
            dpi,
            pixels_map,
            depth_map,
        }
    }

    #[allow(clippy::needless_range_loop)]
    /// This is implementation of algorithm from this paper:
    /// https://www2.cs.sfu.ca/CourseCentral/414/li/material/refs/SIRDS-Computer-94.pdf
    /// this also uses this library as a working reference with canvas and img tags
    /// https://github.com/peeinears/MagicEye.js
    pub fn generate_pixel_data(&self) -> Vec<u8> {
        let e = (self.dpi as f32 * 2.5).round();
        let mu = 1.0 / 3.0;
        // let far = separation(0.0, mu, e);
        let width = self.w as usize;
        let height = self.h as usize;

        let mut pixel_data = vec![0_u8; width * height * 4];

        // color of this given pixel
        // points to a pixels on the right that is constrained to be this color
        let mut same = vec![0_i32; width];

        for y in 0..height {
            for x in 0..width {
                // each pixel is initially linked with itself
                same[x] = x as i32;
            }

            for x in 0..width {
                let z = self.depth_map[y][x] as f32;
                let sep = separation(z, mu, e);
                // x values corresponding to the left and right eyes
                let mut left = x as i32 - (sep + (sep & y as i32 & 1)) / 2;
                let mut right = left + sep;

                // do hidden surface removal
                if 0 <= left as i32 && right < width as i32 {
                    // we will check points x-t and x+t
                    let mut t = 1;
                    let mut visible;

                    loop {
                        // z coord of ray at these two points
                        let zt = z + 2.0 * (2.0 - mu * z) * t as f32 / (mu * e);
                        visible = self.depth_map[y][x - t] < zt && self.depth_map[y][x + t] < zt;
                        t += 1;

                        if !visible || zt >= 1.0 {
                            break;
                        }
                    }

                    if visible {
                        let mut k = same[left as usize];
                        while k != left && k != right {
                            if k < right {
                                left = k;
                            } else {
                                left = right;
                                right = k;
                            }

                            k = same[left as usize];
                        }

                        // record the same color
                        same[left as usize] = right;
                    }
                }
            }

            let y_offset = y * width * 4;
            for x in (0..width).rev() {
                let offset = y_offset + (x * 4);

                if same[x] == x as i32 {
                    let color = &self.pixels_map[y][x];
                    pixel_data[offset] = color.r;
                    pixel_data[offset + 1] = color.g;
                    pixel_data[offset + 2] = color.b;
                    pixel_data[offset + 3] = 255;
                } else {
                    for i in 0..4 {
                        pixel_data[offset + i] = pixel_data[y_offset + (same[x] as usize * 4) + i];
                    }
                }
            }
        }

        pixel_data
    }
}
