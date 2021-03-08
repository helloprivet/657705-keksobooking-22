'use strict';

import {mapInit} from './map.js';
import {renderData} from './get-data.js';

const MAP_CANVAS = 'map-canvas';

const mapFilters = document.querySelector('.map__filters');
const filtersSelect = mapFilters.querySelectorAll('.map__filter');
const filterFeatures = mapFilters.querySelector('.map__features');

const adForm = document.querySelector('.ad-form');
const formFieldsets = adForm.querySelectorAll('fieldset');
const formAddress = adForm.querySelector('#address');
const formCapacity = adForm.querySelector('#capacity');
const formCapacityOption = formCapacity.querySelectorAll('option');
const formRoomNumber = adForm.querySelector('#room_number');
const formRoomNumberOption = formRoomNumber.querySelectorAll('option');

mapFilters.classList.add('ad-form--disabled');
filtersSelect.forEach((value) => {
  value.disabled = true;
});
adForm.classList.add('ad-form--disabled');
formFieldsets.forEach((value) => {
  value.disabled = true;
});

formAddress.readOnly = true;
filterFeatures.disabled = true;
formCapacityOption.forEach((item) => {
  item.disabled = true;
});

const map = mapInit(MAP_CANVAS);
if (map._loaded) {
  adForm.classList.remove('ad-form--disabled');
  formFieldsets.forEach((value) => {
    value.disabled = false;
  });

  formRoomNumberOption.forEach((item) => {
    if (item.selected) {
      formCapacityOption.forEach((value) => {
        if (value.selected) {
          value.disabled = false;
        }
      });
    }
  });

  formAddress.value = '35.65283, 139.83947';
  filterFeatures.disabled = false;

  renderData();
}

export {map};
