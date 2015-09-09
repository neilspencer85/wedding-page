app.service('eventService', ['$http', '$q', function($http, $q) {
    
    var event;
    
    this.createEvent = function(event) {
        var dfr = $q.defer();
        var date = new Date();
        var EventObject = Parse.Object.extend("Event");
        var eventObject = new EventObject();
    
        eventObject.set("name", event.name);
        eventObject.set("key", event.key);
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
        query.equalTo("key", id);
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
    
    this.sendEvent = function() {
        return event;
    };
    
    // getRecentCommentsOfAllVideos: function(limit) {
    //     var Comment = Parse.Object.extend("Comment");
    //     var commentsQuery = new Parse.Query(Comment);
    //     commentsQuery.descending("createdAt");
    //     commentsQuery.limit(limit);
    //     commentsQuery.include("parent");//this enables the details of the comment's associated video to be available in the result
    //     return commentsQuery.find();
    // }
    
    this.getPhotos = function(){
      var Photo = Parse.Object.extend("Photo");
      var photosQuery = new Parse.Query(Photo);
      photosQuery.descending("createdAt");
      photosQuery.include("parent");
      return photosQuery.find();
    };

    
    this.getPhoto = function(id) {
        var dfr = $q.defer();
        var Photo = Parse.Object.extend("Photo");
        var query = new Parse.Query(Photo);
        query.equalTo("objectId", id);
        query.find({
          success: function(results) {
            console.log(results);
            dfr.resolve(results);
          },
          error: function(error) {
            console.log("Error: " + error.code + " " + error.message);
          }
        });
        return dfr.promise;
    };
    
    this.sendEvent = function() {
        return event;
    };
    
}]); //End AdminCtrl