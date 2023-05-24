angular.module('myApp').component('sortTemplate', {
  restrict: "AE",
    scope: true,
  templateUrl: 'components/popups/sort/sort.template.html',
  controller: 'SortTemplateController'
});

angular.module('myApp').controller('SortTemplateController', function ($scope) {
  $scope.show = false;
  $scope.$on('open-sort', function (evt, data) {
    $scope.show = data;
  });

  $scope.sortData = function (headerKey, sortOrder) {
    var header = $scope.value.headers.find(function (h) {
      return h.key === headerKey;
    });

    if (header) {
      $scope.value.data.sort(function (a, b) {
        var valueA = a[header.key];
        var valueB = b[header.key];

        if (header.dataType === "string") {
          valueA = valueA.toLowerCase();
          valueB = valueB.toLowerCase();
          if (sortOrder === "asc") {
            return valueA.localeCompare(valueB);
          } else if (sortOrder === "desc") {
            return valueB.localeCompare(valueA);
          }
        } else if (header.dataType === "number") {
          if (sortOrder === "first-last") {
            return valueA - valueB;
          } else if (sortOrder === "last-first") {
            return valueB - valueA;
          }
        }

        return 0;
      });
    }
  };

  $scope.getDataType = function (selectedHeader, type) {
    var findIndex = $scope.value.headers.findIndex(function (e) {
      return e.key == selectedHeader;
    });

    if (findIndex != -1) {
      if ($scope.value.headers[findIndex].dataType === type) {
        return true;
      }
    }
    return false;
  };

    $scope.toggleSortTemplate = function (item) {
      $scope.selectedHeader = null; // Reset selected header when hiding the sort template
      if (item) {
        $scope.showSortTemplate = true; // Show the sort template when an item is clicked
      } else {
        $scope.showSortTemplate = false; // Hide the sort template when the close icon is clicked
      }
    };

  $scope.expandSymbol = function (item) {
    return $scope.showSortTemplate && item === $scope.selectedHeader ? 'close' : 'expand_circle_down';
  };
});
