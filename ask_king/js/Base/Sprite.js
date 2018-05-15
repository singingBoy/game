/**
 *  精灵类
 *  @param:{
 *      img: 图片
 *      x: x坐标
 *      y: y坐标
 *      width: 画图的宽度
 *      height: 画图的高度
 *  }
 **/
export default class Sprite {
    constructor({img, x, y, width, height}) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw({
             ctx = null,
             img = this.img,
             sx = 0,
             sy = 0,
             sWidth = this.img.width,
             sHeight = this.img.width,
             x = this.x,
             y = this.y,
             width = this.width,
             height = this.height,
         }) {
        ctx.drawImage(img, sx, sy, sWidth, sHeight, x, y, width, height);
    }
}