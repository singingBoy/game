'use strict'
//计分器类

import DataStore from "../base/DataStore.js";

export default class Score {
    constructor() {
        this.score = 0;
    }

    goScore() {
        this.score ++;
    }

    draw() {
        const canvas = DataStore.getInstance().canvas;
        const ctx = DataStore.getInstance().ctx;
        ctx.font = '50px Verdana';
        ctx.fillText(this.score.toString(), canvas.width / 2, 100);
    }
}