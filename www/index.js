import * as wasm from "autostereograms-rs";

wasm.debug();

function getID(id) {
    return document.getElementById(id)
}

function demo_one_render() {
    let source_canvas = getID("source-one");
    let source_ctx = source_canvas.getContext("2d");

    let canvas = getID("autostereogram-one");
    let ctx = canvas.getContext("2d");

    let seed = "33333333333333333333333"
    let w = source_canvas.width;
    let h = source_canvas.height;

    canvas.width = w;
    canvas.height = h;

    console.log("Canvas height is", h, "width is", w);

    wasm.render_ctx(source_ctx, ctx, w, h, true, 3, seed);
}

function init_demo_one() {
    render_circle();
}

function clear_source_canvas() {
    let canvas = getID("source-one");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fill();

    return ctx;
}

function render_circle() {
    let canvas = getID("source-one");
    let ctx = clear_source_canvas();

    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, 80, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'white';
    ctx.fill();

    demo_one_render();
}

function render_square() {
    let canvas = getID("source-one");
    let ctx = clear_source_canvas();

    ctx.beginPath();
    ctx.rect(canvas.width/2-80, canvas.height/2-80, 160, 160);
    ctx.fillStyle = 'white';
    ctx.fill();

    demo_one_render();
}

function render_triangle() {
    let canvas = getID("source-one");
    let ctx = clear_source_canvas();
    let w = canvas.width;
    let h = canvas.height;

    ctx.beginPath();
    ctx.beginPath();
    ctx.moveTo(w/2-100, h/2-100);
    ctx.lineTo(w/2-100, h/2+50);
    ctx.lineTo(w/2+50, h/2+50);
    ctx.closePath();
    ctx.fillStyle = 'white';
    ctx.fill();

    demo_one_render();
}

init_demo_one();
getID("demo-one-circle").onclick = render_circle;
getID("demo-one-square").onclick = render_square;
getID("demo-one-triangle").onclick = render_triangle;

function showorigin() {
    getID("demo-one-img-wrapper").style.display = "block";
    getID("demo-one-target-wrapper").style.display = "none";

    getID("demo-one-show-origin").style.display = "none";
    getID("demo-one-show-canvas").style.display = "inline";
}

function showcanvas() {
    getID("demo-one-img-wrapper").style.display = "none";
    getID("demo-one-target-wrapper").style.display = "block";

    getID("demo-one-show-origin").style.display = "inline";
    getID("demo-one-show-canvas").style.display = "none";
}

getID("demo-one-show-origin").onclick = showorigin;
getID("demo-one-show-canvas").onclick = showcanvas;
showcanvas();
