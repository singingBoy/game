'use strict'
import ResourceLoader from "../js/base/ResourceLoader.js";

class Text {
    constructor(){
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        let loader = ResourceLoader.create();
        let map = loader.getSourceMap();
        console.log(map.get('background'))

// 测试绘画图片

        /*
        const image = new Image();
        image.src = "../asset/background.png";
        image.onload = () => {
            console.log('finished load,图片宽高:',{width:image.width, height:image.height});
            ctx.drawImage(image,10,10)
        };
        */

        /**
         *
         * setTimeout后 image已经加载完成，没有进入onload里面
         *
         const image = new Image();
         image.src = "../asset/background.png";
         setTimeout(()=>{
    image.onload = () => {
        console.log('finished load,图片宽高:',{width:image.width, height:image.height});
        ctx.drawImage(image,10,10)
    };
},5000)
         */

        // const image = new Image();
        // image.src = "../asset/background.png";
        // console.log(image)
        // image.onload = () => {
        //     console.log('finished load,图片宽高:',{width:image.width, height:image.height});
        //     ctx.drawImage(image,10,10)
        // };
    }
}

new Text();
