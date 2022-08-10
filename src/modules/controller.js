const controller = (() => {
  const addResetListeners = (btn, cb) => {
    btn.addEventListener('click', cb);
  };

  const addSwitchModeListeners = (btn, cb) => {
    btn.addEventListener('click', () => {
      cb(btn.textContent);
    });
  };
  const handlePlaceRendered = (msg, object) => {
    const wrapper = object.container;
    const btnReset = wrapper.querySelector('.reset');
    const btnHorizontal = wrapper.querySelector('.btn-horizontal');
    const btnVertical = wrapper.querySelector('.btn-vertical');
    addResetListeners(btnReset, object.reset);
    addSwitchModeListeners(btnHorizontal, object.switchMode);
    addSwitchModeListeners(btnVertical, object.switchMode);
  };
  return { handlePlaceRendered };
})();

export default controller;
