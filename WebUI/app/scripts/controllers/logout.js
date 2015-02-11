'use strict';

angular.module('jwtApp')
    .controller('LogoutCtrl', function ($state, $auth) {
        $auth.logout();
        $state.go('main');
    });