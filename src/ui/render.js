import PubSub from 'pubsub-js';
import createBoard from './components/board';
import createFlipper from './components/flipper';
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
    const gameWrapper = elementsDOM.createWrapper(['game-wrapper'], 'div');
    const midWrapper = elementsDOM.createWrapper(['mid-wrapper'], 'div');
    const flipper = createFlipper();
    const boardOne = createBoard('p1', game.playerOne.gameboard.board, {
      showShip: true,
    });
    const boardTwo = createBoard('p2', game.playerTwo.gameboard.board);
    midWrapper.appendChild(flipper);
    gameWrapper.append(boardOne, midWrapper, boardTwo);
    main.appendChild(gameWrapper);

    PubSub.publish('GAME RENDERED', game);
  };

  const renderGameOver = (msg, game) => {
    const midWrapper = document.querySelector('.mid-wrapper');
    const goWrapper = elementsDOM.createWrapper(['go-wrapper'], 'div');
    const heading = elementsDOM.createHeading(
      ['heading-go'],
      'h2',
      'Game Over'
    );
    const paraText = game.playerOne.gameboard.isAllShipsSunk()
      ? 'Computer wins'
      : 'You win';
    const para = elementsDOM.createParagraph(['text-go'], paraText);
    const uiWrapper = elementsDOM.createWrapper(['game-over-ui'], 'div');
    const btnStartAgain = elementsDOM.createButton(
      ['btn', 'btn--primary', 'start-again'],
      'Restart Game'
    );
    uiWrapper.appendChild(btnStartAgain);
    goWrapper.append(heading, para, uiWrapper);
    midWrapper.appendChild(goWrapper);

    PubSub.publish('GAME OVER RENDERED', btnStartAgain);
  };

  return { renderPlace, renderGame, renderGameOver };
})();

export default render;
