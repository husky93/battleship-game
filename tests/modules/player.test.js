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
  expect(player.isMyTurn).toBe(false);
});

test('isAI property returns true if it was specified in player initialization options', () => {
  const object = Player({ isAI: true });
  expect(object.isAI).toBe(true);
});

test('isAI property returns false if it wasnt specified in player initialization options', () => {
  const object = Player();
  expect(object.isAI).toBe(false);
});

// playMoveAI method

test('playMoveAI throws error when no argument specified', () => {
  const object = Player();
  expect(() => object.playMoveAI()).toThrow();
});

test('playMoveAI throws error when argument is not an object', () => {
  const object = Player();
  expect(() => object.playMoveAI(null)).toThrow();
  expect(() => object.playMoveAI(3)).toThrow();
  expect(() => object.playMoveAI([])).toThrow();
});

test('playMoveAI method plays a random move', () => {
  const gameboard = Gameboard();
  const player = Player({ isAI: true });
  let i = 0;

  player.changeTurn();
  expect(player.isMyTurn).toBe(true);
  player.playMoveAI(gameboard);
  gameboard.board.forEach((row) => {
    row.forEach((tile) => {
      if (tile.isHit) {
        i += 1;
      }
    });
  });

  expect(i).toBe(1);
});

test('playMoveAI method doesnt target tiles that are already hit', () => {
  const gameboardOne = Gameboard();
  const gameboardTwo = Gameboard();
  const gameboardThree = Gameboard();
  const gameboards = [gameboardOne, gameboardTwo, gameboardThree];
  const player = Player({ isAI: true });

  gameboards.forEach((gameboard) => {
    gameboard.board.forEach((row, indexY) => {
      row.forEach((tile, indexX) => {
        if (indexY === 9 && indexX === 9) {
          return;
        }
        gameboard.receiveAttack({ x: indexX, y: indexY });
      });
    });
  });

  player.changeTurn();
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
