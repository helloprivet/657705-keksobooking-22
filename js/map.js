/* global L:readonly */

const mapInit = (canvas) => {
  const map = L.map(canvas)
    .setView({
      lat: 35.652832,
      lng: 139.839478,
    }, 10);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  return map;
};

const createMarker = (lat, lng, draggable = false, icon) => {
  return L.marker(
    {
      lat: lat,
      lng: lng,
    },
    {
      draggable: draggable,
      icon: icon,
    },
  );
}

export {mapInit, createMarker};
