/*'use strict';

angular.module('jwtApp')
    .service('auth', function auth($http, API_URL, authToken, $state, $window, $q, alert) {

        function authSuccessful(res) {
            authToken.setToken(res.token);
            alert('success', 'Welcome ', 'Thanks for coming back ' + res.user.email + '!');
            $state.go('bunches');
        }

        this.revokeGoogleToken = function (access_token) {
            return $http.get('https://accounts.google.com/o/oauth2/revoke?token=' + access_token).success(function () {}).error(function () {});
        }

        this.stravaAuth = function () {

            var urlBuilder = [];
            var clientId = '549020993769-tn974vfkrovsr1k4g65135k6m02vec6j.apps.googleusercontent.com';
            var deferred = $q.defer();
            //console.log(access_token);
            $http.post(API_URL + 'auth/google', {
                access_token: access_token,
                clientId: clientId,
                redirectUri: '/'
            }).success(function (jwt) {
                console.log(jwt);
                authSuccessful(jwt);
                deferred.resolve(jwt);
            }).error(function (err) {
                alert('warning', "Unable to connect to google?", '');
            });

            return deferred.promise;
        }

    });*/