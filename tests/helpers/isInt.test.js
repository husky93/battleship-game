import isInt from '../../src/helpers/isInt';

test('Returns true if specified argument is integer', () => {
  expect(isInt(3)).toBe(true);
  expect(isInt(2)).toBe(true);
  expect(isInt(45)).toBe(true);
});

test('Returns false if specified argument is not integer', () => {
  expect(isInt(3.556)).toBe(false);
  expect(isInt(4.657)).toBe(false);
  expect(isInt(14.7)).toBe(false);
});
