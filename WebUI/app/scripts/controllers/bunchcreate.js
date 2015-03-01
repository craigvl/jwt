'use strict';

angular.module('jwtApp')
    .controller('BunchcreateCtrl', function ($scope, $http, API_URL, leafletData, alert, $state, $auth, usSpinnerService) {

        $scope.addRoute = function () {

            $scope.routes.push({
                name: $scope.stravaride.selected.name
            });

        };

        $scope.deleteRoute = function (idx) {

            $scope.routes.splice(idx, 1);

        };

        $scope.getStravaActivities = function () {
            $scope.showmap = false;
            //alert('warning', "Strava activities! ", '');
            $http.get(API_URL + 'bunch/stravaactivities').success(function (stravarides) {
                console.log(stravarides);
                $scope.stravarides = stravarides;
                $scope.paths = {
                    p1: {
                        color: '#008000',
                        weight: 4,
                        latlngs: stravarides[1].routearray,
                        layer: 'lines'
                    }
                }
                $scope.isstravaauth = true;
                $scope.showmap = true;
            }).error(function (err) {
                $scope.isstravaauth = false;
                $scope.showmap = false;
            });
        };

        $scope.stravaAuth = function () {
            usSpinnerService.spin('createSpin');
            $auth.link('strava', $auth.getPayload()).then(function (res) {
                //alert('success', 'welcome back ' + res.data.user.email);
                if (res.data.user.locationid == null) {
                    alert('success', 'Please select a location ');
                    $state.go('locationset');
                }
                $http.get(API_URL + 'location').success(function (locations) {
                    $scope.locations = locations;
                }).error(function () {});

                $scope.getStravaActivities();
                usSpinnerService.stop('createSpin');
            }).catch();

        };

        $scope.getStravaRoute = function () {
            usSpinnerService.spin('createSpin');
            $http.get(API_URL + 'bunch/stravaactivity?id=' + $scope.stravaride.selected.id).success(function (stravaride) {
                $scope.cen = {
                        lat: stravaride.startlat,
                        lng: stravaride.startlng,
                        zoom: 11
                    },
                    $scope.paths = {
                        p1: {
                            color: '#008000',
                            weight: 4,
                            latlngs: stravaride.routearray,
                            layer: 'lines'
                        }
                    }
                usSpinnerService.stop('createSpin');
            }).error(function (err) {
                alert('warning', "Strava activities! ", err.message);
            })
        };

        $scope.routes = [];
        $scope.showmap = {};
        $scope.isstravaauth = {};
        $scope.minDate = new Date();
        $scope.time = new Date(0, 0, 0, 5, 30, 0, 0);
        $scope.oneofftime = new Date(0, 0, 0, 5, 30, 0, 0);
        $scope.center = {};
        $scope.paths = {};
        $scope.cen = {};
        $scope.availableDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        $scope.hour = {};
        $scope.stravaride = {};
        $scope.hours = ['1', '2', '3', '4', '5', '6', '7'];
        $scope.multipleSelect = {};
        $scope.multipleSelect.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        $scope.oneoff = false;
        $scope.private = false;

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
                lines: {
                    name: 'Lines',
                    type: 'group',
                    visible: true
                }
            }
        };

        $http.get(API_URL + 'location').success(function (locations) {
            $scope.locations = locations;
        }).error(function () {});

        $scope.getStravaActivities();

        $http.get(API_URL + 'location/byuser').success(function (startlocation) {
            $scope.startlocation = startlocation;
            $scope.cen = {
                    lat: $scope.startlocation.lat,
                    lng: $scope.startlocation.lng,
                    zoom: 13
                },

                $scope.center = {
                    lat: $scope.startlocation.lat,
                    lng: $scope.startlocation.lng,
                    zoom: 13
                },

                $scope.markers = {
                    mainMarker: {
                        lat: $scope.startlocation.lat,
                        lng: $scope.startlocation.lng,
                        focus: true,
                        message: "Where does the ride meet?",
                        draggable: true
                    }
                }
        }).error(function () {
            console.log('unable to get locations')
        });

        $scope.$on("leafletDirectiveMap.click", function (event, args) {
            var leafEvent = args.leafletEvent;
            $scope.markers.mainMarker.lat = leafEvent.latlng.lat;
            $scope.markers.mainMarker.lng = leafEvent.latlng.lng;
        });

        $scope.submit = function () {

            $http.post(API_URL + 'bunch/create', {
                name: $scope.name
            }).success(function () {
                alert('success', "Ride created", '');
                $state.go('bunches');
            }).error(function (err) {
                alert('warning', "Unable to create ride?", '');
            });

            console.log($scope.oneoff);
            console.log($scope.regularTime);
            console.log($scope.oneOffTime);
            console.log($scope.multipleSelect.days);
            console.log($scope.hour);
        }
    });