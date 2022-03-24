import { isInvalidDirection } from '../src/compassDirection';

describe("InstructionSet", () => { 

  it.each([
    ["N", false],
    ["E", false],
    ["W", false],
    ["S", false],
    ["L", true],
    ["0", true],
    ["*", true]
  ])(`isInvalidDirection(%i) returns %i`,

    (x, y) => {
      expect(isInvalidDirection(x)).toBe(y);
  });

});