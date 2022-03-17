import { createPlateau, createRover, createInstructionSet } from '../src/command_centre';


describe("command_centre", () => {

  test('test that the command_centre has created a Plateau', () => {

    const dimensions = 'x:5, y:5';
    expect(createPlateau(5, 5).getDimensions()).toBe(dimensions);
  });

  test('test that the command_centre has created a Rover', () => {

    const coordinates = 'x: 0, y: 0, facing: N';
    expect(createRover("Fred").currentCoordinates()).toEqual(coordinates);
  });

  test('test that the command_centre has created an Instruction Set', () => {

    const plateau = createPlateau(5,5);
    const instruction = 'x:0, y:0, direction:N, instruction:M, plateau:x:5, y:5';
    expect(createInstructionSet(0, 0, 'N', 'M', plateau).getInstructions()).toEqual(instruction);
  });

  test('test that the command_centre has assigned a rover to a plateau', () => {
    // arrange
    const plateau = createPlateau(5,5);
    const rover = createRover("Fred");
    // act
    plateau.addRover(rover);
    // assert
    expect(plateau.rovers.length).toBe(1);
  });

  test('that a single "M" instruction to a rover returns the correct coordinates of 0, 1, N', () => {
    // arrange
    const plateau = createPlateau(5,5);
    const rover = createRover("Fred");
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
    const rover = createRover("Fred");
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
    const rover = createRover("Fred");
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
    const rover = createRover("Fred");
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
    const rover = createRover("Fred");
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
    const rover = createRover("Fred");
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
    const rover = createRover("Fred");
    plateau.addRover(rover); 
    const instructions = createInstructionSet(0,0,'N','LLLLL', plateau);
    const expectedCoordinates = 'x: 0, y: 0, facing: W';
    // act
    rover.move(instructions);
    // assert
    expect(rover.currentCoordinates()).toBe(expectedCoordinates);
  });
  
  test('that an instruction "LMLMLMLMM" instruction to a rover returns the correct coordinates of 1, 3, N', () => {
    // arrange
    const plateau = createPlateau(5,5);
    const rover = createRover("Fred");
    plateau.addRover(rover); 
    const instructions = createInstructionSet(1,2,'N','LMLMLMLMM', plateau);
    const expectedCoordinates = 'x: 1, y: 3, facing: N';
    // act
    rover.move(instructions);
    // assert
    expect(rover.currentCoordinates()).toBe(expectedCoordinates);
  });
    
  test('that an instruction "MMRMMRMRRM" instruction to a rover returns the correct coordinates of 5, 1, E', () => {
    // arrange
    const plateau = createPlateau(5,5);
    const rover = createRover("Fred");
    plateau.addRover(rover); 
    const instructions = createInstructionSet(3,3,'E','MMRMMRMRRM', plateau);
    const expectedCoordinates = 'x: 5, y: 1, facing: E';
    // act
    rover.move(instructions);
    // assert
    expect(rover.currentCoordinates()).toBe(expectedCoordinates);
  });
  
  test('that it throws an Edge proximity error if we add an instruction "LM" instruction to a rover at 0, 0, N', () => {
    // arrange
    const plateau = createPlateau(5,5);
    const rover = createRover("Fred");
    plateau.addRover(rover); 
    const instructions = createInstructionSet(0,0,'N','LM', plateau);

    expect(() => {
      rover.move(instructions);
      console.log(rover.currentCoordinates());
    }).toThrow("Edge proximity error - cannot complete move!");
  });

  test('that it throws an Edge proximity error if we add an instruction "MMMMMM" instruction to a rover at 0, 0, N', () => {
    // arrange
    const plateau = createPlateau(5,5);
    const rover = createRover("Fred");
    plateau.addRover(rover); 
    const instructions = createInstructionSet(0,0,'N','MMMMMM', plateau);

    expect(() => {
      rover.move(instructions);
      console.log(rover.currentCoordinates());
    }).toThrow("Edge proximity error - cannot complete move!");
  });

  test('that it throws an Edge proximity error if we add an instruction "RMMMMMM" instruction to a rover at 0, 0, N', () => {
    // arrange
    const plateau = createPlateau(5,5);
    const rover = createRover("Fred");
    plateau.addRover(rover); 
    const instructions = createInstructionSet(0,0,'N','RMMMMMM', plateau);

    expect(() => {
      rover.move(instructions);
      console.log(rover.currentCoordinates());
    }).toThrow("Edge proximity error - cannot complete move!");
  });

  test('that it throws an Invalid instruction error if we create an instruction "RS" instruction', () => {
    const plateau = createPlateau(5,5);  
    expect(() => {
      let instructions = createInstructionSet(0,0,'N','RS',plateau);
    }).toThrow("Invalid instruction error - invalid characters in instruction - cannot create instruction set.");
  });

  test('that it throws an Invalid instruction error if we create an instruction set with no plateau', () => {
    expect(() => {
      const instructions = createInstructionSet(0,0,'N','RM', undefined);
    }).toThrow("Invalid instruction error - plateau is required - cannot create instruction set.");
  });

  test('that it throws an Invalid instruction error if we create an instruction set with no startX', () => {
    const plateau = createPlateau(5,5);
    expect(() => {
      const instructions = createInstructionSet(undefined,0,'N','RM', plateau);
    }).toThrow("Invalid instruction error - startX is required - cannot create instruction set.");
  });

  test('that it throws an Invalid instruction error if we create an instruction set with no startY', () => {
    const plateau = createPlateau(5,5);
    expect(() => {
      const instructions = createInstructionSet(0, undefined,'N','RM', plateau);
    }).toThrow("Invalid instruction error - startY is required - cannot create instruction set.");
  });

  test('that it throws an Invalid instruction error if we create an instruction set with no startDirection', () => {
    const plateau = createPlateau(5,5);
    expect(() => {
      const instructions = createInstructionSet(0, 0, undefined, 'RM', plateau);
    }).toThrow("Invalid instruction error - startDirection is required - cannot create instruction set.");
  });

  test('that it throws an Invalid instruction error if we create an instruction set with no instruction', () => {
    const plateau = createPlateau(5,5);
    expect(() => {
      const instructions = createInstructionSet(0, 0, 'N', undefined, plateau);
    }).toThrow("Invalid instruction error - instruction is required - cannot create instruction set.");
  });

  test('that it throws a Rover collision error if we add an instruction "RM" instruction to second rover on the same plateau', () => {
    // arrange
    const plateau = createPlateau(5,5);
    const rover_a = createRover("Fred");
    const rover_b = createRover("Wilma");
    plateau.addRover(rover_a); 
    const instructions = createInstructionSet(0,0,'N','RM',plateau);
    rover_a.move(instructions);
    plateau.addRover(rover_b);

    expect(() => {
      rover_b.move(instructions);
    }).toThrow("Rover collision error - cannot complete move!");
  });

  test('that it throws a Rover collision error if we add an a second rover on the same plateau without moving the first', () => {
    // arrange
    const plateau = createPlateau(5,5);
    const rover_a = createRover("Fred");
    const rover_b = createRover("Wilma");
    plateau.addRover(rover_a); 
    
    expect(() => {
      plateau.addRover(rover_b);
    }).toThrow("Rover collision error - cannot complete move!");
  });

  test('that it throws a Potential gridlock error when more than 3 rovers added to a plateau', () => {
    // arrange
    const plateau = createPlateau(5,5);
    const instruction1 = createInstructionSet(0,0,'N','MMMM',plateau);
    const instruction2 = createInstructionSet(0,0,'N','RMM',plateau);
    const instruction3 = createInstructionSet(0,0,'N','RM',plateau);
    const rover_a = createRover("Fred");
    rover_a.move(instruction1);
    const rover_b = createRover("Wilma");
    rover_b.move(instruction2);
    const rover_c = createRover("Bam Bam");
    rover_c.move(instruction3);
    const rover_d = createRover("Betty");
    plateau.addRover(rover_a); 
    plateau.addRover(rover_b);
    plateau.addRover(rover_c);

    expect(() => {
      plateau.addRover(rover_d);
    }).toThrow("Potential gridlock error (max 3) - cannot add new rover!");
  });

});
