
const faces = [ "L", "R"] as const;
export type TurnFace = typeof faces[number];

const directions = ["N","E", "S", "W"] as const;
export type CompassDirection = typeof directions[number]; 

export function getNextRight(currentDirection: CompassDirection){

  let index = directions.indexOf(currentDirection);
  let next = ++index;
  if (next > directions.length-1) {
      next = 0;
  }

  return directions[next];
}

export function getNextLeft(currentDirection: CompassDirection){

  let index = directions.indexOf(currentDirection);
  let next = --index;
  if (next < 0) {
      next = directions.length-1;
  }

  return directions[next];
}
