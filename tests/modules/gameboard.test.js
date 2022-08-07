import Gameboard from '../../src/modules/gameboard';

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

test('Returned object has recieveAttack method', () => {
  const object = Gameboard();
  expect(object.recieveAttack).toBeDefined();
  expect(typeof object.recieveAttack).toBe('function');
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

test('Every tile object has a ship, index and isHit property', () => {
  const object = Gameboard();
  object.board.forEach((item) => {
    item.forEach((tile) => {
      expect(tile.ship).toBeDefined();
      expect(tile.index).toBeDefined();
      expect(tile.isHit).toBeDefined();
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

//  recieveAttack method

test('recieveAttack method throws error when no arguments specified', () => {
  const object = Gameboard();
  expect(() => object.recieveAttack()).toThrow();
});

test('recieveAttack method throws error when no or too few coordinates specified', () => {
  const object = Gameboard();
  expect(() => object.recieveAttack({})).toThrow();
  expect(() => object.recieveAttack({ x: 1 })).toThrow();
  expect(() => object.recieveAttack({ y: 1 })).toThrow();
});

test('recieveAttack method returns false if tile already hit', () => {
  const object = Gameboard();
  object.recieveAttack({ x: 3, y: 3 });
  expect(object.recieveAttack({ x: 3, y: 3 })).toBe(false);
});

test('recieveAttack method returns true if tile was not hit before', () => {
  const object = Gameboard();
  object.recieveAttack({ x: 3, y: 3 });
  expect(object.recieveAttack({ x: 2, y: 3 })).toBe(true);
});

test('recieveAttack works correctly', () => {
  const object = Gameboard();
  object.placeShip(mockShip(4), { x: 0, y: 5, horizontally: true });
  const tileOne = object.board[5][0];
  const tileTwo = object.board[5][2];
  object.recieveAttack({ x: 0, y: 5 });
  object.recieveAttack({ x: 2, y: 5 });

  expect(tileOne.isHit).toBe(true);
  expect(tileTwo.isHit).toBe(true);
});

//  isAllShipsSunk method

test('isAllShipsSunk returns true if all ships on the board are sunk', () => {
  const object = Gameboard();
  object.placeShip(mockShip(2), { x: 0, y: 5, horizontally: true });
  object.placeShip(mockShip(3), { x: 4, y: 6, horizontally: true });
  object.recieveAttack({ x: 0, y: 5 });
  object.recieveAttack({ x: 1, y: 5 });
  object.recieveAttack({ x: 4, y: 6 });
  object.recieveAttack({ x: 5, y: 6 });
  object.recieveAttack({ x: 6, y: 6 });

  expect(object.isAllShipsSunk()).toBe(true);
});

test('isAllShipsSunk returns false if not all ships on the board are sunk', () => {
  const object = Gameboard();
  object.placeShip(mockShip(2), { x: 0, y: 5, horizontally: true });
  object.placeShip(mockShip(3), { x: 4, y: 6, horizontally: true });
  object.placeShip(mockShip(4), { x: 9, y: 7, vertically: true });
  object.recieveAttack({ x: 0, y: 5 });
  object.recieveAttack({ x: 1, y: 5 });
  object.recieveAttack({ x: 4, y: 6 });
  object.recieveAttack({ x: 5, y: 6 });
  object.recieveAttack({ x: 6, y: 6 });
  object.recieveAttack({ x: 9, y: 7 });

  expect(object.isAllShipsSunk()).toBe(false);
});
