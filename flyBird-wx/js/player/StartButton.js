'use strict'
// 开始按钮类

import Sprite from "../base/Sprite.js";
import DataStore from "../base/DataStore.js";


export default class StartButton extends Sprite {
    constructor() {
        const canvas = DataStore.getInstance().get('canvas');
        const ctx = DataStore.getInstance().get('ctx');
        const img = DataStore.getInstance().res.get('startButton');
        super(img, 0, 0, img.width, img.height, canvas.width / 2-img.width, canvas.height / 2, img.width, img.height);
        this.ctx = ctx;
        this.screenW = canvas.width;
        this.screenH = canvas.height;
    }

    drawCover() {
        let ctx = this.ctx;
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0, 0, this.screenW, this.screenH);
        super.draw();
    }

    drawText() {
        const canvas = document.createElement('canvas');
        canvas.width = this.screenW;
        canvas.height = this.screenH;
        let ctx = canvas.getContext('2d');
        ctx.font = "48px serif ";
        ctx.fillStyle = '#fff';
        ctx.fillText('Start',50, 60);
        super.draw(canvas, 0, 0, this.screenW, this.screenH, this.screenW/2-50, this.screenH/2-10, this.screenW, this.screenH);
    }

    draw() {
        this.drawCover();
        this.drawText();
    }
}