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

export function draw(canvas,gunimg,json){

    var width = canvas.width;
    var height = canvas.height;
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#F0F0F0";
    ctx.fillRect(0,0,width,height);
    gunimg.onload = function(){
        ctx.drawImage(gunimg, width-100,height/2-50,100,100);
        drawCircle(ctx,width-100,height/2,10,2)
        for(var i = 0;i<json.ballooninfo.hitnum;i++){
            drawCircle(ctx,json.ballooninfo.hit[i].x,json.ballooninfo.hit[i].y,20,true);
        }
        for(var i = 0;i<json.ballooninfo.num - json.ballooninfo.hitnum ;i++){
            drawCircle(ctx,json.ballooninfo.alive[i].x,json.ballooninfo.alive[i].y,20,false);
        }
        ctx.beginPath();
        ctx.moveTo(width-100,height/2);
        ctx.lineTo(0,height/2);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "red"
        ctx.stroke();
        ctx.closePath();
    }
}