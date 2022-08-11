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
    }
    if (isGameOver()) {
      gameOver = true;
    }
    if (!hitTile.ship) {
      playerOne.player.changeTurn();
      playerTwo.player.changeTurn();
    }
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
