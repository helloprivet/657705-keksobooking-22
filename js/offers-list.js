'use strict';

import {createSimilarOffers} from './data.js';
import {createOfferTemplate} from './offer-template.js';

const OFFERS_COUNT = 1;

const similarOffersList = document.querySelector('.map__canvas');
const similarListFragment = document.createDocumentFragment();
const similarOffers = createSimilarOffers(OFFERS_COUNT);


similarOffers.forEach((value) => {
  similarListFragment.appendChild(createOfferTemplate(value));
});

similarOffersList.appendChild(similarListFragment);
