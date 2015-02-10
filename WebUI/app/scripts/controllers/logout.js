'use strict';

angular.module('jwtApp')
    .controller('LogoutCtrl', function ($window, authToken, $state, auth, $scope) {
        authToken.removeToken();
        if ($window.gapi) {
            try {
                var googleToken = gapi.auth.getToken();
                if (googleToken.access_token != null) {
                    gapi.auth.signOut();
                    //Below will disconnect bunchy from users account.
                    //auth.revokeGoogleToken(googleToken.access_token);
                }
            } catch (err) {}
        }
        $state.go('main');
    });