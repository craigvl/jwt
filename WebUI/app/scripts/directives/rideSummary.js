'use strict';

angular.module('jwtApp').directive('rideSummary', function() {
  return {
    scope: {
        bunches: '='
    },
    templateUrl:'/templates/rideSummary.html'
  };
});