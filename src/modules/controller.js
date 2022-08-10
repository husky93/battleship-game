const controller = (() => {
  const handlePlaceRendered = (msg, object) => {
    const wrapper = object.container;
    const btnReset = wrapper.querySelector('.reset');
    btnReset.addEventListener('click', () => {
      object.reset();
    });
  };
  return { handlePlaceRendered };
})();

export default controller;
