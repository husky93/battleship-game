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

  function handleDragStart(e) {
    this.style.opacity = '0';
    this.style.zIndex = '-999';
    dropped = false;
    dragSrcEl = this;
    draggingWidth = e.srcElement.dataset.width;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);
  }

  function toggleActive(ship) {
    const width = parseInt(ship.dataset.width, 10);
    const firstTile = ship.parentElement;
    const x = parseInt(firstTile.dataset.x, 10);
    const y = parseInt(firstTile.dataset.y, 10);

    if (mode === 'horizontal') {
      for (let i = 0; i < width; i += 1) {
        const tile = document.querySelector(
          `[data-x='${x + i}'][data-y='${y}']`
        );
        tile.classList.toggle('active');
      }
    }
    if (mode === 'vertical') {
      for (let i = 0; i < width; i += 1) {
        const tile = document.querySelector(
          `[data-x='${x}'][data-y='${y + i}']`
        );
        tile.classList.toggle('active');
      }
    }
  }

  function handleDragStartPlaced(e) {
    this.style.opacity = '0';
    this.style.zIndex = '-999';
    dropped = false;
    dragSrcEl = this;
    draggingWidth = e.srcElement.dataset.width;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);
    toggleActive(this);
  }

  function handleDragEnd(e) {
    this.style.opacity = '1';
    this.style.zIndex = '20';
    shipsArray.forEach((item) => {
      item.classList.remove('over');
    });
    if (e.dataTransfer.dropEffect !== 'none' && dropped) {
      this.remove();
    } else {
      toggleActive(this);
    }
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

  function handleDrop(e) {
    e.stopPropagation();
    this.classList.remove('over');
    const x = parseInt(this.dataset.x, 10);
    const y = parseInt(this.dataset.y, 10);
    const width = parseInt(draggingWidth, 10);
    if (
      dragSrcEl !== this &&
      !this.classList.contains('active') &&
      !isOutOfBounds(x, y, width)
    ) {
      dropped = true;
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
      e.dataTransfer.clearData();
      const ship = this.firstElementChild;
      toggleActive(ship);
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
  return { createDragDrop };
})();

export default dragdrop;
