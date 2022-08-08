import game from '../../src/modules/game';

test('Game module returns an object', () => {
  expect(typeof game).toBe('object');
});

test('Game module has 4 properties', () => {
  expect(Object.keys(game).length).toBe(4);
});

test('Game module has a playerOne object', () => {
  expect(game.playerOne).toBeDefined();
  expect(typeof game.playerOne).toBe('object');
});

test('Game module has a playerTwo object', () => {
  expect(game.playerTwo).toBeDefined();
  expect(typeof game.playerTwo).toBe('object');
});

test('Game module has a gameOver property', () => {
  expect(game.gameOver).toBeDefined();
  expect(typeof game.gameOver).toBe('boolean');
});

test('Game module has a startGame method', () => {
  expect(game.startGame).toBeDefined();
  expect(typeof game.startGame).toBe('function');
});

test('Game module has a playTurn method', () => {
  expect(game.startGame).toBeDefined();
  expect(typeof game.startGame).toBe('function');
});

test('playerOne and playerTwo objects have player and gameboard keys', () => {
  expect(game.playerOne.player).toBeDefined();
  expect(game.playerOne.gameboard).toBeDefined();
  expect(game.playerTwo.player).toBeDefined();
  expect(game.playerTwo.gameboard).toBeDefined();
  expect(game.playerOne.player).toBe(null);
  expect(game.playerOne.gameboard).toBe(null);
  expect(game.playerTwo.player).toBe(null);
  expect(game.playerTwo.gameboard).toBe(null);
});

test('gameOver property is true on default', () => {
  expect(game.gameOver).toBe(true);
});

test('startGame method creates player and gameboard object for each player', () => {
  game.startGame();
  expect(typeof game.playerOne.player).toBe('object');
  expect(typeof game.playerOne.gameboard).toBe('object');
  expect(typeof game.playerTwo.player).toBe('object');
  expect(typeof game.playerTwo.gameboard).toBe('object');
});

test('startGame changes gameOver to false', () => {
  game.startGame();
  expect(game.gameOver).toBe(false);
});

test('startGame method initializes playerTwo as an AI', () => {
  game.startGame();
  expect(game.playerTwo.player.isAI).toBe(true);
});

test('startGame changes turn of player one to true', () => {
  expect(game.playerOne.player.isMyTurn).toBe(false);
  game.startGame();
  expect(game.playerOne.player.isMyTurn).toBe(true);
});

test('startGame puts 5 ships on each gameboard', () => {
  game.startGame();
  let i = 0;
  let j = 0;
  playerOne.gameboard.board.forEach((row) => {
    const shipTiles = row.filter((tile) => tile.ship);
    i += shipTiles.length;
  });
  playerTwo.gameboard.board.forEach((row) => {
    const shipTiles = row.filter((tile) => tile.ship);
    j += shipTiles.length;
  });

  expect(i).toBe(17);
  expect(j).toBe(17);
});

test('playerTwo turn is false after calling startGame method', () => {
  expect(game.playerTwo.player.isMyTurn).toBe(false);
  game.startGame();
  expect(game.playerTwo.player.isMyTurn).toBe(false);
});

test('playTurn method throws error if no coordinates specified and player is not AI', () => {
  game.startGame();
  expect(() => game.playTurn()).toThrow();
});

test('playTurn method changes player turn after being called', () => {
  game.startGame();
  expect(game.playerOne.player.isMyTurn).toBe(true);
  expect(game.playerTwo.player.isMyTurn).toBe(false);
  game.playTurn({ x: 2, y: 3 });
  expect(game.playerOne.player.isMyTurn).toBe(false);
  expect(game.playerTwo.player.isMyTurn).toBe(true);
});

test('playTurn hits the specified coordinates on a correct board', () => {
  game.startGame();
  expect(game.playerOne.player.isMyTurn).toBe(true);
  game.playTurn({ x: 2, y: 3 });
  expect(game.playerTwo.gameboard.board[3][2].isHit).toBe(true);
});

test('playTurn hits the correct board when its AI turn', () => {
  game.startGame();
  game.playerOne.player.changeTurn();
  game.playerTwo.player.changeTurn();
  expect(game.playerTwo.player.isMyTurn).toBe(true);
  expect(game.playerTwo.player.isAI).toBe(true);
  game.playTurn();
  let i = 0;
  playerOne.gameboard.board.forEach((row) => {
    const hitTiles = row.filter((tile) => tile.isHit);
    i += hitTiles.length;
  });
  expect(i).toBe(1);
});

test('playTurn checks if all ships are hit after the attack and changes gameOver state', () => {
  game.startGame();
  const shipTiles = [];
  playerTwo.gameboard.board.forEach((row) => {
    shipTiles = [...shipTiles, ...row.filter((tile) => tile.ship)];
  });

  // Hit all tiles with ship except for one
  const length = shipTiles.length;
  for (let i = 0; i < length - 1; i += 1) {
    const x = shipTiles[i].x;
    const y = shipTiles[i].y;
    playerTwo.gameboard.receiveAttack({ x, y });
  }
  const notHitShip = shipTiles.filter((tile) => !tile.isHit);
  expect(notHitShip.length).toBe(1);

  expect(playerTwo.gameboard.isAllShipsSunk()).toBe(false);
  expect(game.gameOver).toBe(false);
  game.playTurn({ x: notHitShip[0].x, y: notHitShip[0].y });
  expect(playerTwo.gameboard.isAllShipsSunk()).toBe(true);
  expect(game.gameOver).toBe(true);
});
