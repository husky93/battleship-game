import elementsDOM from './elementsDOM';

const createHeader = () => {
  const header = elementsDOM.createWrapper(['header'], 'header');
  const heading = elementsDOM.createHeading(['h1'], 'h1', 'BATTLESHIPS');

  header.append(heading);

  return header;
};

export default createHeader;
