'use strict';

angular.module('jwtApp')
    .factory('rideServices', function (API_URL, $http) {
        return {
            getUserRides: function () {
                return $http.get(API_URL + 'ride/byuser')
            },
            addRider: function (rideid) {
                return $http.post(API_URL + 'ride/addrider', {
                    rideid: rideid
                })
            },
            removeRider: function (rideid) {
                return $http.post(API_URL + 'ride/removerider', {
                    rideid: rideid
                })
            },
            getRiders: function (rideid) {
                return $http.get(API_URL + 'ride/getriders?id=' + rideid)
            }
        }
    });