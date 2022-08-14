const Player = (options = {}) => {
  let isMyTurn = false;
  const isAI = options.isAI || false;
  const hitTilesAI = [];

  function changeTurn() {
    isMyTurn = !isMyTurn;
  }

  function playMoveAI(gameboard) {
    if (
      gameboard === undefined ||
      typeof gameboard !== 'object' ||
      Array.isArray(gameboard) ||
      gameboard === null
    ) {
      throw new Error('Need to specify gameboard object as an argument');
    }
    if (isMyTurn) {
      let hitTile = null;
      let notHitTiles = [];
      gameboard.board.forEach((row) => {
        const filtered = row.filter((tile) => !tile.isHit);
        notHitTiles = [...notHitTiles, ...filtered];
      });
      hitTilesAI.forEach((tile) => {
        if (tile.ship) {
          const { x } = tile;
          const { y } = tile;
          const tileUp =
            y - 1 >= 0
              ? { tile: gameboard.board[y - 1][x], direction: 'up' }
              : null;
          const tileRight =
            x + 1 <= 9
              ? { tile: gameboard.board[y][x + 1], direction: 'right' }
              : null;
          const tileDown =
            y + 1 <= 9
              ? { tile: gameboard.board[y + 1][x], direction: 'down' }
              : null;
          const tileLeft =
            x - 1 >= 0
              ? { tile: gameboard.board[y][x - 1], direction: 'left' }
              : null;
          const tiles = [tileUp, tileRight, tileDown, tileLeft];
          tiles.forEach((item) => {
            if (item !== null && item.tile.isHit && item.tile.ship) {
              const { direction } = item;
              if (
                direction.localeCompare('up') === 0 ||
                direction.localeCompare('down') === 0
              ) {
                if (
                  item.tile.y + 1 <= 9 &&
                  !gameboard.board[item.tile.y + 1][item.tile.x].isHit &&
                  hitTile === null
                ) {
                  gameboard.receiveAttack({
                    x: item.tile.x,
                    y: item.tile.y + 1,
                  });
                  hitTile = gameboard.board[item.tile.y + 1][item.tile.x];
                }
                if (
                  item.tile.y - 1 >= 0 &&
                  !gameboard.board[item.tile.y - 1][item.tile.x].isHit &&
                  hitTile === null
                ) {
                  gameboard.receiveAttack({
                    x: item.tile.x,
                    y: item.tile.y - 1,
                  });
                  hitTile = gameboard.board[item.tile.y - 1][item.tile.x];
                }
              }
              if (
                direction.localeCompare('left') === 0 ||
                direction.localeCompare('right') === 0
              ) {
                if (
                  item.tile.x - 1 >= 0 &&
                  !gameboard.board[item.tile.y][item.tile.x - 1].isHit &&
                  hitTile === null
                ) {
                  gameboard.receiveAttack({
                    x: item.tile.x - 1,
                    y: item.tile.y,
                  });
                  hitTile = gameboard.board[item.tile.y][item.tile.x - 1];
                }
                if (
                  item.tile.x + 1 <= 9 &&
                  !gameboard.board[item.tile.y][item.tile.x + 1].isHit &&
                  hitTile === null
                ) {
                  gameboard.receiveAttack({
                    x: item.tile.x + 1,
                    y: item.tile.y,
                  });
                  hitTile = gameboard.board[item.tile.y][item.tile.x + 1];
                }
              }
            }
          });
        }
      });
      if (hitTile !== null) {
        hitTilesAI.push(hitTile);
        return { x: hitTile.x, y: hitTile.y };
      }
      hitTilesAI.forEach((tile) => {
        if (tile.ship) {
          const { x } = tile;
          const { y } = tile;
          const tileUp =
            y - 1 >= 0
              ? { tile: gameboard.board[y - 1][x], direction: 'up' }
              : null;
          const tileRight =
            x + 1 <= 9
              ? { tile: gameboard.board[y][x + 1], direction: 'right' }
              : null;
          const tileDown =
            y + 1 <= 9
              ? { tile: gameboard.board[y + 1][x], direction: 'down' }
              : null;
          const tileLeft =
            x - 1 >= 0
              ? { tile: gameboard.board[y][x - 1], direction: 'left' }
              : null;
          const tiles = [tileUp, tileRight, tileDown, tileLeft];
          let randomTile = null;
          tiles.forEach((item) => {
            if (item !== null && !item.tile.isHit) {
              randomTile = item.tile;
            }
          });
          if (randomTile !== null && hitTile === null) {
            gameboard.receiveAttack({
              x: randomTile.x,
              y: randomTile.y,
            });
            hitTile = randomTile;
          }
        }
      });
      if (hitTile !== null) {
        hitTilesAI.push(hitTile);
        return { x: hitTile.x, y: hitTile.y };
      }
      const randomTile =
        notHitTiles[Math.floor(Math.random() * notHitTiles.length)];
      gameboard.receiveAttack({ x: randomTile.x, y: randomTile.y });
      hitTilesAI.push(randomTile);
      return { x: randomTile.x, y: randomTile.y };
    }
    return null;
  }

  return {
    get isMyTurn() {
      return isMyTurn;
    },
    get isAI() {
      return isAI;
    },
    changeTurn,
    playMoveAI,
  };
};

export default Player;
