const Gameboard = () => {
  const board = [];
  (function initializeBoard() {
    for (let i = 0; i < 10; i += 1) {
      const array = [];
      for (let j = 0; j < 10; j += 1) {
        const obj = {
          ship: null,
          index: null,
          isHit: false,
          isTaken: false,
          x: j,
          y: i,
        };
        array.push(obj);
      }
      board.push(array);
    }
  })();

  const isTileTaken = (x, y) => {
    if (board[y][x].isTaken) return true;
    return false;
  };

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
      (options.vertically && options.y + ship.length - 1 > MAX_INDEX)
    )
      throw new Error("You're trying to place ship out of gameboard bounds");
  }

  const placeShipVertically = (ship, x, y) => {
    const shipLength = ship.length;
    let emptyTileUp = null;
    let emptyTileDown = null;
    if (y - 1 >= 0) {
      emptyTileUp = board[y - 1][x];
    }
    if (y + shipLength <= 9) {
      emptyTileDown = board[y + shipLength][x];
    }
    if (emptyTileUp) emptyTileUp.isTaken = true;
    if (emptyTileDown) emptyTileDown.isTaken = true;
    for (let i = 0; i < shipLength; i += 1) {
      const tile = board[y + i][x];
      tile.ship = ship;
      tile.index = i;
      tile.isTaken = true;
    }
    for (let i = -1; i < shipLength + 1; i += 1) {
      if (y + i >= 0 && y + i <= 9 && x + 1 <= 9) {
        const tileOne = board[y + i][x + 1];
        tileOne.isTaken = true;
      }
      if (y + i >= 0 && y + i <= 9 && x - 1 >= 0) {
        const tileTwo = board[y + i][x - 1];
        tileTwo.isTaken = true;
      }
    }
  };

  const placeShipHorizontally = (ship, x, y) => {
    const shipLength = ship.length;
    let emptyTileLeft = null;
    let emptyTileRight = null;
    if (x - 1 >= 0) {
      emptyTileLeft = board[y][x - 1];
    }
    if (x + shipLength <= 9) {
      emptyTileRight = board[y][x + shipLength];
    }
    if (emptyTileLeft) emptyTileLeft.isTaken = true;
    if (emptyTileRight) emptyTileRight.isTaken = true;
    for (let i = 0; i < shipLength; i += 1) {
      const tile = board[y][x + i];
      tile.ship = ship;
      tile.index = i;
      tile.isTaken = true;
    }
    for (let i = -1; i < shipLength + 1; i += 1) {
      if (x + i >= 0 && x + i <= 9 && y + 1 <= 9) {
        const tileOne = board[y + 1][x + i];
        tileOne.isTaken = true;
      }
      if (x + i >= 0 && x + i <= 9 && y - 1 >= 0) {
        const tileTwo = board[y - 1][x + i];
        tileTwo.isTaken = true;
      }
    }
  };

  const placeShip = (ship, options = {}) => {
    handleErrorsPlaceShip(ship, options);
    const { x } = options;
    const { y } = options;
    if (options.vertically) placeShipVertically(ship, x, y);
    if (options.horizontally) placeShipHorizontally(ship, x, y);
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
