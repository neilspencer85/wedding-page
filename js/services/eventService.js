app.service('eventService', ['$http', '$q', function($http, $q) {
    
    var event;
    
    this.createEvent = function(event) {
        var dfr = $q.defer();
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
                dfr.resolve(addEvent);
            },
            error : function(addEvent, error) {
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
    
    this.getPhotos = function(id) {
      var i;
      var dfr = $q.defer();
      var Event = Parse.Object.extend("Event");
      var query = new Parse.Query(Event);
      query.equalTo("key", id);
      query.include('photos');
      query.find({
        success: function(event) {
          var photos = event[0].attributes.photos;
          for (i = photos.length; i >= 0; i -= 1) {
            if (photos[i] === null) {
              photos.splice(i, 1);
              
            }
          }
          dfr.resolve(photos);
        }, error: function(error) {
          console.log("Error: ", error);
        }
      });
      return dfr.promise;
    };
    
    this.sendEvent = function() {
        return this.event;
    };
    
    this.deleteEvent = function(id) {
      var dfr = $q.defer();
        var Event = Parse.Object.extend("Event");
        var query = new Parse.Query(Event);
        query.get(id, {
          success: function(eventObj) {
            var str = "It was deleted";
            eventObj.destroy({});
            dfr.resolve(str);
          },
          error: function(object, error) {
            dfr.resolve(error);  
          }
        });
      return dfr.promise; 
    };
    
    this.deletePhotos = function(selectedPhotos) {
      var dfr = $q.defer();
      for (var i = 0; i < selectedPhotos.length; i += 1) {
        var Photo = Parse.Object.extend("Photo");
        var query = new Parse.Query(Photo);
        query.get(selectedPhotos[i], {
          success: function(eventObj) {
            var str = "It was deleted";
            eventObj.destroy({});
            dfr.resolve(str);
          },
          error: function(object, error) {
            dfr.resolve(error);  
          }
        });
      }
      return dfr.promise; 
    };
    
    this.getZipPhotos = function(eventId, photoIdArray) {
      var dfr = $q.defer();
      var Photo = Parse.Object.extend("Photo");
      // var Photo = Parse.Object.extend("Photo")
      var query = new Parse.Query(Photo);
      // query.equalTo("key", eventId);
      // query.include('photos');
      for(var i = 0; i < photoIdArray.length; i +=1) {
        query.get(photoIdArray[i], {
          success: function(res) {
            console.log("res: ", res)
            var photoId = res.attributes.midResolutionImage.url();
            Parse.Cloud.httpRequest({ url: photoId }).then(function(response) {
              console.log("response: ", response)
            });
            // var photo = query.get(photoId);
            console.log("photoId: ", photoId)
            dfr.resolve(photo);
          }, error: function(error) {
            console.log("Error: ", error);
          }
        });
      }
      return dfr.promise;
        // var dfr = $q.defer();
        // zip.file(filename, data);
        // console.log("data: ", data, "filename: ", filename);
        // dfr.resolve(data);
        // return dfr.promise;
    };
    
}]); //End AdminCtrl