var app = angular.module('entreApp', ['ngRoute', 'entreApp.login', 'entreApp.signup', 'entreApp.posts']);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			redirectTo: '/posts'
		})
		.otherwise({
			redirectTo: '/login'
		});
});