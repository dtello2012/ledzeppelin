(function () {

    'use strict';

    angular.module('ledZepplin', [
        'ui.router',
        'ngResource',
        'restangular',
        'ui.bootstrap',
        'lodash',
        'firebase',
        'angularSoundManager'

    ]).config(function(RestangularProvider){

        RestangularProvider.setBaseUrl('https://api.spotify.com/v1/');

    });

    /**
     * Let's you use lo-dash as a service from a controller.
     */
    angular.module('lodash', []).factory('_', function() {
        return window._; // assumes lo-dash has already been loaded on the page
    });


}());