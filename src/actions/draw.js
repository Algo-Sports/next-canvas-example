
class Circle {
    constructor(x, y, radius, color="#00FFF0", strokecolor="black", strokewidth=6) {
        this._x = x;
        this._y = y;
        this._radius = radius;
        this._hit = false;
        this._color = color;
        this._strokecolor = strokecolor;
        this._strokewidth = strokewidth;
    }
}


export function initialize(canvas, ctx, json){
    var _canvas = canvas;
    var _ctx = ctx;
    var _json = json;
    animate();
}

export function drawCircle(ctx, x, y, radius, hit){
    ctx.beginPath();
    ctx.arc(x,y,radius,0,Math.PI*2);
    if(!hit)
        ctx.fillStyle = "#00FFF0";
    else
        ctx.fillStyle = "#FF0000";
    if(hit == 2)
        ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.closePath();
}

export function drawRect(ctx, x, y, angle){
    var radian = angle * Math.PI / 180;
    ctx.save();
    ctx.beginPath();
    ctx.rotate()
    ctx.closePath();
    ctx.restore();
}

export function draw(){
    let width = _canvas.width;
    let height = _canvas.height;

    _ctx.fillStyle = "#F0F0F0";
    _ctx.fillRect(0, 0, width, height);
    // ctx.drawImage(gunimg, width-100,height/2-50,100,100);
    drawCircle(_ctx, width - 100, height / 2, 10, 2)
    for (var i = 0; i < _json.ballooninfo.hitnum; i++) {
      drawCircle(_ctx, _json.ballooninfo.hit[i].x, _json.ballooninfo.hit[i].y, 20, true);
    }
    for (var i = 0; i < _json.ballooninfo.num - _json.ballooninfo.hitnum; i++) {
      drawCircle(_ctx, _json.ballooninfo.alive[i].x, _json.ballooninfo.alive[i].y, 20, false);
    }
    _ctx.beginPath();
    _ctx.moveTo(width - 100, height / 2);
    _ctx.lineTo(0, height / 2);
    _ctx.lineWidth = 1;
    _ctx.strokeStyle = "red"
    _ctx.stroke();
    _ctx.closePath();
}

export function animate(){
    requestAnimationFrame(animate);
    draw();
    console.log("draw");
}
