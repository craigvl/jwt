'use strict';

angular.module('jwtApp')
    .controller('LogoutCtrl', function (authToken, $state) {
        authToken.removeToken();
        $state.go('main');
    });