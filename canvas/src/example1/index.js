'use strict'
/**
 * + ctx.beginPath()  开始一段全新的路径
 * + ctx.closePath()  封闭该绘图路径，并使环境指向原上下文
 * （通常使用1、2来绘制封闭图形，不使用的话会 造成封闭图形封闭得不完整）
 * + ctx.moveTo(x, y) 设置描笔起点
 * + ctx.lineTo(x, y) 从上一个坐标点到x、y坐标点
 * + ctx.strokeStyle = color | gradient | pattern  绘制线条颜色、线性、pattern对象
 * + ctx.lineWidth = 10  线条宽度10
 * + ctx.stroke()  开始绘制
 * + ctx.fillStyle = color | gradient | pattern  填充颜色、线性、pattern对象
 * + ctx.fill()  开始填充
 *
 * + ctx.strokeRect(x, y, width, height)  画一个矩形
 * + ctx.fillRect(x, y, width, height)   画一个填充矩形、默认颜色黑色
 * + ctx.rect(x, y, width, height)  计算一个矩形4点，相当于3/4个lineTo
 *
 * 心得体会：
 * canvas 绘制的 border有点怪异，就是10的border绘制在0，0的位置上，border的中心在0，0位置，边在-5的位置
 * */


/**
 * 练习1：使用线条绘制创建一个 fillRect、strokeRect 方法
 *
 * */
window.onload = function () {
    console.log('canvas画直线');
    // canvas1
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    drawRect(ctx, 0, 0, 100, 100, 50, '#000', 'red'); // border x、y轴溢出了25px
    drawRect(ctx, 225, 225, 100, 100, 50, '#000', 'red');

    // canvas2
    const canvas2 = document.getElementById('canvas2');
    const ctx2 = canvas2.getContext('2d');

    drawRect2(ctx2, 0, 0, 100, 100, 50, '#fff', 'blue'); // border x、y轴溢出了25px
    drawRect2(ctx2, 225, 225, 100, 100, 50, '#fff', 'blue');

    // canvas3
    const canvas3 = document.getElementById('canvas3');
    const ctx3 = canvas3.getContext('2d');

    drawRect3(ctx3, 0, 0, 100, 100, 50, 'green', 'orange'); // border x、y轴溢出了25px
    drawRect3(ctx3, 225, 225, 100, 100, 50, 'green', 'orange');
};

function drawRect(ctx, x, y, width, height, borderWidth, fillColor, borderColor) {
    ctx.beginPath();
    ctx.lineTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y + height);
    ctx.closePath();

    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = borderColor;
    ctx.fillStyle = fillColor;

    ctx.fill();
    ctx.stroke();
}

function drawRect2(ctx, x, y, width, height, borderWidth, fillColor, borderColor) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.closePath();

    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = borderColor;
    ctx.fillStyle = fillColor;

    ctx.fill();
    ctx.stroke();
}

function drawRect3(ctx, x, y, width, height, borderWidth, fillColor, borderColor) {
    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = borderColor;
    ctx.fillStyle = fillColor;

    ctx.fillRect(x, y, width, height);
    ctx.strokeRect(x, y, width, height);

    ctx.fill();
    ctx.stroke();
}




