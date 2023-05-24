angular.module('myApp').component('hideField', {
    templateUrl: 'components/popups/hidefield/hide.template.html',
    controller: HideFieldController,
    bindings: {
      value: '='
    }
  });
 
  function HideFieldController($scope, $rootScope) {
    $scope.searchText = '';
  
    $scope.showAll = function (val) {
      $scope.value.headers.forEach(function (ele, index) {
        if (index !== 0) {
          ele.show = val;
        }
      });
    };
  
    $scope.show = function (val, key) {
      $scope.value.headers.forEach(function (ele) {
        if (ele.key === key) {
          ele.show = !val;
        }
      });
    };
  
    $rootScope.$on('open-hide', function (event, showHideTemplate) {
      $scope.showHideTemplate = showHideTemplate;
    });
  }
  