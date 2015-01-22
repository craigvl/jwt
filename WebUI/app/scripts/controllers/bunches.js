'use strict';

angular.module('jwtApp')
  .controller('BunchesCtrl', function ($scope,$http, API_URL,alert) {
    $http.get(API_URL + 'bunches').success(function(bunches){
     $scope.bunches = bunches;   
    }).error(function(err){
        if(err == null)
        alert('warning',"unable to get bunches! ","No web server?");
        else
        alert('warning',"unable to get bunches! ",err.message);
    })
  });
