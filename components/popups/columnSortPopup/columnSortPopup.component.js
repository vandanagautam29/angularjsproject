
'use strict';
// Defining the `stories` module
angular.module('sortpopup', []);
// Register `stories` component, along with its associated controller and template
angular.module('sortpopup').component('sortpopup', {
    restrict: "AE",
    scope: true,
    bindings: {
        show: "@",
    },
    templateUrl: 'components/popups/columnSortPopup/columnSortPopup.template.html',
    controller: function ($scope) {
        $scope.$on('FIRST_DIR_UPDATED', function(e, data){
            console.log(data);
     });
    }
})

