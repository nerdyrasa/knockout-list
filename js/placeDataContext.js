/**
 * Created by rasai_000 on 3/2/2017.
 */
var app = window.app || {};
app.placeDataContext = (function ($) {
  "use strict";
  var me = {
    getPlaces : getPlaces
  };

  function getPlaces(callback){
    if ($.isFunction(callback)){
      $.getJSON('data/places.json', function(data){
        callback(data.places);
      });
    }
  }

  return me;
})(jQuery);