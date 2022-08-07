import Player from '../../src/modules/player';
import Gameboard from '../../src/modules/gameboard';

test('Player factory function returns an object', () => {
  expect(typeof Player()).toBe('object');
});

test('Returned object has isMyTurn property', () => {
  const object = Player();
  expect(object.isMyTurn).toBeDefined();
});

test('Returned object has isAI property', () => {
  const object = Player();
  expect(object.isAI).toBeDefined();
});

test('Returned object has changeTurn method', () => {
  const object = Player();
  expect(object.changeTurn).toBeDefined();
  expect(typeof object.changeTurn).toBe('function');
});

test('Returned object has playMoveAI method', () => {
  const object = Player();
  expect(object.playMoveAI).toBeDefined();
  expect(typeof object.playMoveAI).toBe('function');
});

test('isMyTurn property is false initially', () => {
  const player = Player();
  expect(object.isMyTurn).toBe(false);
});

// playMoveAI method

test('playMoveAI throws error when no argument specified', () => {
  const object = Player();
  expect(() => object.playMoveAI()).toThrow();
});

test('playMoveAI throws error when argument is not an array', () => {
  const object = Player();
  expect(() => object.playMoveAI(null)).toThrow();
  expect(() => object.playMoveAI(3)).toThrow();
  expect(() => object.playMoveAI({ x: 3, y: 5 })).toThrow();
});

test('playMoveAI method plays a random move', () => {
  const gameboard = Gameboard();
  const player = Player({ isAI: true });
  const i = 0;

  player.playMoveAI(gameboard);
  gameboard.board.forEach((row) => {
    row.forEach((tile) => {
      if (tile.isHit) i++;
    });
  });

  expect(i).toBe(1);
});

test('playMoveAI method doesnt target tiles that are already hit', () => {
  const mockGameboard = jest.fn(() => {
    const board = [];
    (function initializeBoard() {
      for (let i = 0; i < 10; i += 1) {
        const array = [];
        for (let j = 0; j < 10; j += 1) {
          const obj = { ship: null, index: null, isHit: true };
          if (i === 9 && j === 9) {
            obj.isHit = false;
          }
          array.push(obj);
        }
        board.push(array);
      }
    })();
    return { board };
  });

  const gameboardOne = mockGameboard();
  const gameboardTwo = mockGameboard();
  const gameboardThree = mockGameboard();
  const player = Player({ isAI: true });

  player.playMoveAI(gameboardOne);
  player.playMoveAI(gameboardTwo);
  player.playMoveAI(gameboardThree);

  expect(gameboardOne.board[9][9].isHit).toBe(true);
  expect(gameboardTwo.board[9][9].isHit).toBe(true);
  expect(gameboardThree.board[9][9].isHit).toBe(true);
});

// changeTurn method

test('changeTurn method changes player turn correctly', () => {
  const player = Player();
  expect(player.isMyTurn).toBe(false);
  player.changeTurn();
  expect(player.isMyTurn).toBe(true);
  player.changeTurn();
  expect(player.isMyTurn).toBe(false);
});
