import elementsDOM from './elementsDOM';
import carrierImg from '../../assets/icons/carrier.png';
import destroyerImg from '../../assets/icons/destroyer.png';
import battleshipImg from '../../assets/icons/battleship.png';
import patrolImg from '../../assets/icons/patrol-boat.png';
import submarineImg from '../../assets/icons/submarine.png';

const dragdrop = (() => {
  const dragContainer = elementsDOM.createWrapper(['container', 'drag'], 'div');
  const carrier = elementsDOM.createImg(
    ['ship-icon', 'carrier', 'span-5'],
    carrierImg
  );
  const battleship = elementsDOM.createImg(
    ['ship-icon', 'battleship', 'span-4'],
    battleshipImg
  );
  const destroyer = elementsDOM.createImg(
    ['ship-icon', 'destroyer', 'span-3'],
    destroyerImg
  );
  const submarine = elementsDOM.createImg(
    ['ship-icon', 'submarine', 'span-3'],
    submarineImg
  );
  const patrol = elementsDOM.createImg(
    ['ship-icon', 'patrol', 'span-2'],
    patrolImg
  );
  const shipsArray = [carrier, battleship, destroyer, submarine, patrol];

  const handleDragStart = () => {};

  const handleDragEnd = () => {};

  const addDragEventListeners = () => {
    shipsArray.forEach((ship) => {
      ship.addEventListener('dragstart', handleDragStart);
      ship.addEventListener('dragend', handleDragEnd);
    });
  };

  const createDragDrop = () => {
    addDragEventListeners();
    dragContainer.append(carrier, battleship, destroyer, submarine, patrol);
    return dragContainer;
  };
  return { createDragDrop };
})();

export default dragdrop;
