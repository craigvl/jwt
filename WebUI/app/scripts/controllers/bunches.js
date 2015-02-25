'use strict';

angular.module('jwtApp')
    .controller('BunchesCtrl', function ($scope, $http, API_URL, alert, $state, usSpinnerService) {

        $http.get(API_URL + 'bunch/byuser/').success(function (bunches) {
            $scope.bunches = bunches;
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
        })

        $scope.addBunch = function () {
            usSpinnerService.spin('loginSpin');
            $state.go('bunchcreate');
        }

    });