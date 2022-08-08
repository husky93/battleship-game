import createBoard from './components/board';

const render = (() => {
  const main = document.querySelector('.main');

  const renderStart = () => {};

  const renderPlace = () => {};

  const renderGame = (game) => {
    const boardOne = createBoard('p1', game.playerOne.gameboard.board);
    const boardTwo = createBoard('p2', game.playerTwo.gameboard.board);

    main.append(boardOne, boardTwo);
  };

  return { renderStart, renderPlace, renderGame };
})();

export default render;
