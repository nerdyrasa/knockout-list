// This is a commonly used construct that either assigns app to window.app if it exists or if
//  if it doesn't exist it creates an empty object
var app = window.app || {};

// Using the revealing module pattern here

app.placeViewModel = (function (ko, db) {
  "use strict";

  var me = {
    places: ko.observableArray([]),

    markers: [],

    selectedCategory: ko.observable(),

    placesFilteredByCategory: undefined,

    processClickOnListItem: processClickOnListItem,

    init: init



  };


  me.placesFilteredByCategory = ko.computed(function () {
    var results = this.places(),
      filterByCategory = this.selectedCategory();

    if (filterByCategory) {
      results = ko.utils.arrayFilter(results, function (category) {
        console.log("match " + category.type + ", " + filterByCategory);

        return category.type === filterByCategory;
      });
    }
    console.log("results = ", results);
    return results;
  }, me);

  // A list of unique categories generated from the category.type of each place
  // used to populate the select options in the select control
  me.categoryName = ko.computed(function () {
    var results = ko.utils.arrayMap(this.places(), function (category) {
      return category.type;
    });
    return results.filter(onlyUnique);
  }, me);

  // helper function that operates on an array and makes sure there are no duplicate values in the array
  // http://stackoverflow.com/questions/1960473/unique-values-in-an-array
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  // loading data from the json file here
  function init() {
    db.getPlaces(function (data) {
      var a = [];

      ko.utils.arrayForEach(data || [], function (item) {
        a.push(new app.Place(item.type, item.name, item.location, item.yelp_business_id));
        me.markers.push(new app.Place(item.type, item.name, item.location, item.yelp_business_id) );
      });
      me.places(a);

      console.log("markers = ", me.markers);

    });
  }

  // just detect click for now
  function processClickOnListItem(place) {

    console.log("clicked on  ", place.name + " in the list.");

  }

  return me;

})(ko, app.placeDataContext);