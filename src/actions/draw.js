import {Wave} from './wave.js';
import {Laser} from './laser.js';
import * as Flatten from 'flatten-js'
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
        if(hit){
            color = "rgba(135,148,190,0.7)";
        }
        super(x,y,radius,color,strokecolor,strokewidth);
        this._hit = hit;
        this._auraRadMax = 45;
        this._auraRadMin = 20;
        this._auraSpeed = 0.2;
        this._auraRad =  this._auraRadMax;
        this._auraSlice = 30;
        this._auraAngle = Math.random() * Math.PI*2;
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
        this._lapCount = 0;
        this._ballrad = 20;
        this._gunpointrad = 10;
        this._gunimg = new Image();
        this._gunimg.src = "/favicon.ico";
        this._gunpoint = new Circle(this._canvas.width-100,this._canvas.height/2,10,"red","black","2");
        this._wave = new Wave(this._canvas.width,this._canvas.height,15,'rgba(31, 38, 59, 0.7)', this._json.length);
        this._laser = new Laser(new Flatten.Point(this._canvas.width - 100, this._canvas.height/2), new Flatten.Vector(-1,0), 8);
        this._bricks = []
        this._bricks.push(new Plate(60,400,50,"yellow"));

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

        _ctx.drawImage(this._gunimg, width-100,height/2-50,100,100);
        this._gunpoint.draw(_ctx);


        for (let i = 0; i < this.balloonAlive.length; i++) {
            this.balloonAlive[i].draw(_ctx);
        }
        for(let i = 0;i<this.balloonAlive.length;i++){
            this.balloonAlive[i].drawAura(_ctx);
        }
        for(let i = 0;i<this.balloonHit.length;i++){
            this.balloonHit[i].draw(_ctx);
        }
        this._laser.draw(_ctx, this._bricks);
        
        for(let i = 0;i<this._bricks.length;i++){
            this._bricks[i].draw(_ctx);
        }

    }

    set json(json){
        this._json = json;
    }

    nextLap(json){
        this.balloonHit = [];
        this.balloonAlive = [];
        for(let i = 0;i<json.ballooninfo.hitnum;i++){
            this.balloonHit[i] = new Balloon(json.ballooninfo.hit[i].x, json.ballooninfo.hit[i].y, this._ballrad,true);
        }
        for(let i = 0;i<json.ballooninfo.num - json.ballooninfo.hitnum;i++){
            this.balloonAlive[i] = new Balloon(json.ballooninfo.alive[i].x, json.ballooninfo.alive[i].y, this._ballrad,false);
        }
    }
    
    checkLapEnd(){
        if(this._laser.isLapEnd()){
            if(this._lapCount < this._json.length){
                this._lapCount += 1;
            }
            this._wave.setLap(this._lapCount);
            this.nextLap(this._json[this._lapCount-1]);
            this._laser = new Laser(new Flatten.Point(this._canvas.width - 100, this._canvas.height/2), new Flatten.Vector(-1,0), 8);
        }
    }
    onClick(){
        if(this._lapCount < this._json.length){
            this._lapCount += 1;
        }
        this._wave.setLap(this._lapCount);
        this.nextLap(this._json[this._lapCount-1]);
    }
}
