var Location = function(data) {
  this.name = data.name;
  this.location = data.location;
  this.fsId = data.fsId;
  this.visible = ko.observable(true);

}

var viewModel = function() {
  self = this;
  this.customList = ko.observableArray([]);
  this.searchTerm = ko.observable('');
  console.log(this.searchTerm());

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
           if (alpha.search(filter) >= 0) {
             location.visible(true);
             return true;
           }
        });
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
