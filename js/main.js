'use strict';

const AUTHOR_AVATAR = {
  url: 'mg/avatars/user0',
  pictureFormat: '.png',
};

const OFFERS_TITLES = [
  '1-к квартира в аренду',
  '2-комн. кв., 50 м², 9/9 этаж',
  '3-комн. кв., 90 м², 4/5 этаж',
  'Коттедж, 160 м², 6 сот., 2 этажа, 3 спальни',
  'Дом, 320 м², 17 сот., 5 спален',
];

const OFFERS_DESCRIPTIONS = [
  'Большая',
  'С балконом',
  'С мебелью',
  'Можно с животными',
  'Рядом с метро',
  'Тихий район',
  'Бесплатный WiFi',
];

const OFFERS_TYPES = [
  'palace',
  'flat',
  'house ',
  'bungalow',
];

const OFFERS_CHECKIN_CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const OFFERS_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const OFFERS_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const X = {
  min: 35.65000,
  max: 35.70000,
};

const Y = {
  min: 139.70000,
  max: 139.80000,
};

const OFFERS_COUNT = 10;

// Случайное число из диапазона (min и max включительно)

const getRandomNumber = (min, max) => {
  if (min >= 0 && min < max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return false;
};

// Случайное число c плавающей точкой из диапазона (min и max включительно)

const getRandomFloat = (min, max, digits = 1) => {
  if (min >= 0 && min < max) {
    return +(Math.random() * (max - min) + min).toFixed(digits);
  }

  return false;
};

// Случайный элемент массива

const getRandomArrayElement = (array) => {
  return array[getRandomNumber(0, array.length - 1)];
}

// Массив случайной длины из значений. Значения не должны повторяться.

const getRandomUniqueArray = (array) => {
  const arrayLength = getRandomNumber(1, array.length);
  const newArray = [getRandomArrayElement(array)];

  for (let i = 1; i < arrayLength; i++) {
    const item = getRandomArrayElement(array);
    const isEveryElementUnique = newArray.every((value) => {
      return value !== item;
    });

    if (isEveryElementUnique) {
      newArray[i] = item;
    } else {
      i--;
    }
  }

  return newArray;
}

// Массив случайной длины из значений

const getRandomArray = (array) => {
  return new Array(getRandomNumber(1, 5)).fill(null).map(() => {
    return getRandomArrayElement(array);
  });
}

// Создание одного объявления

const createOffer = () => {
  const AVATAR = AUTHOR_AVATAR.url + getRandomNumber(1, 8).toString() + AUTHOR_AVATAR.pictureFormat;

  const OFFER_TITLE = getRandomArrayElement(OFFERS_TITLES);
  const OFFER_PRICE = getRandomNumber(1, 100000);
  const OFFER_TYPE = getRandomArrayElement(OFFERS_TYPES);
  const OFFER_ROOMS = getRandomNumber(1, 5);
  const OFFER_GUESTS = getRandomNumber(1, 5);
  const OFFER_CHECKIN = getRandomArrayElement(OFFERS_CHECKIN_CHECKOUT);
  const OFFER_CHECKOUT = getRandomArrayElement(OFFERS_CHECKIN_CHECKOUT);
  const OFFER_FEATURES = getRandomUniqueArray(OFFERS_FEATURES);
  const OFFER_DESCRIPTION = getRandomArrayElement(OFFERS_DESCRIPTIONS);
  const OFFER_PHOTOS = getRandomArray(OFFERS_PHOTOS);

  const LOCATION_X = getRandomFloat(X.min, X.max, 5);
  const LOCATION_Y = getRandomFloat(Y.min, Y.max, 5);
  const OFFER_ADDRESS = LOCATION_X.toString() + ', ' + LOCATION_Y.toString();

  return {
    author: {
      avatar: AVATAR,
    },
    offer: {
      title: OFFER_TITLE,
      address: OFFER_ADDRESS,
      price: OFFER_PRICE,
      type: OFFER_TYPE,
      rooms: OFFER_ROOMS,
      guests: OFFER_GUESTS,
      checkin: OFFER_CHECKIN,
      checkout: OFFER_CHECKOUT,
      features: OFFER_FEATURES,
      description: OFFER_DESCRIPTION,
      photos: OFFER_PHOTOS,
    },
    location: {
      x: LOCATION_X,
      y: LOCATION_Y,
    },
  }
}

// Создание массива объектов

const createSimilarObjects = (count) => {
  return new Array(count).fill(null).map(() => createOffer())
}

createSimilarObjects(OFFERS_COUNT);
