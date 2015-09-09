app.controller('EventCtrl', ['$scope', '$stateParams', 'eventService', function($scope, $stateParams, eventService) {
    (function getEvent() {
        console.log($stateParams);
        eventService.getEvent($stateParams.eventId).then(function(res){
            console.log(res);
            eventService.getPhoto(res[0].attributes.photos[12].id).then(function(data){
                console.log('THis is the hphhoto boyiz',data);
                // $scope.photo = data[0].attributes.thumbnailImage._url;
                console.log($scope.photo);
            });
            
        });
    }());
    
    (function getPhotos() {
        eventService.getPhotos().then(function(res) {
            console.log("GetPhotos: ", res);
            $scope.photos = res;
            $scope.photo = res[0].attributes.thumbnailImage._url;
        })
    }());
    
}]); //End EventCtrl