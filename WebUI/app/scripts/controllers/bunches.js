'use strict';

angular.module('jwtApp')
    .controller('BunchesCtrl', function ($scope, $http, API_URL, alert, $state, usSpinnerService, leafletData, locationServices) {

        $http.get(API_URL + 'bunch/byuser/').success(function (bunches) {
            $scope.bunches = bunches;

            angular.forEach(bunches, function (bunch, key) {

                $scope.markers.push({
                    lat: bunch.startlocation[0].lat,
                    lng: bunch.startlocation[0].lng,
                    message: bunch.name,
                    layer: 'rides',
                    zoom: 8
                });

            });

            //$scope.markers.push(m1);


        }).error(function (err) {
            if (err == null) {
                alert('warning', "unable to get bunches! ", "No web server?");
                $state.go('login');
            }
            if (err.message == 'location_not_set') {
                alert('warning', "Please set your location", "");
                $state.go('locationset');
            } else {
                alert('warning', "unable to get bunches! ", err.message);
                $state.go('login');
            }
        });

        $scope.addBunch = function () {
            usSpinnerService.spin('loginSpin');
            $state.go('bunchcreate');
        };

        $scope.center = {};
        $scope.markers = [];

        $scope.layers = {
            baselayers: {
                osm: {
                    name: 'OpenStreetMap',
                    type: 'xyz',
                    url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    layerOptions: {
                        subdomains: ['a', 'b', 'c'],
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                        continuousWorld: true
                    }
                }
            },
            overlays: {
                rides: {
                    name: 'Rides',
                    type: 'markercluster',
                    visible: true
                }
            }
        };

        locationServices.getUserLocation().success(function (startlocation) {
            $scope.startlocation = startlocation;
            console.log(startlocation);
            $scope.center = {
                lat: $scope.startlocation.lat,
                lng: $scope.startlocation.lng,
                zoom: 13
            };
        }).error(function () {
            console.log('unable to get locations');
            alert('success', 'Please select a location');
            $state.go('locationset');
        });

    });