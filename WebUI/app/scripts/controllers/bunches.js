'use strict';

angular.module('jwtApp')
    .controller('BunchesCtrl', function ($scope, $http, API_URL, alert, $state, usSpinnerService, leafletData, locationServices, rideServices, moment) {

        var dayofweektoday = new moment().format('dddd');

        $http.get(API_URL + 'bunch/byuserandday?id=' + dayofweektoday).success(function (bunches) {
            $scope.bunches = bunches;

            angular.forEach(bunches, function (bunch, key) {
                console.log(bunch.startlocation[0].lat);
                $scope.markers.push({
                    lat: bunch.startlocation[0].lat,
                    lng: bunch.startlocation[0].lng,
                    message: bunch.name,
                    layer: 'rides',
                    zoom: 8
                });

            });
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

        rideServices.getUserRides().success(function (rides) {
            $scope.rides = rides;
            console.log(rides);
        }).error(function () {
            console.log('unable to get rides');
        });

        $scope.addBunch = function () {
            usSpinnerService.spin('loginSpin');
            $state.go('bunchcreate');
        };

        $scope.center = {};
        $scope.markers = [];

        $scope.tabs = [
            {
                title: 'Sunday'
            },
            {
                title: 'Monday'
            },
            {
                title: 'Tuesday'
            },
            {
                title: 'Wednesday'
            },
            {
                title: 'Thursday'
            },
            {
                title: 'Friday'
            },
            {
                title: 'Saturday'
            }
        ];

        $scope.activetab = function () {
            return $scope.tabs.filter(function (tab) {
                return tab.active;
            })[0];
        };

        var today = new moment();
        console.log(today.day());
        $scope.tabs[today.day()].active = true;


        $scope.tabclick = function (active) {
            $scope.bunches = [];
            $scope.markers = [];
            $http.get(API_URL + 'bunch/byuserandday?id=' + active.title).success(function (bunches) {
                $scope.bunches = bunches;

                angular.forEach(bunches, function (bunch, key) {
                    console.log(bunch.startlocation[0].lat);
                    $scope.markers.push({
                        lat: bunch.startlocation[0].lat,
                        lng: bunch.startlocation[0].lng,
                        message: bunch.name,
                        layer: 'rides',
                        zoom: 8
                    });

                });
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

            //alert('success', active.title);
            $scope.rides = [];
        }

        $scope.layers = {
            baselayers: {
                osm: {
                    name: 'mapbox',
                    type: 'xyz',
                    url: 'http://a.tiles.mapbox.com/v4/craigvl.lc6j9gf5/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY3JhaWd2bCIsImEiOiJTSEt3NFE0In0.uqpehJUakJt_dPUiaTKLag',
                    layerOptions: {
                        subdomains: ['a', 'b', 'c'],
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