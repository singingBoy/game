'use strict'
window.onload = function () {
    console.log('canvas画直线');
    // canvas1
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 10
    ctx.fillStyle = 'red'

    drawStar(ctx,50, 100, 110, 110)
};

//
function drawStar(ctx, r, R, x, y) {
    ctx.beginPath();
    let arr = Array.from({length: 5});
    const pi = Math.PI / 180;
    arr.map((v, i) => {
        // 最外层5点
        ctx.lineTo(
            Math.cos((18 + 72 * i) * pi) * R + x,
            -Math.sin((18 + 72 * i) * pi) * R + y,
        );
        // 里面5点
        ctx.lineTo(
            Math.cos((54 + 72 * i) * pi) * r + x,
            -Math.sin((54 + 72 * i) * pi) * r + y,
        );
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}


