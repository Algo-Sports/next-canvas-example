import React, { useRef, useEffect } from 'react'
import {initJson} from '../../src/actions/createDumpBallonData'
import {draw} from '../../src/actions/draw'

const GameCanvas = (props) => {

  const canvasRef = useRef(null)

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