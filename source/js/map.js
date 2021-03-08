/* global L:readonly */

const mapInit = (canvas) => {
  return L.map(canvas)
    .setView({
      lat: 35.652832,
      lng: 139.839478,
    }, 10);
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
