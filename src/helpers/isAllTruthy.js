const isAllTruthy = (array) => {
  let allTruthy = true;
  array.forEach((element) => {
    allTruthy = allTruthy && element == true;
  });
  return allTruthy;
};

export default isAllTruthy;
