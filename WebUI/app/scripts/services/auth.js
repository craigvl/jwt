'use strict';

angular.module('jwtApp')
    .service('auth', function auth($http, API_URL, authToken, $state, $window, $q, alert) {

        function authSuccessful(res) {
            authToken.setToken(res.token);
            alert('success', 'Welcome ', 'Thanks for coming back ' + res.user.email + '!');
            $state.go('bunches');
        }

        this.login = function (email, password) {
            return $http.post(API_URL + 'auth/login', {
                email: email,
                password: password
            }).success(authSuccessful);
        }

        this.register = function (email, password, firstname, lastname, selectedlocationid) {
            return $http.post(API_URL + 'auth/register', {
                email: email,
                password: password,
                lastname: lastname,
                firstname: firstname,
                location: selectedlocationid
            }).success(authSuccessful);
        }

        this.googleAuth = function (access_token) {

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

    });