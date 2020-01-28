mod utils;

use rand::rngs::SmallRng;
use rand::seq::SliceRandom;
use rand::{Rng, SeedableRng};
use wasm_bindgen::prelude::*;
use wasm_bindgen::{Clamped, JsCast, JsValue};
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
        Self::new(
            rng.gen(),
            rng.gen(),
            rng.gen(),
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

fn canvas_to_depth_map(canvas: &HtmlCanvasElement, w: u32, h: u32, inverted: bool) -> DepthMap {
    let ctx = canvas
        .get_context("2d")
        .unwrap()
        .unwrap()
        .dyn_into::<web_sys::CanvasRenderingContext2d>()
        .unwrap();

    ctx_to_depth_map(&ctx, w, h, inverted)
}

fn img_to_depth_map(
    img: &HtmlImageElement,
    w: u32,
    h: u32,
    margin: u32,
    inverted: bool,
) -> DepthMap {
    let document = web_sys::window().unwrap().document().unwrap();
    let canvas = document
        .create_element("canvas")
        .unwrap()
        .dyn_into::<web_sys::HtmlCanvasElement>()
        .unwrap();

    let w = w + margin * 2;
    let h = h + margin * 2;
    canvas.set_width(w);
    canvas.set_height(h);

    let ctx = canvas
        .get_context("2d")
        .unwrap()
        .unwrap()
        .dyn_into::<web_sys::CanvasRenderingContext2d>()
        .unwrap();

    ctx.draw_image_with_html_image_element(img, margin as f64, margin as f64)
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
pub fn render_ctx(
    source_ctx: &CanvasRenderingContext2d,
    ctx: &CanvasRenderingContext2d,
    w: u32,
    h: u32,
    inverted: bool,
    n_colors: u32,
    seed: String,
) {
    let t = performance_now();
    let pixels_map = gen_pixels_map(w, h, n_colors, seed);
    let depth_map = ctx_to_depth_map(source_ctx, w, h, inverted);
    let stereo = Stereogram::new(w, h, DPI, pixels_map, depth_map);
    let pixel_data = stereo.generate_pixel_data();

    reset_canvas(ctx, pixel_data, w, h);
    log_performance("Canvas rendering", t);
}

// #[wasm_bindgen]
// pub fn render_img(
//     img: &HtmlImageElement,
//     ctx: &CanvasRenderingContext2d,
//     w: u32,
//     h: u32,
//     margin: u32,
//     inverted: bool,
//     n_colors: u32,
//     seed: String,
// ) {
//     let t = performance_now();
//     let depth_map = img_to_depth_map(img, w, h, margin, inverted);

//     let w = w + margin * 2;
//     let h = h + margin * 2;
//     let pixels_map = gen_pixels_map(w, h, n_colors, seed);
//     let stereo = Stereogram::new(w, h, DPI, pixels_map, depth_map);
//     let pixel_data = stereo.generate_pixel_data();

//     reset_canvas(ctx, pixel_data, w, h);

//     log_performance("Img rendering", t);
// }

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


const LIGHT_COLOR: &'static str = "#cdcdcd";
const DARK_COLOR: &'static str = "#000";

const SNEK_INIT_LENGTH: i32 = 3;
const APPLES_LIMIT: i32 = 5;

#[derive(Clone, Copy, Debug)]
enum SnekDirection {
    Up,
    Down,
    Left,
    Right,
}

impl SnekDirection {
    fn is_the_same(self, other: SnekDirection) -> bool {
        use SnekDirection::*;

        match (self, other) {
            (Up, Up) => true,
            (Down, Down) => true,
            (Left, Left) => true,
            (Right, Right) => true,
            _ => false,
        }
    }
}

#[derive(Copy, Clone, Debug)]
struct SnekSegment {
    x: i32,
    y: i32,
    resolution: i32,
    direction: SnekDirection,
}

impl SnekSegment {
    fn new(x: i32, y: i32, resolution: i32, direction: SnekDirection) -> Self {
        Self{x, y, resolution, direction}
    }

    fn turn(&mut self, direction_string: String) {
        use SnekDirection::*;

        match (&direction_string[..], self.direction) {
            ("up", Down) => (),
            ("up", _) => self.direction = Up,

            ("down", Up) => (),
            ("down", _) => self.direction = Down,

            ("right", Left) => (),
            ("right", _) => self.direction = Right,

            ("left", Right) => (),
            ("left", _) => self.direction = Left,

            _ => (),
        }
    }

    fn extend(&self) -> Self {
        use SnekDirection::*;

        let mut new = self.clone();

        match self.direction {
            Up => new.y += 1,
            Down => new.y -= 1,
            Left => new.x += 1,
            Right => new.x -= 1,
        };

        new
    }

    fn render(&self, ctx: &CanvasRenderingContext2d) {
        log!("Rendering segment @ {}:{} -> {:?}", self.x, self.y, self.direction);
        ctx.begin_path();
        ctx.arc((self.x * self.resolution) as f64, (self.y * self.resolution) as f64, (self.resolution/2) as f64, std::f64::consts::PI * 2.0, 0.0).expect("Could not render a segment");
        ctx.set_fill_style(&JsValue::from(LIGHT_COLOR));
        ctx.fill();
    }

    fn tick(&mut self) {
        use SnekDirection::*;

        match self.direction {
            Up => self.y-=1,
            Down => self.y+=1,
            Left => self.x-=1,
            Right => self.x+=1,
        }
    }

    fn can_eat(&self, apple: &Apple) -> bool {
        self.x == apple.x && self.y == apple.y
    }

    fn collision(&self, other: &SnekSegment) -> bool {
        self.x == other.x && self.y == other.y
    }
}

struct Apple {
    x: i32,
    y: i32,
    resolution: i32,
}

impl Apple {
    fn new(x_limit: i32, y_limit: i32, resolution: i32) -> Self {
        let x = rand::thread_rng().gen_range(2, x_limit-2);
        let y = rand::thread_rng().gen_range(2, y_limit-2);
        Self{x, y, resolution}
    }

    fn render(&self, ctx: &CanvasRenderingContext2d) {
        log!("Rendering apple @ {}:{}", self.x, self.y);
        ctx.begin_path();
        ctx.arc((self.x * self.resolution) as f64, (self.y * self.resolution) as f64, (self.resolution/2) as f64, std::f64::consts::PI * 2.0, 0.0).expect("Could not render an apple");
        ctx.set_fill_style(&JsValue::from(LIGHT_COLOR));
        ctx.fill();
    }

    fn overlaps(&self, apple: &Apple) -> bool {
        self.x == apple.x && self.y == apple.y
    }
}

#[wasm_bindgen]
pub struct SnekGame {
    w: i32,
    h: i32,
    wlimit: i32,
    hlimit: i32,
    resolution: i32,
    snek: Vec<SnekSegment>,
    apples: Vec<Apple>,
}

#[wasm_bindgen]
impl SnekGame {
    pub fn new(w: i32, h: i32, resolution: i32) -> Self {
        let direction = SnekDirection::Up;
        let mut snek = vec![];
        for i in 0..SNEK_INIT_LENGTH {
            snek.push(SnekSegment::new(h/2/resolution, w/2/resolution+i, resolution, direction))
        }

        let wlimit = w/resolution;
        let hlimit = h/resolution;
        let mut apples: Vec<Apple> = vec![];
        for _ in 0..APPLES_LIMIT {
            let apple = Apple::new(hlimit, wlimit, resolution);

            if !snek.iter().any(|seg| seg.can_eat(&apple)) &&
                !apples.iter().any(|app| app.overlaps(&apple)) {
                apples.push(apple)
            }
        }

        Self{w, h, wlimit, hlimit, snek, apples, resolution}
    }

    fn clear(&self, ctx: &CanvasRenderingContext2d) {
        log!("Cleaninng canvas for snek");
        ctx.begin_path();
        ctx.clear_rect(0.0, 0.0, self.w as f64, self.h as f64);
        ctx.rect(0.0, 0.0, self.w as f64, self.h as f64);
        ctx.set_fill_style(&JsValue::from(DARK_COLOR));
        ctx.fill();
    }

    pub fn turn(&mut self, direction_string: String) {
        use SnekDirection::*;

        let mut direction = self.snek[0].direction;

        match (&direction_string[..], direction) {
            ("up", Down) => (),
            ("up", _) => direction = Up,

            ("down", Up) => (),
            ("down", _) => direction = Down,

            ("right", Left) => (),
            ("right", _) => direction = Right,

            ("left", Right) => (),
            ("left", _) => direction = Left,

            _ => (),
        }

        log!("Turning head to {:?}", direction);

        self.snek[0].direction = direction;
    }

    pub fn render(&self, ctx: &CanvasRenderingContext2d) {
        self.clear(ctx);

        for apple in &self.apples {
            apple.render(ctx);
        }

        for segment in &self.snek {
            segment.render(ctx);
        }
    }

    pub fn tick(&mut self) -> bool {
        for segment in &mut self.snek {
            segment.tick();
        }

        for i in (0..(self.snek.len()-1)).rev() {
            self.snek[i+1].direction=self.snek[i].direction;
        }

        let head = &self.snek[0];
        let apple_i = self.apples.iter().position(|apple| head.can_eat(&apple));
        if let Some(i) =  apple_i {
            let segment = self.snek.last().expect("Last element should be present").extend();
            log!("Created new segment {:?}", segment);
            self.apples.remove(i);
            self.snek.push(segment);

            loop {
                let new_apple = Apple::new(self.hlimit, self.wlimit, self.resolution);

                if !self.snek.iter().any(|seg| seg.can_eat(&new_apple)) &&
                    !self.apples.iter().any(|app| app.overlaps(&new_apple)) {
                        self.apples.push(new_apple);
                        break;
                }
            }

            return self.tick();
        }

        let head = &self.snek[0];
        let self_collision = self.snek[1..].iter().any(|seg| seg.collision(head));


        let head = &self.snek[0];
        log!("self_collision: {} || head.x < 0: {} || head.y < 0: {}", self_collision, head.x < 0, head.y < 0);
        !self_collision && head.x > 0 && head.y > 0 && head.x < self.hlimit && head.y < self.wlimit
    }
}
