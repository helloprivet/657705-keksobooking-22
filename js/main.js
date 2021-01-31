'use strict';

// Случайное число из диапазона (min и max включительно)

const getRandomNumber = (min, max) => {
  if (min >= 0 && min < max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return false;
};

// Случайное число c плавающей точкой из диапазона (min и max включительно)

const getRandomFloat = (min, max, digits) => {
  if (min >= 0 && min < max) {
    return +(Math.random() * (max - min) + min).toFixed(digits);
  }

  return false;
};

getRandomNumber(1, 5);
getRandomFloat(4, 10, 3);
