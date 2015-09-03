app.controller('AdminCtrl', ['$scope', 'eventService', '$location', function($scope, eventService, $location) {
    
    ////////////////////////
    //  Create new event  //
    ////////////////////////
    $scope.newEvent = function(event) {
        eventService.getEvent(event.eventCode).then(function(res) {
        if (res.length > 0) {
            $scope.createEventError = "Looks like there is an event with that code already. Please try again with a unique event code!";
            $scope.event.eventCode = "";
        }
        else 
            eventService.createEvent(event).then(function(res) {
                console.log("Yaya it worked: ", res);
            });
        });
        
    };
    
    
    ////////////////////////
    //   Retrieve Event   //
    ////////////////////////
    $scope.getEvent= function(id) {
        eventService.getEvent(id).then(function(res) {
            console.log("We got the event! ", res);
            if (res.length < 1) {
                $scope.getEventError = "Uh oh... There is not an event with that Event Code. Try again with a different code!";
                $scope.event.id = "";
            } else {
                console.log(res[0].attributes.eventCode);
                $location.path('/event/' + res[0].attributes.eventCode)   ;
            }
        });

        // $location
    };
    
}]); //End AdminCtrl