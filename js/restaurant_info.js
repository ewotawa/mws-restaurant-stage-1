let restaurant;
var map;

var key = config.googleMapApi;

function fetchRestaurantsAll (data) {
  return data;
}

function fetchReviewsAll (data) {
  return data;
}

function fetchUniqueRestaurant (data) {
  const restaurants = data;
  let results = restaurants;
  const id = getParameterByName('id');
  if (id) {
    results = results.filter(r => r.id == id);
    restaurant = results[0];
    return restaurant;
  } 
}

function fetchReviews (data) {
  const reviews = data;
  let results = reviews;
  console.log(results);
  const id = getParameterByName('id');
  console.log('id from URL: ' + id);
  if (id) {
    results = results.filter(r => r.restaurant_id == id);
    return results;
  }
}











/**
 * Initialize Google map, called from HTML.
 * deprecated fetchRestaurantFromURL (XHR dependent) in favor of fetch API
 */

window.initMap = () => {
  
  // implement IndexedDB where service worker is available. Else use fetch API.
  if (navigator.serviceWorker) {
    var dbPromise = idb.open('mwsStage2', 1, function(upgradeDb) {
        // set up switch to manage version control
        switch(upgradeDb.oldVersion) {
            case 0:
                // set up a key that's separate to the data
                var mwsDataStore = upgradeDb.createObjectStore('mwsData', {keyPath: 'id'});
                // set up a separate object store for the restaurant reviews
                var mwsReviewStore = upgradeDb.createObjectStore('mwsReviewData', {keyPath: 'id'});
                mwsReviewStore.createIndex('restaurant', 'restaurant-id');
        }
    });  
    
    // PUT DATA INTO DATABASE: create a fetch event to pull the data from the server. see main.js
  
    // PULL DATA OUT OF DATABASE: get all Restaurants
    function getRestaurant () {
      dbPromise.then(function(db) {
        var tx = db.transaction('mwsData', 'readonly');
        var store = tx.objectStore('mwsData');
        return store.getAll();
      }).then(fetchUniqueRestaurant)
      .then(fetchRestaurantMap)
      .catch(error => console.error(error)); 
    }

    // if there's a service worker, pull the data out of IndexedDB
    getRestaurant();
  
  } else {
  
    // fetch events for browsers that do not have service workers
    
    // restaurants
    fetch(DBHelper.DATABASE_URL, {}).then(function(response) {
      return response.json();
    }).then(fetchRestaurantsAll)
    .then(fetchUniqueRestaurant)
    .then(fetchRestaurantMap)
    .catch(error => console.error(error)); 
  
  }
  
  function fetchRestaurantMap (restaurant) {
    self.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: restaurant.latlng,
      scrollwheel: false
    });
    fillBreadcrumb();
    DBHelper.mapMarkerForRestaurant(self.restaurant, self.map);
  }
}










/**
 * Get current restaurant from page URL.
 * deprecated fetchRestaurantFromURL() (XHR dependent) in favor of fetch API
 */
// implement IndexedDB where service worker is available. Else use fetch API.
if (navigator.serviceWorker) {
  var dbPromise = idb.open('mwsStage2', 1, function(upgradeDb) {
      // set up switch to manage version control
      switch(upgradeDb.oldVersion) {
          case 0:
              // set up a key that's separate to the data
              var mwsDataStore = upgradeDb.createObjectStore('mwsData', {keyPath: 'id'});
              // set up a separate object store for the restaurant reviews
              var mwsReviewStore = upgradeDb.createObjectStore('mwsReviewData', {keyPath: 'id'});
              mwsReviewStore.createIndex('restaurant', 'restaurant-id');
      }
  });  
  
  // PUT DATA INTO DATABASE: create a fetch event to pull the data from the server. see main.js

  // PULL DATA OUT OF DATABASE: get all Restaurants
  function getRestaurant () {
    dbPromise.then(function(db) {
      var tx = db.transaction('mwsData', 'readonly');
      var store = tx.objectStore('mwsData');
      return store.getAll();
    }).then(fetchUniqueRestaurant)
    .then(fetchUniqueRestHTML)
    .catch(error => console.error(error));
  }
  
  // if there's a service worker, pull the data out of IndexedDB
  getRestaurant();

} else {

  // fetch events for browsers that do not have service workers
  
  // restaurants
  fetch(DBHelper.DATABASE_URL, {}).then(function(response) {
    return response.json();
  }).then(fetchRestaurantsAll)
  .then(fetchUniqueRestaurant)
  .then(fetchUniqueRestHTML)
  .catch(error => console.error(error));

}










/**
 * Get current restaurant from page URL.
 * Pull restaurant review information and populate page. 
 */
// implement IndexedDB where service worker is available. Else use fetch API.
if (navigator.serviceWorker) {
  var dbPromise = idb.open('mwsStage2', 1, function(upgradeDb) {
      // set up switch to manage version control
      switch(upgradeDb.oldVersion) {
          case 0:
              // set up a key that's separate to the data
              var mwsDataStore = upgradeDb.createObjectStore('mwsData', {keyPath: 'id'});
              // set up a separate object store for the restaurant reviews
              var mwsReviewStore = upgradeDb.createObjectStore('mwsReviewData', {keyPath: 'id'});
              mwsReviewStore.createIndex('restaurant', 'restaurant-id');
      }
  });  
  
  // PUT DATA INTO DATABASE: create a fetch event to pull the data from the server. see main.js

  // PULL DATA OUT OF DATABASE: get all Restaurants
  function getRestaurant () {
    dbPromise.then(function(db) {
      var tx = db.transaction('mwsReviewData', 'readonly');
      var store = tx.objectStore('mwsReviewData');
      return store.getAll();
    }).then(fetchReviews)
    .then(returnResults)
    .then(fillReviewsHTML)
    .catch(error => console.error(error));
  }
  
  // if there's a service worker, pull the data out of IndexedDB
  getRestaurant();

} else {

  // fetch events for browsers that do not have service workers
  
  // restaurants
  fetch(DBHelper.REVIEW_URL, {}).then(function(response) {
    return response.json();
  }).then(fetchReviewsAll)
  .then(fetchReviews)
  .then(returnResults)
  .then(fillReviewsHTML)
  .catch(error => console.error(error));

  // reviews
  fetch(DBHelper.REVIEW_URL, {}).then(function(response) {
    console.log(response.json());
    return response.json();
  }).catch(error => console.error(error));

}












function fetchUniqueRestHTML (restaurant) {
  self.restaurant = restaurant;
  console.log(self.restaurant);
  fillRestaurantHTML();
}


/**
 * Create restaurant HTML and add it to the webpage
 */
const fillRestaurantHTML = (restaurant = self.restaurant) => {
  const name = document.getElementById('restaurant-name');
  name.innerHTML = restaurant.name;

  const address = document.getElementById('restaurant-address');
  address.innerHTML = restaurant.address;

  const image = document.getElementById('restaurant-img');
  image.className = 'restaurant-img'
  image.src = DBHelper.imageUrlForRestaurant(restaurant);
  image.setAttribute('alt', 'promotional photo for ' + restaurant.name);

  const cuisine = document.getElementById('restaurant-cuisine');
  cuisine.innerHTML = restaurant.cuisine_type;

  // fill operating hours
  if (restaurant.operating_hours) {
    fillRestaurantHoursHTML();
  }
  // fill reviews - deprecate in phase III
  // fillReviewsHTML();
}




/**
 * Create restaurant operating hours HTML table and add it to the webpage.
 */
const fillRestaurantHoursHTML = (operatingHours = self.restaurant.operating_hours) => {
  const hours = document.getElementById('restaurant-hours');
  for (let key in operatingHours) {
    const row = document.createElement('tr');

    const day = document.createElement('td');
    day.innerHTML = key;
    row.appendChild(day);

    const time = document.createElement('td');
    time.innerHTML = operatingHours[key];
    row.appendChild(time);

    hours.appendChild(row);
  }
}




/**
 * Create all reviews HTML and add them to the webpage.
 * update code to (reviews = self.reviews) from (reviews = self.restaurant.reviews)
 */

function returnResults (results) {
  console.log(results);
  return results;
} 

function fillReviewsHTML (results) {
  console.log('fillReviewsHTML()');
  const container = document.getElementById('reviews-container');
  const title = document.createElement('h2');
  title.innerHTML = 'Reviews';
  container.appendChild(title);

  if (!results) {
    const noReviews = document.createElement('p');
    noReviews.innerHTML = 'No reviews yet!';
    container.appendChild(noReviews);
    return;
  }
  const ul = document.getElementById('reviews-list');
  results.forEach(result => {
    ul.appendChild(createReviewHTML(result));
  });
  container.appendChild(ul);
}




/**
 * Create review HTML and add it to the webpage.
 * Edit: assign classes to each <p> element for styling.
 */
const createReviewHTML = (result) => {
  const li = document.createElement('li');
  li.setAttribute("class", "reviewListing");

  const name = document.createElement('p');
  name.innerHTML = result.name;
  name.setAttribute("class", "reviewName");
  li.appendChild(name);

  // if review has been updated, show update 
  if (result.UpdatedAt > result.createdAt) {
    //instead of date, present createdAt and updatedAt
    const updatedAt = document.createElement('p');
    let uDate = new Date(result.updatedAt);
    let uDateMonth = uDate.getMonth();
    let uDateDate = uDate.getDate();
    let uDateYear = uDate.getFullYear();
    updatedAt.innerHTML = `Updated: ${uDateMonth}/${uDateDate}/${uDateYear}`;
    updatedAt.setAttribute("class", "reviewDate");
    li.appendChild(updatedAt);    
  } else {
    //instead of date, present createdAt and updatedAt
    const createdAt = document.createElement('p');
    let cDate = new Date(result.createdAt);
    let cDateMonth = cDate.getMonth();
    let cDateDate = cDate.getDate();
    let cDateYear = cDate.getFullYear();
    createdAt.innerHTML = `Created: ${cDateMonth}/${cDateDate}/${cDateYear}`;
    createdAt.setAttribute("class", "reviewDate");
    li.appendChild(createdAt);    
  }

  const rating = document.createElement('p');
  rating.innerHTML = `Rating: ${result.rating}`;
  rating.setAttribute("class", "reviewRating");
  li.appendChild(rating);

  const comments = document.createElement('p');
  comments.innerHTML = result.comments;
  comments.setAttribute("class", "reviewComments");
  li.appendChild(comments);

  return li;
}




/**
 * Add restaurant name to the breadcrumb navigation menu
 */
const fillBreadcrumb = (restaurant=self.restaurant) => {
  const breadcrumb = document.getElementById('breadcrumb');
  const li = document.createElement('li');
  li.innerHTML = restaurant.name;
  breadcrumb.appendChild(li);
}




/**
 * Get a parameter by name from page URL.
 */
let getParameterByName = (name, url) => {
  if (!url)
    url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
    results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}




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

  //console.log('key: ' + key);
  //console.log('apiKey: ' + apiKey);
  
  var pathStart = 'https://maps.googleapis.com/maps/api/js?';
  var pathEnd = 'libraries=places&callback=initMap';
  
  document.getElementById('googleApi').setAttribute('src', pathStart + apiKey + pathEnd);
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
});




