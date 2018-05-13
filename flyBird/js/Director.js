'use strict'
// 导演类,控制整个小程序游戏的逻辑

import DataStore from "./base/DataStore.js";

export default class Director {
    static getInstance(){
        if(!Director.instance){
            Director.instance = new Director();
        }
        return Director.instance;
    }

    constructor() {
        this.dataStore = DataStore.getInstance();
        this.canvas = this.dataStore.canvas;
    }

    /* 小鸟飞 */
    birdFly(e, dataStore){
        // 防止双击屏幕放大
        e.preventDefault();
        // this.dataStore 无法获取？
        dataStore.get('birds').flyUp();
    }

    /* 判断是否gameOver */
    check(){
        const bird = this.dataStore.get('birds');
        const land = this.dataStore.get('land');
        const canvas = this.dataStore.get('canvas');
        const timer = this.dataStore.get('timer');
        if(bird.positionY >=(canvas.height - land.height)){
            alert('game over!')
            cancelAnimationFrame(timer);
            return false;
        }
        return true;
    }

    run() {
        if(this.check()){
            this.dataStore.get('background').draw();
            this.dataStore.get('land').draw();
            this.dataStore.get('birds').draw();
            this.dataStore.get('pencilDown').draw();
            this.dataStore.get('pencilUp').draw();
            this.timer = window.requestAnimationFrame(()=>{
                this.run();
            });
            this.dataStore.put('timer', this.timer)
        }
    }
}