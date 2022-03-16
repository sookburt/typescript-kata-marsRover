import { print } from './print';

export function start() {

    const plateau = createPlateau(5, 5);
    const rover = createRover("Wanderer");
    plateau.addRover(rover);
    const instruction = new InstructionSet(1, 2, directions[0], 'LMLMLMLMM', plateau);
    rover.move(instruction);
}
const directions = ["N","E", "S", "W"] as const;
type CompassDirection = typeof directions[number]; 

const faces = [ "L", "R"] as const;

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

class Rover {

    name: string;
    x: number;
    y: number;
    direction: CompassDirection;

    constructor(name: string ){
        this.name = name;
        this.x = 0;
        this.y = 0;
        this.direction = directions[0];
        print(`Rover called ${this.name} created with coordinates: x: ${this.x}, y: ${this.y}, facing: ${this.direction}`);
    }

    move(instructions: InstructionSet){

        const instructionSteps = instructions.instruction.split("");
        const callingPlateau = instructions.plateau;
        let stepX = instructions.startX;
        let stepY = instructions.startY;
        let stepDir = instructions.startDir;

        instructionSteps.forEach(step => {

            //let stepDirection = this.direction;
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
            if (step === faces[1]) {
                let index = directions.indexOf(stepDir);
                let next = ++index;
                if (next > directions.length-1) {
                    next = 0;
                }

                stepDir = directions[next];
            }

            if (step === faces[0]) {
                let index = directions.indexOf(stepDir);
                let next = --index;
                if (next < 0) {
                    next = directions.length-1;
                }
                stepDir = directions[next];
            }
        });

        const noEdgeIssue = callingPlateau.checkEdge(stepX, stepY, stepDir);
        const noCollisionIssue = callingPlateau.collisionCheck(stepX, stepY, this.name);

        if (noEdgeIssue && noCollisionIssue) {
            this.x = stepX;
            this.y = stepY;
            this.direction = stepDir;
        }

    }

    currentCoordinates(){
        return `x: ${this.x}, y: ${this.y}, facing: ${this.direction}`;
    }
}
  
export function createPlateau( xSize: number, ySize: number) : Plateau {

    const plateau = new Plateau(xSize, ySize);
    return plateau;
}

export function createRover(name: string) {

    const rover = new Rover(name);
    return rover;
}

export function createInstructionSet(startX: number, startY: number, startDirection: CompassDirection, instruction: string, plateau: Plateau) {
    //const regex: RegExp = /[LRM]*/;
    //if(instruction )
    const instructionSet = new InstructionSet(startX, startY, startDirection, instruction, plateau);
    return instructionSet;
}

export function addRoverToPlateau( plateau: Plateau, rover: Rover) {

    plateau.addRover(rover);
}


