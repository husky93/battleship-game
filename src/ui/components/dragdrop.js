import elementsDOM from './elementsDOM';

const dragdrop = (() => {
  const dragContainer = elementsDOM.createWrapper(['container', 'drag'], 'div');
  const carrier = null;
  const battleship = null;
  const destroyer = null;
  const submarine = null;
  const patrol = null;

  const shipsArray = [carrier, battleship, destroyer, submarine, patrol];

  function handleDragStart(e) {
    this.style.opacity = '0';
  }

  function handleDragEnd(e) {
    this.style.opacity = '1';
    shipsArray.forEach((item) => {
      item.classList.remove('over');
    });
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

  function handleDrop(e) {
    this.classList.remove('over');
    this.classList.add('dropped');
  }

  const addDragEventListeners = (board) => {
    // const tiles = board.querySelectorAll('.tile');
    // shipsArray.forEach((ship) => {
    //   ship.addEventListener('dragstart', handleDragStart);
    //   ship.addEventListener('dragend', handleDragEnd);
    //   ship.addEventListener('drop', handleDrop);
    // });
    // tiles.forEach((tile) => {
    //   tile.addEventListener('dragover', handleDragOver);
    //   tile.addEventListener('dragenter', handleDragEnter);
    //   tile.addEventListener('dragleave', handleDragLeave);
    // });
  };

  const createDragDrop = (board) => {
    addDragEventListeners(board);
    dragContainer.append(carrier, battleship, destroyer, submarine, patrol);
    return dragContainer;
  };
  return { createDragDrop };
})();

export default dragdrop;
