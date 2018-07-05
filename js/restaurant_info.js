let restaurant;
var map;

var key = config.googleMapApi;

function fetchRestaurantsAll (data) {
  return data;
}

function fetchUniqueRestaurant (data) {
  const restaurants = data.restaurants;
  let results = restaurants;
  const id = getParameterByName('id');
  if (id) {
    results = results.filter(r => r.id == id);
    restaurant = results[0];
    return restaurant;
  } 
}

/**
 * Initialize Google map, called from HTML.
 * deprecated fetchRestaurantFromURL (XHR dependent) in favor of fetch API
 */

window.initMap = () => {
  fetch(DBHelper.DATABASE_URL, {}).then(function(response) {
    return response.json();
  }).then(fetchRestaurantsAll)
  .then(fetchUniqueRestaurant)
  .then(fetchRestaurantMap)
  .catch(error => console.error(error));  
  
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
fetch(DBHelper.DATABASE_URL, {}).then(function(response) {
  return response.json();
}).then(fetchRestaurantsAll)
.then(fetchUniqueRestaurant)
.then(fetchUniqueRestHTML)
.catch(error => console.error(error));

function fetchUniqueRestHTML (restaurant) {
  self.restaurant = restaurant;
  fillRestaurantHTML();
}

/**
 * Create restaurant HTML and add it to the webpage
 */
fillRestaurantHTML = (restaurant = self.restaurant) => {
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
  // fill reviews
  fillReviewsHTML();
}

/**
 * Create restaurant operating hours HTML table and add it to the webpage.
 */
fillRestaurantHoursHTML = (operatingHours = self.restaurant.operating_hours) => {
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
 */
fillReviewsHTML = (reviews = self.restaurant.reviews) => {
  const container = document.getElementById('reviews-container');
  const title = document.createElement('h2');
  title.innerHTML = 'Reviews';
  container.appendChild(title);

  if (!reviews) {
    const noReviews = document.createElement('p');
    noReviews.innerHTML = 'No reviews yet!';
    container.appendChild(noReviews);
    return;
  }
  const ul = document.getElementById('reviews-list');
  reviews.forEach(review => {
    ul.appendChild(createReviewHTML(review));
  });
  container.appendChild(ul);
}

/**
 * Create review HTML and add it to the webpage.
 * Edit: assign classes to each <p> element for styling.
 */
createReviewHTML = (review) => {
  const li = document.createElement('li');
  li.setAttribute("class", "reviewListing");

  const name = document.createElement('p');
  name.innerHTML = review.name;
  name.setAttribute("class", "reviewName");
  li.appendChild(name);

  const date = document.createElement('p');
  date.innerHTML = review.date;
  date.setAttribute("class", "reviewDate");
  li.appendChild(date);

  const rating = document.createElement('p');
  rating.innerHTML = `Rating: ${review.rating}`;
  rating.setAttribute("class", "reviewRating");
  li.appendChild(rating);

  const comments = document.createElement('p');
  comments.innerHTML = review.comments;
  comments.setAttribute("class", "reviewComments");
  li.appendChild(comments);

  return li;
}

/**
 * Add restaurant name to the breadcrumb navigation menu
 */
fillBreadcrumb = (restaurant=self.restaurant) => {
  const breadcrumb = document.getElementById('breadcrumb');
  const li = document.createElement('li');
  li.innerHTML = restaurant.name;
  breadcrumb.appendChild(li);
}

/**
 * Get a parameter by name from page URL.
 */
getParameterByName = (name, url) => {
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
}

$( document ).ready(function() {
  console.log( "ready!" );
  addApiKey();
});