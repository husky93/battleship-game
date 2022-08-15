import elementsDOM from './elementsDOM';

const createRules = () => {
  const wrapper = elementsDOM.createWrapper(['rules-wrapper'], 'div');
  const heading = elementsDOM.createHeading(['place-info'], 'h3', 'Rules:');
  const paraOne = elementsDOM.createParagraph(
    ['rules-text'],
    '1. All ships must be at least 1 square apart.'
  );
  const paraTwo = elementsDOM.createParagraph(
    ['rules-text'],
    '2. You lose your turn when you miss.'
  );
  const paraThree = elementsDOM.createParagraph(
    ['rules-text'],
    '3. You keep the turn when you hit a ship.'
  );
  const paraFour = elementsDOM.createParagraph(
    ['rules-text'],
    '4. Whoever sinks all ships first - wins.'
  );

  wrapper.append(heading, paraOne, paraTwo, paraThree, paraFour);
  return wrapper;
};

export default createRules;
