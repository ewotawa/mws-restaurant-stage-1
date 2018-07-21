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

/*
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
    
    // create a fetch event to pull the data from the server
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
    
    // create a read-only transaction. Set a value and retrieve from the database
    
}
*/

/*
//create a transaction to read from the database
dbPromise.then(function(db) {
    var tx = db.transaction('keyval');
    var keyValStore = tx.objectStore('keyval');
    return keyValStore.get('hello');
}).then(function(val) {
    console.log(`The value of "hello" is ${val}`);
});

//create a read-write transaction. Set a value and retrieve from the database
dbPromise.then(function(db) {
    var tx = db.transaction('keyval', 'readwrite');
    var keyValStore = tx.objectStore('keyval');
    keyValStore.put('bar', 'foo');
    return tx.complete;
}).then(function() {
    console.log('Added foo:bar to keyval');
});
*/