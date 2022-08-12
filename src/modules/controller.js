import PubSub from 'pubsub-js';

const controller = (() => {
  let placementData = null;
  const addBtnListeners = (btn, cb) => {
    btn.addEventListener('click', cb);
  };

  const addSwitchModeListeners = (btn, secondBtn, cb) => {
    btn.addEventListener('click', () => {
      cb(btn.textContent);
      btn.classList.add('active');
      secondBtn.classList.remove('active');
    });
  };

  const addStartListeners = (btn) => {
    btn.addEventListener('click', () => {
      if (!btn.disabled) PubSub.publish('GAME STARTED');
    });
  };

  const handleStartAgain = () => {
    PubSub.publish('START NEW GAME');
  };

  const handleTileClick = (e) => {
    const { game } = e.currentTarget;
    const x = parseInt(e.target.dataset.x, 10);
    const y = parseInt(e.target.dataset.y, 10);
    const isTileHit = game.playerTwo.gameboard.board[y][x].isHit;
    const isTileShip = game.playerTwo.gameboard.board[y][x].ship;
    if (game.playerOne.player.isMyTurn && !isTileHit) {
      game.playTurn({ x, y });
      if (isTileShip) e.target.classList.add('tile--hitship');
      else e.target.classList.add('tile--hit');
    }
  };

  const addTileListeners = (tile, game) => {
    const selectedTile = tile;
    selectedTile.addEventListener('click', handleTileClick);
    selectedTile.game = game;
  };

  const removeTileListeners = (tile, game) => {
    const selectedTile = tile;
    selectedTile.removeEventListener('click', handleTileClick);
  };

  const handlePlaceRendered = (msg, object) => {
    const wrapper = object.container;
    const btnReset = wrapper.querySelector('.reset');
    const btnRandom = wrapper.querySelector('.random');
    const btnHorizontal = document.querySelector('.btn-horizontal');
    const btnVertical = document.querySelector('.btn-vertical');
    const btnStart = wrapper.querySelector('.start');
    addStartListeners(btnStart);
    addBtnListeners(btnReset, object.reset);
    addBtnListeners(btnRandom, object.placeRandomly);
    addSwitchModeListeners(btnHorizontal, btnVertical, object.switchMode);
    addSwitchModeListeners(btnVertical, btnHorizontal, object.switchMode);
  };

  const toggleFlipper = (text, add) => {
    const flipper = document.querySelector('.flipper-card');
    if (add) flipper.classList.add('flipped');
    else flipper.classList.remove('flipped');
    flipper.title = text;
  };

  const handleTurnPlayed = (msg, game) => {
    if (game.playerTwo.player.isMyTurn) {
      toggleFlipper('Computer turn!', true);
      const promise = new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
      promise.then(() => {
        game.playTurn();
      });
    }
    if (game.playerOne.player.isMyTurn) {
      toggleFlipper('Your turn!');
    }
  };

  const handleAITurnPlayed = (msg, tile) => {
    const gameboardNode = document.querySelector('.gameboard--p1');
    const tileNode = gameboardNode.querySelector(
      `.tile[data-x="${tile.x}"][data-y="${tile.y}"]`
    );
    if (tile.ship) tileNode.classList.add('tile--hitship');
    else tileNode.classList.add('tile--hit');
  };

  const handleGameRendered = (msg, game) => {
    const gameboardTwo = document.querySelector('.gameboard--p2');
    const tiles = gameboardTwo.querySelectorAll('.tile');
    tiles.forEach((tile) => addTileListeners(tile, game));
  };

  const handleShipsPlaced = (msg, data) => {
    const btnStart = document.querySelector('.start');
    placementData = data;
    btnStart.disabled = false;
  };

  const handleGameStart = (msg, data, game) => {
    game.startGame(placementData);
  };

  const handleGameOver = (msg, game) => {
    const gameboardTwo = document.querySelector('.gameboard--p2');
    const tiles = gameboardTwo.querySelectorAll('.tile');
    tiles.forEach((tile) => removeTileListeners(tile, game));
    console.log('game over');
  };

  const handleGameOverRender = (msg, btn) => {
    btn.addEventListener('click', handleStartAgain);
  };

  return {
    handlePlaceRendered,
    handleGameRendered,
    handleShipsPlaced,
    handleGameStart,
    handleTurnPlayed,
    handleAITurnPlayed,
    handleGameOver,
    handleGameOverRender,
  };
})();

export default controller;
