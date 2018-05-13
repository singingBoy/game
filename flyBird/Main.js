'use strict'
import ResourceLoader from './js/base/ResourceLoader.js'
import DataStore from './js/base/DataStore.js'
import BackGround from './js/runtime/BackGround.js'
import Land from "./js/runtime/Land.js";
import Director from "./js/Director.js";
import Birds from "./js/player/Birds.js";
import PencilDown from "./js/runtime/PencilDown.js";
import PencilUp from "./js/runtime/PencilUp.js";

// let screenW = document.documentElement.clientWidth;//window.screen.width;
// let screenH = document.documentElement.clientHeight;//window.screen.height;

const screenW = window.innerWidth;
const screenH = window.innerHeight;

//初始化整个游戏的精灵，作为游戏开始的入口
export default class Main {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        // 全屏宽高
        this.canvas.width = screenW;
        this.canvas.height = screenH;
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();

        ResourceLoader.create().onLoad(map => {
            console.log('资源加载完毕')
            this.init(map);
        });
    }

    init(map) {
        this.dataStore.canvas = this.canvas;
        this.dataStore.ctx = this.ctx;

        DataStore.getInstance()
            .put('canvas', this.canvas)
            .put('ctx', this.ctx)
            .put('background', BackGround)
            .put('land', Land)
            .put('birds', Birds)
            .put('pencilDown',PencilDown)
            .put('pencilUp',PencilUp);

        this.canvas.addEventListener('touchstart', (e) =>
            this.director.birdFly(e, this.dataStore)
        );
        this.director.run();
    }

}