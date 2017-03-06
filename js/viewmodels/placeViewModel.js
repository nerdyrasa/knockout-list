/**
 * Created by rasai_000 on 3/2/2017.
 */
var app = window.app || {};
app.placeViewModel = (function (ko, db) {
  "use strict";


  var me = {
    places: ko.observableArray([]),   // main array

    query: ko.observable(""),

    filteredPlaces: undefined,
    selectedCategory: ko.observable(),
    selectedName: ko.observable(''),
    categories: undefined,

    numberOfClicks: ko.observable(0),
    incrementClickCounter: incrementClickCounter,
    init: init
  };

  function filteredPlaces() {
    ko.computed(function () {
      var filter = me.query().toLowerCase();

      if (!filter) {
        return me.places();
      } else {
        return ko.utils.arrayFilter(me.places(), function (item) {
          return item.name().toLowerCase().indexOf(filter) !== -1;
        });
      }
    });
  }


  me.categories = ko.computed(function(){
    var results = this.places(),
        filterByCategory = this.selectedCategory();

    console.log("filterByCategory = ", filterByCategory);
    if (filterByCategory) {
      results = ko.utils.arrayFilter(results, function(category){
        console.log("match " + category.type + ", " + filterByCategory);

        return category.type === filterByCategory;
      });
    }
    console.log("results = ", results);
    return results;
  }, me);

  me.categoryName = ko.computed(function(){
    var results = ko.utils.arrayMap(this.places(), function(category){
      return category.type;
    });
    return results.filter( onlyUnique );
  }, me);

  // http://stackoverflow.com/questions/1960473/unique-values-in-an-array

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  function init() {
    db.getPlaces(function (data) {
      console.log("getting place data");
      console.log("data = ", data);
      var a = [];
      ko.utils.arrayForEach(data || [], function (item) {
        console.log("item = ", item);
        a.push(new app.Place(item.type, item.name, item.location));
      });
      me.places(a);
      console.log("a = ", a);
      console.log("places = ", me.places()); // remember to unwrap observable using parentheses
    });
  }

  function incrementClickCounter(place) {
    //console.log("place = ", place);
    console.log("place name = ", place.name);
    var previousCount = me.numberOfClicks();
    me.numberOfClicks(previousCount + 1);
    console.log("number of clicks is ", me.numberOfClicks());
  }


  return me;
})(ko, app.placeDataContext);