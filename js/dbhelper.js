/**
 * Common database helper functions.
 */
class DBHelper {

  /**
   * Database URL.
   * Change this to restaurants.json file location on your server.
   */
  static get DATABASE_URL() {
    const port = 1337 // Change this to your server port
    return `http://localhost:${port}/restaurants`;
  }

  /**
   * Functions deprecated in favor of fetch API:
   * (1) Fetch all restaurants: fetchRestaurants()
   * (2) Fetch a restaurant by its ID: fetchRestaurantById()
   * (3) Fetch restaurants by a cuisine type with proper error handling: fetchRestaurantByCuisine()
   * (4) Fetch restaurants by a neighborhood with proper error handling: fetchRestaurantByNeighborhood()
   * (5) Fetch restaurants by a cuisine and a neighborhood with proper error handling: fetchRestaurantByCuisineAndNeighborhood()
   * (6) Fetch all neighborhoods with proper error handling: fetchNeighborhoods()
   * (7) Fetch all cuisines with proper error handling: fetchCuisines()
   * see main.js and restaurant_info.js for updated fetch API code.
   */

  /**
   * Restaurant page URL.
   */
  static urlForRestaurant(restaurant) {
    return (`./restaurant.html?id=${restaurant.id}`);
  }

  /**
   * Restaurant image URL.
   */
  static imageUrlForRestaurant(restaurant) {
    if (restaurant.photograph) {
      return (`/img/${restaurant.photograph}.png`); // added .jpg extension to path; updated to .png 8/4/2018
    } else {
      return (`/img/${restaurant.id}.png`) // assumes ID and photograph number are equal; updated to .png 8/4/2018
    }
    
  }

  /**
   * Map marker for a restaurant.
   */
  static mapMarkerForRestaurant(restaurant, map) {
    const marker = new google.maps.Marker({
      position: restaurant.latlng,
      title: restaurant.name,
      url: DBHelper.urlForRestaurant(restaurant),
      map: map,
      animation: google.maps.Animation.DROP}
    );
    return marker;
  }

}
