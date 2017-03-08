/**
 * Created by rasai_000 on 3/2/2017.
 */

// entry point
// This can be used when refactoring to use AMD and requireJS

// This loads the JSON file that has all the places


// https://www.sitepoint.com/introduction-jquery-deferred-objects/

// initialize map with or without markers so the page is not empty


$.getJSON('data/places.json')
  .then(function (data) {
    var locations = data.places;

    console.log("locations are ", locations);
    var position, title, yelpId, type;
    var place;

    for (var i = 0; i < locations.length; i++) {
      position = locations[i].location;
      title = locations[i].name;
      yelpId = locations[i].yelp_business_id;
      type = locations[i].type;

      place = new app.Place(type, title, position, yelpId, i);
      app.placeViewModel.places.push(place);
      //app.placeViewModel.markers.push(place);

    }
    //return app.placeViewModel.markers;
  })
  .then(function () {
    console.log("loaded");
    app.madMap.initMarkers();

    // This establishes two way binding between the view and viewmodel.
    // where does this go?

    ko.applyBindings(app.placeViewModel);
  })
  .then( function () {
    // now get the yelp info ???
    app.yelpData.loadYelpRatings();


  })
  .fail( function(){
    console.log("something failed in main");
  })

;







