'use strict'
// 小鸟类

import Sprite from "../base/Sprite.js";
import DataStore from "../base/DataStore.js";

export default class Birds extends Sprite {
    constructor() {
        const canvas = DataStore.getInstance().get('canvas');
        const birdImage = DataStore.getInstance().res.get('birds');
        const land = DataStore.getInstance().res.get('land');
        super(birdImage,
            10, 10,
            birdImage.width,
            birdImage.height,
            0, 0,
            birdImage.width,
            birdImage.height);

        this.positionX = 50;
        this.positionY = (canvas.height - land.height)/2;
        this.speedY = 2;
        this.time = 0;

        // 小鸟的三种状态剪裁的x坐标
        this.clippingX = [
            0,
            birdImage.width/3,
            birdImage.width/3*2
        ];
    }

    flyUp(){
        this.positionY -= 1;
        this.time = 0;
        this.index = 0;//Math.floor(Math.random()*6 + 1);
    }

    draw() {
        this.time++;
        this.speedY = this.time * 0.098;
        this.positionY +=  this.speedY;
        // 降低扇翅膀速度
        if(this.time%10 === 0){
            this.index = this.time % 3;
        }
        super.draw(this.img,
                this.clippingX[this.index],
                0,
                this.img.width/3,
                this.sHeight,
                this.positionX,
                this.positionY,
                this.sWidth/3,
                this.sHeight,
            )
    }
}