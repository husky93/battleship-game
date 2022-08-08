const Player = (options = {}) => {
  let isMyTurn = false;
  const isAI = options.isAI || false;

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
      let notHitTiles = [];
      gameboard.board.forEach((row) => {
        const filtered = row.filter((tile) => !tile.isHit);
        notHitTiles = [...notHitTiles, ...filtered];
      });
      const randomTile =
        notHitTiles[Math.floor(Math.random() * notHitTiles.length)];
      gameboard.receiveAttack({ x: randomTile.x, y: randomTile.y });
    }
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
