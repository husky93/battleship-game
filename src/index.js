import PubSub from 'pubsub-js';
import './assets/style.css';
import game from './modules/game';
import render from './ui/render';
import controller from './modules/controller';

PubSub.subscribe('PLACE RENDERED', controller.handlePlaceRendered);

// game.startGame();
// render.renderGame(game);
render.renderPlace();
