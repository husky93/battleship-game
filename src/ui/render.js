import createBoard from './components/board';

const render = (() => {
  const main = document.querySelector('.main');

  const clearMain = () => {
    while (main.lastElementChild) {
      main.removeChild(main.lastElementChild);
    }
  };

  const renderStart = () => {};

  const renderPlace = () => {
    clearMain();
    const boardOne = createBoard('place');

    main.appendChild(boardOne, boardTwo);
  };

  const renderGame = (game) => {
    clearMain();
    const boardOne = createBoard('p1', game.playerOne.gameboard.board);
    const boardTwo = createBoard('p2', game.playerTwo.gameboard.board);

    main.append(boardOne, boardTwo);
  };

  return { renderStart, renderPlace, renderGame };
})();

export default render;
