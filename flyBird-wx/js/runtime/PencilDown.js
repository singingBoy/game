'use strict'
// 铅笔类

import Sprite from "../base/Sprite.js";
import DataStore from "../base/DataStore.js";

export default class PencilDown extends Sprite {
    constructor() {
        const canvas = DataStore.getInstance().canvas;
        const img = DataStore.getInstance().res.get('pencilDown');
        const land = DataStore.getInstance().res.get('land');
        super(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
        // 初始化
        this.canvas = canvas;
        this.land = land;
        const imgWidth = this.img.width/2;
        const imgHeight = this.img.height/2;
        // 第一第二张铅笔 初始x点
        this.firstInitX = canvas.width / 2 - imgWidth;
        this.secondInitX = canvas.width - imgWidth;
        this.firstX = this.firstInitX;
        this.secondX = this.secondInitX;
        // 铅笔上下移动最大距离
        this.maxMoveHeight = (canvas.height - land.height) / 2 - imgHeight;
        // 第一第二张铅笔 初始y点
        this.firstY = Math.random() * this.maxMoveHeight;
        this.secondY = Math.random() * this.maxMoveHeight;

        // 移动速度
        this.speedY = 1;
        this.speedX = 1;
        // 移动方向
        this.firstDirection = 'down';// 下移动down 上移动up
        this.secondDirection = 'down';// 下移动down 上移动up
    }

    draw() {
        // 第一第二支铅笔 向右移动x坐标
        this.firstX -= this.speedX;
        this.secondX -= this.speedX;

        const imgWidth = this.img.width/2;
        const imgHeight = this.img.height/2;
        if (this.firstX <= -imgWidth) {
            this.firstX = this.canvas.width;
        }
        if(this.secondX <= -imgWidth){
            this.secondX = this.canvas.width;
        }
        // 第一第二支铅笔 上下移动速度
        this.firstSpeed = Math.floor(Math.random() * this.speedY + 1);
        this.secondSpeed = Math.floor(Math.random() * this.speedY + 1);
        // 第一第二支铅笔 y轴坐标
        if (this.firstDirection === 'down') {
            this.firstY += this.firstSpeed;
        } else {
            this.firstY -= this.firstSpeed;
        }
        if (this.secondDirection === 'down') {
            this.secondY += this.secondSpeed;
        } else {
            this.secondY -= this.secondSpeed;
        }
        // 到达最大位置反方向移动
        if (this.firstY >= this.maxMoveHeight) {
            this.firstDirection = 'up'
        }
        if (this.secondY >= this.maxMoveHeight) {
            this.secondDirection = 'up'
        }
        // 到达顶部位置反方向移动
        if (this.firstY <= 0) {
            this.firstDirection = 'down'
        }
        if (this.secondY <= 0) {
            this.secondDirection = 'down'
        }
        // 初次显示的绘图
        super.draw(this.img, 0, 0, this.sWidth, this.sHeight, this.firstX, this.firstY, this.width/2, this.height/2);
        super.draw(this.img, 0, 0, this.sWidth, this.sHeight, this.secondX, this.secondY, this.width/2, this.height/2);
        // 后面显示的绘图
        super.draw(this.img, 0, 0, this.sWidth, this.sHeight, this.firstX + this.canvas.width, this.firstY, this.width/2, this.height/2);
        super.draw(this.img, 0, 0, this.sWidth, this.sHeight, this.secondX + this.canvas.width, this.secondY, this.width/2, this.height/2);
    }
}