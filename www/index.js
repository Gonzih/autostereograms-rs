import * as wasm from "autostereograms-rs";

// wasm.debug();

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

    wasm.render_ctx(source_ctx, ctx, w, h, true, 3, seed);
}

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
// showorigin();

let snek;
let running;

function tick() {
    let canvas = getID("source-one");
    let ctx = canvas.getContext("2d");

    let can_continue = snek.tick();
    snek.render(ctx);

    demo_one_render();

    if (running) {
        if (can_continue) {
            setTimeout(tick, 200);
        } else {
            setTimeout(new_game, 200);
        }
    }
}

function new_game() {
    let canvas = getID("source-one");
    snek = wasm.SnekGame.new(canvas.width, canvas.height, 50);
    running = true;
    tick();
}
function stop_game() { running = false; }

document.onkeydown = function(e) {
    e = e || window.event;
    switch(e.which || e.keyCode) {
        case 37: snek.turn("left");
        break;

        case 38: snek.turn("up");
        break;

        case 39: snek.turn("right");
        break;

        case 40: snek.turn("down");
        break;

        default: return;
    }
    e.preventDefault();
};

getID("start").onclick = new_game;
getID("stop").onclick = stop_game;

new_game();
