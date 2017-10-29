// 'strict mode' research source: https://www.w3schools.com/js/js_strict.asp
'use strict';

let map, infoList;

// foursquare API details
let baseURL = "https://api.foursquare.com/v2/venues/";
let version = '20171027';
let client_id = "QNNNN5DX5BXZVPQE5E5TDSTUC02EYCPFBDRP1HN30KEU4K3N";
let client_secret = "ZQL14F31J2AHUSPDTWWG53AY3BKG5PQE3M3Z3APEIHLRGJ3A";

// Hamburger menu toggle function
function toggleMenuBar() {
  document.getElementsByClassName('menu')[0].classList.toggle('inactive');
}

// Model to initialize and store data
let Location = function(data) {

  let self = this;
  this.name = data.name;
  this.location = data.location;
  this.fsId = data.fsId;

  this.visible = ko.observable();
  this.description = '';
  this.phone = '';
  this.shortUrl = '';

  let fullURL = baseURL + this.fsId + "?&client_id=" + client_id + "&client_secret=" + client_secret + "&v=" + version;

  $.getJSON(fullURL).done(function(data) {
    let results = data.response.venue;
    //    console.log(data);
    self.description = results.description;
    self.phone = results.contact.formattedPhone ? results.contact.formattedPhone: "";
    self.shortUrl = results.shortUrl;
  }).fail(function() {
    alert('Unable to access fourSquare API at the moment. Please check the connection or try later');
  });

  this.marker = new google.maps.Marker({
    position: self.location,
    animation: google.maps.Animation.DROP,
    map: map,
    title: self.name
  });

  infoList = [];
  this.marker.addListener('click', function() {
    infoList.forEach(function(window){
      window.close();
    });

    // set clicked marker as center of map - can use both map.setCenter() or map.panTo() to achieve similar end result
    map.panTo(self.marker.getPosition());

    self.infoText = '';
    self.infoText += '<div class="info"><h3>' + data.name + '</h3></br>';
    self.infoText += self.description ? '<p>' + self.description + '</p></br>' : '';
    self.infoText += self.phone ? '<strong>Phone: </strong>' + self.phone + '</br>' : '';
    self.infoText += '<a href="' + self.shortUrl + '" target="_blank">' + self.shortUrl + '</a>' + '</div>';

    self.infowindow = new google.maps.InfoWindow({
      content: self.infoText
    });

    infoList.push(self.infowindow);

    self.infowindow.open(map, self.marker);

    // Make marker bounce on click for only two bounces
    self.marker.setAnimation(google.maps.Animation.BOUNCE);

    setTimeout(function () {
      self.marker.setAnimation(null);
    }, 1400);

  });

// display specific infowindow when clicked on the location name from the menu
  this.showInfoWindow = function() {
    google.maps.event.trigger(self.marker, 'click');
  }

  // make markers ko observable and link with the search results
  this.visibleMarkers = ko.computed(function() {
    this.visible() ? this.marker.setMap(map) : this.marker.setMap(null);
  }, this);
}

// viewModel binds data (initialLocations and fourSquare API) with the the view (index.html)
let ViewModel = function() {
  self = this;

  // create a knockout observable list
  this.customList = ko.observableArray([]);

  // create a knockout observable to store input text
  this.searchTerm = ko.observable('');

  // populate customList with initialLocations by calling Locations object on each location
  initialLocations.forEach(function(location) {
    self.customList.push(new Location(location));
  });

  // filter knockout observable list of all locations (customList) with user input (this.searchTerm) to display selective locations
  // reference: http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
  this.visibleList = ko.computed( function() {

    let filter = self.searchTerm().toLowerCase();

    // !filter returns 'true' if this.searchTerm is empty and will automatically make all locations visible
    if (filter === '') {
      self.customList().forEach(function(location) {
        location.visible(true);
      });
      return self.customList();
    } else {
      // following code will only execute if the input text in searchTerm is not empty
      // console.log(filter);
      return ko.utils.arrayFilter(self.customList(), function(location) {
        let alpha = location.name.toLowerCase();
        if (alpha.indexOf(filter) >= 0) {  // making alpha.indexOf(filter) === 0 will match only locations matching exactly with the user input
          location.visible(true);
          return true;
        } else {
          location.visible(false);
          return false;
        }
      });
    }
  }, this);
};

function initMap() {

  // map center location
  let center = {lat: -35.2914808, lng: 149.1296499};

  // create a new google map instance and display in #map
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: center,
    styles: customStyle,     // customStyle are defined in separate JS file mapstyle.js
    mapTypeControlOptions: {     // move map nagivation bar from top left to top right to avoid overlap with menu bar (source: google maps API documentation)
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_RIGHT
    },
  });

  //to resize the map on change of device width
  google.maps.event.addDomListener(window, 'resize', function() {
      map.setCenter(center);
  });

  // create a new KO instance of viewModel()
  ko.applyBindings(new ViewModel());
};

function errorMessage() {
  alert("Error alert: Unable to load Google Maps, please try later.");
};
