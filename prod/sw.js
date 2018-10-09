"use strict";console.log("this is the service worker"),importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js"),workbox?console.log("WorkBox is loaded."):console.log("WorkBox is NOT loaded."),workbox.routing.registerRoute(new RegExp(".*.*"),workbox.strategies.networkFirst());var showNotification=function(){self.registration.showNotification("BackgroundSync success!",{body:"🦆 🐧 🦆 🐧"})},queue=new workbox.backgroundSync.Queue("mwsQueue");self.addEventListener("fetch",function(e){var o=fetch(e.request.clone()).catch(function(o){return queue.addRequest(e.request)});e.waitUntil(o)});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN3LmpzIl0sIm5hbWVzIjpbImNvbnNvbGUiLCJsb2ciLCJpbXBvcnRTY3JpcHRzIiwic2hvd05vdGlmaWNhdGlvbiIsInNlbGYiLCJyZWdpc3RyYXRpb24iLCJ3b3JrYm94Iiwic3RyYXRlZ2llcyIsIm5ldHdvcmtGaXJzdCIsInByb21pc2VDaGFpbiIsImV2ZW50IiwicXVldWUiLCJhZGRSZXF1ZXN0IiwiYm9keSIsImJhY2tncm91bmRTeW5jIiwiUXVldWUiLCJhZGRFdmVudExpc3RlbmVyIiwiZmV0Y2giLCJyZXF1ZXN0IiwiY2xvbmUiLCJjYXRjaCIsImVyciIsIndhaXRVbnRpbCJdLCJtYXBwaW5ncyI6ImFBQUFBLFFBQUFDLElBQUEsOEJBUUlDLGNBQWMsMkVBR1ZGLFFBQ0dBLFFBQUFDLElBQUEsc0JBRU5ELFFBQUFDLElBQUEsMEJBZ0JTRSxRQUFBQSxRQUFBQSxjQUNGQyxJQUFLQyxPQUFBQSxRQURUQyxRQUFBQyxXQUFBQyxnQkFXUUMsSUFBQUEsaUJBQXFCQyxXQUV2Qk4sS0FBT08sYUFBTUMsaUJBQWIsMEJBQUEsQ0FBQUMsS0FBQSxpQkFKTkYsTUFBQSxJQUFBTCxRQUFBUSxlQUFBQyxNQUFBLFlBYVJYLEtBQUFZLGlCQUFBLFFBQUEsU0FBQU4sR0FYVSxJQUFNRCxFQUFlUSxNQUFNUCxFQUFNUSxRQUFRQyxTQUN4Q0MsTUFBTSxTQUFDQyxHQUNKLE9BQU9WLE1BQU1DLFdBQVdGLEVBQU1RLFdBR2xDUixFQUFNWSxVQUFVYiIsImZpbGUiOiJzdy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vc2VydmljZSB3b3JrZXJcblxuY29uc29sZS5sb2coJ3RoaXMgaXMgdGhlIHNlcnZpY2Ugd29ya2VyJyk7XG5cblxuXG5cbi8vIEltcG9ydCBXb3JrQm94XG4gICAgaW1wb3J0U2NyaXB0cygnaHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL3dvcmtib3gtY2RuL3JlbGVhc2VzLzMuNi4xL3dvcmtib3gtc3cuanMnKTtcblxuICAgIGlmICh3b3JrYm94KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdXb3JrQm94IGlzIGxvYWRlZC4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygnV29ya0JveCBpcyBOT1QgbG9hZGVkLicpO1xuICAgIH1cblxuXG5cblxuLy8gY2FjaGUgd2l0aCBXb3JrQm94OiBub24taW1hZ2UgYXNzZXRzXG4gICAgd29ya2JveC5yb3V0aW5nLnJlZ2lzdGVyUm91dGUoXG4gICAgICBuZXcgUmVnRXhwKCcuKlxcLionKSxcbiAgICAgIHdvcmtib3guc3RyYXRlZ2llcy5uZXR3b3JrRmlyc3QoKVxuICAgICk7XG5cblxuXG5cbi8vIFdvcmtCb3ggQmFja2dyb3VuZCBTeW5jXG4gICAgLy8gY3JlYXRlIGEgbm90aWZpY2F0aW9uIHRvIHNob3cgdGhhdCB0aGUgcXVldWUgaXMgd29ya2luZy5cbiAgICAgICAgY29uc3Qgc2hvd05vdGlmaWNhdGlvbiA9ICgpID0+IHtcbiAgICAgICAgICAgIHNlbGYucmVnaXN0cmF0aW9uLnNob3dOb3RpZmljYXRpb24oJ0JhY2tncm91bmRTeW5jIHN1Y2Nlc3MhJywge2JvZHk6ICfwn6aGIPCfkKcg8J+mhiDwn5CnJ30pO1xuICAgICAgICB9O1xuXG4gICAgLy8gY3JlYXRlIGEgcXVldWUgdGhhdCByZXByZXNlbnRzIGZhaWxlZCBIVFRQIHJlcXVlc3RzLiBcbiAgICAgICAgY29uc3QgcXVldWUgPSBuZXcgd29ya2JveC5iYWNrZ3JvdW5kU3luYy5RdWV1ZSgnbXdzUXVldWUnKTtcblxuXG4gICAgLy8gYWRkIGV2ZW50IGxpc3RlbmVyIGZvciBmZXRjaCByZXF1ZXN0c1xuICAgICAgICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2ZldGNoJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgLy8gQ2xvbmUgdGhlIHJlcXVlc3QgdG8gZW5zdXJlIGl0J3Mgc2F2ZWQgdG8gcmVhZCB3aGVuIGFkZGluZyB0byB0aGUgUXVldWUuXG4gICAgICAgICAgY29uc3QgcHJvbWlzZUNoYWluID0gZmV0Y2goZXZlbnQucmVxdWVzdC5jbG9uZSgpKVxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBxdWV1ZS5hZGRSZXF1ZXN0KGV2ZW50LnJlcXVlc3QpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZXZlbnQud2FpdFVudGlsKHByb21pc2VDaGFpbik7XG4gICAgICAgIH0pO1xuXG5cbi8vIENvbnNvbGUgbG9ncyBmb3Igc2VydmljZSB3b3JrZXIgZXZlbnRzXG5cbi8qIFthXVxuXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2luc3RhbGwnLCBmdW5jdGlvbihldmVudCkge1xuICAgIGNvbnNvbGUubG9nKCdzZXJ2aWNlIHdvcmtlciBpbnN0YWxsaW5nJyk7XG4gICAgLy9wZXJmb3JtIGluc3RhbGwgc3RlcHNcbiAgICBldmVudC53YWl0VW50aWwoXG4gICAgICAgIGNhY2hlcy5vcGVuKENBQ0hFX05BTUUpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjYWNoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdPcGVuZWQgY2FjaGUnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGUuYWRkQWxsKHVybHNUb0NhY2hlKTtcbiAgICAgICAgICAgIH0pXG4gICAgKTtcbn0pO1xuXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2FjdGl2YXRlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZygnc2VydmljZSB3b3JrZXIgYWN0aXZhdGluZycpO1xufSk7XG5cblthXSAqL1xuXG4vLyBhZGQgZWxlbWVudHMgdG8gdGhlIGNhY2hlIHdoZW4gdGhlIHBhZ2UncyBoYXNoIGNoYW5nZXNcbi8qIFxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZygnd2luZG93IGhhc2ggaGFzIGNoYW5nZWQuIEFkZCBuZXcgYXNzZXRzIHRvIHRoZSBjYWNoZS4nKTtcbiAgICBldmVudC53YWl0VW50aWwoXG4gICAgICAgIGNhY2hlcy5vcGVuKENBQ0hFX05BTUUpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjYWNoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdPcGVuZWQgY2FjaGUnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGUuYWRkKGV2ZW50LnJlcXVlc3QpO1xuICAgICAgICAgICAgfSlcbiAgICApO1xufSwgZmFsc2UpO1xuKi9cblxuLyogW2JdXG5cbi8vaGFuZGxlIGZldGNoIGV2ZW50c1xuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdmZXRjaCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgLy8gYWRkIGNvbnNvbGUgbG9nZ2luZyBmb3IgZXZlbnQgcmVxdWVzdHNcbiAgICAvL2NvbnNvbGUubG9nKGV2ZW50LnJlcXVlc3QpO1xuXG4gICAgLy9zZXJ2ZSBzdGF0aWMgY29udGVudCBmcm9tIGNhY2hlXG4gICAgZXZlbnQucmVzcG9uZFdpdGgoXG4gICAgICAgIGNhY2hlcy5tYXRjaChldmVudC5yZXF1ZXN0KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAvL0NhY2hlIGhpdCAtIHJldHVybiByZXNwb25zZVxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gZmV0Y2goZXZlbnQucmVxdWVzdCk7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICApXG4gICAgKTtcbn0pO1xuXG5bYl0gKi8iXX0=
