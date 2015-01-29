'use strict';

angular.module('jwtApp')
    .service('auth', function auth($http, API_URL, authToken, $state) {

        function authSuccessful(res) {
            authToken.setToken(res.token);
            $state.go('main');
        }

        this.login = function (email, password) {
            return $http.post('http://localhost:1337/auth/login', {
                email: email,
                password: password
            }).success(authSuccessful);
        }

        this.register = function (email, password) {
            return $http.post('http://localhost:1337/auth/register', {
                email: email,
                password: password
            }).success(authSuccessful);
        }
    });