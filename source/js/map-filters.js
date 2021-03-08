const mapFilters = document.querySelector('.map__filters');

const priceFilters = {
  middle: (price) => {
    return price >= 10000 && price <= 50000;
  },

  low: (price) => {
    return price < 10000;
  },

  high: (price) => {
    return price >= 50000;
  },
};

const customFilters = {
  price: priceFilters,
};

const getOfferRank = (obj) => {
  const {offer} = obj;
  let rank = 0;

  for (let [name, value] of new FormData(mapFilters)) {
    for (let key in offer) {
      if (name.includes(key)) {

        if (offer[key] === value) {
          rank += 1;
        }

        if (key in customFilters) {
          if (value in customFilters[key]) {
            if (customFilters[key][value](offer[key])) {
              rank += 1;
            }
          }
        }

        if (!isNaN(Number(value))) {
          if (Number(value) === offer[key]) {
            rank += 1;
          }
        }

        if (Array.isArray(offer[key])) {
          offer[key].forEach((item) => {
            if (item === value) {
              rank += 1;
            }
          });
        }
      }
    }
  }

  return rank;
};

const sortOffers = (offerA, offerB) => {
  const rankA = getOfferRank(offerA);
  offerA.rank = rankA;

  const rankB = getOfferRank(offerB);
  offerB.rank = rankB;

  return rankB - rankA;
};

const changeMapFilters = (cb) => {
  mapFilters.addEventListener('change', () => {
    cb();
  });
};

export {changeMapFilters, sortOffers};
