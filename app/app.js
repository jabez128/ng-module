var app = angular.module('myapp',['ngRoute','firebase','btford.markdown'])
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
                   }).when('/edit',{
                     templateUrl: './view/edit.html',
                     controller: 'edit'
                   }).when('/book',{
                     templateUrl: './view/book.html',
                     controller: 'book'
                   })
                   .otherwise({
                     redirectTo:'/'
                   });
                $locationProvider.hashPrefix('!');
                 });

    /*
    **下面是编辑指令的部分
    */
    app.filter('reverse', function() {
      function toArray(list) {
         var k, out = [];
         if( list ) {
            if( angular.isArray(list) ) {
               out = list;
            }
            else if( typeof(list) === 'object' ) {
               for (k in list) {
                  if (list.hasOwnProperty(k)) { out.push(list[k]); }
               }
            }
         }
         return out;
      }
      return function(items) {
         return toArray(items).slice().reverse();
      };
   });


  /*
  **下面是控制器部分
  */
   app.controller('main',function($scope,$firebase){
     $scope.loaded = false;
     var ref1 = new Firebase('https://ng-module.firebaseIO.com');
     var ref2 = new Firebase('https://ng-visitor.firebaseIO.com');
     $scope.modules = $firebase(ref1);
     $scope.visitor = $firebase(ref2);
     $scope.modules.$on('change',function(){
       $scope.loaded = true;
     });
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
    $scope.loaded = false;
    var ref1 = new Firebase('https://ng-visitor.firebaseIO.com');
    $scope.visitor = $firebase(ref1);
    var ref2 = new Firebase('https://ng-job.firebaseIO.com');
    $scope.jobs = $firebase(ref2);
    $scope.jobs.$on('change',function(){
      $scope.loaded = true;
    })
   });

   app.controller('edit',function($scope,$firebase,$window,$location){
     $scope.post = {};
     var ref = new Firebase('https://ng-job.firebaseIO.com');
     $scope.jobs = $firebase(ref);
     $scope.submit = function(){
       $scope.jobs.$add({title: $scope.post.title, content: $scope.post.content}).then(function(ref) {
           $window.alert(ref.name());
           $location.path('/job');
    });
     }
   });

   app.controller('book',function($scope,$firebase){

   })
