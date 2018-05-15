import Loader from "./Base/Loader";
import Loading from "./Common/Loading";
import Store from "./Base/Store";
import Director from "./Director";

/**
 * 游戏主函数
 */
export default class Main {
    constructor() {
        // 维护当前requestAnimationFrame的id
        this.aniId = 0
        const loader = new Loader();
        loader.loadImg(this.init)
    }

    init(){
        console.info('资源加载完毕!');
        Store.getInstance()
            .putItem({key: 'loading', value: Loading});
        new Director();
    }
}
