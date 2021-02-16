'use strict';

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
};

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
};

// Массив случайной длины из значений

const getRandomArray = (array) => {
  return new Array(getRandomNumber(1, 5)).fill(null).map(() => {
    return getRandomArrayElement(array);
  });
};

export {getRandomNumber, getRandomFloat, getRandomArrayElement, getRandomUniqueArray, getRandomArray};
