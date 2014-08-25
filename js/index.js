var parking, shops, rental;

var map = L.map('map').setView([-12.9696, -38.4676], 13);

var mapTiles = L.tileLayer('http://a.tile.thunderforest.com/cycle/{z}/{x}/{y}.png', {
  attribution: 'Maps &copy; <a href="http://www.thunderforest.com">Thunderforest</a>, \
               Data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});
mapTiles.addTo(map);

var markerIcon = L.icon({
  iconUrl: 'js/images/marker-48.png',
  iconRetinaUrl: 'js/images/marker-48@2x.png',
  iconSize: [48, 48],
  iconAnchor: [24, 42],
  popupAnchor: [0, -30],
});

var circleIcon = L.icon({
  iconUrl: 'js/images/circle-20.png',
  iconRetinaUrl: 'js/images/circle-20@2x.png',
  iconSize: [20, 20],
  popupAnchor: [0, -8],
});

function popupContent(item) {
  if (item.name) {
    return '<strong>' + item.name + '</strong>';
  } else {
    return 'Sem nome';
  }
}

$.getJSON("data/shops.geojson", function (data) {
  shops = L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng).bindPopup(popupContent(feature.properties));
    },
  });
  shops.addTo(map);
});

$.getJSON("data/parking.geojson", function (data) {
  parking = L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng).bindPopup(popupContent(feature.properties));
    },
  });
  parking.addTo(map);
});

$.getJSON("data/rental.geojson", function (data) {
  rental = L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng).bindPopup(popupContent(feature.properties));
    },
  });
  rental.addTo(map);
});
