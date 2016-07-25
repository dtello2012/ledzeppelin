(function () {
    "use strict";

    angular.module('ledZepplin').factory('dataResource', function($resource){

        //console.log($resource('api/data/data.json'));
        return $resource('api/data/data.json');

    });
}());