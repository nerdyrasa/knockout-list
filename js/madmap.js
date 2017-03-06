/**
 * Created by rasai_000 on 3/3/2017.
 */

var app = window.app || {};
app.madMap = (function () {
  "use strict";
  var me = {

    map: undefined,

    initMap: initMap
  };

  function initMap(markers) {


    console.log("markers = ", markers);

    console.log("markers.markers = ", markers.markers);
    console.log("why, o why, is my markers length 0 = ", markers.markers.length);


    var madisonCenter = {lat: 43.069352, lng: -89.396601};

    me.map = new google.maps.Map(document.getElementById('map_canvas'), {
      zoom: 10,
      center: madisonCenter
    });

  }

  return me;
})();

