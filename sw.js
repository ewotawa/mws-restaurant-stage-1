//service worker

console.log('this is the service worker');




// Import WorkBox
    importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

    if (workbox) {
        console.log('WorkBox is loaded.');
    } else {
        console.log('WorkBox is NOT loaded.');
    }




// cache with WorkBox: non-image assets
    workbox.routing.registerRoute(
      new RegExp('.*\.*'),
      workbox.strategies.networkFirst()
    );




// WorkBox Background Sync
    // create a notification to show that the queue is working.
        const showNotification = () => {
            self.registration.showNotification('BackgroundSync success!', {body: '🦆 🐧 🦆 🐧'});
        };

    // create a queue that represents failed HTTP requests. 
        const queue = new workbox.backgroundSync.Queue('mwsQueue');


    // add event listener for fetch requests
        self.addEventListener('fetch', (event) => {
          // Clone the request to ensure it's saved to read when adding to the Queue.
          const promiseChain = fetch(event.request.clone())
          .catch((err) => {
              return queue.addRequest(event.request);
          });

          event.waitUntil(promiseChain);
        });

// Console logs for service worker events

/* [a]

self.addEventListener('install', function(event) {
    console.log('service worker installing');
    //perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('activate', function(event) {
    console.log('service worker activating');
});

[a] */

// add elements to the cache when the page's hash changes
/* 
self.addEventListener('hashchange', function(event) {
    console.log('window hash has changed. Add new assets to the cache.');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.add(event.request);
            })
    );
}, false);
*/

/* [b]

//handle fetch events
self.addEventListener('fetch', function(event) {
    // add console logging for event requests
    //console.log(event.request);

    //serve static content from cache
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                //Cache hit - return response
                if (response) {
                    return response;
                }                
                return fetch(event.request);                
            }
        )
    );
});

[b] */