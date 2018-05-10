'use strict'
/*********************************************
 * 变量缓存器，方便我们在不同的类中访问和修改变量
 *
 * 单例模式：
 * 1、单例模式生成一个命名空间，声明一个变量，减少内存消耗
 * 2、单例模式拓展性不好，不能轻易改变它
 * 3、闭包是单例模式的一种实现方式
 *
 * 这里使用单例模式创建 变量存储类 让其他类使用同一个资源
 * */

export default class DataStore {

    static getInstance() {
        if (!DataStore.instance) {
            DataStore.instance = new DataStore();
        }
        return DataStore.instance
    }

    constructor() {
        this.map = new Map();
    }

    /* 新增put方法 */
    put(key, value) {
        if (typeof value === 'function') {
            value = new value();
        }
        this.map.set(key, value);
        // return this 可以实现 DataStore.getInstance().put().put().get().... 方便便利的方法
        return this
    }

    /* 获取get方法 */
    get(key) {
        return this.map.get(key);
    }

    /* 销毁destroy其中一个方法 */
    destroyItem(k) {
        for (let [key, value] of this.map.entries()) {
            if (key === k) {
                value = null;
            }
        }
    }

    /* 销毁所有destroy */
    destroy() {
        for (let value of this.map.values()) {
            value = null;
        }
    }
}