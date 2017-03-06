/**
 * Created by rasai_000 on 3/2/2017.
 */

// entry point
// This can be used when refactoring to use AMD and requireJS

// This loads the JSON file that has all the places
app.placeViewModel.init();

// pass as an object?
app.madMap.initMap({ "markers": app.placeViewModel.markers });

// This establishes two way binding between the view and viewmodel.
ko.applyBindings(app.placeViewModel);
