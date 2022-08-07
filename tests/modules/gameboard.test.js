import Gameboard from '../../src/modules/gameboard';
import Ship from '../../src/modules/ship';

test('Gameboard factory function returns an object', () => {
  expect(typeof Gameboard()).toBe('object');
});

test('Returned object has board property', () => {
  const object = Gameboard();
  expect(object.board).toBeDefined();
});

test('Returned object has placeShip method', () => {
  const object = Gameboard();
  expect(object.placeShip).toBeDefined();
  expect(typeof object.placeShip).toBe('function');
});

test('Returned object has receiveAttack method', () => {
  const object = Gameboard();
  expect(object.receiveAttack).toBeDefined();
  expect(typeof object.receiveAttack).toBe('function');
});

test('Returned object has isAllShipsSunk method', () => {
  const object = Gameboard();
  expect(object.isAllShipsSunk).toBeDefined();
  expect(typeof object.isAllShipsSunk).toBe('function');
});

test('Board property is an array', () => {
  const object = Gameboard();
  expect(Array.isArray(object.board)).toBe(true);
});

test('Board property contains 10 arrays and each of those arrays contains 10 objects', () => {
  const object = Gameboard();
  expect(object.board.length).toBe(10);
  object.board.forEach((item) => {
    expect(item.length).toBe(10);
    expect(Array.isArray(item)).toBe(true);
    item.forEach((tile) => {
      expect(typeof tile).toBe('object');
    });
  });
});

test('Every tile object has a ship, index, isHit, x, y properties', () => {
  const object = Gameboard();
  object.board.forEach((item) => {
    item.forEach((tile) => {
      expect(tile.ship).toBeDefined();
      expect(tile.index).toBeDefined();
      expect(tile.isHit).toBeDefined();
      expect(tile.x).toBeDefined();
      expect(tile.y).toBeDefined();
    });
  });
});

test('Every tile x, y properties are correct', () => {
  const object = Gameboard();
  object.board.forEach((item, indexY) => {
    item.forEach((tile, indexX) => {
      expect(tile.x).toBe(indexX);
      expect(tile.y).toBe(indexY);
    });
  });
});

test('Every isHit property is false on initialization', () => {
  const object = Gameboard();
  object.board.forEach((item) => {
    item.forEach((tile) => {
      expect(tile.isHit).toBe(false);
    });
  });
});

const mockShip = jest.fn((x) => {
  return { length: x, hit: () => {} };
});

//  placeShip method

test('Ship factory function is called once inside placeShip method', () => {
  const object = Gameboard();
  object.placeShip(mockShip(4), { x: 1, y: 2, horizontally: true });
  expect(mockShip.mock.calls.length).toBe(1);
});

test('placeShip method throws error when there is less then 2 arguments', () => {
  const object = Gameboard();
  expect(() => object.placeShip(mockShip(2))).toThrow();
});

test('placeShip method throws error if specified coordinates are wrong or not specified', () => {
  const object = Gameboard();
  expect(() =>
    object.placeShip(mockShip(2), { x: 2, y: 11, horizontally: true })
  ).toThrow();
  expect(() =>
    object.placeShip(mockShip(2), { x: 10, y: 2, horizontally: true })
  ).toThrow();
  expect(() =>
    object.placeShip(mockShip(2), { x: 10, horizontally: true })
  ).toThrow();
  expect(() => object.placeShip(mockShip(2), { horizontally: true })).toThrow();
});

test('placeShip method throws error when there is no direction specified', () => {
  const object = Gameboard();
  expect(() =>
    object.placeShip(mockShip(2), { x: 2, y: 2, vrerticlaly: true })
  ).toThrow();
  expect(() =>
    object.placeShip(mockShip(2), { x: 2, y: 4, hrotltally: true })
  ).toThrow();
  expect(() => object.placeShip(mockShip(2), { x: 2, y: 4 })).toThrow();
});

test('placeShip method throws error when both directions specified', () => {
  const object = Gameboard();
  expect(() =>
    object.placeShip(mockShip(4), {
      x: 8,
      y: 8,
      horizontally: true,
      vertically: true,
    })
  ).toThrow();
});

test('placeShip method throws error when ship is placed out of bounds', () => {
  const object = Gameboard();
  expect(() =>
    object.placeShip(mockShip(3), { x: 8, y: 8, horizontally: true })
  ).toThrow();
  expect(() =>
    object.placeShip(mockShip(2), { x: 8, y: 8, horizontally: true })
  ).not.toThrow();
  expect(() =>
    object.placeShip(mockShip(3), { x: 9, y: 1, vertically: true })
  ).toThrow();
  expect(() =>
    object.placeShip(mockShip(3), { x: 9, y: 2, vertically: true })
  ).not.toThrow();
});

test('placeShip places the ship vertically inside board array correctly', () => {
  const object = Gameboard();
  object.placeShip(mockShip(3), { x: 0, y: 5, vertically: true });
  const tileOne = object.board[5][0];
  const tileTwo = object.board[4][0];
  const tileThree = object.board[3][0];
  const tiles = [tileOne, tileTwo, tileThree];

  tiles.forEach((tile, index) => {
    expect(typeof tile.ship).toBe('object');
    expect(tile.ship.length).toBe(3);
    expect(tile.index).toBe(index);
  });
});

test('placeShip places the ship horizontally inside board array correctly', () => {
  const object = Gameboard();
  object.placeShip(mockShip(4), { x: 0, y: 5, horizontally: true });
  const tileOne = object.board[5][0];
  const tileTwo = object.board[5][1];
  const tileThree = object.board[5][2];
  const tileFour = object.board[5][3];
  const tiles = [tileOne, tileTwo, tileThree, tileFour];

  tiles.forEach((tile, index) => {
    expect(typeof tile.ship).toBe('object');
    expect(tile.ship.length).toBe(4);
    expect(tile.index).toBe(index);
  });
});

//  receiveAttack method

test('receiveAttack method throws error when no arguments specified', () => {
  const object = Gameboard();
  expect(() => object.receiveAttack()).toThrow();
});

test('receiveAttack method throws error when no or too few coordinates specified', () => {
  const object = Gameboard();
  expect(() => object.receiveAttack({})).toThrow();
  expect(() => object.receiveAttack({ x: 1 })).toThrow();
  expect(() => object.receiveAttack({ y: 1 })).toThrow();
});

test('receiveAttack method returns false if tile already hit', () => {
  const object = Gameboard();
  object.receiveAttack({ x: 3, y: 3 });
  expect(object.receiveAttack({ x: 3, y: 3 })).toBe(false);
});

test('receiveAttack method returns true if tile was not hit before', () => {
  const object = Gameboard();
  object.receiveAttack({ x: 3, y: 3 });
  expect(object.receiveAttack({ x: 2, y: 3 })).toBe(true);
});

test('receiveAttack works correctly', () => {
  const object = Gameboard();
  object.placeShip(mockShip(4), { x: 0, y: 5, horizontally: true });
  const tileOne = object.board[5][0];
  const tileTwo = object.board[5][2];
  object.receiveAttack({ x: 0, y: 5 });
  object.receiveAttack({ x: 2, y: 5 });

  expect(tileOne.isHit).toBe(true);
  expect(tileTwo.isHit).toBe(true);
});

//  isAllShipsSunk method

test('isAllShipsSunk returns true if all ships on the board are sunk', () => {
  const object = Gameboard();
  object.placeShip(Ship(2), { x: 0, y: 5, horizontally: true });
  object.placeShip(Ship(3), { x: 4, y: 6, horizontally: true });
  object.receiveAttack({ x: 0, y: 5 });
  object.receiveAttack({ x: 1, y: 5 });
  object.receiveAttack({ x: 4, y: 6 });
  object.receiveAttack({ x: 5, y: 6 });
  object.receiveAttack({ x: 6, y: 6 });

  expect(object.isAllShipsSunk()).toBe(true);
});

test('isAllShipsSunk returns false if not all ships on the board are sunk', () => {
  const object = Gameboard();
  object.placeShip(Ship(2), { x: 0, y: 5, horizontally: true });
  object.placeShip(Ship(3), { x: 4, y: 6, horizontally: true });
  object.placeShip(Ship(4), { x: 9, y: 7, vertically: true });
  object.receiveAttack({ x: 0, y: 5 });
  object.receiveAttack({ x: 1, y: 5 });
  object.receiveAttack({ x: 4, y: 6 });
  object.receiveAttack({ x: 5, y: 6 });
  object.receiveAttack({ x: 6, y: 6 });
  object.receiveAttack({ x: 9, y: 7 });

  expect(object.isAllShipsSunk()).toBe(false);
});
