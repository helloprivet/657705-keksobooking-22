const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const showAlert = (message) => {
  const ALERT_SHOW_TIME = 5000;
  const alertContainer = document.createElement('div');

  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const showSuccessMessage = () => {
  const templateClone = successTemplate.cloneNode(true);
  const main = document.querySelector('main');

  main.appendChild(templateClone);

  return templateClone;
};

const showErrorMessage = () => {
  const templateClone = errorTemplate.cloneNode(true);
  const main = document.querySelector('main');

  main.appendChild(templateClone);

  return templateClone;
};

export {showAlert, showSuccessMessage, showErrorMessage};
