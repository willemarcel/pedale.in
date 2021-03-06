'use strict';

/**
 * @ngdoc function
 * @name pedaleinApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pedaleinApp
 */
angular.module('pedaleinApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var parking, shop, rental;

    var map = L.map('map').setView([-12.9383, -38.4261], 12);

    var cycleMap = L.tileLayer('http://a.tile.thunderforest.com/cycle/{z}/{x}/{y}.png', {
      attribution: 'Maps &copy; <a href="http://www.thunderforest.com">Thunderforest</a>, \
      Data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });
    cycleMap.addTo(map)

    var transportMap = L.tileLayer('http://a.tile.thunderforest.com/transport/{z}/{x}/{y}.png', {
      attribution: 'Maps &copy; <a href="http://www.thunderforest.com">Thunderforest</a>, \
      Data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });

    var parkingLayer = L.layerGroup([]);
    var rentalLayer = L.layerGroup([]);
    var shopLayer = L.layerGroup([]);

    var shopIcon = L.icon({
      iconUrl: 'images/shop.png',
      //iconRetinaUrl: 'js/images/marker-48@2x.png',
      iconSize: [25, 35],
      iconAnchor: [12, 35],
      popupAnchor: [0, -30],
    });

    var parkingIcon = L.icon({
      iconUrl: 'images/parking.png',
      //iconRetinaUrl: 'js/images/marker-48@2x.png',
      iconSize: [25, 35],
      iconAnchor: [12, 35],
      popupAnchor: [0, -30],
    });

    var rentalIcon = L.icon({
      iconUrl: 'images/rental.png',
      //iconRetinaUrl: 'js/images/marker-48@2x.png',
      iconSize: [25, 35],
      iconAnchor: [12, 35],
      popupAnchor: [0, -30],
    });


    function parkingPopup(item) {
      var html;
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


    function rentalPopup(item) {
      var html = '<span class="popup-title">Estação </span>';
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


    function shopPopup(item) {
      var html;
      if (item.properties.name) {
        html = '<p><span class="name">' + item.properties.name + '</span></p>';
        if (item.properties.phone) {
          html += '<span class="glyphicon glyphicon-earphone"></span><span class="phone">' + item.properties.phone + '</span><br>';
        }
        if (item.properties.website) {
          html += '<span class="glyphicon glyphicon-link"></span><a class="website" href="' + item.properties.website + '">' + item.properties.website + '</a>';
        }
      } else {
        html = 'Conhece essa loja ou oficina? Que tal <a href="http://osm.org/' + item.id + '">adicionar mais informações sobre ele no OpenStreetMap</a>?';
      }
      return html;
    }


    $.getJSON("data/parking.geojson", function (data) {
      parking = L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
          return L.marker(latlng, {icon: parkingIcon}).bindPopup(parkingPopup(feature));
        },
      });
      parking.addTo(parkingLayer);
    });


    $.getJSON("data/rental.geojson", function (data) {
      rental = L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
          return L.marker(latlng, {icon: rentalIcon}).bindPopup(rentalPopup(feature));
        },
      });
      rental.addTo(rentalLayer);
    });


    $.getJSON("data/shop.geojson", function (data) {
      shop = L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
          return L.marker(latlng, {icon: shopIcon}).bindPopup(shopPopup(feature));
        },
      });
      shop.addTo(shopLayer);
    });

    var baseMaps = {
      "Cicloviário": cycleMap,
      "Transporte Público": transportMap,
    };

    var overlayMaps = {
      "Bicicletários": parkingLayer,
      "Estações de Compartilhamento de Bicicletas": rentalLayer,
      "Lojas e Oficinas": shopLayer,
    };

    parkingLayer.addTo(map);
    rentalLayer.addTo(map);
    shopLayer.addTo(map);

    L.control.layers(baseMaps, overlayMaps, {collapsed: true}).addTo(map);

  });
