var app = angular.module('entreApp.collection',['ngRoute']);

app.config(function($routeProvider) {
   
    $routeProvider.when('/collection', {
        controller: 'collectionCtrl',
        templateUrl: 'views/collection/collection.tpl.html'
    });
    
});

app.controller('collectionCtrl', function($scope) {
    
});