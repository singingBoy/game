'use strict'
import ResourceLoader from './js/base/ResourceLoader.js'
import DataStore from './js/base/DataStore.js'
import BackGround from './js/runtime/BackGround.js'

//初始化整个游戏的精灵，作为游戏开始的入口
export default class Main{
    constructor(){
        this.ctx = document.getElementById('canvas').getContext('2d');
        ResourceLoader.create().onLoad(map=>{
            console.log('资源加载完毕')
            this.init(map);
        });
        DataStore.getInstance().ctx = this.ctx;
    }

    init(map){
        let screenW = window.innerWidth;
        let screenH = window.innerHeight;
        let bg = new BackGround(map.get('background'),screenW, screenH).draw();
    }
}