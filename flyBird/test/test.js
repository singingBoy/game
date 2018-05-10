'use strict'
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 测试绘画图片
const image = new Image();
image.src = "../asset/background.png";
image.onload = () => {
    console.log('finished load,图片宽高:',{width:image.width, height:image.height});
    ctx.drawImage(image,10,10)
};