import elementsDOM from './elementsDOM';

const createFlipper = () => {
  const flipper = elementsDOM.createWrapper(['flipper'], 'div');
  const playerSide = elementsDOM.createWrapper(
    ['flipper-card', 'flipper-player'],
    'div'
  );
  playerSide.title = 'Your turn!';

  flipper.append(playerSide);

  return flipper;
};

export default createFlipper;
