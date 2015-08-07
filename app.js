// var app = angular.module('app', []);

// app.service('articles', ['$http', function ($http) {
//     this.getArticles = function(){
//         return $http.get('http://localhost:3000/posts');
//     }

//     this.deleteArticle = function(id){
//         return $http.delete('http://localhost:3000/posts/' + id);
//     }

//     this.updateArticle = function(id, data){
//         return $http.put('http://localhost:3000/posts/' + id, data);
//     }

//     this.createArticle = function(data){
//         return $http.post('http://localhost:3000/posts/', data);
//     }
// }])

// app.controller('myCtrl', ['$scope', 'articles', function ($scope, articles) {
//     articles.getArticles().success(function(data){
//         $scope.articles = data;
//     });

//     $scope.create = {};

//     $scope.view = {};

//     $scope.create = function(id){
//         articles.deleteArticle(id).success(function(resp){
//             console.log(resp)
//         })
//     };

//     $scope.view = function(id){
//         articles.updateArticle($scope.updatedArticle.id, $scope.updatedArticle).success(function(resp){
//             console.log(resp)
//         })
//         $scope.updateArticle = {};
//     }
// }])



var newEvent = Parse.Object.extend("newEvent");
var addEvent = new newEvent();

addEvent.set("name", name);
addEvent.set("key", key);
addEvent.set("eventDate", eventDate);
addEvent.set("fbAdmin", fbAdmin);
addEvent.set("instaAdmin", instaAdmin);
addEvent.set("createdAt", date);

addEvent.save(null, {
    success : function(addEvent) {
        // Execute any logic that should take place after the object is saved.
        console.log('New event was saved for: ' + addEvent.id);
    },
    error : function(addEvent, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        console.log('Failed to create new object, with error code: ' + error.message);
    }
});