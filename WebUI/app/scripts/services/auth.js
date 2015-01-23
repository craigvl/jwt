'use strict';

angular.module('jwtApp')
    .service('auth', function auth($http, API_URL, authToken,$state) {
        var url = API_URL + 'login';

        this.login = function (email, password) {
            return $http.post(url, {
                email: email,
                password: password
            }).success(function (res) {
                authToken.setToken(res.token);
                $state.go('main');
            })
        }
    });