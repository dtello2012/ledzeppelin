(function () {
  "use strict";
  angular.module('ledZepplin').controller('CoreController', ['$scope', 'albumResource', '_', function ($scope, albumResource, _) {
    var vm = this;
    $scope.followingAlbums = [];

    var obj;

    $scope.$watchCollection('followingAlbums', function(newValues, oldValues) {
      // $scope.data.items = newNames.length;
      console.log(newValues, 'this');
      $scope.followingAlbums = newValues;
    });
    init();

    function init() {
      obj = albumResource.getAlbums();
      obj.$bindTo($scope, "data").then(function() {
        $scope.albums = $scope.data.items;
        _.forEach($scope.albums, function(value, key) {
          if(value.following === true) {
            $scope.followingAlbums.push(value);
          }
        });

        console.log($scope.followingAlbums);
      });
    }




  }])
  
  
  
}());