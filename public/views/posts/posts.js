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
        this.url = null;
        this.imageUrl = null;
        this.videoUrl = null;
        this.title = null;
        this.description = null;
        this.votes = null;
        this.date = null;
        this.comments = [
            /*{
                        text: null,
                        date: null
                   }*/
            ];
        this.commentStr = "";
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

    this.addComment = function (newCommentStr, post) {
        console.log('this is always empty why... ' + newCommentStr);
        var comment = {
            text: newCommentStr,
            date: Date.now()
        };

        post.comments.push(comment);
    };

});

app.controller('postCtrl', function ($scope, Post, dataService, $sce) {
    $scope.posts = dataService.getPosts();
    $scope.newPost = new Post();
    $scope.newCommentStr = "asfsafsaf";



    $scope.createPost = function () {
        //write validation code
        $scope.newPost.videoUrl = videoValidator($scope.newPost.videoUrl);

        dataService.createPost($scope.newPost);

        $scope.newPost = new Post();

        //$scope.inputFields.$setPristine(true);
        $scope.hideVideoUrl = false;
        $scope.hideImageUrl = false;
        $scope.hideUrl = false;

        $scope.posts = dataService.getPosts();
    };



    $scope.addComment = function (post) {
        console.log("POST!", post);


        console.log('reading rainbow gives you wings ' + post.commentStr);
        //        console.log('Post ');
        //        console.log($scope.posts[postIndex]);

        //        console.log("BOOM", $scope.newCommentStr);
        dataService.addComment(post.commentStr, post);

        post.commentStr = '';
        //        console.log($scope.posts[postIndex].comments);
    };

    $scope.getAuthorizedUrl = function (url) {
        return $sce.trustAsResourceUrl(url);
    };

    $scope.hideVideoUrl = false;
    $scope.hideUrl = false;
    $scope.hideImageUrl = false;

    $scope.inputChanged = function (urlType) {

        if (urlType === 'video') {

            //if user entered text in video field
            if ($scope.newPost.videoUrl && $scope.newPost.videoUrl.length > 0) {

                $scope.hideUrl = true;
                $scope.hideImageUrl = true;
            } else {
                $scope.hideVideoUrl = false;
                $scope.hideImageUrl = false;
                $scope.hideUrl = false;
            }
        } else if (urlType === 'url') {
            if ($scope.newPost.url && $scope.newPost.url.length > 0) {
                $scope.hideVideoUrl = true;
                $scope.hideImageUrl = true;

            } else {
                $scope.hideVideoUrl = false;
                $scope.hideUrl = false;
                $scope.hideImageUrl = false;
            }
        } else if (urlType === 'image') {
            if ($scope.newPost.imageUrl && $scope.newPost.imageUrl.length > 0) {
                $scope.hideUrl = true;
                $scope.hideVideoUrl = true;

            } else {
                $scope.hideVideoUrl = false;
                $scope.hideImageUrl = false;
                $scope.hideUrl = false;
            }
        }

    };



    var videoValidator = function (mediaUrl) {

        var validProp = function (mediaUrl) {
            if (mediaUrl) {
                return true;
            } else {
                return false;
            }
        };


        var validUrl = function (string) {

            if (string.indexOf("youtu") > -1 && string.indexOf("v=") > -1) {

                var index = string.indexOf("v=") + 2;
                var end = string.substr(index);
                string = "https://www.youtube.com/embed/" + end;
                return string;

            } else if ("youtu" && "/") {

                var index = string.lastIndexOf("/") + 1;
                var end = string.substr(index);
                string = "https://www.youtube.com/embed/" + end;

                console.log(string);
                return string;

            } else {
                return null;
            }

        };

        if (mediaUrl && validProp(mediaUrl) && validUrl(mediaUrl)) {
            mediaUrl = validUrl(mediaUrl);
            return mediaUrl;
        } else {
            console.log('mediaUrl was invalid');
            return null;
        }

    };
});

// ng-show="posts.count > 0"