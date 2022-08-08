const Gameboard = () => {
  const board = [];
  (function initializeBoard() {
    for (let i = 0; i < 10; i += 1) {
      const array = [];
      for (let j = 0; j < 10; j += 1) {
        const obj = { ship: null, index: null, isHit: false, x: j, y: i };
        array.push(obj);
      }
      board.push(array);
    }
  })();

  function handleErrorsPlaceShip(ship, options) {
    const MAX_INDEX = 9;
    if (arguments.length < 2)
      throw new Error(
        'Too few arguments entered. It needs to be ship nad options objects'
      );

    if (options.x > MAX_INDEX || options.y > MAX_INDEX)
      throw new Error("You're trying to place ship out of gameboard bounds");

    if (options.x === undefined || options.y === undefined)
      throw new Error('Specify both x axis and y axis coordinates');

    if (
      (options.horizontally === undefined &&
        options.vertically === undefined) ||
      (options.horizontally && options.vertically)
    )
      throw new Error('Specify one ship placement direction');

    if (
      (options.horizontally && options.x + ship.length - 1 > MAX_INDEX) ||
      (options.vertically && options.y - ship.length + 1 < 0)
    )
      throw new Error("You're trying to place ship out of gameboard bounds");
  }

  const placeShip = (ship, options = {}) => {
    handleErrorsPlaceShip(ship, options);

    const shipLength = ship.length;
    const { x } = options;
    const { y } = options;
    if (options.vertically) {
      for (let i = 0; i < shipLength; i += 1) {
        const tile = board[y - i][x];
        tile.ship = ship;
        tile.index = i;
      }
    }
    if (options.horizontally) {
      for (let i = 0; i < shipLength; i += 1) {
        const tile = board[y][x + i];
        tile.ship = ship;
        tile.index = i;
      }
    }
  };

  const receiveAttack = (coordinates = {}) => {
    if (coordinates.x === undefined || coordinates.y === undefined)
      throw new Error('Specify both x axis and y axis coordinates');
    const { x } = coordinates;
    const { y } = coordinates;
    const tile = board[y][x];
    if (tile.isHit) return false;
    tile.isHit = true;
    if (tile.ship) tile.ship.hit(tile.index);

    return true;
  };

  const isAllShipsSunk = () => {
    for (const row of board) {
      const shipTiles = row.filter((tile) => tile.ship !== null);
      const isAllSunk = shipTiles.every((tile) => tile.ship.isSunk());
      if (!isAllSunk) return false;
    }
    return true;
  };

  return {
    get board() {
      return board;
    },
    placeShip,
    isAllShipsSunk,
    receiveAttack,
  };
};

export default Gameboard;
