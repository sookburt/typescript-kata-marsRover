import { createPlateau } from '../src/command_centre';


describe("command_centre", () => {

  test('test that the command_centre has created a plateau', () => {

    const plateau = { x: 5, y: 5 };
    expect(createPlateau(5, 5)).toEqual(plateau);
  });
});


