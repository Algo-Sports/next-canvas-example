import React, { useRef, useEffect } from 'react'
import {initJson} from '../../src/actions/createDumpBallonData'
import {GunGame} from '../../src/actions/draw'

const GameCanvas = (props) => {

  const canvasRef = useRef(null)

  const setCanvasSize = (canvas, width, height) => {
    canvas.width = width;
    canvas.height = height;
  }

  useEffect(() => {

    const canvas = canvasRef.current
    setCanvasSize(canvas, props.canvaswidth, props.canvasheight)
    
    const json = initJson(canvas.width, canvas.height);
    const game = new GunGame(canvas, json);
    // const context = canvas.getContext('2d')
    
    
    //Our draw came here
    const render = () => {
      //draw(canvas, context, json);
      game.animate();
    }
    render()

  }, [])

  return <canvas ref={canvasRef} {...props} />
}

export default GameCanvas