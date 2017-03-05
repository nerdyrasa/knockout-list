# KnockoutJS List

1. Create the general project structure based on both the TododMVC knockout example and the safari books online video that I viewed. 
2. Create a JSON file that is an array of places. These are the places that will go in the data list for now and it will also be used to generate the markers in the map (later).
3. Create a model to represent a single item from the JSON file using a JS constructor object.
4. Create a view model that will have the array of places. Use the revealing module pattern.
5. Create a data context object, also using the revealing module pattern. The data context will be responsible for getting the data into memory. Right now I'm using a JSON file, but I could later modify it to get the data directly from an API.
6. Update the view model to reference ko and the data context.
7. Add an init method to the view model that uses the data context to load the data. 
8. Create the view
  - Add a foreach data-bind attr to a ul tag to loop through the places array.
  - Add text data-bind attr to a li tag to display the name of the place.
9. Pass the view model to ko.applyBindings() in main.js.
10. Make sure places array is of type ko.observableArray to get the two-way binding working.

Resources:

Safari Books Online: 
https://www.safaribooksonline.com/library/view/knockoutjs/9781491914298/ch05.html


safari books online--KnockoutJS Blueprints: Chapter 1, Filters and product details 

1. Add a new observable to keep the selected category and a new array to keep the list of the category names; add "all" value using the optionsCaption binding handler
2. Add a new observable to keep the selected name.
3. Create computed observable to retrun the array of categories based on the selected category and the list of categories.