/* Loading 类 */

import Store from "../Base/Store";

export default class Loading {
    constructor() {
        this.carImg = Store.getInstance().getItem({type: 'img', key: 'icon_load_car_body'});
        this.mountainImg = Store.getInstance().getItem({type: 'img', key: 'icon_load_mountain'});
        this.wheelImg = Store.getInstance().getItem({type: 'img', key: 'icon_load_wheel_fro'});
        this.loadingImg = Store.getInstance().getItem({type: 'img', key: 'loading'});
        this.canvas = Store.getInstance().canvas;
        this.flexible = Store.getInstance().flexible;
        this.live = true;

        // 山背景向后移动
        this.mountainMoveX = 0;
        this.mountainMoveSpeed = 2;

        // 旋转速度
        this.rotateSpeed = 2;

    }

    // 画车
    drawCar(mountainCanvas) {
        const canvas = mountainCanvas;
        const flexible = this.flexible;
        // 小车宽高
        const carW = this.carImg.width * flexible;
        const carH = this.carImg.height * flexible;
        canvas.getContext('2d').drawImage(
            this.carImg,
            0, 0,
            this.carImg.width,
            this.carImg.height,
            canvas.width - carW,
            canvas.height - carH, // 置于背景底部
            carW,
            carH,
        );
    }

    // 画山
    drawMountain() {
        const mountainCanvas = wx.createCanvas();
        const flexible = this.flexible;
        // 背景山宽高
        const mountainW = this.mountainImg.width * flexible;
        const mountainH = this.mountainImg.height * flexible;
        // canvas宽高
        mountainCanvas.width = mountainW;
        mountainCanvas.height = mountainH;
        // 每一帧移动x的距离
        this.mountainMoveX += this.mountainMoveSpeed;
        // 当移动到整张图片的时候
        if (this.mountainMoveX >= mountainW) {
            this.mountainMoveX = 0;
        }
        // 前面一座山
        mountainCanvas.getContext('2d').drawImage(
            this.mountainImg,
            0, 0,
            this.mountainImg.width,
            this.mountainImg.height,
            -mountainW + this.mountainMoveX,
            0,
            mountainW,
            mountainH,
        );
        // 后面一座山
        mountainCanvas.getContext('2d').drawImage(
            this.mountainImg,
            0, 0,
            this.mountainImg.width,
            this.mountainImg.height,
            this.mountainMoveX,
            0,
            mountainW,
            mountainH,
        );
        return mountainCanvas;
    }

    drawLoadingIcon(){
        const canvas = wx.createCanvas();
        const ctx = canvas.getContext('2d');
        canvas.width = this.loadingImg.width;
        canvas.height = this.loadingImg.height;
        ctx.translate(this.loadingImg.width/2,this.loadingImg.height/2);
        ctx.rotate(this.mountainMoveX*Math.PI/36);
        ctx.translate(-this.loadingImg.width/2,-this.loadingImg.height/2);
        ctx.drawImage(
            this.loadingImg,
            0,
            0,
            this.loadingImg.width,
            this.loadingImg.height,
        );
        return canvas
    }

    draw(ctx) {
        const {width, height} = this.canvas;
        // test
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, width, height);
        let mountainCanvas = this.drawMountain();
        // 把车画到mountainCanvas上
        this.drawCar(mountainCanvas);

        // 画Loading
        ctx.drawImage(
            mountainCanvas,
            0, 0,
            mountainCanvas.width,
            mountainCanvas.height,
            width / 2 - mountainCanvas.width / 2,
            height / 2 - mountainCanvas.height / 2,
            mountainCanvas.width,
            mountainCanvas.height,
        );

        // 画文字
        ctx.font = '100 10px Arial';
        ctx.fillStyle = '#bbb';
        ctx.fillText('正在加载', width / 2-30, height / 2 + 55,100)

        // loading 旋转
        const loadingCanvas = this.drawLoadingIcon();
        ctx.drawImage(
            loadingCanvas,
            0,0,
            this.loadingImg.width,
            this.loadingImg.height,
            width / 2 + 25,
            height / 2 + mountainCanvas.height,
            20,20
        );
    }

    animated(ctx) {
        this.draw(ctx);
        this.loadingTimer = requestAnimationFrame(()=>this.animated(ctx));
    }

    destroy() {
        this.loadingTimer && cancelAnimationFrame(this.loadingTimer);
    }
}