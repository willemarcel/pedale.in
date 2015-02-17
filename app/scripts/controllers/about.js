'use strict';

/**
 * @ngdoc function
 * @name pedaleinApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the pedaleinApp
 */
angular.module('pedaleinApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
