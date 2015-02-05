'use strict';

angular.module('jwtApp')
    .controller('LoginCtrl', function ($scope, alert, auth, usSpinnerService) {
        $scope.submit = function () {
            usSpinnerService.spin('loginSpin');
            auth.login($scope.email, $scope.password)
                .success(function (res) {
                    usSpinnerService.stop('loginSpin');
                })
                .error(function (err) {
                    usSpinnerService.stop('loginSpin');
                    alert('warning', 'Something went wrong! ', err.message);
                });
        };
    
        $scope.$on('event:google-plus-signin-success', function (event, authResult) {
            // User successfully authorized the G+ App!
            console.log(event);
            auth.googleAuth(authResult.access_token);
            usSpinnerService.spin('loginSpin');
            console.log('Signed in!');
        });
        $scope.$on('event:google-plus-signin-failure', function (event, authResult) {
            usSpinnerService.stop('loginSpin');
            console.log('Not signed into Google Plus.');
        });

    });