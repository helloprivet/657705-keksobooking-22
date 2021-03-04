/* global L:readonly */
'use strict';

import {createOfferTemplate} from './offer-template.js';
import {map} from './page-init.js';
import {createMarker} from './map.js';

const pinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

const renderSimilarOffersList = (similarOffers) => {
  similarOffers.forEach((obj) => {
    const {location} = obj;
    const userPin = createMarker(location.lat, location.lng, false, pinIcon);
    userPin
      .addTo(map)
      .bindPopup(
        createOfferTemplate(obj),
      );
  });
};

export {renderSimilarOffersList}
