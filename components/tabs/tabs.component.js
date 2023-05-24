
'use strict';
// Defining the `stories` module
angular.module('tabs', []);
// Register `stories` component, along with its associated controller and template
angular.module('tabs').component('tabs', {
    restrict: "AE",
    scope: true,
    templateUrl: 'components/tabs/tabs.template.html',
    controller: function ($scope) {
        this.currentTab = $scope.$parent.tab;
        console.log($scope,'1111', this.currentTab)
        this.setActiveTab = function(tab) {
            this.currentTab = tab;
            $scope.$parent.tab = tab;
            console.log($scope,'00000000000000000', this.currentTab)
            $scope.$parent.setTab(tab)
        }

        this.isSet = function(tab) {
            return tab === this.currentTab
        }
    }
})

