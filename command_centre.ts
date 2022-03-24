import { print, clear, closeInputStream, askQuestion } from './src/console';
import { Plateau } from './src/plateau';
import { Rover } from './src/rover';
import { CompassDirection, isValidDirection } from './src/compassDirection';
import { InstructionSet, Instruction } from './src/instructionSet';

let plateau = undefined;

class InstructionBuilder implements Instruction {
    startX: number;
    startY: number;
    startDir: CompassDirection;
    instruction: string;
}

let instructionBuilder;

export function start() {

    print(' ------------------------------------------------');
    print(`| Welcome to the Space Farce Command Centre 🚀  |`); 
    print(' ------------------------------------------------');
    print('First lets define the size of the plateau...');

    startPlateauCreationProcess();
}

function startPlateauCreationProcess() {

    askQuestion("Give me two comma separated numbers between 1 and 10 (e.g., '5, 5');", handleCreatePlateauInput);
}

function handleCreatePlateauInput(input: string) {

    const dimensions = input.trim().split(",");
    const xDimension: number = parseInt(dimensions[0]);
    const yDimension: number = parseInt(dimensions[1]);

    if (validatePlateauNameInput(input)) {
        plateau = createPlateau(xDimension, yDimension);
        startRoverCreationProcess();
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

function startRoverCreationProcess(){

    askQuestion("Ok, that's the plateau created... now let's create a Rover... Give me a name for the Rover (max 15 characters): ", handleCreateRoverInput);
}

function handleCreateRoverInput(input: string) {

    if (validateRoverNameInput(input)) {
        const rover = createRover(input);
        try {
            plateau.addRover(rover);
        }
        catch (error){
            print(`🧨 Ooops... there was an error... I think we crashed into another rover... 🔥🔥🔥`)
        }

        startInstructionCoordinateProcess();
    }
    else {
        startRoverCreationProcess();
    }
}

function validateRoverNameInput(input: string){

    if (input.length > 15) {
        print(`That name is too long? 😱 Please try again!`);
        return false;
    }
    if (/\W/.test(input)) {
        print("That's not a name... 😱 please try again!");
        return false;
    }
    return true;
}

function startInstructionCoordinateProcess() {

    askQuestion("That's the rover created... now we need an instuction set... First, please define the starting position coordinates - two comma separated numbers and direction to face N, E, S or W (e.g., 0,0,N) ", handleInstructionCoordinates);
}

function handleInstructionCoordinates(input: string) {

    if (validateInstructionCoordinates(input)) {

        const inputs = input.trim().split(",");
        instructionBuilder = new InstructionBuilder();
        instructionBuilder.startX = parseInt(inputs[0].trim());
        instructionBuilder.startY = parseInt(inputs[1].trim());
        instructionBuilder.startDir = inputs[2].trim();

        startInstructionMovementProcess();

    }
    else {
        startInstructionCoordinateProcess();
    }
}

function validateInstructionCoordinates(input: string) {

    const inputs = input.trim().split(",");

    if (inputs.length !== 3) {
        print("There need to be 3 inputs for the instruction coordinates, separated with a comma: start X position (number), start Y position (number) and direction to face N (North), E (East), S (South), W (West) - like: '1,2,N' your input did not contain those. Please start again.");
        return false;
    }
    if (Number.isNaN(parseInt(inputs[0]))) {
        print("The first character needs to be a number in the instruction coordinates, separated with a comma: start X position (number), start Y position (number) and direction to face N (North), E (East), S (South), W (West) - like: '1,2,N'. Please start again.");
        return false;       
    }
    if (Number.isNaN(parseInt(inputs[1]))) {
        print("The second character needs to be a number in the instruction coordinates, separated with a comma: start X position (number), start Y position (number) and direction to face N (North), E (East), S (South), W (West) - like: '1,2,N'. Please start again.");
        return false;       
    }
    if (!isValidDirection(inputs[2])) {
        print(`The third character needs to be a compass direction in the instruction coordinates - either N (North), E (East), S (South), W (West) - like: '1,2,N'.  You typed in ${inputs[2]}. Please start again.`);
        return false;       
    }

    return true;
}

function startInstructionMovementProcess() {

    askQuestion("Ok, now we need the directions and movements: L to turn left, R to turn right and M to move like: 'RMMLMM' ", handleInstructionMovementInput);
}

function handleInstructionMovementInput(input: string) {

    if (validateInstructionMovementInput(input)) {
        
        instructionBuilder.instruction = input;
        
        // TODO: currently only handling one Rover at a time... work out how to fix this
        try {
            plateau.rovers[0].move(createInstructionSet(instructionBuilder.startX, instructionBuilder.startY, instructionBuilder.startDir, instructionBuilder.instruction, plateau));
        }
        catch(error) {
            print(`🧨 Ooops... there was an error... I think we fell off the cliff... 🔥🔥🔥`)
        }

        whatNext();
    }
    else {
        startInstructionMovementProcess();
    }
}

function validateInstructionMovementInput(input: string){

    if (input === undefined) {
        print(`The instructions are required in the form of a combination of L, R or M 😱 Please start again!`);
        return false;
    }
    if (/[^LRM*]/.test(input)) {
        print(`The instructions can only contain a combination of L, R or M? 😱 Please start again!`);
        return false;
    }
    return true;
}

function whatNext() {

    askQuestion("Do you want to finish (F), move the existing Rover again (M) create another Rover (R) or Start (S) again?", handleFinishOrStartAgainInput);
}

function handleFinishOrStartAgainInput(input: string) {

    if (input === "F") {
        finish()
    }
    else if (input === "R") {
        startRoverCreationProcess();
    }
    else if (input === "M") {
        startInstructionCoordinateProcess();
    }
    else {
        start();
    }
}

/**
 * Creates a plateau of the defined dimensions.
 * @param xSize 
 * @param ySize 
 * @returns Plateau 
 */
export function createPlateau(xSize: number, ySize: number) : Plateau {

    const plateau = new Plateau(xSize, ySize);
    return plateau;
}

/**
 * Creates a rover with a name.
 * @param name 
 * @returns Rover
 */
export function createRover(name: string) {

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

    if (plateau === undefined) throw new Error("Invalid instruction error - plateau is required - cannot create instruction set.");
    if (startX === undefined) throw new Error("Invalid instruction error - startX is required - cannot create instruction set.");
    if (startY === undefined) throw new Error("Invalid instruction error - startY is required - cannot create instruction set.");
    if (startDirection === undefined) throw new Error("Invalid instruction error - startDirection is required - cannot create instruction set.");
    if (instruction === undefined) throw new Error("Invalid instruction error - instruction is required - cannot create instruction set.");
    if (/[^LRM*]/.test(instruction)) throw new Error("Invalid instruction error - invalid characters in instruction - cannot create instruction set.");

    const instructionSet = new InstructionSet(startX, startY, startDirection, instruction, plateau);
    return instructionSet;
}

function finish() {

    clear(true);
    print("Bye!!! 👋");
    closeInputStream();
}

start();
