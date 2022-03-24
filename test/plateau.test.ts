import { createPlateau } from "../src/plateau";
import { closeInputStream } from '../src/console';

afterEach(() => {
  closeInputStream();
});

describe("plateau", () => {

  test("that a plateau is created successfully with co-ordinates 5, 5", () => {

    expect(createPlateau(5,5).getDimensions()).toBe("x:5, y:5");
  });

  


});