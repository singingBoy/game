'use strict'
// 背景类
import Sprite from '../base/Sprite.js'

export default class BackGround extends Sprite{
    constructor(img, width, height){
        console.dir(img)
        super(
            img,
            0, 0,
            img.width, img.height,
            0, 0,
            width,
            height
        );
    }
}