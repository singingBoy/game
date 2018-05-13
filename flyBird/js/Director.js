'use strict'
// 导演类,控制整个小程序游戏的逻辑

import DataStore from "./base/DataStore.js";

export default class Director {
    constructor() {
        this.dataStore = DataStore.getInstance();
    }

    static getInstance(){
        if(!Director.instance){
            Director.instance = new Director();
        }
        return Director.instance;
    }

    run() {

        this.dataStore.get('landFront').draw();

        window.requestAnimationFrame(()=>{
            this.run();
        })
    }
}