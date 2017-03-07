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
    markersInfo : [],
    getYelpInfo : getYelpInfo,
    filterByCategory : filterByCategory,
    triggerMapEvent: triggerMapEvent,
    showAllMapMarkers: showAllMapMarkers
  };

  function initMap() {

    var madisonCenter = {lat: 43.069352, lng: -89.396601};

    me.map = new google.maps.Map(document.getElementById('map_canvas'), {
      zoom: 14,
      center: madisonCenter
    });

  }

  var largeInfoWindow = undefined;

  function initMarkers(locations) {

    largeInfoWindow = new google.maps.InfoWindow();

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

      var mI = { "marker": marker,
        "type": locations[i].type};

      console.log("mI = ", mI);

      var num = mI;

      me.markersInfo.push( mI );
      // me.markerInfo
      // bounds.extend(marker.position);

      //elem.addEventListener('click', (function(numCopy) {
      //  return function() {
      //    alert(numCopy)
      //  };
      //})(num));


      marker.addListener('click', (function (numCopy) {

        return function() {
          console.log("this is ", this);
          populateInfoWindow(this, largeInfoWindow, numCopy);

          // open the list
          // TODO: highlight the corresponding list item
          // document.getElementById('left-nav').click();
          console.log("clicked on marker");
        };
      })(num));

      // showMarkers();
    }
  }

  function getYelpInfo() {

  }

  function showMarkers() {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < me.markers.length; i++) {
      me.markersInfo[i].markers.setMap(me.map);
      bounds.extend(me.markersInfo[i].markers.position);
    }
    me.map.fitBounds(bounds);
    console.log(me.map.zoom);
  }

  function hideMarkers() {
    for (var i = 0; i < me.markersInfo.length; i++) {
      // This will hide the markers, not delete them
      me.markersInfo[i].markers.setMap(null);
    }
  }

  function filterByCategory(category) {

    console.log("category is ", category);

    console.log("me.markersInfo ", me.markersInfo);

    for (var i = 0; i < me.markersInfo.length; i++) {
      // This will hide the markers, not delete them

      if ( me.markersInfo[i].type === category ) {
        me.markersInfo[i].marker.setMap(me.map);
      } else {
        me.markersInfo[i].marker.setMap(null);
      }
    }
  }

  function showAllMapMarkers() {
    for (var i = 0; i < me.markersInfo.length; i++) {
        me.markersInfo[i].marker.setMap(me.map);
    }
  }

  function triggerMapEvent(placeId) {

    console.log("trigger Map Event ", me.markersInfo[placeId]);

    populateInfoWindow(me.markersInfo[placeId].marker, largeInfoWindow, me.markersInfo[placeId]);

  }

  function populateInfoWindow(marker, infowindow, markerInfo) {

    console.log("mI = ", markerInfo);

    // Check to make sure the info window is not already opened on this marker
    if (infowindow.marker != marker) {
      infowindow.marker = marker;
      infowindow.setContent('<div><h1>' + marker.title + "</h1><p>" + markerInfo.type + '</p></div>');
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

