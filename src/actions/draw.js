import {Wave} from './wave.js';
import {Laser} from './laser.js';
import * as Flatten from '@flatten-js/core'
import {Plate} from './plate.js';


class Figure{
    constructor(x,y,color,z_index){
        this._x = x;
        this._y = y;
        this._color = color;
        this._z_index = z_index;
    }
}

class Circle extends Figure{
    constructor(x, y, radius, color, strokecolor="black", strokewidth="0", z_index="1") {
        super(x,y,color,z_index);
        this._radius = radius;
        this._strokecolor = strokecolor;
        this._strokewidth = strokewidth;
        this._PI = Math.PI;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.fillStyle = this._color;
        ctx.strokeStyle = this._strokecolor;
        ctx.lineWidth = this._strokewidth;
        ctx.arc(this._x,this._y,this._radius,0,this._PI*2);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}


class Balloon extends Circle{
    constructor(x,y,radius,hit=false, strokecolor="black", strokewidth=6,z_index="10"){
        let color = "#78E1D6"
        super(x,y,radius,color,strokecolor,strokewidth);
        this.sethit(hit);
        this._auraRadMax = 45;
        this._auraRadMin = 20;
        this._auraSpeed = 0.2;
        this._auraRad =  this._auraRadMax;
        this._auraSlice = 30;
        this._auraAngle = Math.random() * Math.PI*2;
    }

    sethit(hit){
        this._hit = hit;
        if(this._hit){
            this._color = "rgba(135,148,190,0.7)";
        }else{
            this._color = "#78E1D6"
        }
    }

    drawAura(ctx){
        if(this._auraRad < this._auraRadMin){
            this._auraRad = this._auraRadMax;
        }
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255,0,0,0.9)";
        ctx.lineWidth = 10;
        //ctx.arc(this._x,this._y,this._auraRad,0,this._PI*2);
        ctx.arc(this._x,this._y, this._auraRad, this._auraAngle,this._auraAngle+(this._PI*2)/this._auraSlice);
        this._auraAngle = (this._auraAngle + (this._PI*2)/this._auraSlice) % (this._PI*2);
        this._auraRad -= this._auraSpeed;
        ctx.stroke();
        ctx.closePath();
        if(this._auraRad < this._auraRadMin + 8){
            this.draw(ctx);
        }
    }

    draw(ctx){
        super.draw(ctx);
    }
}


export class GunGame{
    
    constructor(canvas, json){
        // debugger;
        this.json = json;
        this._canvas = canvas;
        this._ctx = canvas.getContext('2d');
        this._me = json.me;
        this._winner = json.winner;
        this._lapCount = 0;
        this._lap = json.lap;
        this._ballrad = json.gameinfo.info.ball.radius;
        this._gunpointrad = 10;
        this._gunpoint = new Circle(json.gameinfo.info.laser.x,json.gameinfo.info.laser.y,this._gunpointrad,"red","black","2");
        this._wave = new Wave(json.gameinfo.info.canvas.width,json.gameinfo.info.canvas.height, json.gameinfo.info.wave.startpoint,json.gameinfo.info.wave.speed, json.gameinfo.info.wave.pinspeed ,json.gameinfo.info.wave.nums,json.gameinfo.info.wave.color, json.lap);
        // this._laser = new Laser(new Flatten.Point(json.gameinfo.info.laser.x, json.gameinfo.info.laser.y), new Flatten.Vector(json.gameinfo.info.laser.vector.x,json.gameinfo.info.laser.vector.y), 8);
        this._plateinfo = json.gameinfo.info.plate;
        
        this.onClick = this.onClick.bind(this);
        this.animate = this.animate.bind(this);
        this._canvas.onclick = this.onClick;
        
        this.onClick();
    }

    animate(){
        requestAnimationFrame(this.animate.bind(this));
        this.draw();
        this.checkLapEnd();
    }
    
    draw(){
        let _canvas = this._canvas;
        let _ctx = this._ctx;
        let width = _canvas.width;
        let height = _canvas.height;

        _ctx.fillStyle = "#272E48";
        _ctx.fillRect(0, 0, width, height);

        this._wave.draw(_ctx);
        this._gunpoint.draw(_ctx);



        for (let ba of this.balloonAlive) {
            ba.draw(_ctx);
        }
        for(let i = 0;i<this.balloonAlive.length;i++){
            this.balloonAlive[i].drawAura(_ctx);
        }
        for(let i = 0;i<this.balloonHit.length;i++){
            this.balloonHit[i].draw(_ctx);
        }
        for(let i = 0;i<this._bricks.length;i++){
            this._bricks[i].draw(_ctx);
        }
        for(let p of this._bricks){
            p.draw(_ctx);
        }
        
        this._laser.draw(_ctx);
        for(let i of this._json[this._me].userresult[this._lapCount-1].hit_point){
            _ctx.beginPath()
            _ctx.fillStyle = "green"
            _ctx.arc(i.x,i.y,2,0,Math.PI*2);
            _ctx.fill();
        }

    }

    set json(json){
        this._json = json;
    }

    nextLap(){
        let myresult = this._json[this._me];
        let now = this._lapCount-1;
        this.balloonHit = [];
        this.balloonAlive = [];
        for(let i = 0;i<myresult.userresult[now].hit_ball.length;i++){
            this.balloonHit[i] = new Balloon(this._json.gameinfo.ball[myresult.userresult[now].hit_ball[i]][0], this._json.gameinfo.ball[myresult.userresult[now].hit_ball[i]][1], this._ballrad,true);
        }
        for(let i = 0;i<this._json.gameinfo.ball.length;i++){
            if(myresult.userresult[now].hit_ball.indexOf(i) >= 0){
                continue;
            }
            this.balloonAlive.push(new Balloon(this._json.gameinfo.ball[i][0], this._json.gameinfo.ball[i][1], this._ballrad,false));
        }
        
        this._bricks = []

        for(let i = 0;i<myresult.useroutput[now].plate.length;i++){
            this._bricks[i] = new Plate(myresult.useroutput[now].plate[i].x,myresult.useroutput[now].plate[i].y,myresult.useroutput[now].plate[i].angle,this._plateinfo);
        }

        this._laser = new Laser(new Flatten.Point(this._json.gameinfo.info.laser.x, this._json.gameinfo.info.laser.y), myresult.userresult[now].hit_point, 8);
        
    }
    
    checkLapEnd(){
        if(this._laser.isLapEnd()){
            if(this._lapCount < this._lap){
                this._lapCount += 1;
            }
            this._wave.setLap(this._lapCount);
            this.nextLap();
        }
    }
    onClick(){
        if(this._lapCount < this._lap){
            this._lapCount += 1;
        }
        console.log(this._lapCount);
        this._wave.setLap(this._lapCount);
        this.nextLap();
    }
}
