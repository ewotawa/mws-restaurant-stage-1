let restaurants,
  neighborhoods,
  cuisines
var map
var markers = []

var key = config.googleMapApi

var burger = document.getElementById("hamburger");

/**
 * Consolidate fetch events 
 */

fetch(DBHelper.DATABASE_URL, {}).then(function(response) {
  return response.json();
}).then(fetchRestaurantsAll)
.then(fetchUniqueNeighborhoods)
.then(uniqueNeighborhoodsHTML)
.catch(error => console.error(error)); 

fetch(DBHelper.DATABASE_URL, {}).then(function(response) {
  return response.json();
}).then(fetchRestaurantsAll)
.then(fetchUniqueCuisines)
.then(uniqueCuisinesHTML)
.catch(error => console.error(error));

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
fillNeighborhoodsHTML = (neighborhoods = self.neighborhoods) => {
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
fillCuisinesHTML = (cuisines = self.cuisines) => {
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
window.initMap = () => {
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
updateRestaurants = () => {
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

  fetch(DBHelper.DATABASE_URL, {}).then(function(response) {
    return response.json();
  }).then(fetchRestaurantsAll)
  .then(fetchMatchedRestaurants)
  .catch(error => console.error(error));
  
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

  for (i = 0; i < cOption.length; i++) {
    if (cOption[i].getAttribute('value') == cuisine) {
      cOption[i].setAttribute('selected', '');
    } else {
      cOption[i].removeAttribute('selected');
    }
  }

  for (i = 0; i < nOption.length; i++) {
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
resetRestaurants = (restaurants) => {
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
fillRestaurantsHTML = (restaurants = self.restaurants) => {
  const ul = document.getElementById('restaurants-list');
  restaurants.forEach(restaurant => {
    ul.append(createRestaurantHTML(restaurant));
  });
  addMarkersToMap();
}

/**
 * Create restaurant HTML.
 */
createRestaurantHTML = (restaurant) => {
  const li = document.createElement('li');

  const image = document.createElement('img');
  image.className = 'restaurant-img';
  image.src = DBHelper.imageUrlForRestaurant(restaurant);
  image.setAttribute('alt', 'promotional photo for ' + restaurant.name);
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
addMarkersToMap = (restaurants = self.restaurants) => {
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
}

$( document ).ready(function() {
  console.log( "ready!" );
  addApiKey();
});