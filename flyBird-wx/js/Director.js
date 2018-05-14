'use strict'
// 导演类,控制整个小程序游戏的逻辑

import DataStore from "./base/DataStore.js";

export default class Director {
    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    constructor() {
        this.dataStore = DataStore.getInstance();
        this.canvas = this.dataStore.canvas;
        this.gameOver = false;
        this.scoreFlag = false;
    }

    /* 小鸟飞 */
    birdFly(e, dataStore) {
        // 防止双击屏幕放大
        // e.preventDefault();
        // this.dataStore 无法获取？
        dataStore.get('birds').flyUp();
    }

    /* 判断是否gameOver */
    check() {
        const bird = this.dataStore.get('birds');
        const land = this.dataStore.get('land');
        const canvas = this.dataStore.get('canvas');
        const timer = this.dataStore.get('timer');
        // 小鸟撞击地板
        if (bird.positionY >= (canvas.height - land.height)) {
            this.gameOver = true;
        }
        // 小鸟撞柱子
        this.checkPencilDownBoom(bird);
        this.checkPencilUpBoom(bird);

        if (this.gameOver) {
            this.dataStore.get('startButton').draw();
            cancelAnimationFrame(timer);
            this.dataStore.destroy();
            //触发微信小游戏垃圾回收
            wx.triggerGC();
            return false;
        }
        return true;
    }

    /* 加分 */
    addScore() {
        if (!this.gameOver) {
            const {positionX} = this.dataStore.get('birds');
            const score = this.dataStore.get('score');
            const {firstX, img, secondX} = this.dataStore.get('pencilDown');
            let imgWidth = img.width/2;
            if (firstX < positionX && positionX < firstX + imgWidth){
                this.scoreFlag = false;
            }
            if (positionX > (firstX + imgWidth) && !this.scoreFlag) {
                this.scoreFlag = true;
                score.goScore();
            }
            if (secondX < positionX && positionX < secondX + imgWidth){
                this.scoreFlag = false;
            }
            if (positionX > (secondX + imgWidth) && !this.scoreFlag) {
                this.scoreFlag = true;
                score.goScore();
            }

        }
    }

    /* 判断是否和向下铅笔相撞 */
    checkPencilDownBoom(bird) {
        const {firstX, firstY, secondX, secondY, img} = this.dataStore.get('pencilDown');
        const {positionX, positionY} = bird;
        const imgWidth = img.width/2;
        const imgHeight = img.height/2;
        if (firstX <= positionX &&
            positionX <= (firstX + imgWidth) &&
            firstY <= positionY &&
            positionY <= (firstY + imgHeight)) {
            this.gameOver = true;
        }
        if (secondX <= positionX &&
            positionX <= (secondX + imgWidth) &&
            secondY <= positionY &&
            positionY <= (secondY + imgHeight)) {
            this.gameOver = true;
        }
    }

    /* 判断是否和向上铅笔相撞 */
    checkPencilUpBoom(bird) {
        const {firstX, firstY, secondX, secondY, img} = this.dataStore.get('pencilUp');
        const {positionX, positionY} = bird;
        const imgWidth = img.width/2;
        const imgHeight = img.height/2;
        if (firstX <= positionX &&
            positionX <= (firstX + imgWidth) &&
            firstY <= positionY &&
            positionY <= (firstY + imgHeight)) {
            this.gameOver = true;
        }
        if (secondX <= positionX &&
            positionX <= (secondX + imgWidth) &&
            secondY <= positionY &&
            positionY <= (secondY + imgHeight)) {
            this.gameOver = true;
        }
    }

    run() {
        if (this.check()) {
            this.dataStore.get('background').draw();
            this.dataStore.get('land').draw();
            this.dataStore.get('birds').draw();
            this.dataStore.get('pencilDown').draw();
            this.dataStore.get('pencilUp').draw();
            this.dataStore.get('score').draw();
            this.addScore();

            this.timer = requestAnimationFrame(() => {
                this.run();
            });
            this.dataStore.put('timer', this.timer)
        }
    }
}