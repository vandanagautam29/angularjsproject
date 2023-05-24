angular.module('myApp', ['tabs'])

  .controller('MenuController', function ($scope, $http) {
    $http.get('./data/storiesSample.json').then(function (response) {

      $scope.apiResponse = response.data;
      $scope.value = response.data.stories;
  
    });
    $scope.tab = 1;
    $scope.viewSide = false;
    $scope.sortingPopup = false;
    $scope.showSortTemplate = false;
    $scope.showHideTemplate = false;
    $scope.toolbarStyle = {};
    $scope.setTab = function (newtab) {
      console.log("New tab selected: " + newtab);
      $scope.tab = newtab;

      switch (newtab) {
        case 1:
          $scope.value = $scope.apiResponse.stories;
          break;
        case 2:
          $scope.value = $scope.apiResponse.epics;
          break;
        case 3:
          $scope.value = $scope.apiResponse.sprints;
          break;
        case 4:
          $scope.value = $scope.apiResponse.releaseMilestones;
          break;
        case 5:
          $scope.value = $scope.apiResponse.facets;
          break;
        default:
          $scope.value = $scope.apiResponse.stories;
          break;
      }
    };

    $scope.isSet = function (tabNum) {
      return $scope.tab === tabNum;
    };
    $scope.showAll = function (val) {
      if (val) {
        $scope.value.headers.map((ele, index) => {
          if (index !== 0) {
            ele['show'] = false;
          }
          return ele;
        })

      } else {
        $scope.value.headers.map((ele, index) => {
          if (index !== 0) {
            ele['show'] = true;
          }
          return ele;
        })
      }
      console.log($scope.value)
    };
    $scope.show = function (val, key) {
      console.log(val, key, '=========')
      $scope.value.headers.map(ele => {
        if (ele.key === key) {
          ele['show'] = !val
        }
        return ele;
      });
      console.log($scope.value)
    };

    $scope.downloadCsv = function () {
      console.log($scope.value.data)
      const a = document.createElement("a");
      // a.href = "data:text/csv," + $scope.value.data;
      // let filename = "sampleCSVDownload";
      // a.setAttribute("download", filename + ".csv");
      // document.body.appendChild(a);
      // a.click();
      // document.body.removeChild(a);
    };
    $scope.tabName = function () {
      switch ($scope.tab) {
        case 1: return 'stories';
        case 2: return 'epics';
        case 3: return 'sprints';
        case 4: return 'milestones';
        case 5: return 'facets';
        case 6: return 'stories';

      }
    };
//sorting
    $scope.sortTemplate=function(){
      $scope.sortingPopup= !$scope.sortingPopup;
      console.log($scope.sortingPopup);
    };
//new
$scope.openSortPopup = function() {
  $scope.showSortTemplate = !$scope.showSortTemplate;
  $scope.toolbarStyle.marginLeft = '34rem';
  $scope.toolbarStyle.width = 'auto';
  $scope.$broadcast("open-sort",$scope.showSortTemplate);
};

$scope.toggleSortTemplate = function() {
  $scope.showSortTemplate = false;
};

// // hide field 
// $scope.toggleHidePopup = function () {
//   $scope.showHideTemplate = !$scope.showHideTemplate;
//   $rootScope.$broadcast('open-hide', $scope.showHideTemplate);
// };

//table header
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
$scope.toggleSortTemplate = function(item) {
  // const sort = document.querySelector('.sortings');
  // sort.style.display = 'none';
  $scope.selectedHeader = null; // Reset selected header when hiding the sort template
  if (item) {
    $scope.showSortTemplate = true; // Show the sort template when an item is clicked
  } else {
    $scope.showSortTemplate = false; // Hide the sort template when the close icon is clicked
  }
};

//close sort popup
$scope.expandSymbol = function(item) {
  return $scope.showSortTemplate && item === $scope.selectedHeader ? 'close' : 'expand_circle_down';
};

});






  // $scope.sortData = function (headerKey, sortOrder) {

  //   var header = $scope.value.headers.find(function (h) {
  //     return h.key === headerKey;
  //   });

  //   if (header) {
  //     $scope.value.data.sort(function (a, b) {

  //       var valueA = a[header.key];
  //       var valueB = b[header.key];

  //       if (header.dataType === "string") {
  //         valueA = valueA.toLowerCase();
  //         valueB = valueB.toLowerCase();
  //       }

  //       if (sortOrder === "asc") {
  //         return valueA.localeCompare(valueB);
  //       } else if (sortOrder === "desc") {
  //         return valueB.localeCompare(valueA);
  //       } else if (sortOrder === "first-last") {
  //         return valueA - valueB;
  //       } else if (sortOrder === "last-first") {
  //         return valueB - valueA;
  //       } else {
  //         return 0;
  //       }
  //     });
  //   }
  // };
  // $scope.getDataType = function (selectedHeader, type) {
  //   let findIndex = $scope.value.headers.findIndex(e => e.key == selectedHeader)
  //   if (findIndex != -1) {
  //     console.log($scope.value.headers[findIndex].dataType, '===========', $scope.value.headers[findIndex].dataType == type)
  //     if ($scope.value.headers[findIndex].datatype == type)
  //       return true;
  //   }
  //   return false;
  // }
  // $scope.getHeaderDataType = function (headerKey) {
  //   var header = $scope.headers.find(function (h) {
  //     return h.key === headerKey;
  //   });
  //   if (header) {
  //     return header.dataType;
  //   }
  // };



  // $scope.sortData = function (headerKey, sortOrder) {

  //   var header = $scope.value.headers.find(function (h) {
  //     return h.key === headerKey;
  //   });

  //   if (header) {
  //     $scope.value.data.sort(function (a, b) {

  //       var valueA = a[header.key];
  //       var valueB = b[header.key];

  //       if (header.dataType === "string") {
  //         valueA = valueA.toLowerCase();
  //         valueB = valueB.toLowerCase();
  //       }

  //       if (sortOrder === "asc") {
  //         return valueA.localeCompare(valueB);
  //       } else if (sortOrder === "desc") {
  //         return valueB.localeCompare(valueA);
  //       } else if (sortOrder === "first-last") {
  //         return valueA - valueB;
  //       } else if (sortOrder === "last-first") {
  //         return valueB - valueA;
  //       } else {
  //         return 0;
  //       }
  //     });
  //   }
  // };
  // $scope.getDataType = function (selectedHeader, type) {
  //   let findIndex = $scope.value.headers.findIndex(e => e.key == selectedHeader)
  //   if (findIndex != -1) {
  //     console.log($scope.value.headers[findIndex].dataType, '===========', $scope.value.headers[findIndex].dataType == type)
  //     if ($scope.value.headers[findIndex].datatype == type)
  //       return true;
  //   }
  //   return false;
  // }
  // $scope.getHeaderDataType = function (headerKey) {
  //   var header = $scope.headers.find(function (h) {
  //     return h.key === headerKey;
  //   });
  //   if (header) {
  //     return header.dataType;
  //   }
  // };