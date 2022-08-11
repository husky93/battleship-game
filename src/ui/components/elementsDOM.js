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

  const createButton = ([...classList], text, options = {}) => {
    const button = document.createElement('button');
    classList.forEach((item) => button.classList.add(item));
    button.textContent = text;
    if (options.type) {
      button.type = options.type;
    }
    if (options.disabled) {
      button.disabled = true;
    }
    return button;
  };

  const createDraggableShip = (width, vertical) => {
    const ship = createWrapper(['ship', 'draggable'], 'div');
    if (vertical) ship.classList.add('vertical');
    ship.dataset.width = width;
    ship.draggable = true;
    for (let i = 0; i < width; i += 1) {
      const shipTile = createWrapper(['ship-tile'], 'div');
      ship.appendChild(shipTile);
    }

    return ship;
  };
  return {
    createWrapper,
    createImg,
    createBoardTile,
    createButton,
    createDraggableShip,
  };
})();

export default elementsDOM;
