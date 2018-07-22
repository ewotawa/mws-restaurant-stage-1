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

}

