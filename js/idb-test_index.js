if (navigator.serviceWorker) {
  var dbPromise = idb.open('mwsStage2', 1, function(upgradeDb) {
      // set up switch to manage version control
      switch(upgradeDb.oldVersion) {
          case 0:
              // set up a key that's separate to the data
              var mwsDataStore = upgradeDb.createObjectStore('mwsData', {keyPath: 'id'});
              // set up a separate object store for the restaurant reviews
              var mwsReviewStore = upgradeDb.createObjectStore('mwsReviewData', {keyPath: 'id'});
              mwsReviewStore.createIndex('restaurant', 'restaurant_id');
      }
  });  

  // PUT DATA INTO DATABASE: create a fetch event to pull the data from the server
  // code fails if not connected to internet, but if code is in separate js file then it doesn't hinder main.js or restaurant_info.js from functioning offline.

  fetch(DBHelper.DATABASE_URL, {}).then(function(response) {
      return response.json();
    }).then(fetchRestaurantsAll)
    .then(storeData)
    .catch(error => console.error(error));    

    
  function fetchRestaurantsAll (data) {
    return data;
  }

  function storeData (data) {
    dbPromise.then(function(db) {
        var restaurants = data;
        var tx = db.transaction('mwsData', 'readwrite');
        var store = tx.objectStore('mwsData');
        restaurants.forEach(function(restaurant) {
            store.put(restaurant);
        });
    });
  }

  // PUT DATA INTO DATABASE: create a fetch event to pull the restaurant review data from the server
  // code fails if not connected to internet, but if code is in separate js file then it doesn't hinder main.js or restaurant_info.js from functioning offline.

  fetch(DBHelper.REVIEW_URL, {}).then(function(response) {
      return response.json();
    }).then(fetchReviewsAll)
    .then(storeReviewData)
    .catch(error => console.error(error));    

    
  function fetchReviewsAll (data) {
    console.log(data);
    return data;
  }

  function storeReviewData (data) {
    dbPromise.then(function(db) {
        var reviews = data;
        var tx = db.transaction('mwsReviewData', 'readwrite');
        var store = tx.objectStore('mwsReviewData');
        reviews.forEach(function(review) {
            store.put(review);
        });
    });
  }


}

