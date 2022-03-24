import { isInvalidDirection, getNextLeft, getNextRight, getInitialDirection } from '../src/compassDirection';

describe("InstructionSet", () => { 

  it.each([
    ["N", false],
    ["E", false],
    ["W", false],
    ["S", false],
    ["L", true],
    ["0", true],
    ["*", true],
    ["", true],
    ["SS", true]
  ])(`isInvalidDirection(%i) returns %i`,

    (x, y) => {
      expect(isInvalidDirection(x)).toBe(y);
  });

  it.each([
    ["N", "W"],
    ["W", "S"],
    ["S", "E"],
    ["E", "N"]
  ])(`getNextLeft(%i) returns %i`,

    (x, y) => {
      expect(getNextLeft(x)).toBe(y);
  });

  it.each([
    ["N", "E"],
    ["W", "N"],
    ["S", "W"],
    ["E", "S"]
  ])(`getNextRight(%i) returns %i`,

    (x, y) => {
      expect(getNextRight(x)).toBe(y);
  });

  test("getInitialDirection() always returns N", () => {
    expect(getInitialDirection()).toBe("N");
  });

});