import PubSub from 'pubsub-js';
import createBoard from './components/board';
import dragdrop from './components/dragdrop';
import Gameboard from '../modules/gameboard';
import elementsDOM from './components/elementsDOM';

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
    const boardWrapper = elementsDOM.createWrapper(['place-wrapper'], 'div');
    const boardPlace = createBoard('place', placeGameboard.board);
    const dragDrop = dragdrop.createDragDrop(boardPlace);
    const uiWrapper = elementsDOM.createWrapper(['place-ui'], 'div');
    const btnReset = elementsDOM.createButton(
      ['btn', 'btn--primary', 'reset'],
      'Reset'
    );
    uiWrapper.append(btnReset);
    boardWrapper.append(dragDrop, boardPlace);
    main.append(boardWrapper, uiWrapper);
    PubSub.publish('PLACE RENDERED', {
      container: uiWrapper,
      reset: dragdrop.reset,
    });
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
