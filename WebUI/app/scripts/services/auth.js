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

        this.register = function (email, password, firstname, lastname,selectedlocationid) {
            return $http.post(API_URL + 'auth/register', {
                email: email,
                password: password,
                lastname: lastname,
                firstname: firstname,
                location: selectedlocationid
            }).success(authSuccessful);
        }
        
        this.googleAuth = function() {
            var options = 'width=500,height=500,left=' + ($window.outerWidth - 500) / 2 + ',top=' + ($window.outerHeight - 500) / 2.5;
            
            var deferred = $q.defer();
            
            var popup = $window.open('http://localhost:1337/auth/google','', options);
            $window.focus();
            
           	$window.addEventListener('message', function (event) {
			 console.log(event.data);
				var code = event.data;
				popup.close();

				$http.post(API_URL + 'auth/googlelogin', {
					code: code,
                    clientId: '549020993769-tn974vfkrovsr1k4g65135k6m02vec6j.apps.googleusercontent.com',
					redirectUri: window.location.origin
				}).success(function (jwt) {
					authSuccessful(jwt);
					deferred.resolve(jwt);
				});
			
		});

		return deferred.promise;
        }
        
    });