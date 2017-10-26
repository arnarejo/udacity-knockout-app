# Udacity Neighbourhood Map Project
## Tourist Attractions in Canberra
This single page app shows top tourist attractions around centre of Canberra, Australia.
This app is to demonstrate the ability to use a Javascript framework (`knockout.js`) & Google Maps API. This app is built as assignment of Udacity FullStack Nanodegree project.

## Requirements of the Project
To develop a single-page application featuring a map of your neighborhood or a neighborhood you would like to visit. You will then add additional functionality to this application, including: map markers to identify popular locations or places you’d like to visit, a search function to easily discover these locations, and a listview to support simple browsing of all locations. You will then research and implement third-party APIs that provide additional information about each of these locations (such as StreetView images, Wikipedia articles, Yelp reviews, etc).

## Libraries, frameworks and APIs used
1. Knockout JS (required as per the project)
2. jQuery
3. Bootstrap font awesome
4. Google Fonts
5. Google Maps API
6. Foursquare API
7. openweathermap.org API for weather details

## Code
HTML - `index.html` is where all the code combines and displays final product to the end user. It contains body code and links to local and remote access to libraries, frameworks and custom code.

CSS - bootstrap font awesome is linked via CDN whereas all the custom code is in styles.css file.

JS
- `locations.js` contains name, longitude, latitude and foursquare ID for all locations.
- `mapstyle.js` contains custom map style downloaded from snazzymaps.com with some modifications.
- `knockout-3.4.2.js` is Javascript MVC framework.
- `jquery-3.2.1.min.js` is Javascript library to help with API access and DOM manipulation.
- `main.js` main application file

## Main features
A google Maps API implementation to show best visit places around Canberra, Australia centre. The app provides additional location based details (picture, fourquare url link, phone number, address, etc.) which are collected from fourquare.
Additionally the app also provides weather update about the area based on the forecast from weathermap.org API. The site is fully responsive with interactive menu bar navigation (slide in, slide out) and weather scroller at top.

## How to View the App
Download the app from my GitHub page. cd to the downloaded folder and open index.html. To view any additional details about markers just click on the marker.

## Helpful sources used to complete this project
* [Google Maps API](https://developers.google.com/maps/)
* [Foursquare API](https://developer.foursquare.com/)
* [Knockout.js official page](knockoutjs.com)
* [stackoverflow](http://stackoverflow.com/)
* [Google font](https://fonts.google.com/)
* [Font awesome](http://fontawesome.io/)
* [weathermap API](https://openweathermap.org/api)
