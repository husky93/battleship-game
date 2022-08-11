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
    const orientationToggler = elementsDOM.createWrapper(
      ['container', 'orient-toggler'],
      'div'
    );
    const btnHorizontal = elementsDOM.createButton(
      [
        'btn',
        'btn--primary',
        'btn-horizontal',
        'btn-toggle-left',
        'btn-toggle-orient',
      ],
      'horizontal'
    );
    const btnVertical = elementsDOM.createButton(
      [
        'btn',
        'btn--primary',
        'btn-vertical',
        'btn-toggle-right',
        'btn-toggle-orient',
      ],
      'vertical'
    );
    const btnReset = elementsDOM.createButton(
      ['btn', 'btn--primary', 'reset'],
      'Reset'
    );
    const btnRandom = elementsDOM.createButton(
      ['btn', 'btn--primary', 'random'],
      'Random'
    );
    const btnStart = elementsDOM.createButton(
      ['btn', 'btn--primary', 'start'],
      'Start',
      { disabled: true }
    );
    btnHorizontal.classList.toggle('active');
    orientationToggler.append(btnHorizontal, btnVertical);
    uiWrapper.append(orientationToggler, btnReset, btnRandom, btnStart);
    boardWrapper.append(dragDrop, boardPlace);
    main.append(boardWrapper, uiWrapper);
    PubSub.publish('PLACE RENDERED', {
      container: uiWrapper,
      reset: dragdrop.reset,
      switchMode: dragdrop.switchMode,
      placeRandomly: dragdrop.placeRandomly,
    });
  };

  const renderGame = (msg, data, game) => {
    clearMain();
    const boardOne = createBoard('p1', game.playerOne.gameboard.board);
    const boardTwo = createBoard('p2', game.playerTwo.gameboard.board);

    main.append(boardOne, boardTwo);
  };

  return { renderStart, renderPlace, renderGame };
})();

export default render;
