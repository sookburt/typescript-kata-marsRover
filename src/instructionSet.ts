import { CompassDirection } from "./compassDirection";
import { Plateau } from "./plateau";

export class InstructionSet {
  startX: number;
  startY: number;
  startDir: CompassDirection;
  instruction: string;
  plateau: Plateau;

  constructor(startX, startY, startDirection, instruction, plateau) {
      this.startX = startX;
      this.startY = startY;
      this.startDir = startDirection;
      this.instruction = instruction;
      this.plateau = plateau;
  }

  getInstructions(){
      return `x:${this.startX}, y:${this.startY}, direction:${this.startDir}, instruction:${this.instruction}, plateau:${this.plateau.getDimensions()}`
  }
}