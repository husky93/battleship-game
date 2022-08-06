import isAllTruthy from '../../src/helpers/isAllTruthy';

test('Returns true if specified array has all truthy values', () => {
  const array = [1, 1, 1];
  const arrayTwo = [1, 1, 1, 1, true];
  const arrayThree = [1, 1, 'string'];

  expect(isAllTruthy(array)).toBe(true);
  expect(isAllTruthy(arrayTwo)).toBe(true);
  expect(isAllTruthy(arrayThree)).toBe(true);
});

test('Returns false if specified array has at least one falsy value', () => {
  const array = [1, 1, 0];
  const arrayTwo = [1, 1, '', 1, true];
  const arrayThree = [1, 1, ''];

  expect(isAllTruthy(array)).toBe(false);
  expect(isAllTruthy(arrayTwo)).toBe(false);
  expect(isAllTruthy(arrayThree)).toBe(false);
});
