// 'strict mode' research source: https://www.w3schools.com/js/js_strict.asp
'use strict';

let map;

// foursquare API details
let baseURL = "https://api.foursquare.com/v2/venues/";

let version = '20171027';
let client_id = "QNNNN5DX5BXZVPQE5E5TDSTUC02EYCPFBDRP1HN30KEU4K3N";
let client_secret = "ZQL14F31J2AHUSPDTWWG53AY3BKG5PQE3M3Z3APEIHLRGJ3A";

// Hamburger menu toggle function
function toggleMenuBar() {
  document.getElementsByClassName('menu')[0].classList.toggle('inactive');
}

let Location = function(data) {

  let self = this;

  this.name = data.name;
  this.location = data.location;
  this.fsId = data.fsId;
  this.visible = ko.observable(true);
  this.description = '';
  this.phone = '';
  this.shortUrl = '';

  let fullURL = baseURL + this.fsId + "?&client_id=" + client_id + "&client_secret=" + client_secret + "&v=" + version;

  $.getJSON(fullURL).done(function(data) {
    let results = data.response.venue;
    console.log(data);
    self.description = results.description;
    self.phone = results.contact.formattedPhone ? results.contact.formattedPhone: "";
    self.shortUrl = results.shortUrl;
  });


  this.infowindow = new google.maps.InfoWindow({});

  google.maps.event.addListener(map, 'click', function() {
  				self.infowindow.close();
  			});

  this.marker = new google.maps.Marker({
    position: self.location,
    animation: google.maps.Animation.DROP,
    map: map,
    title: self.name
  });

  this.marker.addListener('click', function() {

    // set clicked marker as center of map - can use both map.setCenter() or map.panTo() to achieve similar end result
    map.panTo(self.marker.getPosition());

    self.infoText = '';
    self.infoText += '<div class="info"><h3>' + data.name + '</h3></br>';
    self.infoText += self.description ? '<p>' + self.description + '</p></br>' : '';
    self.infoText += self.phone ? '<strong>Phone: </strong>' + self.phone + '</br>' : '';
    self.infoText += '<a href="' + self.shortUrl + '" target="_blank">' + self.shortUrl + '</a>' + '</div>';

    self.infowindow.setContent(self.infoText);
    self.infowindow.open(map, self.marker);
    // Make marker bounce on click for only two bounces
    self.marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function () {
      self.marker.setAnimation(null);
    }, 1410);


  });

// Click function to display specific infowindow
  this.showInfoWindow = function() {
    google.maps.event.trigger(self.marker, 'click');
  }

  // make markers ko observable and link with the search results
  this.visibleMarkers = ko.computed(function() {
    if(this.visible()) {
      this.marker.setMap(map);
    } else {
      this.marker.setMap(null);
    }

  }, this);

}

let viewModel = function() {
  self = this;
  this.customList = ko.observableArray([]);
  this.searchTerm = ko.observable('');
  //  console.log(this.searchTerm());

  initialLocations.forEach(function(location) {
    self.customList.push(new Location(location));
  });

  this.visibleList = ko.computed( function() {
    let filter = self.searchTerm().toLowerCase();
    if (!filter) {
      self.customList().forEach(function(location) {
        location.visible(true);
      });
      return self.customList();
    } else {
      return ko.utils.arrayFilter(self.customList(), function(location) {
        let alpha = location.name.toLowerCase();
        if (alpha.indexOf(filter) >= 0) {
          location.visible(true);
          return true;
        } else {
          location.visible(false);
          return false;

        }
      });
    }

  }, self);

};

function initMap() {

  // map center location
  let center = {lat: -35.2914808, lng: 149.1296499};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: center,
    styles: customStyle,
    mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_RIGHT
    },
//   disableDefaultUI: true

  });

  //to resize the map on change of device width
  google.maps.event.addDomListener(window, 'resize', function() {
      map.setCenter(center);
  });

  ko.applyBindings(new viewModel());

};
