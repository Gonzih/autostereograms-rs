import * as wasm from "autostereograms-rs";

wasm.debug();

function demo_one_render(img) {
    let canvas = document.getElementById("autostereogram-one");
    let ctx = canvas.getContext("2d");

    let margin = 20;
    let seed = "33333333333333333333333"

    canvas.width = img.width + margin * 2;
    canvas.height = img.height + margin * 2;

    let w = canvas.width;
    let h = canvas.height;

    console.log("Canvas height is", h, "width is", w);

    wasm.render_img(img, ctx, w, h, margin, false, 3, seed);
}

function init_demo_one() {
    let img = document.getElementById("source-image-one");
    demo_one_render(img);
}

function set_source(src) {
    let img = document.getElementById("source-image-one");
    img.onload = function() {
        demo_one_render(img);
    }
    img.src = "/samples/" + src;
}

init_demo_one();
document.getElementById("demo-one-cup").onclick = function() { set_source("cup.jpg"); };
document.getElementById("demo-one-sphere").onclick = function() { set_source("sphere.jpg"); };
document.getElementById("demo-one-shapes").onclick = function() { set_source("shapes1.png"); };
document.getElementById("demo-one-trike").onclick = function() { set_source("trike.jpg"); };
document.getElementById("demo-one-shark").onclick = function() { set_source("shark.png"); };

function showorigin() {
    document.getElementById("demo-one-img-wrapper").style.display = "block";
    document.getElementById("demo-one-target-wrapper").style.display = "none";

    document.getElementById("demo-one-show-origin").style.display = "none";
    document.getElementById("demo-one-show-canvas").style.display = "inline";
}

function showcanvas() {
    document.getElementById("demo-one-img-wrapper").style.display = "none";
    document.getElementById("demo-one-target-wrapper").style.display = "block";

    document.getElementById("demo-one-show-origin").style.display = "inline";
    document.getElementById("demo-one-show-canvas").style.display = "none";
}

document.getElementById("demo-one-show-origin").onclick = showorigin;
document.getElementById("demo-one-show-canvas").onclick = showcanvas;
showcanvas();
