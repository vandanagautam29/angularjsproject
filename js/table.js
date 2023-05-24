var tableDirective = function(){
   return {
      restrict: 'EA',
      scope: {
         data: '=' ,
         headers: '=',
         click: "&",
         columnSort: '='
      },
      templateUrl : 'components/table.html',
   }
};
angular.module('myApp').directive('tableDirective', tableDirective);  