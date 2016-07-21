
"use strict";

angular.module('ledZepplin').config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/albums");
    //
    // Now the states/routes
    $stateProvider
        .state('home', {
            url: "/albums",
            templateUrl: "app/modules/albums/views/albums.views.html",
            controller: 'AlbumsController',
            controllerAs: 'vm'
        })
      .state('details', {
        url: "/album/details/:id",
        templateUrl: "app/modules/albums/views/album-detail.view.html",
        controller: 'AlbumDetails',
        controllerAs: 'vm',
        resolve: {
          albums: ['albumResource', function (albumResource) {
            return albumResource.getAlbums();
          }]
        }
      })
        .state('settings', {
            abstract: true,
            url: "/settings",
            templateUrl: "app/modules/albums/views/settings.views.html",
            controller: 'SettingsController',
            controllerAs: 'vm'
        })
        .state('settings.add', {
            url: "/add",
            templateUrl: "app/modules/albums/views/settings.views.html"
        })
        .state('settings.edit', {
          url: "/edit/:id",
          templateUrl: "app/modules/albums/views/settings.views.html"
        });
});


