'use strict';

var map;

// foursquare API details
var baseURL = "https://api.foursquare.com/v2/venues/";

var version = '20171023';
var client_id = "QNNNN5DX5BXZVPQE5E5TDSTUC02EYCPFBDRP1HN30KEU4K3N";
var client_secret = "ZQL14F31J2AHUSPDTWWG53AY3BKG5PQE3M3Z3APEIHLRGJ3A";

var Location = function(data) {

  var self = this;

  this.name = data.name;
  this.location = data.location;
  this.fsId = data.fsId;
  this.visible = ko.observable(true);
  this.infoText = this.name;


}

var viewModel = function() {
  self = this;
  this.customList = ko.observableArray([]);
  this.searchTerm = ko.observable('');
//  console.log(this.searchTerm());

  initialLocations.forEach(function(location) {
    self.customList.push(new Location(location));
  });

  this.visibleList = ko.computed( function() {
    var filter = self.searchTerm().toLowerCase();
    if (!filter) {
      self.customList().forEach(function(location) {
        location.visible(true);
      });
      return self.customList();
    } else {
      return ko.utils.arrayFilter(self.customList(), function(location) {
        var alpha = location.name.toLowerCase();
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
    zoom: 11,
    center: center
  });

  self.customList().forEach(function(location) {
    self.marker = new google.maps.Marker({
      position: location.location,
      map: map,
      title: location.name
    });

    var infowindow = new google.maps.InfoWindow({
      content: location.name,
      position: location.location
    });

  self.marker.addListener('click', function() {
      infowindow.close(map, null);
      infowindow.open(map, this.marker);
            });
  });

};

ko.applyBindings(new viewModel());
