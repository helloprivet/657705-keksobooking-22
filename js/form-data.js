/* global L:readonly */

import {map} from './page-init.js';
import {createMarker} from './map.js';
import {validation} from './validation.js';
import {sendData} from './data.js';
import {successEvents} from './popup-messages.js';

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [56, 56],
  iconAnchor: [28, 56],
});

const typeMinPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const titleValidRules = {
  minLenght: 30,
  maxLenght: 100,
  required: true,
};

const priceValidRules = {
  required: true,
  maxValue: 1000000,
};

const userForm = document.querySelector('.ad-form');
const userFormType = userForm.querySelector('#type');
const userFormPrice = userForm.querySelector('#price');
const userFormTimein = userForm.querySelector('#timein');
const userFormTimeout = userForm.querySelector('#timeout');
const userFormAddress = userForm.querySelector('#address');
const userFormTitle = userForm.querySelector('#title');

const userFormRoomNumber = userForm.querySelector('#room_number');

const userFormCapacity = userForm.querySelector('#capacity');
const userFormCapacityOption = userFormCapacity.querySelectorAll('option');

const mainPin = createMarker(35.65283, 139.83947, true, mainPinIcon).addTo(map);

const changeAddress = (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  userFormAddress.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

const changeTypePrice = (evt) => {
  userFormPrice.placeholder = typeMinPrice[evt.target.value];
  userFormPrice.min = typeMinPrice[evt.target.value];
};

const changeTimeInOut = (evt) => {
  switch (evt.target.name) {
    case userFormTimein.name:
      userFormTimeout.value = evt.target.value;
      break;
    case userFormTimeout.name:
      userFormTimein.value = evt.target.value;
      break;
  }
};

const changeCapacityNumber = (evt) => {
  const value = evt.target.value;

  userFormCapacityOption.forEach((item) => {
    item.disabled = true;
  });

  if (value < 100) {
    for (let i = 1; i <= value; i++) {
      userFormCapacityOption.forEach((item) => {
        if (+item.value === i) {
          item.disabled = false;
          userFormCapacity.value = i;
        }
      });
    }
  } else {
    userFormCapacityOption.forEach((item) => {
      if (+item.value === 0) {
        item.disabled = false;
        userFormCapacity.value = 0;
      }
    });
  }
};

const sendUserFormData = (url, onSuccess, onFail) => {
  userForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      url,
      () => {
        onSuccess();
        successEvents();
      },
      () => onFail(),
      new FormData(evt.target),
    );
  });
};

mainPin.on('moveend', changeAddress);
userFormType.addEventListener('change', changeTypePrice);
userFormPrice.addEventListener('focus', validation(priceValidRules));
userFormPrice.addEventListener('input', validation(priceValidRules));
userFormTimein.addEventListener('change', changeTimeInOut);
userFormTimeout.addEventListener('change', changeTimeInOut);
userFormTitle.addEventListener('focus', validation(titleValidRules));
userFormTitle.addEventListener('input', validation(titleValidRules));
userFormRoomNumber.addEventListener('change', changeCapacityNumber);

export {sendUserFormData};
