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

  const placeShips = () => {};

  const startGame = () => {
    clearGameState();
    gameOver = false;
    playerOne.player = Player();
    playerTwo.player = Player({ isAI: true });
    playerOne.gameboard = Gameboard();
    playerTwo.gameboard = Gameboard();
    playerOne.player.changeTurn();
  };

  const playTurn = () => {};

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
