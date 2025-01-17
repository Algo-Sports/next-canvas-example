import * as Flatten from '@flatten-js/core'

export class Laser {
    constructor(p, hitpoints, speed) {
        this._startPoint = p;
        this._hitpointsindex = 0;
        this._hitpoints = hitpoints;
        this._endPoint = new Flatten.Point(this._hitpoints[this._hitpointsindex].x, this._hitpoints[this._hitpointsindex].y);
        this._P = this._startPoint.clone();
        this._Q = this._startPoint.clone();
        this._v = new Flatten.Vector(this._startPoint, this._endPoint);
        this._v = this._v.normalize();
        this._speed = speed;
        this._complete = [];
        this._nextlap = false;
        this._stop = false;
    }

    isLapEnd() {
        if (this._nextlap) {
            this._nextlap = false;
            return true;
        }
        return this._nextlap;
    }

    update() {
        if (this._endPoint.on(new Flatten.Segment(this._P, this._Q))) {
            this._complete.push(new Flatten.Segment(this._startPoint, this._endPoint));
            this._startPoint = this._endPoint;
            this._hitpointsindex++;
            if (this._hitpointsindex >= this._hitpoints.length) {
                
                this._nextlap = true;
                this._stop = true;
                return;
            }
            this._endPoint = new Flatten.Point(this._hitpoints[this._hitpointsindex].x, this._hitpoints[this._hitpointsindex].y);
            this._P = this._startPoint.clone();
            this._Q = this._startPoint.clone();
            this._v = new Flatten.Vector(this._startPoint, this._endPoint);
            while((this._v.x != 0 && Math.abs(this._v.x) < 1) || (this._v.y != 0 && Math.abs(this._v.y) < 1)){
                this._v.x *= 100000;
                this._v.y *= 100000;
            }
            this._v = this._v.normalize();
        }
        else {
            this._Q = this._Q.translate(this._v.clone().multiply(this._speed));
        }
    }

    draw(ctx) {
        if (this._stop) return;
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.lineWidth = 1;
        if(this._complete.length){
            ctx.moveTo(this._complete[0].ps.x, this._complete[0].ps.y);
        }
        else{
            ctx.moveTo(this._P.x, this._P.y);
        }
        for (let segment of this._complete) {
            // ctx.moveTo(segment.ps.x, segment.pe.y);
            ctx.lineTo(segment.pe.x, segment.pe.y);
            ctx.stroke();
        }
        ctx.moveTo(this._P.x, this._P.y);
        ctx.lineTo(this._Q.x, this._Q.y);
        ctx.stroke();
        ctx.closePath();
        this.update();

    }
}