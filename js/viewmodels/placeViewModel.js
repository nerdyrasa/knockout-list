/**
 * Created by rasai_000 on 3/2/2017.
 */
var app = window.app || {};
app.placeViewModel = (function (ko, db) {
  "use strict";

  var me = {
    places: ko.observableArray([]),   // main array

    selectedCategory: ko.observable(),
 //   selectedName: ko.observable(''),
    placesFilteredByCategory: undefined,

    numberOfClicks: ko.observable(0),
    processClickOnListItem: processClickOnListItem,
    init: init
  };




  me.placesFilteredByCategory = ko.computed(function(){
    var results = this.places(),
        filterByCategory = this.selectedCategory();

    if (filterByCategory) {
      results = ko.utils.arrayFilter(results, function(category){
        console.log("match " + category.type + ", " + filterByCategory);

        return category.type === filterByCategory;
      });
    }
    console.log("results = ", results);
    return results;
  }, me);


  // A list of unique categories generated from the category.type of each place
  // used to populate the select options
  me.categoryName = ko.computed(function(){
    var results = ko.utils.arrayMap(this.places(), function(category){
      return category.type;
    });
    return results.filter( onlyUnique );
  }, me);

  // helper function
  // http://stackoverflow.com/questions/1960473/unique-values-in-an-array
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }


  // loading data from the json file here
  function init() {
    db.getPlaces(function (data) {
      var a = [];
      ko.utils.arrayForEach(data || [], function (item) {
 //       console.log("item = ", item);
        a.push(new app.Place(item.type, item.name, item.location));
      });
      me.places(a);
      console.log("places = ", me.places()); // remember to unwrap observable using parentheses
    });
  }

  // just detect click for now
  function processClickOnListItem(place) {

    console.log("clicked on  ", place.name + " in the list.");

  }

  return me;

})(ko, app.placeDataContext);