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


      if (locations[i].type === "Attraction") {
        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
      } else {
        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
      }

      var markerInfo = { "type" : locations[i].type };
      me.markers.push(marker);

      var mI = { "marker": marker,
        "type": locations[i].type,
        "yelpID": locations[i].yelpID
      };

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


    app.yelpData.loadYelpRatings();
    //console.log("get Yelp Info = me.markersInfo", me.markersInfo);
    //
    //
    //for (var i = 0; i < app.placeViewModel.markers.length; i++) {
    //  console.log("yelp id = ", app.placeViewModel.places()[i].yelpID);
    //  app.yelpData.getYelpInfo(app.placeViewModel.places()[i].yelpID);
    //}


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

    me.clearInfoWindow();

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

    // me.clearInfoWindow();

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
      // look up the yelp rating if available

      var rating = app.yelpData.yelpRatings[markerInfo.yelpID].rating;

      console.log("yelp rating = ", rating);

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

