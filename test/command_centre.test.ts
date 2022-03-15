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

  // next: test that a single 'M' instruction returns the correct coordinates of 0, 1, N.
});
