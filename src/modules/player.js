const Player = (options = {}) => {
  let isMyTurn = false;
  const isAI = options.isAI || false;

  function changeTurn() {
    this.isMyTurn = !this.isMyTurn;
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
    if (this.isMyTurn) {
      let hitRegistered = false;
    }
  }

  return { isMyTurn, isAI, changeTurn, playMoveAI };
};

export default Player;
