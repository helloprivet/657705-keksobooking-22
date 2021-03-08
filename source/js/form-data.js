/* global L:readonly */

import _ from 'lodash';
import {map} from './page-init.js';
import {createMarker} from './map.js';
import {validation} from './validation.js';
import {sendData} from './data.js';
import {showImg} from './utils.js';
import {renderData} from './get-data.js';

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [56, 56],
  iconAnchor: [28, 56],
});

const tokyoCoordinates = {
  lat: 35.65283,
  lng: 139.83947,
};

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

const userFormAvatarChooser = userForm.querySelector('.ad-form-header__input');
const userFormAvatarPreview = userForm.querySelector('.ad-form-header__preview img');
const userFormAvatarDefault = userFormAvatarPreview.src;

const userFormImageChooser = userForm.querySelector('.ad-form__upload input[type=file]');
const userFormImagePreview = userForm.querySelector('.ad-form__photo');

const userFormRoomNumber = userForm.querySelector('#room_number');

const userFormCapacity = userForm.querySelector('#capacity');
const userFormCapacityOption = userFormCapacity.querySelectorAll('option');

const userFormResetBtn = userForm.querySelector('.ad-form__reset');
const userMapFilters = document.querySelector('.map__filters');

const mainPin = createMarker(tokyoCoordinates['lat'], tokyoCoordinates['lng'], true, mainPinIcon).addTo(map);

const changeAddress = (mainPin) => {
  return () => {
    const {lat, lng} = mainPin.getLatLng();
    userFormAddress.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  };
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

const defaultInputs = (evt = false) => {
  if (evt) {
    evt.preventDefault();
  }

  userForm.reset();
  userMapFilters.reset();
  mainPin.setLatLng({
    lat: tokyoCoordinates['lat'],
    lng: tokyoCoordinates['lng'],
  });

  changeAddress(mainPin)();

  userFormAvatarPreview.src = userFormAvatarDefault;

  while (userFormImagePreview.firstChild) {
    userFormImagePreview.removeChild(userFormImagePreview.firstChild);
  }

  renderData();
};

const previewImage = (preview, customImage = false) => {
  const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  let customPreview = preview;

  return (evt) => {
    const file = evt.target.files[0];

    if (file) {
      const fileType = file.type;

      if (customImage) {
        customPreview = preview.appendChild(customImage);
      }

      const matches = FILE_TYPES.some((it) => {
        return fileType.includes(it);
      });

      if (matches) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.addEventListener('load', () => {
          customPreview.src = reader.result;
        });

      }
    }
  };
};

const sendUserFormData = (url, popupMessage, onFail) => {
  userForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      url,
      (responsStatus) => {
        popupMessage(responsStatus);
      },
      () => onFail('Ошибка сервера'),
      new FormData(evt.target),
      defaultInputs,
    );
  });
};

const titleValid = (cb) => {
  userFormTitle.addEventListener('input', (evt) => {
    evt.target.setCustomValidity(' ');
    cb(evt);
  });
};

titleValid(_.debounce(
  (evt) => {
    validation(titleValidRules)(evt);
  }, 500));

mainPin.on('moveend', changeAddress(mainPin));
userFormType.addEventListener('change', changeTypePrice);
userFormPrice.addEventListener('focus', validation(priceValidRules));
userFormPrice.addEventListener('input', validation(priceValidRules));
userFormTimein.addEventListener('change', changeTimeInOut);
userFormTimeout.addEventListener('change', changeTimeInOut);
userFormTitle.addEventListener('focus', validation(titleValidRules));
userFormRoomNumber.addEventListener('change', changeCapacityNumber);
userFormResetBtn.addEventListener('click', defaultInputs);
userFormAvatarChooser.addEventListener('change', previewImage(userFormAvatarPreview));
userFormImageChooser.addEventListener('change', previewImage(userFormImagePreview, showImg()));

export {sendUserFormData};
