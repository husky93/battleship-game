const controller = (() => {
  const addResetListeners = (btn, cb) => {
    btn.addEventListener('click', cb);
  };

  const addSwitchModeListeners = (btn, secondBtn, cb) => {
    btn.addEventListener('click', () => {
      cb(btn.textContent);
      btn.classList.toggle('active');
      secondBtn.classList.toggle('active');
    });
  };
  const handlePlaceRendered = (msg, object) => {
    const wrapper = object.container;
    const btnReset = wrapper.querySelector('.reset');
    const btnHorizontal = wrapper.querySelector('.btn-horizontal');
    const btnVertical = wrapper.querySelector('.btn-vertical');
    addResetListeners(btnReset, object.reset);
    addSwitchModeListeners(btnHorizontal, btnVertical, object.switchMode);
    addSwitchModeListeners(btnVertical, btnHorizontal, object.switchMode);
  };
  return { handlePlaceRendered };
})();

export default controller;
