import { createPlateau, createRover, createInstructionSet } from '../src/command_centre';


describe("command_centre", () => {

  test('test that the command_centre has created a Plateau', () => {

    const dimensions = 'x:5, y:5';
    expect(createPlateau(5, 5).getDimensions()).toBe(dimensions);
  });

  test('test that the command_centre has created a Rover', () => {

    const coordinates = 'x: 0, y: 0, facing: N';
    expect(createRover().currentCoordinates()).toEqual(coordinates);
  });

  test('test that the command_centre has created an Instruction Set', () => {

    const plateau = createPlateau(5,5);
    const instruction = 'x:0, y:0, direction:N, instruction:M, plateau:x:5, y:5';
    expect(createInstructionSet(0, 0, 'N', 'M', plateau).getInstructions()).toEqual(instruction);
  });

  test('test that the command_centre has assigned a rover to a plateau', () => {
    // arrange
    const plateau = createPlateau(5,5);
    const rover = createRover();
    // act
    plateau.addRover(rover);
    // assert
    expect(plateau.rovers.length).toBe(1);
  });

  test('that a single "M" instruction to a rover returns the correct coordinates of 0, 1, N', () => {
    // arrange
    const plateau = createPlateau(5,5);
    const rover = createRover();
    plateau.addRover(rover); 
    const instructions = createInstructionSet(0,0,'N','M', plateau);
    const expectedCoordinates = 'x: 0, y: 1, facing: N';
    // act
    rover.move(instructions);
    // assert
    expect(rover.currentCoordinates()).toBe(expectedCoordinates);
  });

  test('that a single "R" instruction to a rover returns the correct coordinates of 0, 0, E', () => {
    // arrange
    const plateau = createPlateau(5,5);
    const rover = createRover();
    plateau.addRover(rover); 
    const instructions = createInstructionSet(0,0,'N','R', plateau);
    const expectedCoordinates = 'x: 0, y: 0, facing: E';
    // act
    rover.move(instructions);
    // assert
    expect(rover.currentCoordinates()).toBe(expectedCoordinates);
  });

  test('that a single "L" instruction to a rover returns the correct coordinates of 0, 0, W', () => {
    // arrange
    const plateau = createPlateau(5,5);
    const rover = createRover();
    plateau.addRover(rover); 
    const instructions = createInstructionSet(0,0,'N','L', plateau);
    const expectedCoordinates = 'x: 0, y: 0, facing: W';
    // act
    rover.move(instructions);
    // assert
    expect(rover.currentCoordinates()).toBe(expectedCoordinates);
  });
  
  test('that an instruction "RRR" instruction to a rover returns the correct coordinates of 0, 0, W', () => {
    // arrange
    const plateau = createPlateau(5,5);
    const rover = createRover();
    plateau.addRover(rover); 
    const instructions = createInstructionSet(0,0,'N','RRR', plateau);
    const expectedCoordinates = 'x: 0, y: 0, facing: W';
    // act
    rover.move(instructions);
    // assert
    expect(rover.currentCoordinates()).toBe(expectedCoordinates);
  });

  test('that an instruction "LLL" instruction to a rover returns the correct coordinates of 0, 0, E', () => {
    // arrange
    const plateau = createPlateau(5,5);
    const rover = createRover();
    plateau.addRover(rover); 
    const instructions = createInstructionSet(0,0,'N','LLL', plateau);
    const expectedCoordinates = 'x: 0, y: 0, facing: E';
    // act
    rover.move(instructions);
    // assert
    expect(rover.currentCoordinates()).toBe(expectedCoordinates);
  });

  test('that an instruction "RRRRR" instruction to a rover returns the correct coordinates of 0, 0, E', () => {
    // arrange
    const plateau = createPlateau(5,5);
    const rover = createRover();
    plateau.addRover(rover); 
    const instructions = createInstructionSet(0,0,'N','RRRRR', plateau);
    const expectedCoordinates = 'x: 0, y: 0, facing: E';
    // act
    rover.move(instructions);
    // assert
    expect(rover.currentCoordinates()).toBe(expectedCoordinates);
  });

  test('that an instruction "LLLLL" instruction to a rover returns the correct coordinates of 0, 0, W', () => {
    // arrange
    const plateau = createPlateau(5,5);
    const rover = createRover();
    plateau.addRover(rover); 
    const instructions = createInstructionSet(0,0,'N','LLLLL', plateau);
    const expectedCoordinates = 'x: 0, y: 0, facing: W';
    // act
    rover.move(instructions);
    // assert
    expect(rover.currentCoordinates()).toBe(expectedCoordinates);
  });

});
