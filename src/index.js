import PubSub from 'pubsub-js';
import './assets/style.css';
import game from './modules/game';
import render from './ui/render';
import controller from './modules/controller';

PubSub.subscribe('PLACE RENDERED', controller.handlePlaceRendered);
PubSub.subscribe('SHIPS PLACED', controller.handleShipsPlaced);
PubSub.subscribe('GAME STARTED', (msg, data) =>
  controller.handleGameStart(msg, data, game)
);
PubSub.subscribe('GAME STARTED', (msg, data) =>
  render.renderGame(msg, data, game)
);

// game.startGame();
// render.renderGame(game);
render.renderPlace();
