var app = angular.module('main', ['ngRoute', 'main.login', 'main.signup']);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			redirectTo: '/login'
		})
		.otherwise({
			redirectTo: '/login'
		});
});