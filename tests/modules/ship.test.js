import Ship from '../../src/modules/ship';

//Object initialization tests

test('Ship factory throws error if no arguments specified', () => {
  expect(() => Ship()).toThrow();
});

test('Ship factory throws error if specified length greater then 5', () => {
  expect(() => Ship(6)).toThrow();
  expect(() => Ship(12)).toThrow();
});

test('Ship factory throws error if specified length less then 2', () => {
  expect(() => Ship(1)).toThrow();
  expect(() => Ship(0)).toThrow();
});

test('Ship factory function returns an object', () => {
  expect(typeof Ship(4)).toBe('object');
});

test('Returned object has 4 properties', () => {
  const object = Ship(4);
  const length = Object.keys(object).length;
  expect(length).toBe(4);
});

test('Returned object has a length property', () => {
  const object = Ship(4);
  expect(object.length).toBeDefined();
});

test('Returned object has a hitBox property', () => {
  const object = Ship(4);
  expect(object.hitBox).toBeDefined();
});

test('Returned object has a hit method', () => {
  const object = Ship(4);
  expect(object.hit).toBeDefined();
  expect(typeof object.hit).toBe('function');
});

test('Returned object has a isSunk method', () => {
  const object = Ship(4);
  expect(object.isSunk).toBeDefined();
  expect(typeof object.isSunk).toBe('function');
});

test('length property is a number', () => {
  const object = Ship(4);
  expect(typeof object.length).toBe('number');
});

test('length property is equal to specified length argument', () => {
  const ship = Ship(4);
  const shipTwo = Ship(5);
  expect(ship.length).toBe(4);
  expect(shipTwo.length).toBe(5);
});

test('hitBox property is an array', () => {
  const object = Ship(4);
  expect(Array.isArray(object.hitBox)).toBe(true);
});

test('hitBox initial state is and array full of 0s', () => {
  const object = Ship(3);
  object.hitBox.forEach((item) => expect(item).toBe(0));
});

test('hitBox array has same length as length property', () => {
  const object = Ship(4);
  expect(object.hitBox.length === object.length).toBe(true);
});

// Hit method tests

test('hit method throws error if no argument specified', () => {
  const object = Ship(4);
  expect(() => object.hit()).toThrow();
});

test('hit method doesnt throw error if index argument is equal 0', () => {
  const object = Ship(4);
  expect(() => object.hit(0)).not.toThrow();
});

test('hit method throws error if first argument is not a integer', () => {
  const object = Ship(4);
  expect(() => object.hit(null)).toThrow();
  expect(() => object.hit(undefined)).toThrow();
  expect(() => object.hit('3')).toThrow();
  expect(() => object.hit(3.45)).toThrow();
});

test('hit method throws error if index argument greater then Ship length', () => {
  const ship = Ship(4);
  const shipTwo = Ship(2);
  expect(() => ship.hit(4)).toThrow();
  expect(() => shipTwo.hit(3)).toThrow();
});

test('hit method changes specified index of hitBox to 1', () => {
  const ship = Ship(4);
  const shipTwo = Ship(3);
  ship.hit(2);
  expect(ship.hitBox[0]).toBe(0);
  expect(ship.hitBox[1]).toBe(0);
  expect(ship.hitBox[2]).toBe(1);
  expect(ship.hitBox[3]).toBe(0);

  shipTwo.hit(0);
  shipTwo.hit(1);
  expect(shipTwo.hitBox[0]).toBe(1);
  expect(shipTwo.hitBox[1]).toBe(1);
  expect(shipTwo.hitBox[2]).toBe(0);
});

// isSunk method tests

test('isSunk method returns true if hitBox is full of 1s', () => {
  const ship = Ship(2);
  const shipTwo = Ship(3);
  expect(ship.hitBox.length).toBe(2);
  expect(shipTwo.hitBox.length).toBe(3);

  ship.hit(0);
  ship.hit(1);
  expect(ship.hitBox[0]).toBe(1);
  expect(ship.hitBox[1]).toBe(1);
  expect(ship.isSunk()).toBe(true);

  shipTwo.hit(0);
  shipTwo.hit(1);
  shipTwo.hit(2);
  expect(shipTwo.hitBox[0]).toBe(1);
  expect(shipTwo.hitBox[1]).toBe(1);
  expect(shipTwo.hitBox[2]).toBe(1);
  expect(ship.isSunk()).toBe(true);
});

test('isSunk method returns false if hitBox is not full of 1s', () => {
  const ship = Ship(2);
  const shipTwo = Ship(3);
  expect(ship.hitBox.length).toBe(2);
  expect(shipTwo.hitBox.length).toBe(3);

  ship.hit(0);
  expect(ship.hitBox[0]).toBe(1);
  expect(ship.hitBox[1]).toBe(0);
  expect(ship.isSunk()).toBe(false);

  expect(shipTwo.hitBox[0]).toBe(0);
  expect(shipTwo.hitBox[1]).toBe(0);
  expect(shipTwo.hitBox[2]).toBe(0);
  expect(ship.isSunk()).toBe(false);
});
