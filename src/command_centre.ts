import { print } from './print';

export function start() {

    const plateau = createPlateau(5, 5);
    const rover = createRover();
    plateau.addRover(rover);
    const instruction = new InstructionSet(1, 2, directions[0], 'LMLMLMLMM', plateau);
    rover.move(instruction);
}
const directions = ["N","E", "S", "W"] as const;
type CompassDirection = typeof directions[number]; 

const faces = [ "L", "R", null ] as const;
type TurnDirection = typeof faces[number];

class InstructionSet {
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

class Plateau {
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
        this.rovers.push(newRover);
    }

    getDimensions(){
        return `x:${this.x}, y:${this.y}`;
    }
}

class Rover {

    x: number;
    y: number;
    direction: CompassDirection;

    constructor(){
        this.x = 0;
        this.y = 0;
        this.direction = directions[0];
        print(`Rover created with coordinates: x: ${this.x}, y: ${this.y}, facing: ${this.direction}`);
    }

    move(instructions: InstructionSet){

        const instructionSteps = instructions.instruction.split("");
        const platform = instructions.plateau;
        let stepX = instructions.startX;
        let stepY = instructions.startY;
        let stepDir = instructions.startDir;

        instructionSteps.forEach(step => {

            let stepDirection = this.direction;
            if(step === "M") {

                switch (stepDirection) {
                    case "N" : stepY++;
                    break;
                    case "S" : stepY--;
                    break;
                    case "E" : stepX++;
                    break;
                    case "W" : stepX--;
                }                
            }
            // if(step === "L") {
            //     stepDir 
            // }
        });

    }

    currentCoordinates(){
        return `x: ${this.x}, y: ${this.y}, facing: ${this.direction}`;
    }
}
  
export function createPlateau( xSize: number, ySize: number) : Plateau {

    const plateau = new Plateau(xSize, ySize);
    return plateau;
}

export function createRover() {

    const rover = new Rover();
    return rover;
}

export function createInstructionSet(startX: number, startY: number, startDirection: CompassDirection, instruction: string, plateau: Plateau) {

    const instructionSet = new InstructionSet(startX, startY, startDirection, instruction, plateau);
    return instructionSet;
}

export function addRoverToPlateau( plateau: Plateau, rover: Rover) {
    plateau.addRover(rover);
}


