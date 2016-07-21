(function () {
  "use strict";
  angular.module('ledZepplin')
    .controller('ModalInstanceCtrl', ['$scope', 'album', '$uibModalInstance', function($scope, album, $uibModalInstance){
      //console.log(album);
      $scope.album = album;

      $scope.ok = function () {
       
        $uibModalInstance.close($scope.album);
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };



    }]);
}());