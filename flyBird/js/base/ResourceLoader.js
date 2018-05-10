'use strict'
//资源文件加载器，确保canvas在图片资源加载完成后才进行渲染

import Resources from './Resources.js'

export default class ResourceLoader{
    constructor(){
        // 构造时候把图片资源引入、并加载
        this.map = new Map(Resources);
        for(let [key, value] of this.map){
            let image = new Image(value);
            image.src = value;
            // value = image; 无法把image放进去
            this.map.set(key, image);
        }
    }

    /* 所有资源加载完成回掉 */
    onLoad(callback){
        let time = 0;
        for(let [key,value] of this.map){
            value.onload = ()=>{
                console.log(value.width)
                time ++;
                if(time === this.map.size){
                    callback && callback(this.map);
                }
            }
        }
    }

    /* 静态创建方法create */
    static create(){
        return new ResourceLoader();
    }
}