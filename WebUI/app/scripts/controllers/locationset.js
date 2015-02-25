'use strict';

angular.module('jwtApp')
    .controller('LocationsetCtrl', function ($scope, $http, API_URL) {

        $http.get(API_URL + 'location').success(function (locations) {
            $scope.locations = locations;
        }).error(function () {});


    });