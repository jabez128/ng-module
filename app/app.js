var app = angular.module('myapp',['ngRoute'])
                 .config(function($routeProvider,$locationProvider){
                   $routeProvider.when('/',{
                      templateUrl:'./view/main.html',
                      controller: 'main'
                   })
                   .when('/module/:module_name',{
                      templateUrl:'./view/detail.html',
                      controller:'module'
                   })
                   .when('/job',{
                     templateUrl: './view/job.html',
                     controller: 'job'
                   })
                   .otherwise({
                     redirectTo:'/'
                   });
                $locationProvider.hashPrefix('!');
                 });

   app.controller('main',function($scope,$location){
     $scope.gojob = function(){
        $location.path('/job');
     };

   });

   app.controller('module',function($scope,$routeParams){
       $scope.name = $routeParams.module_name;
     });

   app.controller('job',function($scope,$location){
     $scope.gomain = function(){
        $location.path('/');
     };
     $scope.visitors = 0;
   });
