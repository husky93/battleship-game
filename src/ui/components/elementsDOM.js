const elementsDOM = (() => {
  const createWrapper = ([...classList], wrapperTag) => {
    const wrapper = document.createElement(`${wrapperTag}`);
    classList.forEach((item) => wrapper.classList.add(item));
    return wrapper;
  };

  const createImg = ([...classList], src) => {
    const image = new Image();
    image.src = src;
    classList.forEach((item) => image.classList.add(item));
    return image;
  };

  const createBoardTile = (x, y) => {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.dataset.x = x;
    tile.dataset.y = y;
    return tile;
  };
  return { createWrapper, createImg, createBoardTile };
})();

export default elementsDOM;
