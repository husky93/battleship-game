const Ship = (length) => {
  if (!length) {
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
    if (!index) {
      throw new Error(
        'No arguments specified. Needs to have a "index" argument'
      );
    }
  };

  const isSunk = () => {};

  return { length, hitBox, hit, isSunk };
};

export default Ship;
