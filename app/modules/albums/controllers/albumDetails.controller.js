(function () {
  "use strict";
  angular.module('ledZepplin')
    .controller('AlbumDetails', [
      '$stateParams',
      '$log',
      'albums',
      '$scope',
      'albumResource',
      '_',
      '$timeout',
      '$state',
      '$uibModal',

        function($stateParams, $log, albums, $scope, albumResource, _, $timeout, $state, $uibModal){
        var vm = this;
        vm.invalid = false;
        $scope.followingAlbums = [];



      vm.removeAlbum = function(album) {
          var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'app/modules/albums/templates/deleteModal.template.html',
            controller: 'ModalInstanceCtrl',
            size: 'sm',
            windowClass: 'delete-modal',
            resolve: {
              album: function () {
                return album;
              }
            }
          });

          modalInstance.result.then(function (removeAlbum) {
            $scope.removeAlbum = removeAlbum;

            _.remove(vm.albums, $scope.removeAlbum);
            $timeout(function () {
              $state.go('home');
            }, 200);

            console.log($scope.removeAlbum, 'removed this');
          }, function () {
            $log.info('Modal dismissed at: ' + new Date());
          });

      };

      albums.$bindTo($scope, "data").then(function() {
        vm.albums = $scope.data.items;
        vm.album = _.find(vm.albums, {"id": $stateParams.id});

        albumResource.getAlbumTracks(vm.album.id).then(function (result) {
          vm.tracks = result.tracks.items;
          vm.getPlayList();
        },function(err){
          vm.invalid = true;
          console.error(err.data.error.message);
        });
        _.forEach(vm.albums, function(value, key) {
          if(value.following === true) {
            $scope.followingAlbums.push(value);
          }
        });


      });

      vm.getPlayList = function(){
        vm.songs = [];
        if(vm.tracks.length > 0) {
          for (var i = 0; i < vm.tracks.length; i++) {
            vm.track = {
              id: vm.tracks[i].id,
              title: vm.tracks[i].name,
              artist: vm.tracks[i].artists[0].name,
              url: vm.tracks[i].preview_url
            };

            vm.songs.push(vm.track);
          }

        } else {
          console.log("No tracks");
        }
      };


    }]);
}());