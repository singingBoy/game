'use strict'
import ResourceLoader from './js/base/ResourceLoader.js'
import DataStore from './js/base/DataStore.js'
import BackGround from './js/runtime/BackGround.js'

//初始化整个游戏的精灵，作为游戏开始的入口
export default class Main {
    constructor() {
        this.ctx = document.getElementById('canvas').getContext('2d');
        DataStore.getInstance().ctx = this.ctx;
        ResourceLoader.create().onLoad(map => {
            console.log('资源加载完毕')
            this.init(map);
        });
    }

    init(map) {
        console.log(map.get('background'))
        let screenW = window.screen.width;
        let screenH = window.screen.height;
        let bg = new BackGround(map.get('background'), screenW, screenH);
        bg.draw();
    }
}