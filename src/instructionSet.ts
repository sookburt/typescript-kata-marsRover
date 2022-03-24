import { CompassDirection } from "./compassDirection";
import { Plateau } from "./plateau";
import { print } from "./console";

const movements = [ "L", "R", "M"]
export type Moves = typeof movements[number];

export function isInvalidMove(input: string) {
  const result = /[^LRM]/.test(input);
  return result;
}

export interface Instruction {

  startX: number;
  startY: number;
  startDir: CompassDirection;
  instruction: string;
}

export class InstructionSet implements Instruction {

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
      print(`✅ An instruction set ${this.emoji} has been created for the plateau ${this.plateau.emoji} with the following details ${this.getInstructions()}`);
  }

  getInstructions(){
    
      return `x:${this.startX}, y:${this.startY}, direction:${this.startDir}, instruction:${this.instruction}, plateau:${this.plateau.getDimensions()}`;
  }
}

/**
 * Creates an instruction set to pass to a rover to instruct its movements.
 * @param startX 
 * @param startY 
 * @param startDirection 
 * @param instruction 
 * @param plateau 
 * @returns 
 */
 export function createInstructionSet(startX: number, startY: number, startDirection: CompassDirection, instruction: string, plateau: Plateau) {

  if (plateau === undefined) throw new Error("Invalid instruction error - plateau is required - cannot create instruction set.");
  if (startX === undefined) throw new Error("Invalid instruction error - startX is required - cannot create instruction set.");
  if (startY === undefined) throw new Error("Invalid instruction error - startY is required - cannot create instruction set.");
  if (startDirection === undefined) throw new Error("Invalid instruction error - startDirection is required - cannot create instruction set.");
  if (instruction === undefined) throw new Error("Invalid instruction error - instruction is required - cannot create instruction set.");
  if (isInvalidMove(instruction)) throw new Error("Invalid instruction error - invalid characters in instruction - cannot create instruction set.");

  const instructionSet = new InstructionSet(startX, startY, startDirection, instruction, plateau);
  return instructionSet;
}
