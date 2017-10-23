var Location = function(data) {
  this.name = data.name;
  this.location = data.location;
  this.fsId = data.fsId;

}

var viewModel = function() {
  self = this;
  this.customList = ko.observableArray([]);
  this.searchTerm = ko.observable('');
  console.log(this.searchTerm());

  initialLocations.forEach(function(eachLocation) {
    self.customList.push(new Location(eachLocation));
  });

  this.visibleList = ko.computed( function() {
  		var filter = self.searchTerm().toLowerCase();
  		if (filter.length > 0) {
        console.log(filter);
  		}
  	}, self);


};

function initMap() {
  // map center location
  let center = {lat: -35.2914808, lng: 149.1296499};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: center
  });
};

ko.applyBindings(new viewModel());
