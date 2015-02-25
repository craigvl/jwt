angular.module('jwtApp').config(function ($urlRouterProvider, $stateProvider, $httpProvider, $authProvider, API_URL) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

        .state('main', {
        url: '/',
        templateUrl: '/views/main.html'
    })

    .state('setlocation', {
        url: '/setlocation',
        templateUrl: '/views/setlocation.html',
        controller: 'SetlocationCtrl'
    })

    .state('register', {
        url: '/register',
        templateUrl: '/views/register.html',
        controller: 'RegisterCtrl'
    })

    .state('login', {
        url: '/login',
        templateUrl: '/views/login.html',
        controller: 'LoginCtrl'
    })

    .state('bunches', {
        url: '/bunches',
        templateUrl: '/views/bunches.html',
        controller: 'BunchesCtrl'
    })

    .state('bunchcreate', {
        url: '/bunchcreate',
        templateUrl: '/views/bunchcreate.html',
        controller: 'BunchcreateCtrl'
    })

    .state('logout', {
        url: '/logout',
        controller: 'LogoutCtrl'
    });

    $authProvider.google({
        clientId: '549020993769-tn974vfkrovsr1k4g65135k6m02vec6j.apps.googleusercontent.com',
        url: API_URL + 'auth/google'
    });

    $authProvider.facebook({
        clientId: '1403149849923216',
        url: API_URL + 'auth/facebook'
    });

    $authProvider.oauth2({
        name: 'strava',
        url: API_URL + 'auth/strava',
        clientId: '4728',
        redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
        response_type: 'code',
        scope: 'write',
        approval_prompt: 'force',
        authorizationEndpoint: 'https://www.strava.com/oauth/authorize'
    });

    $authProvider.loginUrl = API_URL + 'auth/login';
    $authProvider.signupUrl = API_URL + 'auth/register';

    $httpProvider.interceptors.push('authInterceptor');
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $httpProvider.defaults.headers.common["Accept"] = "application/json";
    $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
})

.constant('API_URL', 'http://localhost:1337/')