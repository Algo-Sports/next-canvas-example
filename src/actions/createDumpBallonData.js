export const randomInt = (limit) => {
  return Math.floor(Math.random() * limit);
}

export const initJson = (width, height) => {
  var json = {}
  json.ballooninfo = {}
  json.ballooninfo.num = 10;
  json.ballooninfo.hitnum = 0;
  json.ballooninfo.hit = []
  json.ballooninfo.alive = []
  json.plateinfo = {}
  json.plateinfo.num = 0;
  json.plateinfo.plate = []

  for (var i = 0; i < json.ballooninfo.num; i++) {
    json.ballooninfo.alive.push({ x: randomInt(width), y: randomInt(height) })
  }
  return json;
}