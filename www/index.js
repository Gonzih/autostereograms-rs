import * as wasm from "autostereograms-rs";

wasm.debug();

let canvas = document.getElementById("autostereogram_one");
let ctx = canvas.getContext("2d");
let img = document.getElementById("source-image");

// canvas.width = img.width;
// canvas.height = img.height;
wasm.render_img(img, ctx, canvas.width, canvas.height);
