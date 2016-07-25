(function () {
    "use strict";

    angular.module('ledZepplin')
        .controller('SettingsController', [
          '$scope',
          'albumResource',
          '_',
          '$state',
          '$timeout',
          function($scope, albumResource, _, $state, $timeout) {

            var vm = this;
            var obj;
            vm.editing = true;
            vm.album = {};
            $scope.followingAlbums = [];

            if(vm.album.following === undefined) {
              vm.album.following = false;
            }

            vm.album.rating = 0;
            if($state.params.id === undefined) {
              console.log('undefined state ID');
              vm.editing = false;
            }
            

            vm.saveAlbum = function () {
              if(vm.album.following === undefined) {
                vm.album.following = false;
              }
              if(vm.album.newAlbum === undefined) {
                vm.album.newAlbum = false;
              }
              var albumObj = {
                name: vm.album.name,
                type: 'album',
                rating: vm.album.rating,
                id: $state.params.id,
                images: [],
                following: vm.album.following,
                newAlbum: vm.album.newAlbum
              };

              if(vm.editing === true) {
                console.log('Editing Album');
                obj = albumResource.getAlbums();
                obj.$bindTo($scope, "data").then(function() {
                  vm.albums = $scope.data.items;
                  vm.album = _.find(vm.albums, {"id": $state.params.id});
                  vm.album.name  = albumObj.name;
                  vm.album.rating  = albumObj.rating;
                  vm.album.following = albumObj.following;
                  vm.album.newAlbum = albumObj.newAlbum
                });
                $timeout(function () {
                  $state.go('details',{id: vm.album.id});
                }, 500);
              } else {
                console.log('Adding album');
                albumObj.id = 'new' + Math.floor(Math.random() * 10000000 + 1);
                albumObj.images.push({url: "http://www.seamgen.com/images/team/blank.jpg"});
                albumObj.rating = vm.album.rating;
                albumObj.newAlbum = true;
                  vm.albums.push(albumObj);
                console.log(albumObj);
                $timeout(function () {
                  $state.go('home');
                }, 500);

              }

            };

            init();

            function init () {
              obj = albumResource.getAlbums();
              obj.$bindTo($scope, "data").then(function() {
                vm.albums = $scope.data.items;
                if(vm.editing === true) {
                  vm.album = angular.copy(_.find(vm.albums, {"id": $state.params.id}));
                }
                _.forEach(vm.albums, function(value, key) {
                  if(value.following === true) {
                    $scope.followingAlbums.push(value);
                  }
                });
              });
            }


        }]);

}());