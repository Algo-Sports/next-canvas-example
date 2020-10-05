import React, { useRef, useEffect } from 'react'
import {initJson} from '../../src/actions/createDumpBallonData'

const GameCanvas = (props) => {

  const canvasRef = useRef(null)


  const drawCircle = (ctx, x, y, radius, hit) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    if (!hit)
      ctx.fillStyle = "#00FFF0";
    else
      ctx.fillStyle = "#FF0000";
    if (hit == 2)
      ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.closePath();
  }


  const draw = (canvas, ctx, json) => {
    let width = canvas.width;
    let height = canvas.height;
    ctx.fillStyle = "#F0F0F0";
    ctx.fillRect(0, 0, width, height);
    // ctx.drawImage(gunimg, width-100,height/2-50,100,100);
    drawCircle(ctx, width - 100, height / 2, 10, 2)
    for (var i = 0; i < json.ballooninfo.hitnum; i++) {
      drawCircle(ctx, json.ballooninfo.hit[i].x, json.ballooninfo.hit[i].y, 20, true);
    }
    for (var i = 0; i < json.ballooninfo.num - json.ballooninfo.hitnum; i++) {
      drawCircle(ctx, json.ballooninfo.alive[i].x, json.ballooninfo.alive[i].y, 20, false);
    }
    ctx.beginPath();
    ctx.moveTo(width - 100, height / 2);
    ctx.lineTo(0, height / 2);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "red"
    ctx.stroke();
    ctx.closePath();
  }

  const setCanvasSize = (canvas, width, height) => {
    canvas.width = width;
    canvas.height = height;
  }


  useEffect(() => {

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    
    setCanvasSize(canvas, props.canvasWidth, props.canvasHeight)
    
    //Our draw came here
    const render = () => {
      const json = initJson(canvas.width, canvas.height);
      draw(canvas, context, json);
    }
    render()

  }, [draw])

  return <canvas ref={canvasRef} {...props} />
}

export default GameCanvas