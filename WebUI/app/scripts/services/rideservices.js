'use strict';

angular.module('jwtApp')
    .factory('rideServices', function (API_URL, $http) {
        return {
            getUserRides: function () {
                return $http.get(API_URL + 'ride/byuser')
            }
        }
    });