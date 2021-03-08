import {showSuccessMessage, showErrorMessage} from './utils.js';

const main = document.querySelector('main');

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const closePopup = (messageElement) => {
  return () => {
    if (main.querySelector('.' + messageElement.className)) {
      main.removeChild(messageElement);
    }
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

const messageEvents = (messageElement) => {

  if (messageElement.className === 'error') {
    const button = messageElement.querySelector('.error__button');
    button.addEventListener('click', closePopup(messageElement));
  }

  messageElement.addEventListener('click', closePopup(messageElement));
  document.addEventListener('keydown', popupEscKeydown(messageElement), {once: true});
};

const popupMessage = (responsStatus) => {
  let message = '';

  if (responsStatus) {
    message = showSuccessMessage();
  } else {
    message = showErrorMessage();
  }

  messageEvents(message);
};

export {popupMessage};
