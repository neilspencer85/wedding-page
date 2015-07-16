var app = angular.module('app', []);

app.service('articles', ['$http', function ($http) {
    this.getArticles = function(){
        return $http.get('http://localhost:3000/posts');
    }

    this.deleteArticle = function(id){
        return $http.delete('http://localhost:3000/posts/' + id);
    }

    this.updateArticle = function(id, data){
        return $http.put('http://localhost:3000/posts/' + id, data);
    }

    this.createArticle = function(data){
        return $http.post('http://localhost:3000/posts/', data);
    }
}])

app.controller('myCtrl', ['$scope', 'articles', function ($scope, articles) {
    articles.getArticles().success(function(data){
        $scope.articles = data;
    });

    $scope.updatedArticle = {};

    $scope.newArticle = {};

    $scope.delete = function(id){
        articles.deleteArticle(id).success(function(resp){
            console.log(resp)
        })
    };

    $scope.update = function(id){
        articles.updateArticle($scope.updatedArticle.id, $scope.updatedArticle).success(function(resp){
            console.log(resp)
        })
        $scope.updateArticle = {};
    }

    $scope.create = function(){
        articles.createArticle($scope.newArticle);
        $scope.newArticle = {};
    }
}])