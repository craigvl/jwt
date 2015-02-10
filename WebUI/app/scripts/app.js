'use strict';
angular
    .module('jwtApp', ['ui.router', 'ngAnimate', 'ui.select', 'ngSanitize', 'angularSpinner', 'directive.g+signin', 'facebook'])

.config(function (FacebookProvider) {
    // Set your appId through the setAppId method or
    // use the shortcut in the initialize method directly.
    FacebookProvider.init('1403149849923216');
})