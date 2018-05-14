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
    }

    /* 小鸟飞 */
    birdFly(e, dataStore) {
        // 防止双击屏幕放大
        e.preventDefault();
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
        this.checkBoom(bird);

        if (this.gameOver) {
            this.dataStore.get('startButton').draw();
            cancelAnimationFrame(timer);
            this.dataStore.destroy();
            return false;
        }
        return true;
    }

    /* 判断是否和铅笔相撞 */
    checkBoom(bird) {
        const {firstX, firstY, secondX, secondY, img} = this.dataStore.get('pencilDown');
        const {positionX, positionY} = bird;
        if (firstX <= positionX <= firstX + img.width) {
            this.gameOver = true;
        }
        if (secondX <= positionX <= secondX + img.width) {
            this.gameOver = true;
        }
        if (firstY <= positionY <= firstY + img.height) {
            this.gameOver = true;
        }
        if (secondY <= positionY <= secondY + img.height) {
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

            this.timer = requestAnimationFrame(() => {
                this.run();
            });
            this.dataStore.put('timer', this.timer)
        }
    }
}