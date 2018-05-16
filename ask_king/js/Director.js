import Store from "./Base/Store";

/**
 * 控制游戏逻辑类
 * */
let ctx = canvas.getContext('2d');

export default class Director{
    constructor(){
        this.loading = true;  // 加载中……
        this.gameOver = true; // 游戏结束
        this.startUp();
    }

    startUp(){
        const loading = Store.getInstance().getItem({key:'loading'});
        loading.animated(ctx);
    }

    /*Loading动画*/
    animatedLoading(ctx){
        console.log(this.draw)
        this.draw(ctx);
        this.loadingTimer = requestAnimationFrame(this.animated);
    }

    destroy(){
        this.loadingTimer && cancelAnimationFrame(this.loadingTimer);
    }
}