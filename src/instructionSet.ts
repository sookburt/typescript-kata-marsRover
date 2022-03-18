import { CompassDirection } from "./compassDirection";
import { Plateau } from "./plateau";
import { print } from "./console";

export class InstructionSet {
  startX: number;
  startY: number;
  startDir: CompassDirection;
  instruction: string;
  plateau: Plateau;
  emoji: string;

  constructor(startX, startY, startDirection, instruction, plateau) {
      this.startX = startX;
      this.startY = startY;
      this.startDir = startDirection;
      this.instruction = instruction;
      this.plateau = plateau;
      this.emoji = '📃';
      print(`An instruction set ${this.emoji} has been created for the plateau ${this.plateau.emoji} with the following details ${this.getInstructions()}`);
  }

  getInstructions(){
      return `x:${this.startX}, y:${this.startY}, direction:${this.startDir}, instruction:${this.instruction}, plateau:${this.plateau.getDimensions()}`;
  }
}