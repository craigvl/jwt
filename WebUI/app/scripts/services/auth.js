'use strict';

angular.module('jwtApp')
    .service('auth', function auth($http, API_URL, authToken, $state) {

        function authSuccessful(res) {
            authToken.setToken(res.token);
            $state.go('bunches');
        }

        this.login = function (email, password) {
            return $http.post(API_URL + 'auth/login', {
                email: email,
                password: password
            }).success(authSuccessful);
        }

        this.register = function (email, password, firstname, lastname) {
            return $http.post(API_URL + 'auth/register', {
                email: email,
                password: password,
                lastname: lastname,
                firstname: firstname,
            }).success(authSuccessful);
        }
    });