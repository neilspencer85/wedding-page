app.service('eventService', ['$http', '$q', function($http, $q) {
    
    var event;
    
    this.sendEvent = function() {
        return event;
    }
    
    this.createEvent = function(event) {
        var dfr = $q.defer()
        var date = new Date();
        var EventObject = Parse.Object.extend("Event");
        var eventObject = new EventObject();
    
        eventObject.set("name", event.name);
        eventObject.set("eventCode", event.eventCode);
        eventObject.set("eventDate", event.eventDate);
        eventObject.set("fbAdmin", event.fbAdmin);
        eventObject.set("instaAdmin", event.instaAdmin);
        eventObject.set("createdAt", event.date);
        
        eventObject.save(null, {
            success : function(addEvent) {
                // Execute any logic that should take place after the object is saved.
                console.log('New event was saved for: ' + addEvent.id);
                dfr.resolve(addEvent);
            },
            error : function(addEvent, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                console.log('Failed to create new object, with error code: ' + error.message);
            }
        });
        return dfr.promise;
    };
    
    
    this.getEvent = function(id) {
        var dfr = $q.defer();
        var Event = Parse.Object.extend("Event");
        var query = new Parse.Query(Event);
        query.equalTo("eventCode", id);
        query.find({
          success: function(results) {
            console.log(results);
            event = results;
            dfr.resolve(results);
          },
          error: function(error) {
            console.log("Error: " + error.code + " " + error.message);
          }
        });
        return dfr.promise;
    };
    
    
    
}]); //End AdminCtrl