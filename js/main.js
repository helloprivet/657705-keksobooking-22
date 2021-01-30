'use strict';

const isNumberPositive = (num) => (num >= 0);

// Случайное число из диапазона (min и max включительно)

const getRandomNumber = (min, max) => {
  if (isNumberPositive(min) && isNumberPositive(max) && max > min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return false;
};

// Случайное число c плавающей точкой из диапазона (min и max включительно)

const getRandomFloat = (min, max, digits) => {
  if (isNumberPositive(min) && isNumberPositive(max) && max > min) {
    return +(Math.random() * (max - min + 1) + min).toFixed(digits);
  }

  return false;
};

getRandomNumber(1, 5);
getRandomFloat(4, 10, 3);
