import isInt from '../helpers/isInt';
import isAllTruthy from '../helpers/isAllTruthy';

const Ship = (length) => {
  if (length === undefined) {
    throw new Error(
      'No arguments specified. Needs to have a "length" argument'
    );
  }
  if (length < 2 || length > 5) {
    throw new Error(
      'Length argument cannot be lesser than 2 or greater then 5'
    );
  }

  const hitBox = [];

  (function populateHitBox() {
    for (let i = 0; i < length; i += 1) hitBox.push(0);
  })();

  const hit = (index) => {
    if (index === undefined) {
      throw new Error(
        'No arguments specified. Needs to have a "index" argument'
      );
    }
    if (!(typeof index === 'number') || !isInt(index)) {
      throw new Error(
        'Specified index attribute needs to be an integer number'
      );
    }
    if (index + 1 > length) {
      throw new Error(
        'index attribute cannot be greater then Ship object length attribute'
      );
    }
    hitBox[index] = 1;
  };

  const isSunk = () => isAllTruthy(hitBox);

  return {
    get length() {
      return length;
    },
    get hitBox() {
      return hitBox;
    },
    hit,
    isSunk,
  };
};

export default Ship;
