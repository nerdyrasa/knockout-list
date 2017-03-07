/**
 * Created by rasai_000 on 3/3/2017.
 */

var app = window.app || {};
app.madMap = (function () {
  "use strict";
  var me = {
    map: undefined,
    markers: [],
    initMap: initMap,
    initMarkers : initMarkers,
    markerInfo : {}
  };

  function initMap() {

    var madisonCenter = {lat: 43.069352, lng: -89.396601};

    me.map = new google.maps.Map(document.getElementById('map_canvas'), {
      zoom: 14,
      center: madisonCenter
    });

  }

  function initMarkers(locations) {

    var largeInfoWindow = new google.maps.InfoWindow();

    var bounds = new google.maps.LatLngBounds();

    for (var i = 0; i < locations.length; i++) {
      var position = locations[i].location;
      var title = locations[i].name;

      console.log("locations[i] = ", locations[i]);
      console.log("title = ", title);

      var marker = new google.maps.Marker({
        map: me.map,
        position: position,
        title: title,
        animation: google.maps.Animation.DROP,
        id: i
      });

      var markerInfo = { "type" : locations[i].type };
      me.markers.push(marker);

      // me.markerInfo
      // bounds.extend(marker.position);

      marker.addListener('click', function () {

        console.log("this is ", this);
        populateInfoWindow(this, largeInfoWindow);

        // open the list
        // TODO: highlight the corresponding list item
        // document.getElementById('left-nav').click();
        console.log("clicked on marker");

      });

      // showMarkers();
    }
  }

  function getYelpInfo() {


  }

  function showMarkers() {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < me.markers.length; i++) {
      me.markers[i].setMap(me.map);
      bounds.extend(me.markers[i].position);
    }
    me.map.fitBounds(bounds);
    console.log(me.map.zoom);
  }

  function hideMarkers() {
    for (var i = 0; i < markers.length; i++) {

      // This will hide the markers, not delete them
      me.markers[i].setMap(null);

    }
  }

  function populateInfoWindow(marker, infowindow) {
    // Check to make sure the info window is not already opened on this marker
    if (infowindow.marker != marker) {
      infowindow.marker = marker;
      infowindow.setContent('<div>' + marker.title + '</div>');
      infowindow.open(me.map, marker);
      // make sure the marker property is cleared if the infowindow is closed
      infowindow.addListener('closeclick', function () {
        //infoWindow.setMap(null);
        infowindow.setMarker = null;
        infowindow.marker = null;
      })
    }
  }

  return me;
})();

