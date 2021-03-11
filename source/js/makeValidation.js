'use strict';

const validationTextErrors = {
  required: () => {
    return 'Обязательное поле. Пожалуйста, заполните его. CUSTOM';
  },

  minLenght: (evt, obj) => {
    let {minLenght} = obj;
    const left = minLenght - evt.target.value.length;
    return `Минимальная длина строки ${minLenght} символов. Осталось ${left} символов. CUSTOM`;
  },

  maxLenght: (evt, obj) => {
    let {maxLenght} = obj;
    return `Максимальная длина строки ${maxLenght} символов. CUSTOM`;
  },

  maxValue: (evt, obj) => {
    let {maxValue} = obj;
    return `Максимальная цена - ${maxValue} руб. CUSTOM`;
  },
};

const validationParameters = (obj) => {
  if (typeof obj !== 'object' && Object.keys(obj).length === 0) {
    return false;
  }

  return obj;
};

const inputRequired = (evt, obj) => {
  let validValue = {};
  for (let key in obj) {
    switch (key) {
      case 'required':
        validValue[key] = evt.target.value.length === 0;
        break;
    }
  }

  return validValue;
};

const inputLenght = (evt, obj) => {
  let validValue = {};
  for (let key in obj) {
    switch (key) {
      case 'minLenght':
        validValue[key] = evt.target.value.length < obj[key];
        break;
      case 'maxLenght':
        validValue[key] = evt.target.value.length > obj[key];
        break;
    }
  }

  return validValue;
};

const inputValue = (evt, obj) => {
  let validValue = {};

  for (let key in obj) {
    switch (key) {
      case 'maxValue':
        validValue[key] = evt.target.value >= obj[key];
        break;
    }
  }

  return validValue;
};

const validationFunctions = {
  required: inputRequired,
  minLenght: inputLenght,
  maxLenght: inputLenght,
  maxValue: inputValue,
};

const makeValidation = (obj) => {
  return (evt) => {

    let validValue = {};
    let messages = [];
    const parameters = validationParameters(obj);

    if (parameters) {
      for (let key in parameters) {
        if (key in validationFunctions) {
          const currentValue = validationFunctions[key](evt, obj);
          for (let key in currentValue) {
            validValue[key] = currentValue[key];
          }
        }
      }

      for (let key in validValue) {
        if (validValue[key]) {
          messages.push(validationTextErrors[key](evt, obj));
        }
      }
    }

    if (messages.length !== 0) {
      evt.target.setCustomValidity(messages.join('\n'));
    } else {
      evt.target.setCustomValidity('');
    }

    evt.target.reportValidity();
  };
};

export {makeValidation};
