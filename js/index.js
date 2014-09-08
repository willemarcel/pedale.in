var parking, shops, rental;

var map = L.map('map').setView([-12.9383, -38.4261], 12);

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


function rentalPopup(item) {
  html = '<span class="popup-title">Estação </span>';
  if (item.properties.ref) {
    html += '<span class="ref">' + item.properties.ref + '. </span>';
  }
  if (item.properties.name) {
    html += '<span class="name">' + item.properties.name + '</span>';
  }
  if (html === '<span class="popup-title">Estação </span>') {
    html = 'Conhece essa estação? Que tal <a href="http://osm.org/' + item.id + '">adicionar mais informações sobre ela no OpenStreetMap</a>?';
  }
  return html;
}


function parkingPopup(item) {
  if (item.properties.name) {
    html = '<span class="name">' + item.properties.name + '</span><br>';
  } else {
    html = 'Bicicletário<br>';
  }
  if (item.properties.capacity) {
    html += '<span class="capacity">' + item.properties.capacity + ' vagas</span>';
  }
  if (html === 'Bicicletário<br>') {
    html = 'Conhece esse bicicletário? Que tal <a href="http://osm.org/' + item.id + '">adicionar mais informações sobre ele no OpenStreetMap</a>?';
  }
  return html;
}


function shopPopup(item) {
  if (item.properties.name) {
    html = '<span class="name">' + item.properties.name + '</span>';
  } else {
    html = 'Conhece esse lugar? Que tal <a href="http://osm.org/' + item.id + '">adicionar mais informações sobre ele no OpenStreetMap</a>?';
  }
  return html;
}


$.getJSON("data/shops.geojson", function (data) {
  shops = L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, {icon: shopIcon}).bindPopup(shopPopup(feature));
    },
  });
  shops.addTo(map);
});


$.getJSON("data/parking.geojson", function (data) {
  parking = L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, {icon: parkingIcon}).bindPopup(parkingPopup(feature));
    },
  });
  parking.addTo(map);
});


$.getJSON("data/rental.geojson", function (data) {
  rental = L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, {icon: rentalIcon}).bindPopup(rentalPopup(feature));
    },
  });
  rental.addTo(map);
});
