/**
 * Created by rasai_000 on 3/2/2017.
 */
var app = window.app || {};
app.Place = function (type, name, location, yelpID) {
  "use strict";
  this.type = type;
  this.name = name;
  this.location = location;
  this.yelpID = yelpID;
};