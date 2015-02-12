'use strict';

angular.module('jwtApp')
  .controller('BunchesCtrl', function ($scope,$http, API_URL,alert,$state) {
    $http.get(API_URL + 'bunch/location/54cb04c4c39fcb501cb1a8ae').success(function(bunches){
     $scope.bunches = bunches;   
    }).error(function(err){
        if(err == null)
        {
            alert('warning',"unable to get bunches! ","No web server?");
            $state.go('login');
        }
        else
        {
            alert('warning',"unable to get bunches! ",err.message);
            $state.go('login');
        }
    })
  });
