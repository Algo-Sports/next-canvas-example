export const randomInt = (limit) => {
  return Math.floor(Math.random() * limit);
}

export const initJson = (width, height) => {
  const lap = 10;
  let ret = [];
  let balloons = [];
  for(let i = 0;i<10;i++){
    balloons.push([randomInt(width),randomInt(height)]);
  }
  for(let i = 0;i<lap;i++){
    let json = {}
    json.ballooninfo = {}
    json.ballooninfo.num = lap;
    json.ballooninfo.hitnum = i;
    json.ballooninfo.hit = []
    json.ballooninfo.alive = []
    json.plateinfo = {}
    json.plateinfo.num = 0;
    json.plateinfo.plate = []

    for (let j = 0; j < json.ballooninfo.num - i; j++) {
      json.ballooninfo.alive.push({ x: balloons[j][0], y: balloons[j][1] })
    }
    for( let j = json.ballooninfo.num - i; j < json.ballooninfo.num;j++){
      json.ballooninfo.hit.push({x : balloons[j][0], y : balloons[j][1]})
    }
    ret.push(json);
  }
  return ret;
}