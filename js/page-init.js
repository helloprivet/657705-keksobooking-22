'use strict';

import {mapInit} from './map.js';

const MAP_CANVAS = 'map-canvas';

const mapFilters = document.querySelector('.map__filters');
const filtersSelect = mapFilters.querySelectorAll('.map__filter');
const filterFeatures = mapFilters.querySelector('.map__features');
const adForm = document.querySelector('.ad-form');
const formFieldsets = adForm.querySelectorAll('fieldset');
const formAddress = adForm.querySelector('#address');

mapFilters.classList.add('ad-form--disabled');
filtersSelect.forEach((value) => {
  value.disabled = true;
});
adForm.classList.add('ad-form--disabled');
formFieldsets.forEach((value) => {
  value.disabled = true;
});

formAddress.disabled = true;
filterFeatures.disabled = true;

const map = mapInit(MAP_CANVAS);
if (map._loaded) {
  adForm.classList.remove('ad-form--disabled');
  formFieldsets.forEach((value) => {
    value.disabled = false;
  });

  mapFilters.classList.remove('ad-form--disabled');
  filtersSelect.forEach((value) => {
    value.disabled = false;
  });

  formAddress.value = '35.652832, 139.839478';
  filterFeatures.disabled = false;
}

export {map};
