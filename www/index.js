import * as wasm from "autostereograms-rs";

// wasm.debug();

let canvas = document.getElementById("autostereogram_one");
let ctx = canvas.getContext("2d");
let img = document.getElementById("source-image");

wasm.debug();

canvas.width = img.width;
canvas.height = img.height;

let w = canvas.width;
let h = canvas.height;

console.log("Canvas height is", h, "width is", w);

wasm.render_img(img, ctx, canvas.width, canvas.height, false, 3, "hellloworld[{}&[}&[{}[{}]]]]");
let t1 = performance.now();
