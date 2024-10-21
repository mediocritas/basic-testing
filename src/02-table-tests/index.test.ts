// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 10, b: 5, action: Action.Subtract, expected: 5 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 3, b: 3, action: Action.Multiply, expected: 9 },
  { a: 5, b: 4, action: Action.Multiply, expected: 20 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 9, b: 3, action: Action.Divide, expected: 3 },
  { a: 15, b: 5, action: Action.Divide, expected: 3 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 5, b: 0, action: Action.Exponentiate, expected: 1 },
];

describe('simpleCalculator', () => {
  testCases.forEach(({ a, b, action, expected }) => {
    test(`should return ${expected} for ${a} ${action} ${b}`, () => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    });
  });
  // Consider to use Jest table tests API to test all cases above
});
