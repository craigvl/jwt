'use strict';

angular.module('jwtApp')
    .controller('LoginCtrl', function ($scope, alert, auth, usSpinnerService, $auth) {

        $scope.authenticate = function (provider) {
            $auth.authenticate(provider).then(function (res) {
                alert('success', 'welcome back ' + res.data.user.email);
            }).catch(handleError);
        }

        $scope.submit = function () {
            usSpinnerService.spin('loginSpin');
            $auth.login({
                email: $scope.email,
                password: $scope.password
            })
                .then(function (res) {
                    alert('success', 'welcome back ' + res.data.user.email);
                    usSpinnerService.stop('loginSpin');
                },handleError);
        }
        
        function handleError(err) {
            console.log(err.data);
            usSpinnerService.stop('loginSpin');
                alert('warning','something went wrong! ',err.data.message);
        }
    });