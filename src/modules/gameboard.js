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
  const placeShip = () => {};
  const recieveAttack = () => {};
  const isAllShipsSunk = () => {};
  return { board, placeShip, isAllShipsSunk, recieveAttack };
};

export default Gameboard;
