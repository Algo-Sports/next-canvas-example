import { Point } from './point.js';
class WavePoint {
    constructor(index, x, height, totalPoints, totalLaps) {
        this._point = new Point(x, 0);
        this._canvasHeight = height;
        this._totalPoints = totalPoints;
        this._totalLaps = totalLaps;
        this._cur = ((Math.PI) / totalPoints) * index;
        this._STARTPOINT = 200; // 기본 시작 y
        this._nextPinPoint = this._STARTPOINT; 
        this._pinPoint = 0;
        this._pinSpeed = 0.6;
        this._speed = 0.1;
        this._max = Math.random() * 20 + 10; // random 할까?
        this._edgeFlag = false;
    }

    set nextPinPoint(nextPinPoint) {
        this._nextPinPoint = this._STARTPOINT + ((this._canvasHeight - this._STARTPOINT)/(this._totalLaps-1)) * nextPinPoint;
    }

    updateP() {
        if (this._pinPoint < this._nextPinPoint) {
            this._pinPoint += this._pinSpeed;
        }
        this._cur = (this._cur + this._speed) % (Math.PI * 2);
        if (!this._edgeFlag) {
            this._point.y = this._canvasHeight - this._pinPoint + (Math.sin(this._cur) * this._max);
        } else {
            this._point.y = this._canvasHeight - this._pinPoint;
        }
    }
}

export class Wave {
    constructor(width, height, totalPoints, color, totalLaps) {
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.points = [];
        this.totalPoints = totalPoints;
        this.totalLaps = totalLaps;
        this.pointGap = width / (totalPoints - 1);
        this.color = color;
        for (let i = 0; i < totalPoints; i++) {
            this.points.push(new WavePoint(i + 1, this.pointGap * i, height, totalPoints, totalLaps));
        }
        this.points[0]._edgeFlag = true;
        this.points[this.totalPoints - 1]._edgeFlag = true;
        console.log(this.points[0]);
    }

    setLap(lapCount){
        for(let i = 0;i<this.totalPoints;i++){
            this.points[i].nextPinPoint = lapCount;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.canvasWidth, this.canvasHeight);
        ctx.lineTo(0, this.canvasHeight);
        ctx.fillStyle = this.color;

        let prevX = 0;
        let prevY = 0;
        let tmpX = 0;
        let tmpY = 0;

        for (let i = 0; i < this.totalPoints; i++) {
            this.points[i].updateP();
            
            if (i == 0) {
                ctx.lineTo(this.points[i]._point.x, this.points[i]._point.y);
            }
            else {
                tmpX = (prevX + this.points[i]._point.x) / 2;
                tmpY = (prevY + this.points[i]._point.y) / 2;
                ctx.quadraticCurveTo(prevX,prevY,tmpX, tmpY);
            }
            prevX = this.points[i]._point.x;
            prevY = this.points[i]._point.y;
        }
        ctx.quadraticCurveTo(tmpX,tmpY,prevX,prevY);
        ctx.fill();
    }
}