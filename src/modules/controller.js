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
  const handlePlaceRendered = (msg, object) => {
    const wrapper = object.container;
    const btnReset = wrapper.querySelector('.reset');
    const btnRandom = wrapper.querySelector('.random');
    const btnHorizontal = wrapper.querySelector('.btn-horizontal');
    const btnVertical = wrapper.querySelector('.btn-vertical');
    addBtnListeners(btnReset, object.reset);
    addBtnListeners(btnRandom, object.placeRandomly);
    addSwitchModeListeners(btnHorizontal, btnVertical, object.switchMode);
    addSwitchModeListeners(btnVertical, btnHorizontal, object.switchMode);
  };
  return { handlePlaceRendered };
})();

export default controller;
