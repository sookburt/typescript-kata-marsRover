import { plumbingTest } from '../src/command_centre';

describe("command_centre",() => {
  test('test that a command centre file has been created', () => {
    expect(plumbingTest()).toBe(true);
  });
});


