(function () {
  "use strict";

  angular.module('ledZepplin')
    .controller('AlbumsController', ['$scope', 'albumResource', '_', '$timeout', '$state',  function($scope, albumResource,  _, $timeout, $state) {


      var vm = this;
      vm.albums = [];
      vm.oneAtATime = true;
      vm.orderBy = 'name';
      vm.isCopy = false;
      vm.songs = [];
      vm.errorStatus = false;


      $scope.followingAlbums = [];




      vm.copyAlbum = function (album) {
        var albums = vm.albums;
        var albumCopy = angular.copy(album);

        albumCopy.id = album.id + 'copy';
        albumCopy.name = album.name + ' copy';
        albumCopy.copy = true;
        
        albums.push(albumCopy);
      };

      vm.viewTracks = function(id) {
        vm.id = id;

        if(id.indexOf('copy') === -1) {

          vm.isCopy = false;
          vm.errorStatus = false;
          albumResource.getAlbumTracks(id).then(function (result) {
            vm.tracks = result.tracks.items;
            vm.getPlayList();
          }, function (err) {
            vm.tracks = [];
            vm.getPlayList();
            vm.errorStatus = true;
            console.log("Error Status",err.status);
          });
        } else {
          vm.tracks = [];
          vm.getPlayList();
          vm.isCopy = true;
        }
      };

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

      $scope.$watchCollection('followingAlbums', function(newValues, oldValues) {
        return newValues;
      });



      init();

      function init() {


        var obj = albumResource.getAlbums();
        obj.$bindTo($scope, "data").then(function() {
         vm.albums = $scope.data.items;
          
          _.forEach(vm.albums, function(value, key) {
            if(value.following === true) {
              $scope.followingAlbums.push(value);
            }
          });



        });

      }
      
    }]);

}());