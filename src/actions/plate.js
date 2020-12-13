import {Point} from './point.js'
import * as Flatten from '@flatten-js/core'


export class Plate{
    constructor(x,y,angle,info){
        this._width = info.width;
        this._height = info.height;
        this._color = info.color;
        this._center = new Flatten.Point(x,y);
        this._upleftpoint = new Flatten.Point(x-this._width/2, y-this._height/2);
        this._uprightpoint = new Flatten.Point(x+this._width/2, y-this._height/2);
        this._downrightpoint = new Flatten.Point(x+this._width/2, y+this._height/2);
        this._downleftpoint = new Flatten.Point(x-this._width/2, y+this._height/2);
        this._points = [this._upleftpoint, this._uprightpoint,this._downrightpoint, this._downleftpoint];
        this._angle = (Math.PI*2)*angle/360;
        for(let i = 0;i<this._points.length;i++){
            this._points[i] = this._points[i].rotate(this._angle,this._center);
        }
    }

    draw(ctx){
        ctx.beginPath();
        ctx.fillStyle = this._color;
        ctx.moveTo(this._points[0].x, this._points[0].y);
        for(let i = 1;i<this._points.length;i++){
            ctx.lineTo(this._points[i].x, this._points[i].y);
        }
        ctx.fill();
    }
}