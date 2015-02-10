'use strict';

angular.module('jwtApp')
    .controller('LoginCtrl', function ($scope, alert, auth, usSpinnerService, Facebook, $timeout) {

        //Start Facebook Login-------------

        $scope.$watch(
            function () {
                return Facebook.isReady();
            },
            function (newVal) {
                if (newVal)
                    $scope.facebookReady = true;
            }
        );

        var userIsConnected = false;

        Facebook.getLoginStatus(function (response) {
            if (response.status == 'connected') {
                $scope.logged = true;
                userIsConnected = true;
            }
        });

        /**
         * IntentLogin
         */
        $scope.IntentLogin = function () {

            if (!userIsConnected) {
                $scope.login();
            }
        };

        /**
         * Login
         */
        $scope.login = function () {
            Facebook.login(function (response) {
                if (response.status == 'connected') {
                    $scope.logged = true;
                    $scope.me();
                }

            });
        };

        /**
         * me
         */
        $scope.me = function () {
            console.log('fff');
            Facebook.api('/me', function (response) {
                /**
                 * Using $scope.$apply since this happens outside angular framework.
                 */
                $scope.$apply(function () {
                    console.log(response);
                });

            });
        };

        /**
         * Logout
         */
        $scope.logout = function () {
            Facebook.logout(function () {
                $scope.$apply(function () {
                    $scope.user = {};
                    $scope.logged = false;
                });
            });
        };

        /**
         * Taking approach of Events :D
         */
        $scope.$on('Facebook:statusChange', function (ev, data) {
            console.log('Status: ', data);
            if (data.status == 'connected') {
                $scope.$apply(function () {

                });
            } else {
                $scope.$apply(function () {

                    // Dismiss byebye message after two seconds
                    $timeout(function () {

                    }, 2000)
                });
            }

        });

        //End Facebook Login-------------

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