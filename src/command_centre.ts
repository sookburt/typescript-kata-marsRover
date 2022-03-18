import { print } from './console';
import { Plateau } from './plateau';
import { Rover } from './rover';
import { CompassDirection } from './compassDirection';
import { InstructionSet } from './instructionSet';

export function start() {

    // TODO: consider how I might put an interface on this to send details in.
    // TODO: how might we see what is happening with the plateaux and rovers - print statements with emojis?

    const plateau = createPlateau(5, 5);
    const rover = createRover("Wanderer");
    plateau.addRover(rover);
    const instruction = new InstructionSet(1, 2, 'N', 'LMLMLMLMM', plateau);
    rover.move(instruction);
}

/**
 * Creates a plateau of the defined dimensions.
 * @param xSize 
 * @param ySize 
 * @returns Plateau 
 */
export function createPlateau( xSize: number, ySize: number) : Plateau {

    // TODO: consider giving the plateaux a name to allow us to create > 1 plateau and maintain the list.

    const plateau = new Plateau(xSize, ySize);
    return plateau;
}

/**
 * Creates a rover with a name.
 * @param name 
 * @returns Rover
 */
export function createRover(name: string) {

    // TODO: consider initializing name of rovers from within class to set of 3 names?

    const rover = new Rover(name);
    return rover;
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
    if(plateau === undefined) throw new Error("Invalid instruction error - plateau is required - cannot create instruction set.");
    if(startX === undefined) throw new Error("Invalid instruction error - startX is required - cannot create instruction set.");
    if(startY === undefined) throw new Error("Invalid instruction error - startY is required - cannot create instruction set.");
    if(startDirection === undefined) throw new Error("Invalid instruction error - startDirection is required - cannot create instruction set.");
    if(instruction === undefined) throw new Error("Invalid instruction error - instruction is required - cannot create instruction set.");
    if (/[^LRM*]/.test(instruction)) throw new Error("Invalid instruction error - invalid characters in instruction - cannot create instruction set.");

    const instructionSet = new InstructionSet(startX, startY, startDirection, instruction, plateau);
    return instructionSet;
}
