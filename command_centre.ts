import { print, clear, closeInputStream, askQuestion } from './src/console';
import { Plateau } from './src/plateau';
import { Rover } from './src/rover';
import { CompassDirection } from './src/compassDirection';
import { InstructionSet } from './src/instructionSet';

let plateau = undefined;

export function start() {

    print(' ------------------------------------------------');
    print(`| Welcome to the Space Farce Command Centre 🚀  |`); 
    print(' ------------------------------------------------');
    print('');
    print('First lets define the size of the plateau');

    askQuestion("Give me two comma separated numbers between 1 and 10 (e.g., '5, 5');", handleCreatePlateauInput);  

    //closeInputStream();
}

function handleCreatePlateauInput(input: string) {

    const dimensions = input.trim().split(",");
    const xDimension: number = parseInt(dimensions[0]);
    const yDimension: number = parseInt(dimensions[1]);

    if (validatePlateauNameInput(input)) {
        plateau = createPlateau(xDimension, yDimension);
        askQuestion("Ok, that's the plateau created... now let's create a Rover... Give me a name for the Rover (max 15 characters): ", handleCreateRoverInput);
    }
    else {
        start();
    }
    return plateau;
}

function validatePlateauNameInput(input: string) {

    const dimensions = input.trim().split(",");
    const xDimension: number = parseInt(dimensions[0]);
    if (Number.isNaN(xDimension)) {
        print(`Did you really expect me to fall for that? 😱 You'll never become an astronaut if you don't know your numbers - start again!`);
        return false;
    }
    if (xDimension < 1 || xDimension > 10) {
        print(`That first number is not between 1 and 10? 😱 You'll never become an astronaut if you don't know your numbers - start again!`);
        return false;
    }

    const yDimension: number = parseInt(dimensions[1]);
    if (Number.isNaN(yDimension)) {
        print(`That second number is not a number? 😱 You'll never become an astronaut if you don't know your numbers - start again!`);
        return false;
    }
    if (yDimension < 1 || yDimension > 10) {
        print(`That second number not between 1 and 10? 😱 You'll never become an astronaut if you don't know your numbers - start again!`);
        return false;
    }
    return true;
}

function handleCreateRoverInput(input: string) {

    if (validateRoverNameInput(input)) {
        const rover = createRover(input);
        plateau.add(rover);

        askQuestion("That's the rover created... now we need an instuction set... Firstly, please define the starting position coordinates - two comma separated numbers and direction to face N, E, S or W (e.g., 0,0,N)", handleInstructionStartCoordinates);
    }
    else {
        start();
    }
}

function validateRoverNameInput(input: string){

    if (input.length > 15) {
        print(`That name is too long? 😱 Please start again!`);
        return false;
    }
    if (/\W/.test(input)) {
        print("That's not a name - please start again!");
        return false;
    }
    return true;
}

function handleInstructionStartCoordinates(input: string) {

    // how to handle getting the rest????!!!
    print("in handleInstructionStartCoordinates ");


    
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

start();
