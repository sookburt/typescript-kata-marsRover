import {print} from './console';
import { CompassDirection } from './compassDirection'
import { Rover } from './rover';

export class Plateau {
  x: number;
  y: number;
  rovers: Rover[]
  
  constructor(xSize: number, ySize: number){
      this.x = xSize;
      this.y = ySize;
      this.rovers = [];
      print(`Plateau created with dimensions: x: ${this.x}, y: ${this.y}, containing ${this.rovers.length} rovers`);
  }

  addRover(newRover: Rover){ 
      if (this.rovers.length === 3) throw new Error("Potential gridlock error (max 3) - cannot add new rover!");
      const isValid = this.collisionCheck(newRover.x, newRover.y, newRover.name);
      if (isValid) {
          this.rovers.push(newRover);
          print(`Added a new rover called ${newRover.name} to my plateau; now have ${this.rovers.length} rovers`);
      }
  }

  checkEdge(checkX: number, checkY: number, checkDirection: CompassDirection) {
      const overX = checkX < 0 || checkX > this.x; 
      const overY = checkY < 0 || checkY > this.y; 
      if (overX || overY) { 
          throw new Error("Edge proximity error - cannot complete move!");
      }
      else {
          return true;
      }
  }

  collisionCheck(checkX: number, checkY: number, name: string) {
      this.rovers.forEach(rover => {
          console.log(`cycling through the rovers: ${rover.currentCoordinates()}.`);
          if (rover.name !== name && rover.x === checkX && rover.y === checkY) {
              throw new Error("Rover collision error - cannot complete move!");
          }
      });
      return true;
  }

  getDimensions(){
      return `x:${this.x}, y:${this.y}`;
  }
}