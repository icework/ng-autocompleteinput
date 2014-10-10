angular.module('autoComplete',[]);

angular.module('autoComplete').controller('autoContrl', function($scope){
  $scope.data = ['Newbee', 'VG', 'Navi', 'Cloud9', 'Alliance'];
});

angular.module('autoComplete').directive('autoInput',['$filter', function ($filter) {
    return {
        restrict: 'A',
        templateUrl: 'template/autocomplete.html',
        scope: {
            data:'='
        },
        link: function (scope, element) {
          var inTyping = false;
          scope.selectSuggest = function(suggest){
             var atIndex = scope.input.lastIndexOf('@');
             scope.input = scope.input.slice(0, atIndex+1);
             scope.input += suggest;
             scope.suggests = [];
             inTyping = false;
          }
          scope.update = function(){
           console.log(scope.input.slice(-1));
            if(scope.input.slice(-1) === '@'){
              inTyping = true;
            }
            if(inTyping){
              var atIndex = scope.input.lastIndexOf('@')
              var search = scope.input.slice(atIndex+1)
              scope.suggests = $filter('filter')(scope.data, search);
            }
          }
        }
    };
}]);
