/**
 * Created by rasai_000 on 3/2/2017.
 */
var app = window.app || {};
app.placeViewModel = (function (ko, db) {
  "use strict";
  var me = {
    places: ko.observableArray([]),
    init: init
  };

  function init() {
    db.getPlaces(function(data) {
      console.log("getting place data");
      console.log("data = ", data);
      var a = [];
      ko.utils.arrayForEach(data || [], function(item){
        console.log("item = ", item);
        a.push(new app.Place(item.type, item.name, item.location));
      });
      me.places(a);

      console.log("places = ", me.places);
    });
  }


  return me;
})(ko, app.placeDataContext);