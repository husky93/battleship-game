import elementsDOM from './elementsDOM';

const dragdrop = (() => {
  const dragContainer = elementsDOM.createWrapper(['container', 'drag'], 'div');
  const carrier = elementsDOM.createDraggableShip(5);
  const battleship = elementsDOM.createDraggableShip(4);
  const destroyer = elementsDOM.createDraggableShip(3);
  const submarine = elementsDOM.createDraggableShip(3);
  const patrol = elementsDOM.createDraggableShip(2);
  let dragSrcEl;
  let mode = 'horizontal';
  let draggingWidth = null;
  let dropped = false;

  const shipsArray = [carrier, battleship, destroyer, submarine, patrol];

  const toggleActiveHorizontal = (x, y, width, toggle) => {
    if (mode === 'horizontal') {
      for (let i = -1; i < width + 1; i += 1) {
        const tile = document.querySelector(
          `[data-x='${x + i}'][data-y='${y}']`
        );
        if (tile && toggle.add) tile.classList.add('active');
        if (tile && toggle.remove) tile.classList.remove('active');
        if (y - 1 >= 0) {
          const tileAbove = document.querySelector(
            `[data-x='${x + i}'][data-y='${y - 1}']`
          );
          if (tileAbove && toggle.add) tileAbove.classList.add('active');
          if (tileAbove && toggle.remove) tileAbove.classList.remove('active');
        }
        if (y + 1 <= 9) {
          const tileBelow = document.querySelector(
            `[data-x='${x + i}'][data-y='${y + 1}']`
          );
          if (tileBelow && toggle.add) tileBelow.classList.add('active');
          if (tileBelow && toggle.remove) tileBelow.classList.remove('active');
        }
      }
    }
  };

  const toggleActiveVertical = (x, y, width, toggle) => {
    if (mode === 'vertical') {
      for (let i = -1; i < width + 1; i += 1) {
        const tile = document.querySelector(
          `[data-x='${x}'][data-y='${y + i}']`
        );
        if (tile && toggle.add) tile.classList.add('active');
        if (tile && toggle.remove) tile.classList.remove('active');
        if (x - 1 >= 0) {
          const tileLeft = document.querySelector(
            `[data-x='${x - 1}'][data-y='${y + i}']`
          );
          if (tileLeft && toggle.add) tileLeft.classList.add('active');
          if (tileLeft && toggle.remove) tileLeft.classList.remove('active');
        }
        if (x + 1 <= 9) {
          const tileRight = document.querySelector(
            `[data-x='${x + 1}'][data-y='${y + i}']`
          );
          if (tileRight && toggle.add) tileRight.classList.add('active');
          if (tileRight && toggle.remove) tileRight.classList.remove('active');
        }
      }
    }
  };

  const toggleActive = (ship, toggle = {}) => {
    const width = parseInt(ship.dataset.width, 10);
    const firstTile = ship.parentElement;
    const x = parseInt(firstTile.dataset.x, 10);
    const y = parseInt(firstTile.dataset.y, 10);

    toggleActiveHorizontal(x, y, width, toggle);
    toggleActiveVertical(x, y, width, toggle);
  };

  const toggleActiveDragStart = (ship) => {
    const ships = [...document.querySelectorAll('.tile .ship')];
    const shipsFiltered = ships.filter((elem) => !elem.isSameNode(ship));
    toggleActive(ship, { remove: true });

    shipsFiltered.forEach((item) => toggleActive(item, { add: true }));
  };

  const switchMode = (string) => {
    mode = string;
    if (string === 'vertical')
      shipsArray.forEach((ship) => ship.classList.add('vertical'));
    if (string === 'horizontal')
      shipsArray.forEach((ship) => ship.classList.remove('vertical'));
  };

  const reset = () => {
    const ships = document.querySelectorAll('.ship');
    ships.forEach((ship) => {
      toggleActive(ship, { remove: true });
      ship.remove();
      dragContainer.appendChild(ship);
    });
  };

  function handleDragStart(e) {
    this.style.opacity = '0';
    this.style.zIndex = '0';
    dropped = false;
    dragSrcEl = this;
    draggingWidth = e.srcElement.dataset.width;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);
  }

  function handleDragStartPlaced(e) {
    this.style.opacity = '0';
    this.style.zIndex = '0';
    dropped = false;
    dragSrcEl = this;
    draggingWidth = e.srcElement.dataset.width;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);
    toggleActiveDragStart(this);
  }

  function handleDragEnd(e) {
    this.style.opacity = '1';
    this.style.zIndex = '20';
    shipsArray.forEach((item) => {
      item.classList.remove('over');
    });
    if (e.dataTransfer.dropEffect !== 'none' && dropped) {
      this.remove();
    } else if (this.parentElement.classList.contains('tile'))
      toggleActive(this, { add: true });
  }

  function handleDragOver(e) {
    e.preventDefault();
    return false;
  }

  function handleDragEnter(e) {
    this.classList.add('over');
  }

  function handleDragLeave(e) {
    this.classList.remove('over');
  }

  const addSingleShipListeners = (ship) => {
    ship.removeEventListener('dragstart', handleDragStart);
    ship.addEventListener('dragstart', handleDragStartPlaced);
    ship.addEventListener('dragend', handleDragEnd);
  };

  const isOutOfBounds = (x, y, width) => {
    if (mode === 'horizontal') {
      if (x + width - 1 > 9) {
        return true;
      }
    }
    if (mode === 'vertical') {
      if (y + width - 1 > 9) {
        return true;
      }
    }

    return false;
  };

  const canPlace = (tile, width) => {
    if (tile.classList.contains('active')) return false;
    const x = parseInt(tile.dataset.x, 10);
    const y = parseInt(tile.dataset.y, 10);
    for (let i = 0; i < width; i += 1) {
      const xCoord = mode === 'horizontal' ? x + i : x;
      const yCoord = mode === 'horizontal' ? y : y + i;
      const nextTile = document.querySelector(
        `.tile[data-x="${xCoord}"][data-y="${yCoord}"]`
      );
      if (nextTile.classList.contains('active')) return false;
    }
    return true;
  };

  function handleDrop(e) {
    e.stopPropagation();
    this.classList.remove('over');
    const x = parseInt(this.dataset.x, 10);
    const y = parseInt(this.dataset.y, 10);
    const width = parseInt(draggingWidth, 10);
    if (
      dragSrcEl !== this &&
      canPlace(this, width) &&
      !isOutOfBounds(x, y, width)
    ) {
      dropped = true;
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
      e.dataTransfer.clearData();
      const ship = this.firstElementChild;
      toggleActive(ship, { add: true });
      this.firstElementChild.style.opacity = '1';
      this.firstElementChild.style.zIndex = '20';
      addSingleShipListeners(ship);
    }
    return false;
  }

  const addDragEventListeners = (board) => {
    const tiles = board.querySelectorAll('.tile');
    shipsArray.forEach((ship) => {
      ship.addEventListener('dragstart', handleDragStart);
      ship.addEventListener('dragend', handleDragEnd);
    });
    tiles.forEach((tile) => {
      tile.addEventListener('dragover', handleDragOver);
      tile.addEventListener('dragenter', handleDragEnter);
      tile.addEventListener('dragleave', handleDragLeave);
      tile.addEventListener('drop', handleDrop);
    });
  };

  const createDragDrop = (board) => {
    addDragEventListeners(board);
    dragContainer.append(carrier, battleship, destroyer, submarine, patrol);
    return dragContainer;
  };
  return { createDragDrop, reset, switchMode };
})();

export default dragdrop;
