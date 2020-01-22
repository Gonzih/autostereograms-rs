import * as wasm from "autostereograms-rs";

wasm.debug();

function demo_one_render() {
    let source_canvas = document.getElementById("source-one");
    let canvas = document.getElementById("autostereogram-one");
    let ctx = canvas.getContext("2d");

    let seed = "33333333333333333333333"

    let margin = 0;
    canvas.width = source_canvas.width + margin * 2;
    canvas.height = source_canvas.height + margin * 2;

    let w = canvas.width;
    let h = canvas.height;

    console.log("Canvas height is", h, "width is", w);

    wasm.render_canvas(source_canvas, ctx, w, h, false, 3, seed);
}

function init_demo_one() {
    render_circle();
}

function render_circle() {
    let canvas = document.getElementById("source-one");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, 80, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#000';
    ctx.stroke();

    demo_one_render();
}

function render_square() {
    let canvas = document.getElementById("source-one");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.rect(canvas.width/2-80, canvas.height/2-80, 160, 160);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#000';
    ctx.stroke();

    demo_one_render();
}

function render_triangle() {
    let canvas = document.getElementById("source-one");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(100, 300);
    ctx.lineTo(300, 300);
    ctx.closePath();
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#000';
    ctx.stroke();

    demo_one_render();
}

function getID(id) {
    return document.getElementById(id)
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
