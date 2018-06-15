//register SW if browser supports SWs
if(navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js').then(function() {
        console.log('service worker registered');
    }).catch(function(err) {
        console.log('service worker NOT registered. error: ', err);
    });
}
