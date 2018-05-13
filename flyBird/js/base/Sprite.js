'use strict'
/**
 * 精灵的基类，负责初始化精灵加载的资源和大小以及位置
 *
 * canvas.drawImage基础:
 * 1、drawImage(image, x, y)
 * --- Image、x、y坐标 --- 3个参数
 *
 * 2、drawImage(image, x, y, width, height)
 * --- Image、x、y坐标、width、height宽高 --- 5个参数
 *
 * 3、drawImage(image, sx, sy, sWidth, sHeight, x, y, width, height)
 * --- Image、剪切图片x、剪切图片y坐标、放置图片x、y坐标, 图片width、height宽高 --- 9个参数
 *
 */
import DataStore from './DataStore.js'

export default class Sprite {
    constructor(
        img = null,
        sx = 0, sy = 0,
        sWidth = 0, sHeight = 0,
        x = 0, y = 0,
        width = 0, height = 0) {

        // 初始化
        this.img = img;
        this.sx = sx;
        this.sy = sy;
        this.sWidth = sWidth;
        this.sHeight = sHeight;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        // canvas 保存到 DataStore 的静态元素中，唯一性
        this.dataStore = DataStore.getInstance();
        this.ctx = this.dataStore.ctx;
    }

    /**
     * 画图方法draw
     * img 传入Image对象
     * srcX 要剪裁的起始X坐标
     * srcY 要剪裁的起始Y坐标
     * srcW 剪裁的宽度
     * srcH 剪裁的高度
     * x 放置的x坐标
     * y 放置的y坐标
     * width 要使用的宽度
     * height 要使用的高度
     */
    draw(img = this.img,
         sx = this.sx,
         sy = this.sy,
         sWidth = this.sWidth,
         sHeight = this.sHeight,
         x = this.x,
         y = this.y,
         width = this.width,
         height = this.height){
        this.ctx.drawImage(
            img,
            sx,
            sy,
            sWidth,
            sHeight,
            x,
            y,
            width,
            height
        )
    }
}