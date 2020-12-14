import React, { useRef, useEffect } from 'react'
import { initJson } from '../../src/actions/createDumpBallonData'
import { GunGame } from '../../src/actions/draw'

const GameCanvas = (props) => {

  const canvasRef = useRef(null)

  const setCanvasSize = (canvas, width, height) => {
    canvas.width = width;
    canvas.height = height;
  }

  useEffect(() => {

    const canvas = canvasRef.current
    setCanvasSize(canvas, props.canvaswidth, props.canvasheight)

    // const json = initJson(canvas.width, canvas.height);
    const game = new GunGame(canvas, {
      "me": "user1",
      "winner": "user1",
      "lap": 5,
      "gameinfo": {
        "info": {
          "canvas": {
            "width": 1000,
            "height": 800
          },
          "ball": {
            "color": "#78E1D6",
            "radius": 20,
            "strokecolor": "black",
            "strokesize": 6,
            "num": 10
          },
          "laser": {
            "x": 900,
            "y": 400,
            "vector": {
              "x": -1,
              "y": 0
            },
            "color": "red"
          },
          "plate": {
            "color": "yellow",
            "width": 100,
            "height": 20
          },
          "wave": {
            "color": "rgba(31, 38, 59, 0.7)",
            "speed": 0.1,
            "nums": 15,
            "startpoint": 200,
            "pinspeed": 0.6
          },
          "maxlap": 10
        },
        "ball": [
          [
            185,
            273
          ],
          [
            781,
            230
          ],
          [
            967,
            422
          ],
          [
            452,
            785
          ],
          [
            542,
            120
          ],
          [
            179,
            196
          ],
          [
            168,
            513
          ],
          [
            554,
            303
          ],
          [
            282,
            287
          ],
          [
            690,
            25
          ]
        ]
      },
      "user1": {
        "useroutput": [
          {
            "plate": [
              {
                "x": 300,
                "y": 400,
                "angle": 80
              }
            ]
          },
          {
            "plate": [
              {
                "x": 300,
                "y": 400,
                "angle": 80
              },
              {
                "x": 890,
                "y": 180,
                "angle": 100
              }
            ]
          }, {
            "plate": [
              {
                "x": 300,
                "y": 400,
                "angle": 80
              },
              {
                "x": 890,
                "y": 180,
                "angle": 100
              }, {
                "x": 650,
                "y": 10,
                "angle": -0.5
              }
            ]

          }, {
            "plate": [
              {
                "x": 300,
                "y": 400,
                "angle": 80
              },
              {
                "x": 890,
                "y": 180,
                "angle": 100
              }, {
                "x": 650,
                "y": 10,
                "angle": -0.5
              }, {
                "x" : 10,
                "y" : 240,
                "angle" : 106
              }
            ]

          }, {
            "plate": [
              {
                "x": 300,
                "y": 400,
                "angle": 80
              },
              {
                "x": 890,
                "y": 180,
                "angle": 100
              }, {
                "x": 650,
                "y": 10,
                "angle": -0.5
              }, {
                "x" : 10,
                "y" : 240,
                "angle" : 106
              }, {
                "x" : 800,
                "y" : 400,
                "angle" : 90
              }
            ]

          }
        ],
        "userresult": [
          { "hit_point": [{ "x": 310.15426611885744, "y": 400 }, { "x": 1000, "y": 148.91668663174326 }], "hit_ball": [1, 7] },
          { "hit_point": [{ "x": 310.15426611885744, "y": 400 }, { "x": 877.4623684397731, "y": 193.51673709714407 }, { "x": 646.8381017771412, "y": 0 }], "hit_ball": [1, 7, 9] },
          { "hit_point": [{ "x": 310.15426611885744, "y": 400 }, { "x": 877.4623684397731, "y": 193.51673709714407 }, { "x": 670.460829158267, "y": 19.821821832903872 }, { "x": 289.3642281106095, "y": 351.104042950473 }, { "x": 0, "y": 240.0275227530264 }], "hit_ball": [1, 7, 9, 4] }
        ,{"hit_point":[{"x":310.15426611885744,"y":400},{"x":877.4623684397731,"y":193.51673709714407},{"x":670.460829158267,"y":19.821821832903872},{"x":289.3642281106095,"y":351.104042950473},{"x":18.372786886532847,"y":247.08017486213666},{"x":1000,"y":437.88917600513184}],"hit_ball":[1,7,9,4,0,2,8]}
          ,{"hit_point":[{"x":810,"y":400},{"x":1000,"y":400}],"hit_ball":[]}
      ]
      },
      "user2": {
        "useroutput": [],
        "userresult": []
      }
    });
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