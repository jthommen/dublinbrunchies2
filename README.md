# Dublin Brunchies 2.0
### App of my favorite brunch places in Dublin
### Project for the Udacity Full-Stack Web Developer Nanodegree
***
## Features:
* View of Juri's favorite Dublin brunch places
* Google Maps integration:
  * Marker representing the places
  * Infowindow on click on marker or list items
  * Opening hours and pictures from Google places API
* Foursquare integration:
  * Phone number comparison on button click
  * Check if phone number is the same as Google places:
    * Shows success if it's the same
    * Shows both numbers if they're different
    * Shows error if no foursquare number could be found
* Filter functionality:
  * Fuzzy search on list items
  * Resets by deleting values
  * Reactions to every single character input/change
  
## Technologies used:
* HTML
* CSS
* JavaScript
  * jQuery
  * KnockoutJS
  * Gulp (JS taskrunner based on NodeJS)
* APIs
  * Google Maps
  * Google Places
  * Foursquare Places Search
  
## To run app:
* Clone repo
* Doubleclick on index.html in created folder

## To further develop app:
* Clone repo
* Install npm
* Install gulp
* Initialize gulp watcher in shell ```gulp watch```
