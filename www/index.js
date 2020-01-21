import * as wasm from "autostereograms-rs";

wasm.debug();

let canvas = document.getElementById("autostereogram_one");
let ctx = canvas.getContext("2d");
let img = document.getElementById("source-image");

let margin = 200;
let seed = "myseedstringisthisglong"

canvas.width = img.width + margin * 2;
canvas.height = img.height + margin * 2;

let w = canvas.width;
let h = canvas.height;

console.log("Canvas height is", h, "width is", w);

wasm.render_img(img, ctx, w, h, margin, false, 3, seed);
let t1 = performance.now();
