var app = angular.module('entreApp.posts', ['ngRoute']);


app.config(function ($routeProvider) {
    $routeProvider
        .when('/posts', {
            controller: 'postCtrl',
            templateUrl: 'views/posts/posts.tpl.html'
        });
});

app.factory("Post", function () {
    
        var post = function () {
            this.url = "";
            this.title = "";
            this.description = "";
            this.votes = 5;
            this.date = Date.now();
            this.comments = [{
                text: "",
                date: Date.now()
       }];
        };
    
    return post;
    
});

app.service('dataService', function () {

    //posts is test data and will go away when the server is in place
    var posts = [];

    this.createPost = function (post) {
        posts.push(post); //Will actually $http.post to server
    };

    this.getPosts = function () {
        return posts; //Will actually be $http.get
    };

    this.addComment = function (commentStr, post) {
        var comment = {
            text: commentStr,
            date: Date.now()
        };
        this.post.comments.push(comment);
    };

});

app.controller('postCtrl', function ($scope, Post, dataService) {
    $scope.posts = dataService.getPosts();
    $scope.post = new Post();
    $scope.commentStr = "";

    $scope.createPost = function () {
        //write validation code
        
        dataService.createPost($scope.post);
        $scope.post = {};
        $scope.posts = dataService.getPosts();
    };

    $scope.addComment = function (post) {
        dataService.addComment($scope.commentStr, post);
    };
});

// ng-show="posts.count > 0"