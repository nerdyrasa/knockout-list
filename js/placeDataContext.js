/**
 * Created by rasai_000 on 3/2/2017.
 */
var app = window.app || {};
app.placeDataContext = (function ($) {
  "use strict";
  var me = {
    getPlaces : getPlaces
  };


  //http://codereview.stackexchange.com/questions/45541/wait-until-all-files-are-loaded-asynchronously-then-run-code

  function getPlaces(callback){
    if ($.isFunction(callback)){
      $.getJSON('data/places.json', function(data){
        callback(data.places);
      }).done( function() {
        console.log("loaded");
      });
    }
  }

  return me;
})(jQuery);