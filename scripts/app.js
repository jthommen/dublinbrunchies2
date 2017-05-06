// Dublin brunchies code

// Initializing global variables
var map,places,geocoder,service, marker;
var markers = [];
var currentMarker = null;


// Initial places Info
var data = ko.observableArray([
    {
        name: "Herb Street",
        placeid: "ChIJzU9jGe0OZ0gRBBBj8snPCIk",
        formatted_address: "Hanover Quay, Grand Canal Dock, Dublin 2, Irland",
        international_phone_number: "+353 1 675 3875",
        lat: 53.3443851,
        lng: -6.237654799999973,
        rating: 4.3,
        website: "http://www.herbstreet.ie/",
        shown: ko.observable(true),
        phoneMsg: ko.observable()
    },
    {
        name: "Eathos ",
        placeid: "ChIJ6wiY2b0OZ0gRUEceJR8sVgw",
        formatted_address: "13 Baggot Street Upper, Dublin 4, Irland",
        international_phone_number: "+353 1 629 8090",
        lat: 53.33356440000001,
        lng: -6.24485709999999,
        rating: 4.4,
        website: "http://www.eathosdublin.com/",
        shown: ko.observable(true),
        phoneMsg: ko.observable()
    },
    {
        name: "Farmer Browns Bath Avenue",
        placeid: "ChIJvZcIGeoOZ0gR1zv8DgmizRI",
        formatted_address: "25A Bath Ave, Dublin 4, Irland",
        international_phone_number: "+353 86 394 8255",
        lat: 53.33713099999999,
        lng: -6.231884000000036,
        rating: 4.3,
        website: "http://farmerbrowns.ie/",
        shown: ko.observable(true),
        phoneMsg: ko.observable()
    },
    {
        name: "Odessa ",
        placeid: "ChIJcduJ4pwOZ0gRHHHVY_6nLNE",
        formatted_address: "13 Dame Ct, Dublin 2, Irland",
        international_phone_number: "+353 1 670 3080",
        lat: 53.34357409999999,
        lng: -6.263827900000024,
        rating: 4.1,
        website: "http://odessa.ie/",
        shown: ko.observable(true),
        phoneMsg: ko.observable()
    },
    {
        name: "Bow Lane",
        placeid: "ChIJyfwM550OZ0gR5vUp96qC2s8",
        formatted_address: "17 Aungier St, Dublin, Irland",
        international_phone_number: "+353 1 478 9489",
        lat: 53.3402743,
        lng: -6.265504899999996,
        rating: 4.2,
        website: "http://www.bowlane.ie/",
        shown: ko.observable(true),
        phoneMsg: ko.observable()
    }
]);


// Google maps styles
var mapStyles = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            },
            {
                "gamma": "0.63"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            },
            {
                "weight": "2.10"
            },
            {
                "gamma": "0.88"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#6693c3"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "gamma": "1.45"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "color": "#d9e2ea"
            }
        ]
    }
];


// Initializes map
function app() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 53.3442561, lng: -6.2570881},
        zoom: 14,
        styles: mapStyles,
        mapTypeControl: false //forbidds users to change map type
    })

    placeMarkers(data());
}


// Handles error if map doesn't load
function appError(){
    alert("The Google Maps API didn't load, please try again later.");
}


// Places marker data on map
function placeMarkers(data) {
    var placeInfoWindow = new google.maps.InfoWindow();
    for (var i=0; i < data.length; i++){
        marker = new google.maps.Marker({
            position: {lat: data[i].lat, lng: data[i].lng},
            map: map,
            icon: 'assets/pointer-blue.png',
            title: data[i].name
        });
        marker.id = data[i].placeid;
        data[i].infowindow = placeInfoWindow;
        marker.addListener('click', function(){
            populateInfoWindow(this, placeInfoWindow);
            changeColor(this);
        });

        data[i].marker = marker;
    }
}


// Populates infowindows
function populateInfoWindow(marker, infowindow) {

    infowindow.setContent(getPlaceDetails(marker, infowindow));

    infowindow.addListener('closeclick', function() {
        infowindow.marker = 0;
        marker.setIcon('assets/pointer-blue.png');
        marker.setAnimation(null);
    });

    infowindow.open(map, marker);
}


// Gets places details and populates content of infowindows
function getPlaceDetails(marker, infowindow) {
    service = new google.maps.places.PlacesService(map);
    service.getDetails({
        placeId: marker.id
    }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {

            // Set marker property on the infowindow to prevent duplicates
            infowindow.marker = marker;
            var innerHTML = '<div>';
              innerHTML += '<h3>' + marker.title + '</h3>';

            fsRating(marker.title, function(data) {
            	innerHTML +='<br><br>'+
            		'<strong> '+ data.usersCount+'</strong> '+
            		'foursquare user checked into '+ marker.title +
            		'<strong> ' + data.checkinsCount + ' </strong> times.';

            	if (place.opening_hours) {
              	innerHTML += '<br><br><strong>Hours:</strong><br>' +
                  	place.opening_hours.weekday_text[0] + '<br>' +
                  	place.opening_hours.weekday_text[1] + '<br>' +
                  	place.opening_hours.weekday_text[2] + '<br>' +
                  	place.opening_hours.weekday_text[3] + '<br>' +
                  	place.opening_hours.weekday_text[4] + '<br>' +
                  	place.opening_hours.weekday_text[5] + '<br>' +
                  	place.opening_hours.weekday_text[6];
            	}

            	if (place.photos) {
            	  innerHTML += '<br><br><img src="' + place.photos[0].getUrl(
            	      {maxHeight: 100, maxWidth: 200}) + '">';
            	  innerHTML += '<img src="' + place.photos[1].getUrl(
            	      {maxHeight: 100, maxWidth: 200}) + '">';
            	}

            	innerHTML += '</div>';
            	infowindow.setContent(innerHTML);
            	infowindow.open(map, marker);

            	// Make sure the marker is cleared if infowindow is closed
            	infowindow.addListener('closeclick', function() {
                	infowindow.marker = null;
                	marker.setIcon('assets/pointer-blue.png');
                	marker.setAnimation(null);
            	});
            });
        }
    });
}


// Shows InfoWindow
function showMarker() {
    changeColor(this.marker);
    populateInfoWindow(this.marker, this.infowindow);
}


// Changes marker color on Click
function changeColor(marker) {
    this.marker = marker;
    if(currentMarker && currentMarker != this.marker){
        currentMarker.setIcon('assets/pointer-blue.png');
        currentMarker.setAnimation(null);
    }
    currentMarker = this.marker;
    this.marker.setIcon('assets/pointer-grey.png');
    this.marker.setAnimation(google.maps.Animation.BOUNCE);
}


// // Foursquare helper function
function callFoursquare(name, callback){

    // Specify foursquare url components
    var VERSION = "20161016";
    var CLIENT_SECRET = "MV2RQT4Z1JCNNZ41PNTJBBVIOSKXZ2S4XPUXEEXASG4LEXGX";
    var CLIENT_ID = "OWVYGY2P0FTE0WUBZRHTKSBY4AY2IGWV1KCXHYKZT4WRJIWW";
    var LL = "53.3402743%2C%20-6.265504899999996";
    var query = name.toLowerCase().replace(" ","");
    var fsURL = "https://api.foursquare.com/v2/venues/search?v="+VERSION+"&ll="+LL+"&query="+query+"&client_id="+CLIENT_ID+"&client_secret="+CLIENT_SECRET;

    // Request JSON from foursquare api, process response
    $.getJSON(fsURL).done(function(data) {
        var places = data.response.venues[0];
        callback(places);
    }).fail(function(){
        alert("The foursquare API returned an error. Please try again later.");
    });

}


// Function for phone number testing with foursquare
function fsPhoneNumber() {
	var self = this;

	callFoursquare(this.name, function(places) {
		if(!places.contact.formattedPhone) {
            self.phoneMsg("No phone number on foursquare available!");
        } else {
            if(self.international_phone_number === places.contact.formattedPhone) {
                self.phoneMsg("Phone numbers match!");
            } else {
                self.phoneMsg("Phone numbers don't match, try both!</br>"+
                self.international_phone_number+"</br>"+
                places.contact.formattedPhone);
            }
        }
	});
}


// Function for returning the check-ins of a place on foursquare
function fsRating(place, callback){
    callFoursquare(place, function(place) {
    	var foursquare = {};
    	foursquare.checkinsCount = place.stats.checkinsCount;
    	foursquare.usersCount = place.stats.usersCount;
    	callback(foursquare);
    });
}


// Viewmodel for the Dublin Brunchies app
var viewModel = function(){
    var self = this;

    // Clear foursquare phone message
    self.clearPhoneMsg = function(){
        this.phoneMsg("");
    }

    // Filter function to filter on text input
    self.filter = ko.observable("");

    self.placeFilter = ko.computed(function() {
        var filter = self.filter()
        var query = self.filter().toLowerCase();

        if (!query) {
            data().forEach(function(place) {
                place.shown(true);
                if(place.marker){
                    place.marker.setVisible(true);
                }
            });
        } else {
            data().forEach(function(place) {
                if(place.name.toLowerCase().indexOf(query) >= 0) {
                    place.shown(true);
                    place.marker.setVisible(true);
                } else {
                    place.shown(false);
                    place.marker.setVisible(false);
                }
            })
        }
    });
};

ko.applyBindings(new viewModel());
