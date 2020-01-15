mod utils;

use rand::seq::SliceRandom;
// use rand::Rng;
use wasm_bindgen::prelude::*;
use wasm_bindgen::Clamped;
use wasm_bindgen::JsCast;
use web_sys::{CanvasRenderingContext2d, HtmlImageElement, ImageData};

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

#[allow(clippy::needless_range_loop)]
fn ctx_to_depth_map(ctx: &CanvasRenderingContext2d, w: u32, h: u32) -> Vec<Vec<u8>> {
    let mut result = vec![vec![0; w as usize]; h as usize];
    let image_data = ctx
        .get_image_data(0.0, 0.0, w as f64, h as f64)
        .expect("Could not get image data")
        .data();

    for y in 0..(w as usize) {
        let offset = (w * y as u32 * 4) as usize;
        for x in 0..(h as usize) {
            result[y][x] = image_data[offset + (x as usize * 4)]
        }
    }

    result
}

pub fn img_to_depth_map(img: &HtmlImageElement, w: u32, h: u32) -> Vec<Vec<u8>> {
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

    // DEBUG CANVAS
    document.body().unwrap().append_child(&canvas).unwrap();

    ctx_to_depth_map(&ctx, w, h)
}

#[wasm_bindgen]
pub fn render_img(img: &HtmlImageElement, ctx: &CanvasRenderingContext2d, w: u32, h: u32) {
    let depth_map = img_to_depth_map(img, w, h);
    render(depth_map, ctx, w, h);
}

#[allow(clippy::needless_range_loop)]
pub fn render(depth_map: Vec<Vec<u8>>, ctx: &CanvasRenderingContext2d, w: u32, h: u32) {
    let colors = vec![
        Color::new(0, 0, 0),
        Color::new(255, 0, 0),
        Color::new(0, 255, 0),
        Color::new(0, 0, 255),
        Color::new(255, 255, 255),
    ];
    let dpi = 72;
    let e = (dpi as f32 * 2.5).round();
    let mu = 1.0 / 3.0;
    // let far = separation(0.0, mu, e);
    let width = w as usize;
    let height = h as usize;

    let rng = &mut rand::thread_rng();

    for _ in 0..5 {
        let color = colors
            .choose(rng)
            .expect("Could not get random color")
            .clone();
        log!("chose random color: {:?}", color);
    }

    let mut pixels = vec![vec![colors[0].clone(); height]; width];

    for y in 0..height {
        let mut pix = vec![colors[0].clone(); width];
        let mut same = vec![0; width];

        for x in 0..width {
            same[x] = x as i32;
        }

        for x in 0..width {
            let z = depth_map[x][y] as f32;
            let sep = separation(z, mu, e);
            let mut left = x as i32 - (sep + (sep & y as i32 & 1)) / 2;
            let mut right = left + sep;

            if 0 <= left as i32 && right < width as i32 {
                let mut t = 1;
                let mut visible;

                loop {
                    let zt = z + 2.0 * (2.0 - mu * z) * t as f32 / (mu * e);
                    visible =
                        (depth_map[x - t][y] as f32) < zt && (depth_map[x + t][y] as f32) < zt;
                    t += 1;

                    // log!("zt: {}, visible: {}, t: {}", zt, visible, tt);
                    if !(visible && zt < 1.0) {
                        break;
                    }
                }

                if visible {
                    let k = same[left as usize];
                    if k != left && k != right {
                        // log!(
                        //     "k({}) != left({}) && k({}) != right({}) >>>>> {}",
                        //     k,
                        //     left,
                        //     k,
                        //     right,
                        //     k != left && k != right
                        // );
                        if k < right {
                            left = k;
                        } else {
                            left = right;
                            right = k;
                        }
                    }

                    // same[left as usize] = right;
                }
            }

            for x in (width - 1)..0 {
                // log!("same x: {}", same[x]);
                // if same[x] == x as i32 {
                // THIS IS NEVER EXECUTED
                pix[x] = colors
                    .choose(rng)
                    .expect("Could not get random color")
                    .clone();
                // log!("random choise: {:?}", pix[x]);
                // } else {
                // pix[x] = pix[same[x] as usize].clone();
                // }

                pixels[x][y] = pix[x].clone();
            }
        }
        // draw_circle(width/2-far/2, height*19/20);
        // draw_circle(width/2+far/2, height*19/20);
    }

    let mut pixel_data = vec![0_u8; width * height * 4];

    for y in 0..height {
        for x in 0..width {
            // let color = &pixels[x][y];
            let color = &colors.choose(rng).expect("Could not get random color");
            let offset = (y * width * 4) + (x * 4);
            // log!("Set color to {:?}", color);
            pixel_data[offset] = color.r;
            pixel_data[offset + 1] = color.g;
            pixel_data[offset + 2] = color.b;
            pixel_data[offset + 3] = 255;
        }
    }

    let image_data = ImageData::new_with_u8_clamped_array_and_sh(
        Clamped(&mut pixel_data),
        width as u32,
        height as u32,
    )
    .expect("Could not create image data");

    ctx.put_image_data(&image_data, 0.0, 0.0)
        .expect("Could not put image data");

    log!("Finished rendering!");
}
