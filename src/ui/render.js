import createBoard from './components/board';
import dragdrop from './components/dragdrop';
import Gameboard from '../modules/gameboard';

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
    const placeGameboard = Gameboard();
    const boardPlace = createBoard('place', placeGameboard.board);
    const dragDrop = dragdrop.createDragDrop(boardPlace);
    main.append(dragDrop, boardPlace);
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
