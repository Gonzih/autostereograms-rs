import * as wasm from "autostereograms-rs";

// wasm.debug();

let canvas = document.getElementById("autostereogram_one");
let ctx = canvas.getContext("2d");
let img = document.getElementById("source-image");

// canvas.width = img.width;
// canvas.height = img.height;
let t0 = performance.now();
wasm.render_img(img, ctx, canvas.width, canvas.height, false);
let t1 = performance.now();
console.log("Rendering took " + (t1 - t0) + " milliseconds.");
