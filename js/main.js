let restaurants,
  neighborhoods,
  cuisines
var map
var staticMap;
var markers = []

var key = config.googleMapApi;
var fontAwesome = config.fontAwesome;

var burger = document.getElementById("hamburger");


/**
 * set up IDB database
 * 
 * parameters: database name, version, callback
 * function will be called if browser hasn't heard about database before or if known version is less than parameter version.
 * only place where can create or remove object stores and indices
 * 
 * note: see readme file for idb library:
 * https://github.com/jakearchibald/idb/blob/master/README.md
 * I included idb.js in the file structure to put idb in the global scope.
 */

// do not need to import the IDB library (promise-based) because it is in the global scope. See js/idb.js
// import idb from 'idb';


// create the database and put objects into it.
if (navigator.serviceWorker) {
  var dbPromise = idb.open('mwsStage2', 1, function(upgradeDb) {
      // set up switch to manage version control
      switch(upgradeDb.oldVersion) {
          case 0:
              // set up a key that's separate to the data
              var mwsDataStore = upgradeDb.createObjectStore('mwsData', {keyPath: 'id'});
      }
  });  
  
  // PUT DATA INTO DATABASE: create a fetch event to pull the data from the server
  // see idb-test_index.js

  // PULL DATA OUT OF DATABASE: get all Neighborhoods
  function getDataNeighborhoods () {
    dbPromise.then(function(db) {
      var tx = db.transaction('mwsData', 'readonly');
      var store = tx.objectStore('mwsData');
      return store.getAll();
    }).then(fetchUniqueNeighborhoods)
    .then(uniqueNeighborhoodsHTML)
    .catch(error => console.error(error));
  }

  // PULL DATA OUT OF DATABASE: get all Restaurants
  function getDataRestaurants () {
    dbPromise.then(function(db) {
      var tx = db.transaction('mwsData', 'readonly');
      var store = tx.objectStore('mwsData');
      return store.getAll();
    }).then(fetchUniqueCuisines)
    .then(uniqueCuisinesHTML)
    .catch(error => console.error(error));
  }
  
  // if there's a service worker, pull the data out of IndexedDB
  getDataNeighborhoods();
  getDataRestaurants();

} else {

  // fetch events for browsers that do not have service workers
  
  // neighborhoods
  fetch(DBHelper.DATABASE_URL, {}).then(function(response) {
    return response.json();
  }).then(fetchRestaurantsAll)
  .then(fetchUniqueNeighborhoods)
  .then(uniqueNeighborhoodsHTML)
  .catch(error => console.error(error)); 
  
  // restaurants
  fetch(DBHelper.DATABASE_URL, {}).then(function(response) {
    return response.json();
  }).then(fetchRestaurantsAll)
  .then(fetchUniqueCuisines)
  .then(uniqueCuisinesHTML)
  .catch(error => console.error(error));

}




/**
 * main.html functions
 */

function fetchRestaurantsAll (data) {
  return data;
}

/**
 * Fetch all neighborhoods and set their HTML
 * deprecated fetchNeighborhoods() (XHR dependent) in favor of fetch API
 */

function fetchUniqueNeighborhoods (data) {
  const restaurants = data;
  let neighborhoodArray = [];
  for (let restaurant of restaurants) {
    if (neighborhoodArray.indexOf(restaurant.neighborhood) == -1) {
      neighborhoodArray.push(restaurant.neighborhood);
    }
  }
  return neighborhoodArray;
}

function uniqueNeighborhoodsHTML (neighborhoodArray) {
  let neighborhoods = neighborhoodArray;
  self.neighborhoods = neighborhoods;
  fillNeighborhoodsHTML();
}

/**
 * Fetch all cuisines and set their HTML
 * deprecated fetchCuisines() (XHR dependent) in favor of fetch API
 */

function fetchUniqueCuisines (data) {
  const restaurants = data;
  let cuisineArray = [];
  for (let restaurant of restaurants) {
    if (cuisineArray.indexOf(restaurant.cuisine_type) == -1) {
      cuisineArray.push(restaurant.cuisine_type);
    }
  }
  return cuisineArray;
}

function uniqueCuisinesHTML (cuisineArray) {
  let cuisines = cuisineArray;
  self.cuisines = cuisines;
  fillCuisinesHTML();
}

/**
 * Set neighborhoods HTML.
 */
const fillNeighborhoodsHTML = (neighborhoods = self.neighborhoods) => {
  const select = document.getElementById('neighborhoods-select');
  select.setAttribute('name', 'Select Neighborhood');
  neighborhoods.forEach(neighborhood => {
    const option = document.createElement('option');
    option.innerHTML = neighborhood;
    option.value = neighborhood;
    option.setAttribute('id', neighborhood);
    select.append(option);
  });
}

/**
 * Set cuisines HTML.
 */
const fillCuisinesHTML = (cuisines = self.cuisines) => {
  const select = document.getElementById('cuisines-select');
  cuisines.forEach(cuisine => {
    const option = document.createElement('option');
    option.innerHTML = cuisine;
    option.value = cuisine;
    select.append(option);
    option.setAttribute('id', cuisine);
  });
}

/**
 * Initialize Google map, called from HTML.
 */

var sMap = document.getElementById('staticMap');
var sMapCap = document.getElementById('staticMapCaption');
var dMap = document.getElementById('mapOuter');

//static map
var center = '40.722216,-73.987501';
var zoom = '12';
var red01 = '40.713829,-73.989667';
var red02 = '40.683555,-73.966393';
var red03 = '40.747143,-73.985414';
var red04 = '40.722216,-73.987501';
var red05 = '40.705089,-73.933585'; 
var red06 = '40.674925,-74.016162';
var red07 = '40.727397,-73.983645';
var red08 = '40.726584,-74.002082';
var red09 = '40.743797,-73.950652';
var red10 = '40.743394,-73.954235';
var width = window.screen.width;
var height = '400'; 
//console.log(config.googleMapApi);
staticMap = `https://maps.googleapis.com/maps/api/staticmap?center=${center}&zoom=${zoom}&size=${width}x${height}&maptype=roadmap&markers=color:red%7Clabel:1%7C${red01}&markers=color:red%7Clabel:2%7C${red02}&markers=color:red%7Clabel:3%7C${red03}&markers=color:red%7Clabel:4%7C${red04}&markers=color:red%7Clabel:5%7C${red05}&markers=color:red%7Clabel:6%7C${red06}&markers=color:red%7Clabel:7%7C${red07}&markers=color:red%7Clabel:8%7C${red08}&markers=color:red%7Clabel:9%7C${red09}&markers=color:red%7Clabel:10%7C${red10}&key=${config.googleMapApi}`;
sMap.setAttribute('src', staticMap);

activeMap();
window.addEventListener('resize', activeMap());

function activeMap() {
  if ( window.screen.width > 640) {
    sMap.setAttribute('style', 'display: none');
    sMapCap.setAttribute('style', 'display: none');
    dMap.setAttribute('style', 'display: contents');
  } else {
    //sMap.setAttribute('style', 'display: contents');
    //sMapCap.setAttribute('style', 'display: contents');
    dMap.setAttribute('style', 'display: none');
  }
}

// click to render dynamic map
sMap.onclick = function () {
  // hide static map
  //sMap.removeAttribute('src');
  sMap.setAttribute('style', 'display: none');
  sMapCap.setAttribute('style', 'display: none');
  // show dynamic map
  document.getElementById('mapOuter').removeAttribute('style');
}

const initMap = () => {
  let loc = {
    lat: 40.722216,
    lng: -73.987501
  };
  self.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: loc,
    scrollwheel: false
  });
  updateRestaurants();
}

/**
 * Update page and map for current restaurants.
 */
const updateRestaurants = () => {
  const cSelect = document.getElementById('cuisines-select');
  const nSelect = document.getElementById('neighborhoods-select');

  /* clear out former selected element attribute */
  const cOption = cSelect.getElementsByTagName('option');
  const nOption = nSelect.getElementsByTagName('option');

  const cIndex = cSelect.selectedIndex;
  const nIndex = nSelect.selectedIndex;

  const cuisine = cSelect[cIndex].value;
  const neighborhood = nSelect[nIndex].value;

  /**
   * fetch event for restaurants that match filters
   */

   // add service worker functionality
    // create the database and put objects into it.
    if (navigator.serviceWorker) {
      var dbPromise = idb.open('mwsStage2', 1, function(upgradeDb) {
          // set up switch to manage version control
          switch(upgradeDb.oldVersion) {
              case 0:
                  // set up a key that's separate to the data
                  var mwsDataStore = upgradeDb.createObjectStore('mwsData', {keyPath: 'id'});
          }
      });  
      
      // PUT DATA INTO DATABASE: create a fetch event to pull the data from the server
      // see idb-test_index.js 

      // PULL DATA OUT OF DATABASE: get all matched Restaurants
      function getDataMatchedRestaurants () {
        dbPromise.then(function(db) {
          var tx = db.transaction('mwsData', 'readonly');
          var store = tx.objectStore('mwsData');
          return store.getAll();
        }).then(fetchMatchedRestaurants)
        .catch(error => console.error(error));
      }
      
      // if there's a service worker, pull the data out of IndexedDB
      getDataMatchedRestaurants();

    } else {

      // fetch events for browsers that do not have service workers
      
      // matched restaurants
      fetch(DBHelper.DATABASE_URL, {}).then(function(response) {
        return response.json();
      }).then(fetchRestaurantsAll)
      .then(fetchMatchedRestaurants)
      .catch(error => console.error(error));

    }
  

  
  function fetchMatchedRestaurants (data) {
    const restaurants = data;
    let results = restaurants;

    if (cuisine != 'all') { // filter by cuisine
      results = results.filter(r => r.cuisine_type == cuisine);
    }

    if (neighborhood != 'all') { // filter by neighborhood
      results = results.filter(r => r.neighborhood == neighborhood);
    }

    resetRestaurants(results);
    fillRestaurantsHTML();
    return results;
  }
  
  /* set selected attribute */

  for (let i = 0; i < cOption.length; i++) {
    if (cOption[i].getAttribute('value') == cuisine) {
      cOption[i].setAttribute('selected', '');
    } else {
      cOption[i].removeAttribute('selected');
    }
  }

  for (let i = 0; i < nOption.length; i++) {
    if (nOption[i].getAttribute('value') == neighborhood) {
      nOption[i].setAttribute('selected', '');
    } else {
      nOption[i].removeAttribute('selected');
    }
  }
  
}

/**
 * Clear current restaurants, their HTML and remove their map markers.
 */
const resetRestaurants = (restaurants) => {
  // Remove all restaurants
  self.restaurants = [];
  const ul = document.getElementById('restaurants-list');
  ul.innerHTML = '';

  // Remove all map markers
  self.markers.forEach(m => m.setMap(null));
  self.markers = [];
  self.restaurants = restaurants;
}

/**
 * Create all restaurants HTML and add them to the webpage.
 */
const fillRestaurantsHTML = (restaurants = self.restaurants) => {
  const ul = document.getElementById('restaurants-list');
  restaurants.forEach(restaurant => {
    ul.append(createRestaurantHTML(restaurant));
  });
  addMarkersToMap();
}

/**
 * Create restaurant HTML.
 */
const createRestaurantHTML = (restaurant) => {
  const li = document.createElement('li');
  const image = document.createElement('img');
  image.setAttribute('alt', 'promotional photo for ' + restaurant.name);

  // lazy load images
  // create an intersection observer
  var options = {
    rootMargin: '0px',
    threshold: 0.1
  };

  // if browser supports observer, use it, else load image
  let observer;

  if('IntersectionObserver' in window) {
    console.log('IntersectionObserver is in window');
    observer = new IntersectionObserver(callback, options);
    // give the observer a target element to watch
    observer.observe(image);
  } else {
    console.log('Browser does not support IntersectionObserver; images not lazy loaded');
    loadImage(image);
  }

  // move image attributes into a variable, loadImage
  function loadImage() {
    image.className = 'restaurant-img';
    image.src = DBHelper.imageUrlForRestaurant(restaurant);
  }


  // whenever the target meets a theshold specified for the IntersectionObserver, the callback is invoked.
  // callback receives list of IntersectionObserverEntry objects and the observer.

  function callback(entries, observer) {
    entries.forEach(entry => {
      if(entry.intersectionRatio > 0 ) {
        // load the image ...
        loadImage(entry.target);
        // ... and stop observing
        observer.unobserve(entry.target);
      }
    });
  };

  // finished lazy loading images

  li.append(image);

  const name = document.createElement('h2');
  name.innerHTML = restaurant.name;
  li.append(name);

  const neighborhood = document.createElement('p');
  neighborhood.innerHTML = restaurant.neighborhood;
  li.append(neighborhood);

  const address = document.createElement('p');
  address.innerHTML = restaurant.address;
  li.append(address);

  const more = document.createElement('a');
  more.innerHTML = 'View Details';
  more.href = DBHelper.urlForRestaurant(restaurant);
  more.setAttribute('name', 'View details for ' + restaurant.name);
  more.setAttribute('role', 'button');
  li.append(more);

  return li
}



/**
 * Add markers for current restaurants to the map.
 */
const addMarkersToMap = (restaurants = self.restaurants) => {
  restaurants.forEach(restaurant => {
    // Add marker to the map
    const marker = DBHelper.mapMarkerForRestaurant(restaurant, self.map);
    google.maps.event.addListener(marker, 'click', () => {
      window.location.href = marker.url
    });
    self.markers.push(marker);
  });
}

/**
 * Toggle for hamburger icon
 */

burger.addEventListener("click", function(e) {
    drawer.classList.toggle('open');
    e.stopPropagation();
});


/**
 * jQuery for Google API
 * reference: https://gist.github.com/derzorngottes/3b57edc1f996dddcab25
 */

function addApiKey() {

  if (key == '') {
    var apiKey = '';
  } else {
    var apiKey = 'key=' + config.googleMapApi + '&';
  }

  // console.log('key: ' + key);
  // console.log('apiKey: ' + apiKey);
  
  var pathStart = 'https://maps.googleapis.com/maps/api/js?';
  var pathEnd = 'libraries=places&callback=initMap';
  
  document.getElementById('googleApi').setAttribute('src', pathStart + apiKey + pathEnd);
  /*document.getElementById('fontAwesome').setAttribute('src', fontAwesome);*/
  document.getElementById('preconnectGoogleMapApi').setAttribute('href', pathStart + apiKey + pathEnd);
}

/*
$( document ).ready(function() {
  console.log( "ready!" );
  addApiKey();
});
*/

// to improve audit score, deprecate jQuery
// method credit: https://stackoverflow.com/questions/2304941/what-is-the-non-jquery-equivalent-of-document-ready

document.addEventListener("DOMContentLoaded", function() {
  console.log("ready!");
  addApiKey();
  activeMap();
});

