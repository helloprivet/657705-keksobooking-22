const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
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

const showImg = () => {
  const container = document.createElement('img');
  const img = container.cloneNode(true);

  img.width = 70;
  img.height = 70;

  return img;
}

export {showAlert, showSuccessMessage, showErrorMessage, showImg};
