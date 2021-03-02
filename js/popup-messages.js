const main = document.querySelector('main');

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const closePopup = (element) => {
  return () => {
    main.removeChild(element);
    document.removeEventListener('keydown', popupEscKeydown(element));
  };
};

const popupEscKeydown = (element) => {
  return (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closePopup(element)();
    }
  };
};

const successEvents = () => {
  const successMessage = main.querySelector('.success');

  document.addEventListener('keydown', popupEscKeydown(successMessage));
  successMessage.addEventListener('click', closePopup(successMessage));
};

export {successEvents};
