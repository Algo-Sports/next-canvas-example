import * as Flatten from 'flatten-js'

export class Laser{
    constructor(p,vector,speed,cwidth,cheight){
        this._startPoint = p.clone();
        this._v = vector;
        this._v = this._v.normalize();
        this._P = this._startPoint.clone();
        this._Q = this._startPoint.clone();
        this._speed = speed;
        this._canvasHeight = cheight;
        this._canvasWidth = cwidth;
        this._hit = [];
        this._nextlap = false;
        this._stop = false;
    }

    isLapEnd(){
        if(this._nextlap){
            this._nextlap = false;
            return true;
        }
        return this._nextlap;
    }

    update(bricks){
        if(this._stop) return;
        if(this._Q.x > this._canvasWidth || this._Q.x < 0 || this._Q.y > this._canvasHeight || this._Q.y < 0){this._nextlap = true; this._stop = true;}
        else{
            this._Q = this._Q.translate(this._v.clone().multiply(this._speed));
        }
    }

    draw(ctx, bricks){
        // debugger;
        this.update(bricks);
        ctx.beginPath();
        ctx.moveTo(this._P.x, this._P.y);
        ctx.lineTo(this._Q.x, this._Q.y);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
        
    }
}