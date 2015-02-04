'use strict';

angular.module('jwtApp')
    .service('auth', function auth($http, API_URL, authToken, $state, $window, $q) {

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

        this.register = function (email, password, firstname, lastname, selectedlocationid) {
            return $http.post(API_URL + 'auth/register', {
                email: email,
                password: password,
                lastname: lastname,
                firstname: firstname,
                location: selectedlocationid
            }).success(authSuccessful);
        }
        
        this.googleAuth = function () {

            var urlBuilder = [];
            var clientId = '549020993769-tn974vfkrovsr1k4g65135k6m02vec6j.apps.googleusercontent.com';

            urlBuilder.push('response_type=code',
                'client_id=' + clientId,
                'redirect_uri=' + window.location.origin,
                'scope=profile email')

            var url = "https://accounts.google.com/o/oauth2/auth?" + urlBuilder.join('&');
            var options = 'width=500,height=500,left=' + ($window.outerWidth - 500) / 2 + ',top=' + ($window.outerHeight - 500) / 2.5;

            var deferred = $q.defer();

            var popup = $window.open(url, '', options);
            $window.focus();

            $window.addEventListener('message', function (event) {
                if (event.origin === $window.location.origin) {
                    var code = event.data;
                    popup.close();
                    console.log(code);
                    $http.post(API_URL + 'auth/google', {
                        code: code,
                        clientId: clientId,
                        redirectUri: window.location.origin
                    }).success(function (jwt) {
                        authSuccessful(jwt);
                        deferred.resolve(jwt);
                    });
                }
            });

            return deferred.promise;
        }

    });