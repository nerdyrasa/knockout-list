/**
 * Created by rasai_000 on 3/3/2017.
 */

var app = window.app || {};
app.madMap = (function () {
  "use strict";
  var me = {
    map: undefined,
    //   markers: [],
    initMap: initMap,
    initMarkers: initMarkers,
    getYelpInfo: getYelpInfo,
    filterByCategory: filterByCategory,
    triggerMapEvent: triggerMapEvent,
    showAllMapMarkers: showAllMapMarkers,
    clearInfoWindow: clearInfoWindow
  };

  function initMap() {

    var madisonCenter = {lat: 43.069352, lng: -89.396601};

    me.map = new google.maps.Map(document.getElementById('map_canvas'), {
      zoom: 14,
      center: madisonCenter
    });

  }

  var largeInfoWindow = undefined;

  function initMarkers() {

    var locations = app.placeViewModel.places();

    largeInfoWindow = new google.maps.InfoWindow();

    var bounds = new google.maps.LatLngBounds();

    for (var i = 0; i < locations.length; i++) {
      var position = locations[i].location;
      var title = locations[i].name;
      var marker = new google.maps.Marker({
        map: me.map,
        position: position,
        title: title,
        animation: google.maps.Animation.DROP,
        id: i
      });
      if (locations[i].type === "Attraction") {
        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
      } else {
        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
      }

      //    me.markers.push(marker);

      var markerInfo = {
        "marker": marker,
        "type": locations[i].type,
        "yelpID": locations[i].yelpID
      };

      locations[i].marker = marker;

//      var num = markerInfo;

      marker.addListener('click', (function (location) {

        return function () {
          console.log("this is ", this);
          populateInfoWindow(this, largeInfoWindow, location);

          // open the list
          // TODO: highlight the corresponding list item
          // document.getElementById('left-nav').click();
          console.log("clicked on marker");
        };
      })(locations[i]));

    }
  }

  function getYelpInfo() {

    app.yelpData.loadYelpRatings();

  }

  function filterByCategory(category, places) {

    console.log("category is ", category);

    me.clearInfoWindow();

    for (var i = 0; i < places.length; i++) {
      // This will hide the markers, not delete them

      if (places[i].type === category) {
        places[i].marker.setMap(me.map);
      } else {
        places[i].marker.setMap(null);
      }
    }
  }

  function showAllMapMarkers(places) {

    // me.clearInfoWindow();

    if ( typeof places !== 'undefined' ) {
      for (var i = 0; i < places.length; i++) {
        places[i].marker.setMap(me.map);
      }
    }
  }

  function triggerMapEvent(location) {

    populateInfoWindow(location.marker, largeInfoWindow, location);

  }

  function populateInfoWindow(marker, infowindow, markerInfo) {

    // Check to make sure the info window is not already opened on this marker
    if (infowindow.marker != marker) {
      infowindow.marker = marker;
      // look up the yelp rating if available

      var rating = app.yelpData.yelpRatings[markerInfo.yelpID].rating;
      var yelpUrl = app.yelpData.yelpRatings[markerInfo.yelpID].url;
      var imgTag = "<img src = ' " + rating + "' alt='Yelp Rating'/>";
      var yelpLink = "<a href='" + yelpUrl + "' target='_blank'><i class='fa fa-yelp'></i>Yelp Reviews</a>";

      infowindow.setContent("<div><h1>" + marker.title + "</h1><p>" + markerInfo.type + "</p>" + imgTag + "<span class='yelp-link'>" + yelpLink + "</span></div>");


      infowindow.open(me.map, marker);
      // make sure the marker property is cleared if the infowindow is closed
      infowindow.addListener('closeclick', function () {
        //infoWindow.setMap(null);
        infowindow.setMarker = null;
        infowindow.marker = null;
      })
    }
  }

  function clearInfoWindow() {

    console.log("clearing infor window...");
    largeInfoWindow.setMarker = null;
    largeInfoWindow.marker = null;
  }

  return me;
})();

