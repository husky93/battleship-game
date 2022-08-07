const Gameboard = () => {
  const board = [];
  (function initializeBoard() {
    for (let i = 0; i < 10; i += 1) {
      const array = [];
      for (let j = 0; j < 10; j += 1) {
        const obj = { ship: null, index: null, isHit: false };
        array.push(obj);
      }
      board.push(array);
    }
  })();

  function placeShip(ship, options = {}) {
    const MAX_INDEX = 9;
    if (arguments.length < 2) {
      throw new Error(
        'Too few arguments entered. It needs to be ship nad options objects'
      );
    }
    if (options.x > MAX_INDEX || options.y > MAX_INDEX) {
      throw new Error("You're trying to place ship out of gameboard bounds");
    }
    if (options.x === undefined || options.y === undefined) {
      throw new Error('Please specify both x axis and y axis coordinates');
    }
  }
  const recieveAttack = () => {};
  const isAllShipsSunk = () => {};
  return { board, placeShip, isAllShipsSunk, recieveAttack };
};

export default Gameboard;
