(function () {
    "use strict";

    angular.module('ledZepplin').factory('albumResource', function(Restangular, $q, _, $firebaseArray, $firebaseObject){

        return {
            getAlbums: getAlbums,
            getAlbumTracks: getAlbumTracks,
            saveAlbum: saveAlbum
        };

        function getAlbums() {
            var ref = new Firebase("https://ledzeplin-5d3f7.firebaseio.com/albums");
            return $firebaseObject(ref);
        }
        
        function getAlbumTracks(id) {
            // var ref = new Firebase("https://ledzeplin-5d3f7.firebaseio.com/albums/items/"); // assume value here is { foo: "bar" }
            // return $firebaseObject(ref);
            return Restangular.one('/albums/' + id).get(id).then(function (result) {
                    return result;
                });
        }
        
        function saveAlbum(albumObj) {
            // return Restangular.all('/data').post(albumObj).then(function (result) {
            //     return result;
            // });
            var ref = new Firebase("https://ledzeplin-5d3f7.firebaseio.com/albums/items/"); // assume value here is { foo: "bar" }
            return $firebaseObject(ref);
        }

    });
}());