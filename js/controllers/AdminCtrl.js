app.controller('AdminCtrl', ['$scope', 'eventService', '$location', 'isAuthed', '$mdToast', '$document', function($scope, eventService, $location, isAuthed, $mdToast, $document) {
    
    if(!isAuthed) {
        $location.path('/login');
    }
    
    
    ////////////////////////
    //  Create new event  //
    ////////////////////////
    $scope.newEvent = function(event) {
        eventService.getEvent(event.key).then(function(res) {
        if (res.length > 0) {
            $scope.createEventError = "Looks like there is an event with that code already. Please try again with a unique event code!";
            $scope.event.eventCode = "";
        }
        else 
            eventService.createEvent(event).then(function(res) {
                $scope.eventCreated();
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
                $location.path('/event/' + res[0].attributes.key)   ;
            }
        });
    };
    
    $scope.logout = function() {
        Parse.User.logOut();
        console.log("logout");
        $location.path('/login');
    };
    
    var last = {
        bottom: true,
        top: false,
        left: false,
        right: true
    };
    
    $scope.toastPosition = angular.extend({},last);
    
    $scope.getToastPosition = function() {
        sanitizePosition();
        return Object.keys($scope.toastPosition)
            .filter(function(pos) { return $scope.toastPosition[pos]; })
            .join(' ');
    };
    
    function sanitizePosition() {
        var current = $scope.toastPosition;
        if ( current.bottom && last.top ) current.top = false;
        if ( current.top && last.bottom ) current.bottom = false;
        if ( current.right && last.left ) current.left = false;
        if ( current.left && last.right ) current.right = false;
        last = angular.extend({},current);
    }
    
    $scope.eventCreated = function() {
        $mdToast.show(
            $mdToast.simple()
                .content('Event was created successfully!')
                .position($scope.getToastPosition())
                .hideDelay(2000)
        );
    };
    
}]); //End AdminCtrl