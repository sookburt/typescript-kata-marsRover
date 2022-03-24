import { InstructionSet, isInvalidMove } from "../src/instructionSet";
import { Plateau } from "../src/plateau";
import { closeInputStream } from '../src/console';

afterEach(() => {
  closeInputStream();
});

describe("InstructionSet", () => {

  test("that an instruction set is created successfully", () => {

    const instructionSet = new InstructionSet(0,0,"N","LRM",new Plateau(5,5)); 
    expect(instructionSet.getInstructions()).toBe("x:0, y:0, direction:N, instruction:LRM, plateau:x:5, y:5");
  });

  it.each([
    ["LMR", false],
    ["LMZ", true],
    ["LMMRMMLLM", false],
    ["097546LRM", true],
    ["LRM*", true]
  ])(`isInvalidMove(%i) returns %i`,

    (x, y) => {
      expect(isInvalidMove(x)).toBe(y);
  });

});