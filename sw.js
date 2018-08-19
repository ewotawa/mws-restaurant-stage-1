//service worker

console.log('this is the service worker');


// name cache
var CACHE_NAME = 'mws_cache_0';

// list urls to cache

// url components for google map api
// var pathStart = 'https://maps.googleapis.com/maps/api/js?';
// var pathEnd = 'libraries=places&callback=initMap';
// var pathMid = config.googleMapApi;

var urlsToCache = [
    '/',
    '/css/styles.css',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    // '/js/config.js',
    // '/js/dbhelper.js',
    '/js/idb-test_index.js',
    '/js/idb.js',
    '/js/indexController.js',
    // '/js/main.js',
    // '/js/restaurant_info.js',
    '/js/js_main.js',
    '/js/js_restaurant.js',
    // '/js/js_db',
    '/icons/patrick-tomasso-499112-unsplash_192x192.png',
    '/icons/patrick-tomasso-499112-unsplash_512x512.png',
    '/manifest.json',
    '/index.html',
    '/restaurant.html',
    'https://use.fontawesome.com/releases/v5.0.13/css/all.css',
];

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

