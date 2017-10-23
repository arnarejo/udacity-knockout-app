function initMap() {
  // map center location
  let center = {lat: -35.2914808, lng: 149.1296499};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: center
  });
};
