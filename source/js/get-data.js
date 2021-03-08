import _ from 'lodash';
import {getData} from './data.js';
import {renderSimilarOffersList} from './offers-list.js';
import {changeMapFilters} from './map-filters.js';
import {showAlert} from './utils.js';

const mapFilters = document.querySelector('.map__filters');
const filtersSelect = mapFilters.querySelectorAll('.map__filter');
const DATA_URL = 'https://22.javascript.pages.academy/keksobooking/data';

const renderData = () => {
  getData(DATA_URL,
    (offers) => {
      const render = renderSimilarOffersList(offers);
      render();
      changeMapFilters(
        _.debounce(() => render(), 500),
      );

      mapFilters.classList.remove('ad-form--disabled');
      filtersSelect.forEach((value) => {
        value.disabled = false;
      });

    },
    () => {
      showAlert('Не удалось получить данные с сервера');
    },
  );
};

export {renderData}
