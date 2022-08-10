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

  const placeShips = () => {
    playerOne.gameboard.placeShip(Ship(5), { x: 0, y: 0, horizontally: true });
    playerOne.gameboard.placeShip(Ship(4), { x: 0, y: 2, horizontally: true });
    playerOne.gameboard.placeShip(Ship(3), { x: 0, y: 4, horizontally: true });
    playerOne.gameboard.placeShip(Ship(3), { x: 5, y: 4, horizontally: true });
    playerOne.gameboard.placeShip(Ship(2), { x: 0, y: 6, horizontally: true });
    playerTwo.gameboard.placeShip(Ship(5), { x: 1, y: 3, vertically: true });
    playerTwo.gameboard.placeShip(Ship(4), { x: 3, y: 2, vertically: true });
    playerTwo.gameboard.placeShip(Ship(3), { x: 5, y: 5, vertically: true });
    playerTwo.gameboard.placeShip(Ship(3), { x: 7, y: 7, vertically: true });
    playerTwo.gameboard.placeShip(Ship(2), { x: 9, y: 3, vertically: true });
  };

  const startGame = () => {
    clearGameState();
    gameOver = false;
    playerOne.player = Player();
    playerTwo.player = Player({ isAI: true });
    playerOne.gameboard = Gameboard();
    playerTwo.gameboard = Gameboard();
    playerOne.player.changeTurn();
    placeShips();
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
