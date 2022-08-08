import elementsDOM from './elementsDOM';

const createBoard = (player, gameboard) => {
  const board = elementsDOM.createWrapper(
    ['gameboard', `gameboard--${player}`],
    'div'
  );
  gameboard.forEach((row) => {
    const rowWrapper = elementsDOM.createWrapper(['row'], 'div');
    row.forEach((tile) => {
      const tileNode = elementsDOM.createBoardTile(tile.x, tile.y);
      rowWrapper.appendChild(tileNode);
    });
    board.appendChild(rowWrapper);
  });
  return board;
};

export default createBoard;
