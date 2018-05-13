'use strict'
import ResourceLoader from './js/base/ResourceLoader.js'
import DataStore from './js/base/DataStore.js'
import BackGround from './js/runtime/BackGround.js'
import Land from "./js/runtime/Land.js";
import Director from "./js/Director.js";

// let screenW = document.documentElement.clientWidth;//window.screen.width;
// let screenH = document.documentElement.clientHeight;//window.screen.height;

const screenW  = window.innerWidth;
const screenH = window.innerHeight;

//初始化整个游戏的精灵，作为游戏开始的入口
export default class Main {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.director = Director.getInstance();
        // 全屏宽高
        this.canvas.width = screenW;
        this.canvas.height = screenH;

        DataStore.getInstance().canvas = this.canvas;
        DataStore.getInstance().ctx = this.ctx;

        ResourceLoader.create().onLoad(map => {
            console.log('资源加载完毕')
            this.init(map);
        });
    }

    init(map) {
        DataStore.getInstance()
            .put('background', BackGround)
            .put('landFront', Land)
            .put('landNext', Land)
        DataStore.getInstance().get('background').draw();
        this.director.run();
    }

}