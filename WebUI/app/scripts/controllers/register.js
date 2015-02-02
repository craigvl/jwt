'use strict';

angular.module('jwtApp')
    .controller('RegisterCtrl', function ($scope, $http, API_URL, alert, auth, $state) {
        $scope.local = {};
        $http.get(API_URL + 'location').success(function (locations) {
            $scope.locations = locations;
        }).error(function (err) {
            if (err == null) {
                alert('warning', "unable to get locations! ", "No web server?");
                $state.go('login');
            } else {
                alert('warning', "unable to get locations! ", err.message);
                $state.go('login');
            }
        })

        $scope.submit = function () {
            auth.register($scope.email, $scope.password, $scope.firstname, $scope.lastname, $scope.local.selected)
                .success(function (res) {
                    alert('success', 'Account Created! ', 'Welcome ' + res.user.email + '!');
                })
                .error(function (err) {
                    alert('warning', 'Something went wrong! ', err.message);
                });
        }
    });