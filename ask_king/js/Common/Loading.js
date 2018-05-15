/* Loading 类 */

import Store from "../Base/Store";

export default class Loading {
    constructor() {
        this.carImg = Store.getInstance().getItem({type: 'img', key: 'icon_load_car_body'});
        this.mountainImg = Store.getInstance().getItem({type: 'img', key: 'icon_load_mountain'});
        this.wheelImg = Store.getInstance().getItem({type: 'img', key: 'icon_load_wheel_fro'});
        this.canvas = Store.getInstance().canvas;
        this.flexible = Store.getInstance().flexible;
        this.live = true;
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

        mountainCanvas.getContext('2d').drawImage(
            this.mountainImg,
            0, 0,
            this.mountainImg.width,
            this.mountainImg.height,
            0, 0,
            mountainW,
            mountainH,
        );
        return mountainCanvas;
    }

    draw(ctx) {
        const {width, height} = this.canvas;
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
    }
}