app = angular.module('BlocItOff', ['ui.router', 'firebase'])
  
app.config(['$locationProvider', '$stateProvider', function($locationProvider, $stateProvider) {
    $locationProvider.html5Mode(true);
    
    $stateProvider
      .state('home', {
        url: '/',
        controller: 'taskController',
        templateUrl: "templates/home.html"
      })
  }])

app.run(['$rootScope', function($rootScope) {
  
  $rootScope.currentSubView = 'currentTasks';
  
  // hide or show views
  $rootScope.switchView = function(viewName) {
     $rootScope.currentSubView = viewName;
  };
  
}]);

app.controller('taskController', ['$scope', '$firebase', '$rootScope', function ($scope, $firebase, $rootScope) {
  
  // Initialize Firebase object
  var firebaseUrl = "https://incandescent-heat-1829.firebaseio.com/";
  var firebaseRef = new Firebase(firebaseUrl);

  // Create an AngularFire reference to the data
  var sync = $firebase(firebaseRef);
  $scope.data = sync.$asObject();

  // Function for Creating/Adding task
  $scope.createTask = function(title, description){
    if ($scope.title && $scope.description) {
      firebaseRef.push({title:this.title, description:this.description, state:'current'});
    }
  };
    
  // Function for changing between complete task
  $scope.completeTask = function(uid){
//TODO    // Update the Ojbects
    var itemRef = new Firebase(firebaseUrl + '/' + uid);
    itemRef.update({state: 'complete'});
//TODO    // Change element's state/view
  };
  
  // Function for Editing task
  $scope.editTask = function(){

  };

  // Function for removing task
  $scope.removeTask = function(uid){
      var itemRef = new Firebase(firebaseUrl + '/' + uid);
      itemRef.remove();
  };
  
  
  // Function for timout/decaying an old, unused task
  $scope.timeoutTask = function(){

  };

  
  
}]);

app.filter('filterByTaskStatus', function (){
  return function(input, state) {
   var array = [];
    if (input.state == 'current'){
      array.push(input);
    }
    return array;
  }
});

   
      
    
    