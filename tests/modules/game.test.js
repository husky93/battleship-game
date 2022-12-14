import game from '../../src/modules/game';

const mockPlacementData = [
  {
    length: 3,
    vertically: false,
    horizontally: true,
    x: 6,
    y: 0,
  },
  {
    length: 5,
    vertically: true,
    horizontally: false,
    x: 1,
    y: 3,
  },
  {
    length: 3,
    vertically: false,
    horizontally: true,
    x: 5,
    y: 3,
  },
  {
    length: 4,
    vertically: true,
    horizontally: false,
    x: 7,
    y: 5,
  },
  {
    length: 2,
    vertically: false,
    horizontally: true,
    x: 1,
    y: 9,
  },
];

test('Game module returns an object', () => {
  expect(typeof game).toBe('object');
});

test('Game module has 5 properties', () => {
  expect(Object.keys(game).length).toBe(5);
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
  game.startGame(mockPlacementData);
  expect(game.playerOne.player).not.toBe(null);
  expect(game.playerOne.gameboard).not.toBe(null);
  expect(game.playerTwo.player).not.toBe(null);
  expect(game.playerTwo.gameboard).not.toBe(null);
  expect(typeof game.playerOne.player).toBe('object');
  expect(typeof game.playerOne.gameboard).toBe('object');
  expect(typeof game.playerTwo.player).toBe('object');
  expect(typeof game.playerTwo.gameboard).toBe('object');
});

test('startGame changes gameOver to false', () => {
  game.startGame(mockPlacementData);
  expect(game.gameOver).toBe(false);
});

test('startGame method initializes playerTwo as an AI', () => {
  game.startGame(mockPlacementData);
  expect(game.playerTwo.player.isAI).toBe(true);
});

test('startGame changes turn of player one to true', () => {
  game.startGame(mockPlacementData);
  expect(game.playerOne.player.isMyTurn).toBe(true);
});

test('playerTwo turn is false after calling startGame method', () => {
  game.startGame(mockPlacementData);
  expect(game.playerTwo.player.isMyTurn).toBe(false);
});

test('startGame puts 5 ships on each gameboard', () => {
  game.startGame(mockPlacementData);
  let i = 0;
  let j = 0;
  game.playerOne.gameboard.board.forEach((row) => {
    const shipTiles = row.filter((tile) => tile.ship);
    i += shipTiles.length;
  });
  game.playerTwo.gameboard.board.forEach((row) => {
    const shipTiles = row.filter((tile) => tile.ship);
    j += shipTiles.length;
  });
  expect(i).toBe(17);
  expect(j).toBe(17);
});

test('playTurn method throws error if no coordinates specified and player is not AI', () => {
  game.startGame(mockPlacementData);
  expect(() => game.playTurn()).toThrow();
});

test('playTurn method doesnt throw error if no coordinates specified and player is AI', () => {
  game.startGame(mockPlacementData);
  game.playerOne.player.changeTurn();
  game.playerTwo.player.changeTurn();
  expect(() => game.playTurn()).not.toThrow();
});

test('playTurn method changes player turn after hitting empty square', () => {
  game.startGame(mockPlacementData);
  let firstEmptyTile;
  game.playerTwo.gameboard.board[0].every((tile) => {
    if (!tile.ship) {
      firstEmptyTile = tile;
      return false;
    }
    return true;
  });
  expect(game.playerOne.player.isMyTurn).toBe(true);
  expect(game.playerTwo.player.isMyTurn).toBe(false);
  game.playTurn({ x: firstEmptyTile.x, y: firstEmptyTile.y });
  expect(game.playerOne.player.isMyTurn).toBe(false);
  expect(game.playerTwo.player.isMyTurn).toBe(true);
});

test('playTurn method doesnt change player turn after hitting ship', () => {
  game.startGame(mockPlacementData);
  let firstShipTile;
  game.playerTwo.gameboard.board.every((row) => {
    const temp = row.every((tile) => {
      if (tile.ship) {
        firstShipTile = tile;
        return false;
      }
      return true;
    });
    return temp;
  });
  expect(game.playerOne.player.isMyTurn).toBe(true);
  expect(game.playerTwo.player.isMyTurn).toBe(false);
  game.playTurn({ x: firstShipTile.x, y: firstShipTile.y });
  expect(game.playerOne.player.isMyTurn).toBe(true);
  expect(game.playerTwo.player.isMyTurn).toBe(false);
});

test('playTurn hits the specified coordinates on a correct board', () => {
  game.startGame(mockPlacementData);
  expect(game.playerOne.player.isMyTurn).toBe(true);
  game.playTurn({ x: 2, y: 3 });
  expect(game.playerTwo.gameboard.board[3][2].isHit).toBe(true);
});

test('playTurn hits the correct board when its AI turn', () => {
  game.startGame(mockPlacementData);
  game.playerOne.player.changeTurn();
  game.playerTwo.player.changeTurn();
  expect(game.playerTwo.player.isMyTurn).toBe(true);
  expect(game.playerTwo.player.isAI).toBe(true);
  game.playTurn();
  let i = 0;
  game.playerOne.gameboard.board.forEach((row) => {
    const hitTiles = row.filter((tile) => tile.isHit);
    i += hitTiles.length;
  });
  expect(i).toBe(1);
});

test('playTurn checks if all ships are hit after the attack and changes gameOver to true', () => {
  game.startGame(mockPlacementData);
  let shipTiles = [];
  game.playerTwo.gameboard.board.forEach((row) => {
    shipTiles = [...shipTiles, ...row.filter((tile) => tile.ship)];
  });

  // Hit all tiles with ship except for one
  const length = shipTiles.length;
  for (let i = 0; i < length - 1; i += 1) {
    const x = shipTiles[i].x;
    const y = shipTiles[i].y;
    game.playerTwo.gameboard.receiveAttack({ x, y });
  }
  const notHitShip = shipTiles.filter((tile) => !tile.isHit);
  expect(notHitShip.length).toBe(1);

  expect(game.playerTwo.gameboard.isAllShipsSunk()).toBe(false);
  expect(game.gameOver).toBe(false);
  game.playTurn({ x: notHitShip[0].x, y: notHitShip[0].y });
  expect(game.playerTwo.gameboard.isAllShipsSunk()).toBe(true);
  expect(game.gameOver).toBe(true);
});

test('playTurn hits all adjacent tiles if ship is sunk after hit', () => {
  game.startGame(mockPlacementData);
  let firstShipTile = null;
  game.playerTwo.gameboard.board.some((row) => {
    row.every((tile) => {
      if (tile.ship) {
        firstShipTile = tile;
        return false;
      }
      return true;
    });
  });
  const { orientation } = firstShipTile;
  const { length } = firstShipTile.ship;
  const { ship } = firstShipTile;
  expect(ship.isSunk()).toBe(false);
  let firstTile = null;
  expect(game.playerOne.player.isMyTurn).toBe(true);
  for (let i = 0; i < length; i += 1) {
    expect(game.playerOne.player.isMyTurn).toBe(true);
    if (orientation.localeCompare('horizontally') === 0) {
      const { index } = firstShipTile;
      firstTile =
        index === 0
          ? firstShipTile
          : game.playerTwo.gameboard.board[firstShipTile.y][
              firstShipTile.x - index
            ];
      game.playTurn({ x: firstTile.x + i, y: firstTile.y });
    }
    if (orientation.localeCompare('vertically') === 0) {
      const { index } = firstShipTile;
      firstTile =
        index === 0
          ? firstShipTile
          : game.playerTwo.gameboard.board[firstShipTile.y - index][
              firstShipTile.x
            ];
      game.playTurn({ x: firstTile.x, y: firstTile.y + i });
    }
  }
  expect(ship.isSunk()).toBe(true);
  expect(!!firstTile.ship).toBe(true);
  expect(firstTile.ship.isSunk()).toBe(true);
  expect(firstTile.isHit).toBe(true);

  for (let i = -1; i < length + 1; i += 1) {
    if (orientation.localeCompare('horizontally') === 0) {
      if (
        firstTile.y - 1 >= 0 &&
        firstTile.x + i <= 9 &&
        firstTile.x + i >= 0
      ) {
        expect(
          game.playerTwo.gameboard.board[firstTile.y - 1][firstTile.x + i].isHit
        ).toBe(true);
      }
      if (firstTile.x + i <= 9 && firstTile.x + i >= 0) {
        expect(
          game.playerTwo.gameboard.board[firstTile.y][firstTile.x + i].isHit
        ).toBe(true);
      }
      if (firstTile.y + 1 <= 9 && firstTile.x + i <= 9 && firstTile.x + i >= 0)
        expect(
          game.playerTwo.gameboard.board[firstTile.y + 1][firstTile.x + i].isHit
        ).toBe(true);
    }
    if (orientation.localeCompare('vertically') === 0) {
      if (
        firstTile.x - 1 >= 0 &&
        firstTile.y + i <= 9 &&
        firstTile.y + i >= 0
      ) {
        expect(
          game.playerTwo.gameboard.board[firstTile.y + i][firstTile.x - 1].isHit
        ).toBe(true);
      }
      if (firstTile.y + i <= 9 && firstTile.y + i >= 0) {
        expect(
          game.playerTwo.gameboard.board[firstTile.y + i][firstTile.x].isHit
        ).toBe(true);
      }
      if (
        firstTile.x + 1 <= 9 &&
        firstTile.y + i <= 9 &&
        firstTile.y + i >= 0
      ) {
        expect(
          game.playerTwo.gameboard.board[firstTile.y + i][firstTile.x + 1].isHit
        ).toBe(true);
      }
    }
  }
});
