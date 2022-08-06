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
  return { length };
};

export default Ship;
