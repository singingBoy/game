'use strict'
// 背景类
import Sprite from '../base/Sprite.js'
import DataStore from "../base/DataStore.js";

export default class BackGround extends Sprite{
    constructor(){
        const canvas = DataStore.getInstance().canvas;
        const background = DataStore.getInstance().res.get('background');
        super(
            background,
            0, 0,
            background.width, background.height,
            0, 0,
            canvas.width,
            canvas.height
        );
    }
}