

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