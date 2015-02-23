'use strict';

angular.module('jwtApp')
    .controller('BunchcreateCtrl', function ($scope, $http, API_URL, leafletData, alert) {

        $scope.center = {};
        $scope.availableDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        $scope.hours = ['1', '2', '3', '4', '5', '6', '7'];
        $scope.multipleSelect = {};
        $scope.multipleSelect.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        $scope.oneoff = false;
        $scope.private = false;

        $http.get(API_URL + 'location').success(function (locations) {
            $scope.locations = locations;
        });

        $http.get(API_URL + 'location/byuser').success(function (startlocation) {
            $scope.startlocation = startlocation;
            console.log(startlocation);
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
                        message: "Where does the ride start?",
                        draggable: true
                    }
                }
        });

        $scope.$on("leafletDirectiveMap.click", function (event, args) {
            var leafEvent = args.leafletEvent;
            $scope.markers.mainMarker.lat = leafEvent.latlng.lat;
            $scope.markers.mainMarker.lng = leafEvent.latlng.lng;
        });

        $scope.submit = function () {
            console.log($scope.name);
            $http.post(API_URL + 'bunch/create', {
                name: $scope.name
            }).success(function () {
                alert('success', "bunch created", '');
            }).error(function (err) {
                alert('warning', "Unable to connect to google?", '');
            });

            console.log($scope.oneoff);
            console.log($scope.regularTime);
            console.log($scope.oneOffTime);
            console.log($scope.multipleSelect.days);
            console.log($scope.hour);
        }
    });