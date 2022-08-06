const isAllTruthy = (array) => {
  let allTruthy = true;
  array.forEach((element) => {
    allTruthy = allTruthy && !!element;
  });
  return allTruthy;
};

export default isAllTruthy;
