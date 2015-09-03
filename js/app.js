Parse.initialize("pv2dMyXIqGOj7YefpKKmCBSVQCbZo4cjQp9FQCC1", "PrqgGnvbM0q09YsOTnQTUkS7JlzjXJg1OG4oUxjT");

var app = angular.module('Fotofly', ['ui.router']);

    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  	
    $urlRouterProvider.otherwise('/login');
    
    $stateProvider
        .state('login', {
            url: '/login',
            views: {
                'content': {
                    templateUrl: 'views/loginTmpl.html',
                    controller: 'LoginCtrl'
                },
                'footer': {
                    templateUrl: 'views/footer.html',
                    controller: 'MainCtrl'
                }
            }
        })
        .state('admin', {
            url: '/admin',
            views: {
                'content': {
                    templateUrl: 'views/adminTmpl.html',
                    controller: 'AdminCtrl'
                },
                'footer': {
                    templateUrl: 'views/footer.html',
                    controller: 'MainCtrl'
                }
            }
        })
        .state('event', {
            url: '/event',
            views: {
                'content': {
                    templateUrl: 'views/eventTmpl.html',
                    controller: 'EventCtrl'
                },
                'footer': {
                    templateUrl: 'views/footer.html',
                    controller: 'MainCtrl'
                }
            }
        })
        .state('eventId', {
            url: '/event/:eventCode',
            views: {
                'content': {
                    templateUrl: 'views/eventTmpl.html',
                    controller: 'EventCtrl'
                },
                'footer': {
                    templateUrl: 'views/footer.html',
                    controller: 'MainCtrl'
                }
            }, 
            // resolve: {
            //     eventData: function($route, eventService){
            //         console.log($route.current.params.eventCode)
            //         return eventService.getEvent($route.current.params.eventCode)
            //     }
            // }
        })
        
    }]); // end .config
        
        
// var newEvent = Parse.Object.extend("newEvent");
// var addEvent = new newEvent();

// addEvent.set("name", name);
// addEvent.set("key", key);
// addEvent.set("eventDate", eventDate);
// addEvent.set("fbAdmin", fbAdmin);
// addEvent.set("instaAdmin", instaAdmin);
// addEvent.set("createdAt", date);

// addEvent.save(null, {
//     success : function(addEvent) {
//         // Execute any logic that should take place after the object is saved.
//         console.log('New event was saved for: ' + addEvent.id);
//     },
//     error : function(addEvent, error) {
//         // Execute any logic that should take place if the save fails.
//         // error is a Parse.Error with an error code and message.
//         console.log('Failed to create new object, with error code: ' + error.message);
//     }
// });