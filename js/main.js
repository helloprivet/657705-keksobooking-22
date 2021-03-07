import {showAlert} from './utils.js';
import {getData} from './data.js';
import './page-init.js';
import {renderSimilarOffersList} from './offers-list.js';
import './form-data.js';
import {sendUserFormData} from './form-data.js';
import {popupMessage} from './popup-messages.js';
import {changeMapFilters} from './map-filters.js';

const DATA_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const SEND_URL = 'https://22.javascript.pages.academy/keksobooking';

getData(DATA_URL,
  (offers) => {
    const render = renderSimilarOffersList(offers);
    render();
    changeMapFilters(
      _.debounce(() => render(), 500),
    );
  },
  () => {
    showAlert('Не удалось получить данные с сервера');
  },
);

sendUserFormData(SEND_URL, popupMessage, showAlert);
