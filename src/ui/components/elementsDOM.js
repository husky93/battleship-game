const elementsDOM = (() => {
  const createWrapper = ([...classList], wrapperTag) => {
    const wrapper = document.createElement(`${wrapperTag}`);
    classList.forEach((item) => wrapper.classList.add(item));
    return wrapper;
  };

  const createBoardTile = (x, y) => {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.dataset.x = x;
    tile.dataset.y = y;
    return tile;
  };
  return { createWrapper, createBoardTile };
})();

export default elementsDOM;
