var app = angular.module('myapp',['ngRoute','firebase'])
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

    /*
    **下面是编辑指令的部分
    */



  /*
  **下面是控制器部分
  */
   app.controller('main',function($scope,$firebase){
     var ref1 = new Firebase('https://ng-module.firebaseIO.com');
     var ref2 = new Firebase('https://ng-visitor.firebaseIO.com');
     $scope.modules = $firebase(ref1);
     $scope.visitor = $firebase(ref2);
     var interval = setInterval(function(){
       console.log($scope.visitor.number);
       if(typeof $scope.visitor.number === 'number'){
       $scope.visitor.number = $scope.visitor.number + 1;
       $scope.visitor.$save('number');
       clearInterval(interval);
       }
     },1000);

   });

   app.controller('module',function($scope,$routeParams){
       $scope.name = $routeParams.module_name;
     });

   app.controller('job',function($scope,$firebase){
    var ref = new Firebase('https://ng-visitor.firebaseIO.com');
    $scope.visitor = $firebase(ref);
   });
