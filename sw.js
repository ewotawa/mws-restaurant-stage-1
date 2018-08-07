//service worker

console.log('this is the service worker');


// name cache
var CACHE_NAME = 'mws_cache_0';

// list urls to cache

// url components for google map api
var pathStart = 'https://maps.googleapis.com/maps/api/js?';
var pathEnd = 'libraries=places&callback=initMap';
var pathMid = config.googleMapApi;

var urlsToCache = [
    '/',
    '/css/styles.css',
    //'/data/restaurants.json',
    '/img/1.png',
    '/img/2.png',
    '/img/3.png',
    '/img/4.png',
    '/img/5.png',
    '/img/6.png',
    '/img/7.png',
    '/img/8.png',
    '/img/9.png',
    '/img/10.png',
    '/config.js',
    '/js/dbhelper.js',
    '/js/idb-test_index.js',
    '/js/idb.js',
    '/js/indexController.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/icons/patrick-tomasso-499112-unsplash_192x192.png',
    '/icons/patrick-tomasso-499112-unsplash_512x512.png',
    '/index.html',
    '/restaurant.html',
    '/manifest.json',
    //'https://code.jquery.com/jquery-1.10.2.js',
    'https://use.fontawesome.com/releases/v5.0.13/css/all.css',
    pathStart + pathMid + pathEnd //main page google map
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
    console.log(event.request);

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

