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
PubSub.subscribe('GAME RENDERED', controller.handleGameRendered);
PubSub.subscribe('TURN PLAYED', controller.handleTurnPlayed);
PubSub.subscribe('AI MOVE PLAYED', controller.handleAITurnPlayed);
PubSub.subscribe('GAME OVER', controller.handleGameOver);
PubSub.subscribe('GAME OVER', render.renderGameOver);
PubSub.subscribe('GAME OVER RENDERED', controller.handleGameOverRender);
PubSub.subscribe('START NEW GAME', render.renderPlace);

render.renderPlace();
