mod utils;

use rand::seq::SliceRandom;
// use rand::Rng;
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

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {}

#[wasm_bindgen]
pub fn debug() {
    log!("Enadling panic hook");
    utils::set_panic_hook();
}

#[derive(Clone, Debug)]
struct Color {
    r: u8,
    g: u8,
    b: u8,
}

impl Color {
    fn new(r: u8, g: u8, b: u8) -> Self {
        Color { r, g, b }
    }
}

fn separation(z: f32, mu: f32, e: f32) -> i32 {
    ((1.0 - mu * z) * e * (2.0 - mu * z)).round() as i32
}

type DepthMap = Vec<Vec<f32>>;

#[allow(clippy::needless_range_loop)]
fn ctx_to_depth_map(ctx: &CanvasRenderingContext2d, w: u32, h: u32) -> DepthMap {
    let mut result: DepthMap = vec![vec![1.0; w as usize]; h as usize];
    let image_data = ctx
        .get_image_data(0.0, 0.0, w as f64, h as f64)
        .expect("Could not get image data")
        .data();

    for y in 0..(w as usize) {
        let offset = (w * y as u32 * 4) as usize;
        for x in 0..(h as usize) {
            result[y][x] = 1.0 - image_data[offset + (x as usize * 4)] as f32 / 255.0;
        }
    }

    result
}

pub fn canvas_to_depth_map(canvas: &HtmlCanvasElement, w: u32, h: u32) -> DepthMap {
    let ctx = canvas
        .get_context("2d")
        .unwrap()
        .unwrap()
        .dyn_into::<web_sys::CanvasRenderingContext2d>()
        .unwrap();

    ctx_to_depth_map(&ctx, w, h)
}

pub fn img_to_depth_map(img: &HtmlImageElement, w: u32, h: u32) -> DepthMap {
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

    ctx_to_depth_map(&ctx, w, h)
}

pub fn reset_canvas(ctx: &CanvasRenderingContext2d, mut pixel_data: Vec<u8>, w: u32, h: u32) {
    let image_data = ImageData::new_with_u8_clamped_array_and_sh(Clamped(&mut pixel_data), w, h)
        .expect("Could not create image data");

    ctx.put_image_data(&image_data, 0.0, 0.0)
        .expect("Could not put image data");

    log!("Finished rendering!");
}

#[wasm_bindgen]
pub fn render_canvas(canvas: &HtmlCanvasElement, ctx: &CanvasRenderingContext2d, w: u32, h: u32) {
    let depth_map = canvas_to_depth_map(canvas, w, h);
    let pixel_data = generate_pixel_data(depth_map, w, h, DPI);
    reset_canvas(ctx, pixel_data, w, h);
}

#[wasm_bindgen]
pub fn render_img(img: &HtmlImageElement, ctx: &CanvasRenderingContext2d, w: u32, h: u32) {
    let depth_map = img_to_depth_map(img, w, h);
    let pixel_data = generate_pixel_data(depth_map, w, h, DPI);
    reset_canvas(ctx, pixel_data, w, h);
}

#[allow(clippy::needless_range_loop)]
/// This is implementation of algorithm from this paper:
/// https://www2.cs.sfu.ca/CourseCentral/414/li/material/refs/SIRDS-Computer-94.pdf
/// this also uses this library as a working reference with canvas and img tags
/// https://github.com/peeinears/MagicEye.js
pub fn generate_pixel_data(depth_map: DepthMap, w: u32, h: u32, dpi: u32) -> Vec<u8> {
    let colors = vec![
        Color::new(0, 0, 0),
        Color::new(255, 0, 0),
        Color::new(0, 255, 0),
        Color::new(0, 0, 255),
        Color::new(255, 255, 255),
    ];
    let e = (dpi as f32 * 2.5).round();
    let mu = 1.0 / 3.0;
    // let far = separation(0.0, mu, e);
    let width = w as usize;
    let height = h as usize;

    let rng = &mut rand::thread_rng();

    let mut pixel_data = vec![0_u8; width * height * 4];

    for y in 0..height {
        // color of this given pixel
        let mut pix = vec![colors[0].clone(); width];
        // points to a pixels on the right that is constrained to be this color
        let mut same = vec![0_i32; width];

        for x in 0..width {
            // each pixel is initially linked with itself
            same[x] = x as i32;
        }

        for x in 0..width {
            let z = depth_map[y][x] as f32;
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
                    visible = depth_map[y][x - t] < zt && depth_map[y][x + t] < zt;
                    t += 1;

                    if !visible || zt >= 1.0 {
                        // log!("zt: {}, visible: {}, t: {}", zt, visible, t);
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

            for x in (0..width).rev() {
                // log!("same x: {}", same[x]);
                if same[x] == x as i32 {
                    pix[x] = colors
                        .choose(rng)
                        .expect("Could not get random color")
                        .clone();
                // THIS IS NEVER EXECUTED
                // log!("random choise: {:?}", pix[x]);
                } else {
                    pix[x] = pix[same[x] as usize].clone();
                }

                let color = &pix[x];
                let offset = (y * width * 4) + (x * 4);
                // log!("Set color to {:?}", color);
                pixel_data[offset] = color.r;
                pixel_data[offset + 1] = color.g;
                pixel_data[offset + 2] = color.b;
                pixel_data[offset + 3] = 255;
            }
        }
        // draw_circle(width/2-far/2, height*19/20);
        // draw_circle(width/2+far/2, height*19/20);
    }

    pixel_data
}
