'use strict';

angular.module('jwtApp').directive('bunchSummary', function () {
    return {
        scope: {
            bunches: '='
        },
        templateUrl: 'templates/bunchSummary.html'
    };
});