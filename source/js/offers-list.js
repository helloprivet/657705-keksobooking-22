/* global L:readonly */

import {createOfferTemplate} from './offer-template.js';
import {map} from './page-init.js';
import {createMarker} from './map.js';
import {sortOffers} from './map-filters.js';

const pinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

const mapFilters = document.querySelector('.map__filters');

const renderSimilarOffersList = (similarOffers) => {
  let layers = L.layerGroup();

  return () => {
    let similarOffersByRank = [];
    let similarOffersByFilters = [];
    let filtersCount = 0;

    const filtersUsed = new FormData(mapFilters);

    layers.clearLayers();

    for (let [, value] of filtersUsed) {
      if (value !== 'any') {
        filtersCount++;
      }
    }

    similarOffers.slice().sort(sortOffers);

    similarOffers.forEach((value) => {
      if (value.rank > 0) {
        similarOffersByRank.push(value);
      }
    });

    if (similarOffersByRank.length !== 0) {
      similarOffersByRank.forEach((value) => {
        if (value.rank === filtersCount) {
          similarOffersByFilters.push(value);
        }
      });

      similarOffersByFilters
        .slice(0, 10)
        .forEach((obj) => {
          const {location} = obj;
          const userPin = createMarker(location.lat, location.lng, false, pinIcon);
          userPin
            .bindPopup(
              createOfferTemplate(obj),
            );

          layers.addLayer(userPin);
        });
    } else {
      similarOffers
        .slice(0, 10)
        .forEach((obj) => {
          const {location} = obj;
          const userPin = createMarker(location.lat, location.lng, false, pinIcon);
          userPin
            .bindPopup(
              createOfferTemplate(obj),
            );

          layers.addLayer(userPin);
        });
    }

    layers.addTo(map);
  };
};

export {renderSimilarOffersList};
