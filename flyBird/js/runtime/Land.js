'use strict'
// 陆地类

import Sprite from "../base/Sprite.js";
import DataStore from "../base/DataStore.js";

export default class Land extends Sprite {
    constructor() {
        const {width, height} = DataStore.getInstance().canvas;
        const img = DataStore.getInstance().get('land');
        super(img,
            0, 0,
            img.width, img.height,
            0, height - img.height,
            width,
            img.height)
        // 地板水平坐标变换
        this.landX = 0;
        // 移动速度
        this.moveSpeed = 2;
    }

    /*重写绘画*/
    draw() {
        // 移动距离
        this.landX = this.landX + this.moveSpeed;
        if(this.landX >= this.width){
            this.landX = 0;
        }
        // 初始的陆地
        this.ctx.drawImage(
            this.img,
            0,
            0,
            this.sWidth,
            this.sHeight,
            -this.landX,
            this.y,
            this.width,
            this.height
        );
        // 补上的陆地
        this.ctx.drawImage(
            this.img,
            0,
            0,
            this.sWidth,
            this.sHeight,
            this.width-this.landX,
            this.y,
            this.width,
            this.height
        )
    }
}