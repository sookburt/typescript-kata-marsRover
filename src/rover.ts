import {print} from './console';
import { InstructionSet } from './instructionSet';
import { CompassDirection, getNextRight, getNextLeft, getInitialDirection } from './compassDirection';

export class Rover {

  name: string;
  x: number;
  y: number;
  direction: CompassDirection;
  emoji: string;

  constructor(name: string ){

      this.name = name;
      this.x = 0;
      this.y = 0;
      this.direction = getInitialDirection(); 
      this.emoji = '🚘';
      print(`✅ Rover called ${this.name} created with coordinates: x: ${this.x}, y: ${this.y}, facing: ${this.direction}`);
  }

  move(instructions: InstructionSet){

      const instructionSteps = instructions.instruction.split("");
      const callingPlateau = instructions.plateau;
      let stepX = instructions.startX;
      let stepY = instructions.startY;
      let stepDir = instructions.startDir;
      print(`✅ Rover ${this.emoji}  ${ this.name } has been given an instruction starting at coordinates ${stepX}, ${stepY}, facing ${stepDir} and moving ${instructions.instruction}`);

      instructionSteps.forEach(step => {

          if (step === "M") {

              switch (stepDir) {
                  case "N" : stepY++;
                  break;
                  case "S" : stepY--;
                  break;
                  case "E" : stepX++;
                  break;
                  case "W" : stepX--;
              }                
          }
          if (step === 'R') {
              stepDir = getNextRight(stepDir);
          }

          if (step === 'L') {
              stepDir = getNextLeft(stepDir);
          }
      });

      const noEdgeIssue = callingPlateau.checkEdge(stepX, stepY, stepDir);
      const noCollisionIssue = callingPlateau.collisionCheck(stepX, stepY, this.name);

      if (noEdgeIssue && noCollisionIssue) {

          this.x = stepX;
          this.y = stepY;
          this.direction = stepDir;
          print(`✅ Rover ${this.emoji}  ${this.name} has moved to ${this.currentCoordinates()}`)
      }
  }

  currentCoordinates(){
      
      return `x: ${this.x}, y: ${this.y}, facing: ${this.direction}`;
  }
}