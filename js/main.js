'use strict';

import {createOffer} from './data.js';

// Создание массива объектов

const OFFERS_COUNT = 10;

const createSimilarObjects = (count) => {
  return new Array(count).fill(null).map(() => createOffer());
};

createSimilarObjects(OFFERS_COUNT);
