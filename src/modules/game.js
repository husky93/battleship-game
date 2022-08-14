import PubSub from 'pubsub-js';
import Player from './player';
import Gameboard from './gameboard';
import Ship from './ship';

const game = (() => {
  const playerOne = { player: null, gameboard: null };
  const playerTwo = { player: null, gameboard: null };
  let gameOver = true;

  const clearGameState = () => {
    playerOne.player = null;
    playerTwo.player = null;
    playerOne.gameboard = null;
    playerTwo.gameboard = null;
    gameOver = true;
  };

  const placeShips = (data) => {
    data.forEach((ship) => {
      const { length } = ship;
      const { x } = ship;
      const { y } = ship;
      const direction = ship.vertically ? 'vertically' : 'horizontally';
      const placementOptions = { x, y, [direction]: true };
      playerOne.gameboard.placeShip(Ship(length), placementOptions);
    });
    playerTwo.gameboard.placeShipsRandomly([
      Ship(5),
      Ship(4),
      Ship(3),
      Ship(3),
      Ship(2),
    ]);
  };

  const startGame = (data) => {
    clearGameState();
    gameOver = false;
    playerOne.player = Player();
    playerTwo.player = Player({ isAI: true });
    playerOne.gameboard = Gameboard();
    playerTwo.gameboard = Gameboard();
    playerOne.player.changeTurn();
    placeShips(data);
  };

  const isGameOver = () => {
    const boardOneOver = playerOne.gameboard.isAllShipsSunk();
    const boardTwoOver = playerTwo.gameboard.isAllShipsSunk();
    return boardOneOver || boardTwoOver;
  };

  const hitAdjacentTiles = (tile, gameboard) => {
    const { orientation } = tile;
    const { index } = tile;
    const { ship } = tile;
    const { length } = ship;
    const coords = [];
    if (orientation.localeCompare('horizontally') === 0) {
      const firstTile =
        index === 0 ? tile : gameboard.board[tile.y][tile.x - index];
      const { x } = firstTile;
      const { y } = firstTile;
      for (let i = -1; i < length + 1; i += 1) {
        if (
          y - 1 >= 0 &&
          x + i >= 0 &&
          x + i <= 9 &&
          !gameboard.board[y - 1][x + i].isHit
        ) {
          gameboard.receiveAttack({ x: x + i, y: y - 1 });
          coords.push({ x: x + i, y: y - 1 });
        }

        if (x + i >= 0 && x + i <= 9 && !gameboard.board[y][x + i].isHit) {
          gameboard.receiveAttack({ x: x + i, y });
          coords.push({ x: x + i, y });
        }

        if (
          y + 1 <= 9 &&
          x + i >= 0 &&
          x + i <= 9 &&
          !gameboard.board[y + 1][x + i].isHit
        ) {
          gameboard.receiveAttack({ x: x + i, y: y + 1 });
          coords.push({ x: x + i, y: y + 1 });
        }
      }
    }
    if (orientation.localeCompare('vertically') === 0) {
      const firstTile =
        index === 0 ? tile : gameboard.board[tile.y - index][tile.x];
      const { x } = firstTile;
      const { y } = firstTile;
      for (let i = -1; i < length + 1; i += 1) {
        if (
          x - 1 >= 0 &&
          y + i >= 0 &&
          y + i <= 9 &&
          !gameboard.board[y + i][x - 1].isHit
        ) {
          gameboard.receiveAttack({ x: x - 1, y: y + i });
          coords.push({ x: x - 1, y: y + i });
        }

        if (y + i >= 0 && y + i <= 9 && !gameboard.board[y + i][x].isHit) {
          gameboard.receiveAttack({ x, y: y + i });
          coords.push({ x, y: y + i });
        }

        if (
          x + 1 <= 9 &&
          y + i >= 0 &&
          y + i <= 9 &&
          !gameboard.board[y + i][x + 1].isHit
        ) {
          gameboard.receiveAttack({ x: x + 1, y: y + i });
          coords.push({ x: x + 1, y: y + i });
        }
      }
    }
    PubSub.publish('SHIP SUNK', { game, coords });
  };

  const playTurn = (coordinates = {}) => {
    if (
      playerOne.player.isMyTurn &&
      (typeof coordinates.x !== 'number' || typeof coordinates.y !== 'number')
    )
      throw new Error('Specify coordinates for non-ai player');
    let hitTile = null;
    if (playerOne.player.isMyTurn) {
      const { gameboard } = playerTwo;
      const { x } = coordinates;
      const { y } = coordinates;
      gameboard.receiveAttack({ x, y });
      hitTile = gameboard.board[y][x];
    }
    if (playerTwo.player.isMyTurn) {
      const { gameboard } = playerOne;
      const hitCoordinates = playerTwo.player.playMoveAI(gameboard);
      const { x } = hitCoordinates;
      const { y } = hitCoordinates;
      hitTile = gameboard.board[y][x];
      PubSub.publish('AI MOVE PLAYED', hitTile);
    }
    if (isGameOver()) {
      PubSub.publish('GAME OVER', game);
      gameOver = true;
      return true;
    }
    if (hitTile.ship && hitTile.ship.isSunk()) {
      const board = playerOne.player.isMyTurn
        ? playerTwo.gameboard
        : playerOne.gameboard;
      hitAdjacentTiles(hitTile, board);
    }
    if (!hitTile.ship) {
      playerOne.player.changeTurn();
      playerTwo.player.changeTurn();
    }
    PubSub.publish('TURN PLAYED', game);
  };

  return {
    startGame,
    playTurn,
    get playerOne() {
      return playerOne;
    },
    get playerTwo() {
      return playerTwo;
    },
    get gameOver() {
      return gameOver;
    },
  };
})();

export default game;
