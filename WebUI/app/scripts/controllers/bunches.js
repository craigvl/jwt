'use strict';

angular.module('jwtApp')
    .controller('BunchesCtrl', function ($scope, $http, API_URL, alert, $state, usSpinnerService, leafletData, locationServices, rideServices, bunchServices, dateServices, moment) {

        var dayofweektoday = new moment().format('dddd');

        function getBunches(dayofweek) {
            bunchServices.getBunchesByUserandDay(dayofweek).success(function (bunches) {
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
        }

        function getBunchesOneOff(dayofweek, dayofyear) {
            bunchServices.getBunchesByUserandDayOneOff(dayofweek, dayofyear).success(function (bunches) {
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
        }

        var adddays = dateServices.DaysToAdd(dateServices.GetDayNumber(moment().format('dddd')), dateServices.GetDayNumber(moment().format('dddd')));
        var dayofyear = moment().add(adddays, 'd');

        getBunches(dayofweektoday);
        getBunchesOneOff(dayofweektoday, dayofyear.dayOfYear());

        /*rideServices.getUserRides().success(function (rides) {
    $scope.rides = rides;
    console.log(rides);
}).error(function () {
    console.log('unable to get rides');
});*/

        $scope.refresh = function () {
            $scope.center = {};
            $scope.markers = [];
            getBunches(dayofweektoday);
            getBunchesOneOff(dayofweektoday, dayofyear.dayOfYear());
        };

        $scope.addBunch = function () {
            usSpinnerService.spin('loginSpin');
            $state.go('bunchcreate');
        };

        $scope.center = {};
        $scope.markers = [];

        $scope.tabs = [
            {
                title: 'Sun'
            },
            {
                title: 'Mon'
            },
            {
                title: 'Tue'
            },
            {
                title: 'Wed'
            },
            {
                title: 'Thu'
            },
            {
                title: 'Fri'
            },
            {
                title: 'Sat'
            }
        ];

        $scope.activetab = function () {
            return $scope.tabs.filter(function (tab) {
                return tab.active;
            })[0];
        };

        var today = new moment();

        $scope.tabs[today.day()].active = true;

        $scope.dayofweekdisplay = today.toDate();

        $scope.tabclick = function (active) {
            $scope.bunches = [];
            $scope.markers = [];

            var adddays = dateServices.DaysToAdd(dateServices.GetDayNumber(moment().format('dddd')), dateServices.GetDayNumber(active.title));
            $scope.dayofweekdisplay = (moment().add(adddays, 'd').toDate());
            var dayofyear = moment().add(adddays, 'd');
            getBunches(active.title);
            getBunchesOneOff(active.title, dayofyear.dayOfYear());

            /*rideServices.getUserRides().success(function (rides) {
                $scope.rides = rides;
                console.log(rides);
            }).error(function () {
                console.log('unable to get rides');
            });*/

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