/* 存储类 */
export default class Store{

    // 存储类单例
    static getInstance(){
        if(!Store.instance)
            Store.instance = new Store();
        return Store.instance;
    }

    constructor(){
        // 图片存储map
        this.imgStore = new Map();
        // 类存储map
        this.classStore = new Map();
    }

    /* 设置存储对象 */
    putItem({type, key, value}){
        if (typeof value === 'function'){
            value = new value();
        }
        type === 'img'?
            this.imgStore.set(key, value):
            this.classStore.set(key, value)
    }

    /* 获取存储对象 */
    getItem({type, key}){
        let item = null;
        type === 'img'?
            item = this.imgStore.get(key):
            item = this.classStore.get(key)
        return item
    }

    /* 清除class类对象 */
    destroy(){
        for(let value of this.classStore.values()){
            value = null;
        }
    }
}