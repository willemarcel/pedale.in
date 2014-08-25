var parking, shops, rental;

var map = L.map('map').setView([-12.9303, -38.4274], 12);

var mapTiles = L.tileLayer('http://a.tile.thunderforest.com/cycle/{z}/{x}/{y}.png', {
  attribution: 'Maps &copy; <a href="http://www.thunderforest.com">Thunderforest</a>, \
               Data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});
mapTiles.addTo(map);

var shopIcon = L.icon({
  iconUrl: 'icons/shop.png',
  iconRetinaUrl: 'js/images/marker-48@2x.png',
  iconSize: [25, 35],
  iconAnchor: [12, 35],
  popupAnchor: [0, -30],
});

var parkingIcon = L.icon({
  iconUrl: 'icons/parking.png',
  iconRetinaUrl: 'js/images/marker-48@2x.png',
  iconSize: [25, 35],
  iconAnchor: [12, 35],
  popupAnchor: [0, -30],
});

var rentalIcon = L.icon({
  iconUrl: 'icons/rental.png',
  iconRetinaUrl: 'js/images/marker-48@2x.png',
  iconSize: [25, 35],
  iconAnchor: [12, 35],
  popupAnchor: [0, -30],
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
      return L.marker(latlng, {icon: shopIcon}).bindPopup(popupContent(feature.properties));
    },
  });
  shops.addTo(map);
});

$.getJSON("data/parking.geojson", function (data) {
  parking = L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, {icon: parkingIcon}).bindPopup(popupContent(feature.properties));
    },
  });
  parking.addTo(map);
});

$.getJSON("data/rental.geojson", function (data) {
  rental = L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, {icon: rentalIcon}).bindPopup(popupContent(feature.properties));
    },
  });
  rental.addTo(map);
});
