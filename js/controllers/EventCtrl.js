app.controller('EventCtrl', ['$scope', '$stateParams', 'eventService', '$location', 'isAuthed', '$mdDialog', function($scope, $stateParams, eventService, $location, isAuthed, $mdDialog) {
    
    if(!isAuthed) {
        $location.path('/login');
    }
    
    (function getEvent() {
        eventService.getEvent($stateParams.eventId).then(function(res){
            $scope.event = res[0].attributes.key;
            $scope.eventId = res[0].id;
        });
    }());
    
    // (function testPhotoStuff() {
        
    //     var photoUrl =  
    //     Parse.Cloud.httpRequest({ url: photoUrl.url() }).then(function(response) {
    //       // The file contents are in response.buffer.
    //         console.log("response: ", response);
    //         console.log("response.buffer: ", response.buffer);
    //     });
    
    // }());
    
    
    $scope.getPhotos =function() {
        eventService.getPhotos($stateParams.eventId).then(function(res) {
            console.log("GetPhotos: ", res);
            $scope.photos = res;
            $scope.numberOfPhotos = $scope.photos.length;
            $scope.photo = $scope.photos[0].attributes.thumbnailImage._url;
            $scope.originalImages = [];
            for(var i = 0; i < $scope.photos.length; i += 1) {
                if($scope.photos[i].attributes.originalImage) {
                    var photoUrl = $scope.photos[i].attributes.originalImage._url.split("http").join("https") + ".jpeg";
                    $scope.originalImages.push(photoUrl); 
                } else {
                    var photoUrl2 = $scope.photos[i].attributes.midResolutionImage._url.split("http").join("https") + ".jpeg";
                    $scope.originalImages.push(photoUrl2);
                }
                
            }
            console.log($scope.originalImages);
        });
    };
    
    $scope.getPhotos();
    
    $scope.openPhotoModal = function(i) {
        $scope.modalPhoto = $scope.photos[i].attributes.thumbnailImage._url;
        $mdDialog.show({
	        controller: DialogController,
	        scope: $scope,
	        preserveScope: true,
	        parent: angular.element(document.body),
	        clickOutsideToClose: true,
	        title: 'Photo',
	        templateUrl: 'views/modalPhotoDialog.html'
	  	}).then(function(res) {
	  	    console.log("dialog res: ", res);
	  	});
    }
    
    var selectedPhotos = [];
    
    $scope.checked = true;
    
    $scope.imgSelect = function(index) {
        console.log("index from checkbox: ", index);
        console.log("indexOf: ", selectedPhotos.indexOf(index));
        if (selectedPhotos.indexOf(index) === -1) {
            selectedPhotos.push(index);
            console.log("Photos array after push: ", selectedPhotos);
        }
        else {
            selectedPhotos.splice((selectedPhotos.indexOf(index)), 1);
        }
        console.log("Photos array after splice: ", selectedPhotos);
    };
    
    $scope.exists = function (index) {
        return (!$scope.checked);
    };
    
    $scope.logout = function() {
        Parse.User.logOut();
        console.log("logout");
        $location.path('/login');
    };
    
    $scope.deleteEvent = function(ev) {
        console.log("delete event clicked");
	    $mdDialog.show({
	        controller: DialogController,
	        scope: $scope,
	        preserveScope: true,
	        parent: angular.element(document.body),
	        clickOutsideToClose: true,
	        title: 'Delete Event',
	        templateUrl: 'views/deleteEventDialog.html',
	        targetEvent: ev
	  	}).then(function(res) {
	  	    console.log("dialog res: ", res);
	  	});
    };
    
    $scope.deletePhotos = function() {
        console.log("deletePhotos clicked");
        eventService.deletePhotos(selectedPhotos).then(function(res) {
            console.log("deletePhotos res: ", res);
            $scope.getPhotos();
            $scope.checkbox = false;
            angular.forEach($scope.photos, function (photo) {
                photo.selected = $scope.checkbox;
            });
        });
    };
    
    
    function DialogController($scope, $mdDialog) {
    
          $scope.deleteEventDialog = function() {
            console.log("deleteEvent inside dialog clicked");
		  	$mdDialog.hide();
		  	eventService.deleteEvent($scope.eventId).then(function(res) {
		  	    console.log("it was deleted");
                if (res === "It was deleted") {
                    $location.path('/admin');
                }
            });
		  };
		  
		  
		  // closes Dialog - called from all Dialogs		  
		  $scope.closeDialog = function() {
		    $mdDialog.hide();
		  };
		  
    }
    
    $scope.exportPhotos = function() {
        var zip = new JSZip;
        var photoZip = zip.folder("Event Images");
        for(var i = 0; i < $scope.originalImages.length; i += 1) {
            var url = $scope.originalImages[i];
            var filename = "Event Photo " + i;
            // eventService.getZipPhotos(url, filename).then(function(res) {
            //     photoZip.file(res);
            zip.file(filename, url);
            console.log("url: ", url, "filename: ", filename);
            // });
        }
        console.log("photoZip: ", photoZip);
        var zipper = zip.generate({type: "blob"});
        saveAs(zipper, "photos.zip");
    };
    
    // $scope.btnScroll = function() {
    //   function fixDiv() {
    //     var $cache = $('#eventBtns');
    //     if ($(window).scrollTop() > 100)
    //       $cache.css({
    //         'position': 'fixed',
    //         'top': '10px'
    //       });
    //     else
    //       $cache.css({
    //         'position': 'relative',
    //       });
    //   }
    //   $(window).scroll(fixDiv);
    //   fixDiv();
    // };
    
    // $scope.btnScroll();
    
    
    
}]); //End EventCtrl