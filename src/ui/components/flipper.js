import elementsDOM from './elementsDOM';

const createFlipper = () => {
  const flipper = elementsDOM.createWrapper(['flipper'], 'div');
  const playerSide = elementsDOM.createWrapper(['flipper-player'], 'div');
  const computerSide = elementsDOM.createWrapper(['flipper-player'], 'div');
  const paraPlayer = elementsDOM.createParagraph(
    ['flipper-text'],
    'Your turn!'
  );
  const paraComputer = elementsDOM.createParagraph(
    ['flipper-text'],
    'Computers turn!'
  );
  playerSide.append(paraPlayer);
  computerSide.append(paraComputer);
  flipper.append(playerSide, computerSide);

  return flipper;
};

export default createFlipper;
