'use strict';

import {map} from './page-init.js';
import {createMarker} from './map.js';

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

const mainPin = createMarker(35.652832, 139.839478, true, mainPinIcon);
mainPin.addTo(map);

const userForm = document.querySelector('.ad-form');
const userFormType = userForm.querySelector('#type');
const userFormPrice = userForm.querySelector('#price');
const userFormTimein = userForm.querySelector('#timein');
const userFormTimeout = userForm.querySelector('#timeout');
const userFormAddress = userForm.querySelector('#address');

const changeAddress = (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  userFormAddress.value = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
};

const changeType = (evt) => {
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

userFormType.addEventListener('change', changeType);
userFormTimein.addEventListener('change', changeTimeInOut);
userFormTimeout.addEventListener('change', changeTimeInOut);
mainPin.on('moveend', changeAddress);

