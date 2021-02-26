/* global L:readonly */
'use strict';

import {createSimilarOffers} from './data.js';
import {createOfferTemplate} from './offer-template.js';
import {map} from './page-init.js';
import {createMarker} from './map.js';

const OFFERS_COUNT = 3;

const pinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

const similarOffers = createSimilarOffers(OFFERS_COUNT);

similarOffers.forEach((obj) => {
  const {location} = obj;
  const userPin = createMarker(location.x, location.y, false, pinIcon);
  userPin
    .addTo(map)
    .bindPopup(
      createOfferTemplate(obj),
    );
});
