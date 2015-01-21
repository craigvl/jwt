'use strict';

angular.module('jwtApp')
  .controller('RegisterCtrl', function ($scope,$rootScope,$http,alert) {
   $scope.submit = function() {
       
       var url = 'http://localhost:3000/register';
       var user = {
       name:'Craig'
       };
       
      $http.post(url,user)
      .success(function(res){
         alert('success','Ok!',' You are now registered');   
      })
      .error(function(err){
        alert('warning','Opps!',' Could not register');
      });
   }
  });
