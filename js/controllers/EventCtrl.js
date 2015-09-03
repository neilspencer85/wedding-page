app.controller('EventCtrl', ['$scope', '$stateParams', 'eventService', function($scope, $stateParams, eventService) {
    (function getEvent() {
        console.log($stateParams)
        eventService.getEvent($stateParams.eventCode).then(function(res){
            console.log(res)
        })
    }())
    
}]); //End EventCtrl