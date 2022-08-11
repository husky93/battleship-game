import PubSub from 'pubsub-js';

const controller = (() => {
  const addBtnListeners = (btn, cb) => {
    btn.addEventListener('click', cb);
  };

  const addSwitchModeListeners = (btn, secondBtn, cb) => {
    btn.addEventListener('click', () => {
      cb(btn.textContent);
      btn.classList.add('active');
      secondBtn.classList.remove('active');
    });
  };

  const addStartListeners = (btn) => {
    btn.addEventListener('click', () => {
      if (!btn.disabled) PubSub.publish('GAME STARTED');
    });
  };

  const handlePlaceRendered = (msg, object) => {
    const wrapper = object.container;
    const btnReset = wrapper.querySelector('.reset');
    const btnRandom = wrapper.querySelector('.random');
    const btnHorizontal = wrapper.querySelector('.btn-horizontal');
    const btnVertical = wrapper.querySelector('.btn-vertical');
    const btnStart = document.querySelector('.start');
    addStartListeners(btnStart);
    addBtnListeners(btnReset, object.reset);
    addBtnListeners(btnRandom, object.placeRandomly);
    addSwitchModeListeners(btnHorizontal, btnVertical, object.switchMode);
    addSwitchModeListeners(btnVertical, btnHorizontal, object.switchMode);
  };

  const handleShipsPlaced = (msg, data) => {
    const btnStart = document.querySelector('.start');
    btnStart.disabled = false;
    console.log(data);
  };

  return { handlePlaceRendered, handleShipsPlaced };
})();

export default controller;
