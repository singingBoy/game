/* 加载器 */

import Store from "./Store";

export default class Loader {
    constructor() {
        this.store = Store.getInstance();
        this.init();
    }

    init() {
        const {imgUrlStore, imgStore} = this.store;
        for (let [key, value] of imgUrlStore) {
            const image = new Image();
            image.src = value;
            imgStore.set(key, image);
        }
    }

    loadImg(callback) {
        let loadTime = 0;
        const {imgStore} = this.store;
        for(let value of imgStore.values()){
            value.onload = ()=>{
                loadTime ++;
                if(loadTime === imgStore.size){
                    callback && callback();
                }
            };
        }
    }
}