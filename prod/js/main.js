"use strict";var map,staticMap,restaurants=void 0,neighborhoods=void 0,cuisines=void 0,markers=[],key=config.googleMapApi,fontAwesome=config.fontAwesome,burger=document.getElementById("hamburger");if(navigator.serviceWorker){var getDataNeighborhoods=function(){dbPromise.then(function(e){return e.transaction("mwsData","readonly").objectStore("mwsData").getAll()}).then(fetchUniqueNeighborhoods).then(uniqueNeighborhoodsHTML).catch(function(e){return console.error(e)})},getDataRestaurants=function(){dbPromise.then(function(e){return e.transaction("mwsData","readonly").objectStore("mwsData").getAll()}).then(fetchUniqueCuisines).then(uniqueCuisinesHTML).catch(function(e){return console.error(e)})},dbPromise=idb.open("mwsStage2",1,function(e){switch(e.oldVersion){case 0:e.createObjectStore("mwsData",{keyPath:"id"})}});getDataNeighborhoods(),getDataRestaurants()}else fetch(DBHelper.DATABASE_URL,{}).then(function(e){return e.json()}).then(fetchRestaurantsAll).then(fetchUniqueNeighborhoods).then(uniqueNeighborhoodsHTML).catch(function(e){return console.error(e)}),fetch(DBHelper.DATABASE_URL,{}).then(function(e){return e.json()}).then(fetchRestaurantsAll).then(fetchUniqueCuisines).then(uniqueCuisinesHTML).catch(function(e){return console.error(e)});function fetchRestaurantsAll(e){return e}function fetchUniqueNeighborhoods(e){var t=e,r=[],n=!0,a=!1,o=void 0;try{for(var i,s=t[Symbol.iterator]();!(n=(i=s.next()).done);n=!0){var l=i.value;-1==r.indexOf(l.neighborhood)&&r.push(l.neighborhood)}}catch(e){a=!0,o=e}finally{try{!n&&s.return&&s.return()}finally{if(a)throw o}}return r}function uniqueNeighborhoodsHTML(e){var t=e;self.neighborhoods=t,fillNeighborhoodsHTML()}function fetchUniqueCuisines(e){var t=e,r=[],n=!0,a=!1,o=void 0;try{for(var i,s=t[Symbol.iterator]();!(n=(i=s.next()).done);n=!0){var l=i.value;-1==r.indexOf(l.cuisine_type)&&r.push(l.cuisine_type)}}catch(e){a=!0,o=e}finally{try{!n&&s.return&&s.return()}finally{if(a)throw o}}return r}function uniqueCuisinesHTML(e){var t=e;self.cuisines=t,fillCuisinesHTML()}var fillNeighborhoodsHTML=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.neighborhoods,r=document.getElementById("neighborhoods-select");r.setAttribute("name","Select Neighborhood"),e.forEach(function(e){var t=document.createElement("option");t.innerHTML=e,t.value=e,t.setAttribute("id",e),r.append(t)})},fillCuisinesHTML=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.cuisines,r=document.getElementById("cuisines-select");e.forEach(function(e){var t=document.createElement("option");t.innerHTML=e,t.value=e,r.append(t),t.setAttribute("id",e)})},sMap=document.getElementById("staticMap"),sMapCap=document.getElementById("staticMapCaption"),dMap=document.getElementById("mapOuter"),center="40.722216,-73.987501",zoom="12",red01="40.713829,-73.989667",red02="40.683555,-73.966393",red03="40.747143,-73.985414",red04="40.722216,-73.987501",red05="40.705089,-73.933585",red06="40.674925,-74.016162",red07="40.727397,-73.983645",red08="40.726584,-74.002082",red09="40.743797,-73.950652",red10="40.743394,-73.954235",width=window.screen.width,height="400";function activeMap(){640<window.screen.width?(sMap.setAttribute("style","display: none"),sMapCap.setAttribute("style","display: none"),dMap.setAttribute("style","display: contents")):dMap.setAttribute("style","display: none")}staticMap="https://maps.googleapis.com/maps/api/staticmap?center="+center+"&zoom="+zoom+"&size="+width+"x"+height+"&maptype=roadmap&markers=color:red%7Clabel:1%7C"+red01+"&markers=color:red%7Clabel:2%7C"+red02+"&markers=color:red%7Clabel:3%7C"+red03+"&markers=color:red%7Clabel:4%7C"+red04+"&markers=color:red%7Clabel:5%7C"+red05+"&markers=color:red%7Clabel:6%7C"+red06+"&markers=color:red%7Clabel:7%7C"+red07+"&markers=color:red%7Clabel:8%7C"+red08+"&markers=color:red%7Clabel:9%7C"+red09+"&markers=color:red%7Clabel:10%7C"+red10+"&key="+config.googleMapApi,sMap.setAttribute("src",staticMap),activeMap(),window.addEventListener("resize",activeMap()),sMap.onclick=function(){sMap.setAttribute("style","display: none"),sMapCap.setAttribute("style","display: none"),document.getElementById("mapOuter").removeAttribute("style")};var initMap=function(){self.map=new google.maps.Map(document.getElementById("map"),{zoom:12,center:{lat:40.722216,lng:-73.987501},scrollwheel:!1}),updateRestaurants()},updateRestaurants=function(){var e=document.getElementById("cuisines-select"),t=document.getElementById("neighborhoods-select"),r=e.getElementsByTagName("option"),n=t.getElementsByTagName("option"),a=e.selectedIndex,o=t.selectedIndex,i=e[a].value,s=t[o].value;if(navigator.serviceWorker){idb.open("mwsStage2",1,function(e){switch(e.oldVersion){case 0:e.createObjectStore("mwsData",{keyPath:"id"})}}).then(function(e){return e.transaction("mwsData","readonly").objectStore("mwsData").getAll()}).then(l).catch(function(e){return console.error(e)})}else fetch(DBHelper.DATABASE_URL,{}).then(function(e){return e.json()}).then(fetchRestaurantsAll).then(l).catch(function(e){return console.error(e)});function l(e){var t=e;return"all"!=i&&(t=t.filter(function(e){return e.cuisine_type==i})),"all"!=s&&(t=t.filter(function(e){return e.neighborhood==s})),resetRestaurants(t),fillRestaurantsHTML(),t}for(var c=0;c<r.length;c++)r[c].getAttribute("value")==i?r[c].setAttribute("selected",""):r[c].removeAttribute("selected");for(var u=0;u<n.length;u++)n[u].getAttribute("value")==s?n[u].setAttribute("selected",""):n[u].removeAttribute("selected")},resetRestaurants=function(e){self.restaurants=[],document.getElementById("restaurants-list").innerHTML="",self.markers.forEach(function(e){return e.setMap(null)}),self.markers=[],self.restaurants=e},fillRestaurantsHTML=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurants,t=document.getElementById("restaurants-list");e.forEach(function(e){t.append(createRestaurantHTML(e))}),addMarkersToMap()},createRestaurantHTML=function(e){var t=document.createElement("li"),r=document.createElement("img");r.className="restaurant-img",r.src=DBHelper.imageUrlForRestaurant(e),r.setAttribute("alt","promotional photo for "+e.name),t.append(r);var n=document.createElement("h2");n.innerHTML=e.name,t.append(n);var a=document.createElement("p");a.innerHTML=e.neighborhood,t.append(a);var o=document.createElement("p");o.innerHTML=e.address,t.append(o);var i=document.createElement("a");return i.innerHTML="View Details",i.href=DBHelper.urlForRestaurant(e),i.setAttribute("name","View details for "+e.name),i.setAttribute("role","button"),t.append(i),t},addMarkersToMap=function(){(0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurants).forEach(function(e){var t=DBHelper.mapMarkerForRestaurant(e,self.map);google.maps.event.addListener(t,"click",function(){window.location.href=t.url}),self.markers.push(t)})};function addApiKey(){if(""==key)var e="";else e="key="+config.googleMapApi+"&";document.getElementById("googleApi").setAttribute("src","https://maps.googleapis.com/maps/api/js?"+e+"libraries=places&callback=initMap")}burger.addEventListener("click",function(e){drawer.classList.toggle("open"),e.stopPropagation()}),document.addEventListener("DOMContentLoaded",function(){console.log("ready!"),addApiKey()});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsibmVpZ2hib3Job29kcyIsImN1aXNpbmVzIiwicmVzdGF1cmFudHMiLCJtYXAiLCJtYXJrZXJzIiwiZ29vZ2xlTWFwQXBpIiwiZm9udEF3ZXNvbWUiLCJjb25maWciLCJuYXZpZ2F0b3IiLCJzZXJ2aWNlV29ya2VyIiwiZ2V0RGF0YU5laWdoYm9yaG9vZHMiLCJkYlByb21pc2UiLCJ0aGVuIiwiZGIiLCJ0cmFuc2FjdGlvbiIsIm9iamVjdFN0b3JlIiwiZ2V0QWxsIiwiZmV0Y2hVbmlxdWVOZWlnaGJvcmhvb2RzIiwiZ2V0RGF0YVJlc3RhdXJhbnRzIiwiY29uc29sZSIsImVycm9yIiwiZmV0Y2hVbmlxdWVDdWlzaW5lcyIsInVuaXF1ZUN1aXNpbmVzSFRNTCIsImNhdGNoIiwidXBncmFkZURiIiwib2xkVmVyc2lvbiIsImNyZWF0ZU9iamVjdFN0b3JlIiwia2V5UGF0aCIsImZldGNoIiwiREJIZWxwZXIiLCJEQVRBQkFTRV9VUkwiLCJyZXNwb25zZSIsImpzb24iLCJmZXRjaFJlc3RhdXJhbnRzQWxsIiwidW5pcXVlTmVpZ2hib3Job29kc0hUTUwiLCJkYXRhIiwibmVpZ2hib3Job29kQXJyYXkiLCJfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uIiwiX2RpZEl0ZXJhdG9yRXJyb3IiLCJfaXRlcmF0b3JFcnJvciIsInVuZGVmaW5lZCIsIl9zdGVwIiwiX2l0ZXJhdG9yIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJuZXh0IiwiZG9uZSIsInJlc3RhdXJhbnQiLCJ2YWx1ZSIsImluZGV4T2YiLCJuZWlnaGJvcmhvb2QiLCJwdXNoIiwiZXJyIiwicmV0dXJuIiwic2VsZiIsImZpbGxOZWlnaGJvcmhvb2RzSFRNTCIsImN1aXNpbmVBcnJheSIsIl9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yIiwiX2RpZEl0ZXJhdG9yRXJyb3IyIiwiX2l0ZXJhdG9yRXJyb3IyIiwiX3N0ZXAyIiwiX2l0ZXJhdG9yMiIsImN1aXNpbmVfdHlwZSIsImZpbGxDdWlzaW5lc0hUTUwiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJnZXRFbGVtZW50QnlJZCIsInNlbGVjdCIsInNldEF0dHJpYnV0ZSIsImZvckVhY2giLCJvcHRpb24iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJjdWlzaW5lIiwiYXBwZW5kIiwic01hcCIsInNNYXBDYXAiLCJkTWFwIiwiem9vbSIsInJlZDAxIiwicmVkMDIiLCJyZWQwMyIsInJlZDA0IiwicmVkMDYiLCJyZWQwNyIsInJlZDA4Iiwid2lkdGgiLCJhY3RpdmVNYXAiLCJ3aW5kb3ciLCJzY3JlZW4iLCJjZW50ZXIiLCJoZWlnaHQiLCJyZWQwNSIsInJlZDA5IiwicmVkMTAiLCJzdGF0aWNNYXAiLCJhZGRFdmVudExpc3RlbmVyIiwib25jbGljayIsInJlbW92ZUF0dHJpYnV0ZSIsImluaXRNYXAiLCJnb29nbGUiLCJtYXBzIiwiTWFwIiwidXBkYXRlUmVzdGF1cmFudHMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsIm5PcHRpb24iLCJuU2VsZWN0Iiwic2VsZWN0ZWRJbmRleCIsImNJbmRleCIsIm5JbmRleCIsImlkYiIsIm9wZW4iLCJmZXRjaE1hdGNoZWRSZXN0YXVyYW50cyIsInJlc3VsdHMiLCJmaWx0ZXIiLCJyIiwicmVzZXRSZXN0YXVyYW50cyIsImZpbGxSZXN0YXVyYW50c0hUTUwiLCJpIiwiY09wdGlvbiIsImdldEF0dHJpYnV0ZSIsIm13c0RhdGFTdG9yZSIsIm0iLCJzZXRNYXAiLCJ1bCIsImNyZWF0ZVJlc3RhdXJhbnRIVE1MIiwiYWRkTWFya2Vyc1RvTWFwIiwibGkiLCJpbWFnZSIsInNyYyIsImltYWdlVXJsRm9yUmVzdGF1cmFudCIsIm5hbWUiLCJhZGRyZXNzIiwibW9yZSIsImhyZWYiLCJ1cmxGb3JSZXN0YXVyYW50IiwibWFwTWFya2VyRm9yUmVzdGF1cmFudCIsImFkZExpc3RlbmVyIiwibWFya2VyIiwibG9jYXRpb24iLCJ1cmwiLCJrZXkiLCJhcGlLZXkiLCJidXJnZXIi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QixVQUFBLEdBQUFBLFVBQUEsR0FBQVYsS0FBQXBELGFBbURjbUUsUUFBUSxTQUFBdEIsR0FoRGhCdUUsSUFBQUEsRUFBQUEsU0FBc0JtQix1QkFBdEJuQixFQUEwRGhFLEtBQUFuRCxLQUFBa0csT0FBbkNuRyxLQUFBQSxNQUFtQ3dJLFlBQUFDLEVBQUEsUUFBQSxXQW9EMURsRCxPQUFPbUQsU0FBU0wsS0FBT0ksRUFBT0UsTUFsRGxDM0ksS0FBQUEsUUFBWW1FLEtBQVFzRSxNQW1CcEJQLFNBQUszRCxZQXNETCxHQUFXLElBQVBxRSxJQW5ESixJQUFNNUYsRUFBQUEsUUFFSHlCLEVBQU96QixPQUFWM0MsT0FBQUYsYUFBQSxJQVNBaUksU0FBS2xFLGVBQUwsYUFBMEJBLGFBQXNCckIsTUFIbkN3QiwyQ0FHYndFLEVBRkEscUNBNkJGQyxPQUFPL0MsaUJBQWlCLFFBQVMsU0FBU2dELEdBbkRwQ25CLE9BQUFBLFVBQUFBLE9BQXVCLFFBQzNCbUIsRUFBTWpCLG9CQXFDSnpELFNBQUEwQixpQkFBQSxtQkFBQSxXQUNBOUUsUUFBTXdILElBQUFBLFVBQ050QyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IHJlc3RhdXJhbnRzLFxyXG4gIG5laWdoYm9yaG9vZHMsXHJcbiAgY3Vpc2luZXNcclxudmFyIG1hcFxyXG52YXIgc3RhdGljTWFwO1xyXG52YXIgbWFya2VycyA9IFtdXHJcblxyXG52YXIga2V5ID0gY29uZmlnLmdvb2dsZU1hcEFwaTtcclxudmFyIGZvbnRBd2Vzb21lID0gY29uZmlnLmZvbnRBd2Vzb21lO1xyXG5cclxudmFyIGJ1cmdlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGFtYnVyZ2VyXCIpO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBzZXQgdXAgSURCIGRhdGFiYXNlXHJcbiAqIFxyXG4gKiBwYXJhbWV0ZXJzOiBkYXRhYmFzZSBuYW1lLCB2ZXJzaW9uLCBjYWxsYmFja1xyXG4gKiBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBpZiBicm93c2VyIGhhc24ndCBoZWFyZCBhYm91dCBkYXRhYmFzZSBiZWZvcmUgb3IgaWYga25vd24gdmVyc2lvbiBpcyBsZXNzIHRoYW4gcGFyYW1ldGVyIHZlcnNpb24uXHJcbiAqIG9ubHkgcGxhY2Ugd2hlcmUgY2FuIGNyZWF0ZSBvciByZW1vdmUgb2JqZWN0IHN0b3JlcyBhbmQgaW5kaWNlc1xyXG4gKiBcclxuICogbm90ZTogc2VlIHJlYWRtZSBmaWxlIGZvciBpZGIgbGlicmFyeTpcclxuICogaHR0cHM6Ly9naXRodWIuY29tL2pha2VhcmNoaWJhbGQvaWRiL2Jsb2IvbWFzdGVyL1JFQURNRS5tZFxyXG4gKiBJIGluY2x1ZGVkIGlkYi5qcyBpbiB0aGUgZmlsZSBzdHJ1Y3R1cmUgdG8gcHV0IGlkYiBpbiB0aGUgZ2xvYmFsIHNjb3BlLlxyXG4gKi9cclxuXHJcbi8vIGRvIG5vdCBuZWVkIHRvIGltcG9ydCB0aGUgSURCIGxpYnJhcnkgKHByb21pc2UtYmFzZWQpIGJlY2F1c2UgaXQgaXMgaW4gdGhlIGdsb2JhbCBzY29wZS4gU2VlIGpzL2lkYi5qc1xyXG4vLyBpbXBvcnQgaWRiIGZyb20gJ2lkYic7XHJcblxyXG5cclxuLy8gY3JlYXRlIHRoZSBkYXRhYmFzZSBhbmQgcHV0IG9iamVjdHMgaW50byBpdC5cclxuaWYgKG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyKSB7XHJcbiAgdmFyIGRiUHJvbWlzZSA9IGlkYi5vcGVuKCdtd3NTdGFnZTInLCAxLCBmdW5jdGlvbih1cGdyYWRlRGIpIHtcclxuICAgICAgLy8gc2V0IHVwIHN3aXRjaCB0byBtYW5hZ2UgdmVyc2lvbiBjb250cm9sXHJcbiAgICAgIHN3aXRjaCh1cGdyYWRlRGIub2xkVmVyc2lvbikge1xyXG4gICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgIC8vIHNldCB1cCBhIGtleSB0aGF0J3Mgc2VwYXJhdGUgdG8gdGhlIGRhdGFcclxuICAgICAgICAgICAgICB2YXIgbXdzRGF0YVN0b3JlID0gdXBncmFkZURiLmNyZWF0ZU9iamVjdFN0b3JlKCdtd3NEYXRhJywge2tleVBhdGg6ICdpZCd9KTtcclxuICAgICAgfVxyXG4gIH0pOyAgXHJcbiAgXHJcbiAgLy8gUFVUIERBVEEgSU5UTyBEQVRBQkFTRTogY3JlYXRlIGEgZmV0Y2ggZXZlbnQgdG8gcHVsbCB0aGUgZGF0YSBmcm9tIHRoZSBzZXJ2ZXJcclxuICAvLyBzZWUgaWRiLXRlc3RfaW5kZXguanNcclxuXHJcbiAgLy8gUFVMTCBEQVRBIE9VVCBPRiBEQVRBQkFTRTogZ2V0IGFsbCBOZWlnaGJvcmhvb2RzXHJcbiAgZnVuY3Rpb24gZ2V0RGF0YU5laWdoYm9yaG9vZHMgKCkge1xyXG4gICAgZGJQcm9taXNlLnRoZW4oZnVuY3Rpb24oZGIpIHtcclxuICAgICAgdmFyIHR4ID0gZGIudHJhbnNhY3Rpb24oJ213c0RhdGEnLCAncmVhZG9ubHknKTtcclxuICAgICAgdmFyIHN0b3JlID0gdHgub2JqZWN0U3RvcmUoJ213c0RhdGEnKTtcclxuICAgICAgcmV0dXJuIHN0b3JlLmdldEFsbCgpO1xyXG4gICAgfSkudGhlbihmZXRjaFVuaXF1ZU5laWdoYm9yaG9vZHMpXHJcbiAgICAudGhlbih1bmlxdWVOZWlnaGJvcmhvb2RzSFRNTClcclxuICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgfVxyXG5cclxuICAvLyBQVUxMIERBVEEgT1VUIE9GIERBVEFCQVNFOiBnZXQgYWxsIFJlc3RhdXJhbnRzXHJcbiAgZnVuY3Rpb24gZ2V0RGF0YVJlc3RhdXJhbnRzICgpIHtcclxuICAgIGRiUHJvbWlzZS50aGVuKGZ1bmN0aW9uKGRiKSB7XHJcbiAgICAgIHZhciB0eCA9IGRiLnRyYW5zYWN0aW9uKCdtd3NEYXRhJywgJ3JlYWRvbmx5Jyk7XHJcbiAgICAgIHZhciBzdG9yZSA9IHR4Lm9iamVjdFN0b3JlKCdtd3NEYXRhJyk7XHJcbiAgICAgIHJldHVybiBzdG9yZS5nZXRBbGwoKTtcclxuICAgIH0pLnRoZW4oZmV0Y2hVbmlxdWVDdWlzaW5lcylcclxuICAgIC50aGVuKHVuaXF1ZUN1aXNpbmVzSFRNTClcclxuICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgfVxyXG4gIFxyXG4gIC8vIGlmIHRoZXJlJ3MgYSBzZXJ2aWNlIHdvcmtlciwgcHVsbCB0aGUgZGF0YSBvdXQgb2YgSW5kZXhlZERCXHJcbiAgZ2V0RGF0YU5laWdoYm9yaG9vZHMoKTtcclxuICBnZXREYXRhUmVzdGF1cmFudHMoKTtcclxuXHJcbn0gZWxzZSB7XHJcblxyXG4gIC8vIGZldGNoIGV2ZW50cyBmb3IgYnJvd3NlcnMgdGhhdCBkbyBub3QgaGF2ZSBzZXJ2aWNlIHdvcmtlcnNcclxuICBcclxuICAvLyBuZWlnaGJvcmhvb2RzXHJcbiAgZmV0Y2goREJIZWxwZXIuREFUQUJBU0VfVVJMLCB7fSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICB9KS50aGVuKGZldGNoUmVzdGF1cmFudHNBbGwpXHJcbiAgLnRoZW4oZmV0Y2hVbmlxdWVOZWlnaGJvcmhvb2RzKVxyXG4gIC50aGVuKHVuaXF1ZU5laWdoYm9yaG9vZHNIVE1MKVxyXG4gIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7IFxyXG4gIFxyXG4gIC8vIHJlc3RhdXJhbnRzXHJcbiAgZmV0Y2goREJIZWxwZXIuREFUQUJBU0VfVVJMLCB7fSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICB9KS50aGVuKGZldGNoUmVzdGF1cmFudHNBbGwpXHJcbiAgLnRoZW4oZmV0Y2hVbmlxdWVDdWlzaW5lcylcclxuICAudGhlbih1bmlxdWVDdWlzaW5lc0hUTUwpXHJcbiAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuXHJcbn1cclxuXHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBtYWluLmh0bWwgZnVuY3Rpb25zXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gZmV0Y2hSZXN0YXVyYW50c0FsbCAoZGF0YSkge1xyXG4gIHJldHVybiBkYXRhO1xyXG59XHJcblxyXG4vKipcclxuICogRmV0Y2ggYWxsIG5laWdoYm9yaG9vZHMgYW5kIHNldCB0aGVpciBIVE1MXHJcbiAqIGRlcHJlY2F0ZWQgZmV0Y2hOZWlnaGJvcmhvb2RzKCkgKFhIUiBkZXBlbmRlbnQpIGluIGZhdm9yIG9mIGZldGNoIEFQSVxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIGZldGNoVW5pcXVlTmVpZ2hib3Job29kcyAoZGF0YSkge1xyXG4gIGNvbnN0IHJlc3RhdXJhbnRzID0gZGF0YTtcclxuICBsZXQgbmVpZ2hib3Job29kQXJyYXkgPSBbXTtcclxuICBmb3IgKGxldCByZXN0YXVyYW50IG9mIHJlc3RhdXJhbnRzKSB7XHJcbiAgICBpZiAobmVpZ2hib3Job29kQXJyYXkuaW5kZXhPZihyZXN0YXVyYW50Lm5laWdoYm9yaG9vZCkgPT0gLTEpIHtcclxuICAgICAgbmVpZ2hib3Job29kQXJyYXkucHVzaChyZXN0YXVyYW50Lm5laWdoYm9yaG9vZCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBuZWlnaGJvcmhvb2RBcnJheTtcclxufVxyXG5cclxuZnVuY3Rpb24gdW5pcXVlTmVpZ2hib3Job29kc0hUTUwgKG5laWdoYm9yaG9vZEFycmF5KSB7XHJcbiAgbGV0IG5laWdoYm9yaG9vZHMgPSBuZWlnaGJvcmhvb2RBcnJheTtcclxuICBzZWxmLm5laWdoYm9yaG9vZHMgPSBuZWlnaGJvcmhvb2RzO1xyXG4gIGZpbGxOZWlnaGJvcmhvb2RzSFRNTCgpO1xyXG59XHJcblxyXG4vKipcclxuICogRmV0Y2ggYWxsIGN1aXNpbmVzIGFuZCBzZXQgdGhlaXIgSFRNTFxyXG4gKiBkZXByZWNhdGVkIGZldGNoQ3Vpc2luZXMoKSAoWEhSIGRlcGVuZGVudCkgaW4gZmF2b3Igb2YgZmV0Y2ggQVBJXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gZmV0Y2hVbmlxdWVDdWlzaW5lcyAoZGF0YSkge1xyXG4gIGNvbnN0IHJlc3RhdXJhbnRzID0gZGF0YTtcclxuICBsZXQgY3Vpc2luZUFycmF5ID0gW107XHJcbiAgZm9yIChsZXQgcmVzdGF1cmFudCBvZiByZXN0YXVyYW50cykge1xyXG4gICAgaWYgKGN1aXNpbmVBcnJheS5pbmRleE9mKHJlc3RhdXJhbnQuY3Vpc2luZV90eXBlKSA9PSAtMSkge1xyXG4gICAgICBjdWlzaW5lQXJyYXkucHVzaChyZXN0YXVyYW50LmN1aXNpbmVfdHlwZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBjdWlzaW5lQXJyYXk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVuaXF1ZUN1aXNpbmVzSFRNTCAoY3Vpc2luZUFycmF5KSB7XHJcbiAgbGV0IGN1aXNpbmVzID0gY3Vpc2luZUFycmF5O1xyXG4gIHNlbGYuY3Vpc2luZXMgPSBjdWlzaW5lcztcclxuICBmaWxsQ3Vpc2luZXNIVE1MKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXQgbmVpZ2hib3Job29kcyBIVE1MLlxyXG4gKi9cclxuY29uc3QgZmlsbE5laWdoYm9yaG9vZHNIVE1MID0gKG5laWdoYm9yaG9vZHMgPSBzZWxmLm5laWdoYm9yaG9vZHMpID0+IHtcclxuICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmVpZ2hib3Job29kcy1zZWxlY3QnKTtcclxuICBzZWxlY3Quc2V0QXR0cmlidXRlKCduYW1lJywgJ1NlbGVjdCBOZWlnaGJvcmhvb2QnKTtcclxuICBuZWlnaGJvcmhvb2RzLmZvckVhY2gobmVpZ2hib3Job29kID0+IHtcclxuICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xyXG4gICAgb3B0aW9uLmlubmVySFRNTCA9IG5laWdoYm9yaG9vZDtcclxuICAgIG9wdGlvbi52YWx1ZSA9IG5laWdoYm9yaG9vZDtcclxuICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgbmVpZ2hib3Job29kKTtcclxuICAgIHNlbGVjdC5hcHBlbmQob3B0aW9uKTtcclxuICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCBjdWlzaW5lcyBIVE1MLlxyXG4gKi9cclxuY29uc3QgZmlsbEN1aXNpbmVzSFRNTCA9IChjdWlzaW5lcyA9IHNlbGYuY3Vpc2luZXMpID0+IHtcclxuICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3Vpc2luZXMtc2VsZWN0Jyk7XHJcbiAgY3Vpc2luZXMuZm9yRWFjaChjdWlzaW5lID0+IHtcclxuICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xyXG4gICAgb3B0aW9uLmlubmVySFRNTCA9IGN1aXNpbmU7XHJcbiAgICBvcHRpb24udmFsdWUgPSBjdWlzaW5lO1xyXG4gICAgc2VsZWN0LmFwcGVuZChvcHRpb24pO1xyXG4gICAgb3B0aW9uLnNldEF0dHJpYnV0ZSgnaWQnLCBjdWlzaW5lKTtcclxuICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgR29vZ2xlIG1hcCwgY2FsbGVkIGZyb20gSFRNTC5cclxuICovXHJcblxyXG52YXIgc01hcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGF0aWNNYXAnKTtcclxudmFyIHNNYXBDYXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhdGljTWFwQ2FwdGlvbicpO1xyXG52YXIgZE1hcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXBPdXRlcicpO1xyXG5cclxuLy9zdGF0aWMgbWFwXHJcbnZhciBjZW50ZXIgPSAnNDAuNzIyMjE2LC03My45ODc1MDEnO1xyXG52YXIgem9vbSA9ICcxMic7XHJcbnZhciByZWQwMSA9ICc0MC43MTM4MjksLTczLjk4OTY2Nyc7XHJcbnZhciByZWQwMiA9ICc0MC42ODM1NTUsLTczLjk2NjM5Myc7XHJcbnZhciByZWQwMyA9ICc0MC43NDcxNDMsLTczLjk4NTQxNCc7XHJcbnZhciByZWQwNCA9ICc0MC43MjIyMTYsLTczLjk4NzUwMSc7XHJcbnZhciByZWQwNSA9ICc0MC43MDUwODksLTczLjkzMzU4NSc7IFxyXG52YXIgcmVkMDYgPSAnNDAuNjc0OTI1LC03NC4wMTYxNjInO1xyXG52YXIgcmVkMDcgPSAnNDAuNzI3Mzk3LC03My45ODM2NDUnO1xyXG52YXIgcmVkMDggPSAnNDAuNzI2NTg0LC03NC4wMDIwODInO1xyXG52YXIgcmVkMDkgPSAnNDAuNzQzNzk3LC03My45NTA2NTInO1xyXG52YXIgcmVkMTAgPSAnNDAuNzQzMzk0LC03My45NTQyMzUnO1xyXG52YXIgd2lkdGggPSB3aW5kb3cuc2NyZWVuLndpZHRoO1xyXG52YXIgaGVpZ2h0ID0gJzQwMCc7IFxyXG4vL2NvbnNvbGUubG9nKGNvbmZpZy5nb29nbGVNYXBBcGkpO1xyXG5zdGF0aWNNYXAgPSBgaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL3N0YXRpY21hcD9jZW50ZXI9JHtjZW50ZXJ9Jnpvb209JHt6b29tfSZzaXplPSR7d2lkdGh9eCR7aGVpZ2h0fSZtYXB0eXBlPXJvYWRtYXAmbWFya2Vycz1jb2xvcjpyZWQlN0NsYWJlbDoxJTdDJHtyZWQwMX0mbWFya2Vycz1jb2xvcjpyZWQlN0NsYWJlbDoyJTdDJHtyZWQwMn0mbWFya2Vycz1jb2xvcjpyZWQlN0NsYWJlbDozJTdDJHtyZWQwM30mbWFya2Vycz1jb2xvcjpyZWQlN0NsYWJlbDo0JTdDJHtyZWQwNH0mbWFya2Vycz1jb2xvcjpyZWQlN0NsYWJlbDo1JTdDJHtyZWQwNX0mbWFya2Vycz1jb2xvcjpyZWQlN0NsYWJlbDo2JTdDJHtyZWQwNn0mbWFya2Vycz1jb2xvcjpyZWQlN0NsYWJlbDo3JTdDJHtyZWQwN30mbWFya2Vycz1jb2xvcjpyZWQlN0NsYWJlbDo4JTdDJHtyZWQwOH0mbWFya2Vycz1jb2xvcjpyZWQlN0NsYWJlbDo5JTdDJHtyZWQwOX0mbWFya2Vycz1jb2xvcjpyZWQlN0NsYWJlbDoxMCU3QyR7cmVkMTB9JmtleT0ke2NvbmZpZy5nb29nbGVNYXBBcGl9YDtcclxuc01hcC5zZXRBdHRyaWJ1dGUoJ3NyYycsIHN0YXRpY01hcCk7XHJcblxyXG5hY3RpdmVNYXAoKTtcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGFjdGl2ZU1hcCgpKTtcclxuXHJcbmZ1bmN0aW9uIGFjdGl2ZU1hcCgpIHtcclxuICBpZiAoIHdpbmRvdy5zY3JlZW4ud2lkdGggPiA2NDApIHtcclxuICAgIHNNYXAuc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5OiBub25lJyk7XHJcbiAgICBzTWFwQ2FwLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZGlzcGxheTogbm9uZScpO1xyXG4gICAgZE1hcC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2Rpc3BsYXk6IGNvbnRlbnRzJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vc01hcC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2Rpc3BsYXk6IGNvbnRlbnRzJyk7XHJcbiAgICAvL3NNYXBDYXAuc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5OiBjb250ZW50cycpO1xyXG4gICAgZE1hcC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2Rpc3BsYXk6IG5vbmUnKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIGNsaWNrIHRvIHJlbmRlciBkeW5hbWljIG1hcFxyXG5zTWFwLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgLy8gaGlkZSBzdGF0aWMgbWFwXHJcbiAgLy9zTWFwLnJlbW92ZUF0dHJpYnV0ZSgnc3JjJyk7XHJcbiAgc01hcC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2Rpc3BsYXk6IG5vbmUnKTtcclxuICBzTWFwQ2FwLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZGlzcGxheTogbm9uZScpO1xyXG4gIC8vIHNob3cgZHluYW1pYyBtYXBcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwT3V0ZXInKS5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XHJcbn1cclxuXHJcbmNvbnN0IGluaXRNYXAgPSAoKSA9PiB7XHJcbiAgbGV0IGxvYyA9IHtcclxuICAgIGxhdDogNDAuNzIyMjE2LFxyXG4gICAgbG5nOiAtNzMuOTg3NTAxXHJcbiAgfTtcclxuICBzZWxmLm1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLCB7XHJcbiAgICB6b29tOiAxMixcclxuICAgIGNlbnRlcjogbG9jLFxyXG4gICAgc2Nyb2xsd2hlZWw6IGZhbHNlXHJcbiAgfSk7XHJcbiAgdXBkYXRlUmVzdGF1cmFudHMoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFVwZGF0ZSBwYWdlIGFuZCBtYXAgZm9yIGN1cnJlbnQgcmVzdGF1cmFudHMuXHJcbiAqL1xyXG5jb25zdCB1cGRhdGVSZXN0YXVyYW50cyA9ICgpID0+IHtcclxuICBjb25zdCBjU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1aXNpbmVzLXNlbGVjdCcpO1xyXG4gIGNvbnN0IG5TZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmVpZ2hib3Job29kcy1zZWxlY3QnKTtcclxuXHJcbiAgLyogY2xlYXIgb3V0IGZvcm1lciBzZWxlY3RlZCBlbGVtZW50IGF0dHJpYnV0ZSAqL1xyXG4gIGNvbnN0IGNPcHRpb24gPSBjU2VsZWN0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdvcHRpb24nKTtcclxuICBjb25zdCBuT3B0aW9uID0gblNlbGVjdC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnb3B0aW9uJyk7XHJcblxyXG4gIGNvbnN0IGNJbmRleCA9IGNTZWxlY3Quc2VsZWN0ZWRJbmRleDtcclxuICBjb25zdCBuSW5kZXggPSBuU2VsZWN0LnNlbGVjdGVkSW5kZXg7XHJcblxyXG4gIGNvbnN0IGN1aXNpbmUgPSBjU2VsZWN0W2NJbmRleF0udmFsdWU7XHJcbiAgY29uc3QgbmVpZ2hib3Job29kID0gblNlbGVjdFtuSW5kZXhdLnZhbHVlO1xyXG5cclxuICAvKipcclxuICAgKiBmZXRjaCBldmVudCBmb3IgcmVzdGF1cmFudHMgdGhhdCBtYXRjaCBmaWx0ZXJzXHJcbiAgICovXHJcblxyXG4gICAvLyBhZGQgc2VydmljZSB3b3JrZXIgZnVuY3Rpb25hbGl0eVxyXG4gICAgLy8gY3JlYXRlIHRoZSBkYXRhYmFzZSBhbmQgcHV0IG9iamVjdHMgaW50byBpdC5cclxuICAgIGlmIChuYXZpZ2F0b3Iuc2VydmljZVdvcmtlcikge1xyXG4gICAgICB2YXIgZGJQcm9taXNlID0gaWRiLm9wZW4oJ213c1N0YWdlMicsIDEsIGZ1bmN0aW9uKHVwZ3JhZGVEYikge1xyXG4gICAgICAgICAgLy8gc2V0IHVwIHN3aXRjaCB0byBtYW5hZ2UgdmVyc2lvbiBjb250cm9sXHJcbiAgICAgICAgICBzd2l0Y2godXBncmFkZURiLm9sZFZlcnNpb24pIHtcclxuICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgIC8vIHNldCB1cCBhIGtleSB0aGF0J3Mgc2VwYXJhdGUgdG8gdGhlIGRhdGFcclxuICAgICAgICAgICAgICAgICAgdmFyIG13c0RhdGFTdG9yZSA9IHVwZ3JhZGVEYi5jcmVhdGVPYmplY3RTdG9yZSgnbXdzRGF0YScsIHtrZXlQYXRoOiAnaWQnfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0pOyAgXHJcbiAgICAgIFxyXG4gICAgICAvLyBQVVQgREFUQSBJTlRPIERBVEFCQVNFOiBjcmVhdGUgYSBmZXRjaCBldmVudCB0byBwdWxsIHRoZSBkYXRhIGZyb20gdGhlIHNlcnZlclxyXG4gICAgICAvLyBzZWUgaWRiLXRlc3RfaW5kZXguanMgXHJcblxyXG4gICAgICAvLyBQVUxMIERBVEEgT1VUIE9GIERBVEFCQVNFOiBnZXQgYWxsIG1hdGNoZWQgUmVzdGF1cmFudHNcclxuICAgICAgZnVuY3Rpb24gZ2V0RGF0YU1hdGNoZWRSZXN0YXVyYW50cyAoKSB7XHJcbiAgICAgICAgZGJQcm9taXNlLnRoZW4oZnVuY3Rpb24oZGIpIHtcclxuICAgICAgICAgIHZhciB0eCA9IGRiLnRyYW5zYWN0aW9uKCdtd3NEYXRhJywgJ3JlYWRvbmx5Jyk7XHJcbiAgICAgICAgICB2YXIgc3RvcmUgPSB0eC5vYmplY3RTdG9yZSgnbXdzRGF0YScpO1xyXG4gICAgICAgICAgcmV0dXJuIHN0b3JlLmdldEFsbCgpO1xyXG4gICAgICAgIH0pLnRoZW4oZmV0Y2hNYXRjaGVkUmVzdGF1cmFudHMpXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgLy8gaWYgdGhlcmUncyBhIHNlcnZpY2Ugd29ya2VyLCBwdWxsIHRoZSBkYXRhIG91dCBvZiBJbmRleGVkREJcclxuICAgICAgZ2V0RGF0YU1hdGNoZWRSZXN0YXVyYW50cygpO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAvLyBmZXRjaCBldmVudHMgZm9yIGJyb3dzZXJzIHRoYXQgZG8gbm90IGhhdmUgc2VydmljZSB3b3JrZXJzXHJcbiAgICAgIFxyXG4gICAgICAvLyBtYXRjaGVkIHJlc3RhdXJhbnRzXHJcbiAgICAgIGZldGNoKERCSGVscGVyLkRBVEFCQVNFX1VSTCwge30pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICB9KS50aGVuKGZldGNoUmVzdGF1cmFudHNBbGwpXHJcbiAgICAgIC50aGVuKGZldGNoTWF0Y2hlZFJlc3RhdXJhbnRzKVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xyXG5cclxuICAgIH1cclxuICBcclxuXHJcbiAgXHJcbiAgZnVuY3Rpb24gZmV0Y2hNYXRjaGVkUmVzdGF1cmFudHMgKGRhdGEpIHtcclxuICAgIGNvbnN0IHJlc3RhdXJhbnRzID0gZGF0YTtcclxuICAgIGxldCByZXN1bHRzID0gcmVzdGF1cmFudHM7XHJcblxyXG4gICAgaWYgKGN1aXNpbmUgIT0gJ2FsbCcpIHsgLy8gZmlsdGVyIGJ5IGN1aXNpbmVcclxuICAgICAgcmVzdWx0cyA9IHJlc3VsdHMuZmlsdGVyKHIgPT4gci5jdWlzaW5lX3R5cGUgPT0gY3Vpc2luZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG5laWdoYm9yaG9vZCAhPSAnYWxsJykgeyAvLyBmaWx0ZXIgYnkgbmVpZ2hib3Job29kXHJcbiAgICAgIHJlc3VsdHMgPSByZXN1bHRzLmZpbHRlcihyID0+IHIubmVpZ2hib3Job29kID09IG5laWdoYm9yaG9vZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRSZXN0YXVyYW50cyhyZXN1bHRzKTtcclxuICAgIGZpbGxSZXN0YXVyYW50c0hUTUwoKTtcclxuICAgIHJldHVybiByZXN1bHRzO1xyXG4gIH1cclxuICBcclxuICAvKiBzZXQgc2VsZWN0ZWQgYXR0cmlidXRlICovXHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY09wdGlvbi5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKGNPcHRpb25baV0uZ2V0QXR0cmlidXRlKCd2YWx1ZScpID09IGN1aXNpbmUpIHtcclxuICAgICAgY09wdGlvbltpXS5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJycpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY09wdGlvbltpXS5yZW1vdmVBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IG5PcHRpb24ubGVuZ3RoOyBpKyspIHtcclxuICAgIGlmIChuT3B0aW9uW2ldLmdldEF0dHJpYnV0ZSgndmFsdWUnKSA9PSBuZWlnaGJvcmhvb2QpIHtcclxuICAgICAgbk9wdGlvbltpXS5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJycpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbk9wdGlvbltpXS5yZW1vdmVBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG59XHJcblxyXG4vKipcclxuICogQ2xlYXIgY3VycmVudCByZXN0YXVyYW50cywgdGhlaXIgSFRNTCBhbmQgcmVtb3ZlIHRoZWlyIG1hcCBtYXJrZXJzLlxyXG4gKi9cclxuY29uc3QgcmVzZXRSZXN0YXVyYW50cyA9IChyZXN0YXVyYW50cykgPT4ge1xyXG4gIC8vIFJlbW92ZSBhbGwgcmVzdGF1cmFudHNcclxuICBzZWxmLnJlc3RhdXJhbnRzID0gW107XHJcbiAgY29uc3QgdWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdGF1cmFudHMtbGlzdCcpO1xyXG4gIHVsLmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAvLyBSZW1vdmUgYWxsIG1hcCBtYXJrZXJzXHJcbiAgc2VsZi5tYXJrZXJzLmZvckVhY2gobSA9PiBtLnNldE1hcChudWxsKSk7XHJcbiAgc2VsZi5tYXJrZXJzID0gW107XHJcbiAgc2VsZi5yZXN0YXVyYW50cyA9IHJlc3RhdXJhbnRzO1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGFsbCByZXN0YXVyYW50cyBIVE1MIGFuZCBhZGQgdGhlbSB0byB0aGUgd2VicGFnZS5cclxuICovXHJcbmNvbnN0IGZpbGxSZXN0YXVyYW50c0hUTUwgPSAocmVzdGF1cmFudHMgPSBzZWxmLnJlc3RhdXJhbnRzKSA9PiB7XHJcbiAgY29uc3QgdWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdGF1cmFudHMtbGlzdCcpO1xyXG4gIHJlc3RhdXJhbnRzLmZvckVhY2gocmVzdGF1cmFudCA9PiB7XHJcbiAgICB1bC5hcHBlbmQoY3JlYXRlUmVzdGF1cmFudEhUTUwocmVzdGF1cmFudCkpO1xyXG4gIH0pO1xyXG4gIGFkZE1hcmtlcnNUb01hcCgpO1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIHJlc3RhdXJhbnQgSFRNTC5cclxuICovXHJcbmNvbnN0IGNyZWF0ZVJlc3RhdXJhbnRIVE1MID0gKHJlc3RhdXJhbnQpID0+IHtcclxuICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblxyXG4gIGNvbnN0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgaW1hZ2UuY2xhc3NOYW1lID0gJ3Jlc3RhdXJhbnQtaW1nJztcclxuICBpbWFnZS5zcmMgPSBEQkhlbHBlci5pbWFnZVVybEZvclJlc3RhdXJhbnQocmVzdGF1cmFudCk7XHJcbiAgaW1hZ2Uuc2V0QXR0cmlidXRlKCdhbHQnLCAncHJvbW90aW9uYWwgcGhvdG8gZm9yICcgKyByZXN0YXVyYW50Lm5hbWUpO1xyXG4gIGxpLmFwcGVuZChpbWFnZSk7XHJcblxyXG4gIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xyXG4gIG5hbWUuaW5uZXJIVE1MID0gcmVzdGF1cmFudC5uYW1lO1xyXG4gIGxpLmFwcGVuZChuYW1lKTtcclxuXHJcbiAgY29uc3QgbmVpZ2hib3Job29kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gIG5laWdoYm9yaG9vZC5pbm5lckhUTUwgPSByZXN0YXVyYW50Lm5laWdoYm9yaG9vZDtcclxuICBsaS5hcHBlbmQobmVpZ2hib3Job29kKTtcclxuXHJcbiAgY29uc3QgYWRkcmVzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICBhZGRyZXNzLmlubmVySFRNTCA9IHJlc3RhdXJhbnQuYWRkcmVzcztcclxuICBsaS5hcHBlbmQoYWRkcmVzcyk7XHJcblxyXG4gIGNvbnN0IG1vcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgbW9yZS5pbm5lckhUTUwgPSAnVmlldyBEZXRhaWxzJztcclxuICBtb3JlLmhyZWYgPSBEQkhlbHBlci51cmxGb3JSZXN0YXVyYW50KHJlc3RhdXJhbnQpO1xyXG4gIG1vcmUuc2V0QXR0cmlidXRlKCduYW1lJywgJ1ZpZXcgZGV0YWlscyBmb3IgJyArIHJlc3RhdXJhbnQubmFtZSk7XHJcbiAgbW9yZS5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnYnV0dG9uJyk7XHJcbiAgbGkuYXBwZW5kKG1vcmUpO1xyXG5cclxuICByZXR1cm4gbGlcclxufVxyXG5cclxuXHJcblxyXG4vKipcclxuICogQWRkIG1hcmtlcnMgZm9yIGN1cnJlbnQgcmVzdGF1cmFudHMgdG8gdGhlIG1hcC5cclxuICovXHJcbmNvbnN0IGFkZE1hcmtlcnNUb01hcCA9IChyZXN0YXVyYW50cyA9IHNlbGYucmVzdGF1cmFudHMpID0+IHtcclxuICByZXN0YXVyYW50cy5mb3JFYWNoKHJlc3RhdXJhbnQgPT4ge1xyXG4gICAgLy8gQWRkIG1hcmtlciB0byB0aGUgbWFwXHJcbiAgICBjb25zdCBtYXJrZXIgPSBEQkhlbHBlci5tYXBNYXJrZXJGb3JSZXN0YXVyYW50KHJlc3RhdXJhbnQsIHNlbGYubWFwKTtcclxuICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IG1hcmtlci51cmxcclxuICAgIH0pO1xyXG4gICAgc2VsZi5tYXJrZXJzLnB1c2gobWFya2VyKTtcclxuICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRvZ2dsZSBmb3IgaGFtYnVyZ2VyIGljb25cclxuICovXHJcblxyXG5idXJnZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgIGRyYXdlci5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuJyk7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG59KTtcclxuXHJcblxyXG4vKipcclxuICogalF1ZXJ5IGZvciBHb29nbGUgQVBJXHJcbiAqIHJlZmVyZW5jZTogaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vZGVyem9ybmdvdHRlcy8zYjU3ZWRjMWY5OTZkZGRjYWIyNVxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIGFkZEFwaUtleSgpIHtcclxuXHJcbiAgaWYgKGtleSA9PSAnJykge1xyXG4gICAgdmFyIGFwaUtleSA9ICcnO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB2YXIgYXBpS2V5ID0gJ2tleT0nICsgY29uZmlnLmdvb2dsZU1hcEFwaSArICcmJztcclxuICB9XHJcblxyXG4gIC8vIGNvbnNvbGUubG9nKCdrZXk6ICcgKyBrZXkpO1xyXG4gIC8vIGNvbnNvbGUubG9nKCdhcGlLZXk6ICcgKyBhcGlLZXkpO1xyXG4gIFxyXG4gIHZhciBwYXRoU3RhcnQgPSAnaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2pzPyc7XHJcbiAgdmFyIHBhdGhFbmQgPSAnbGlicmFyaWVzPXBsYWNlcyZjYWxsYmFjaz1pbml0TWFwJztcclxuICBcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ29vZ2xlQXBpJykuc2V0QXR0cmlidXRlKCdzcmMnLCBwYXRoU3RhcnQgKyBhcGlLZXkgKyBwYXRoRW5kKTtcclxuICAvKmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb250QXdlc29tZScpLnNldEF0dHJpYnV0ZSgnc3JjJywgZm9udEF3ZXNvbWUpOyovXHJcbn1cclxuXHJcbi8qXHJcbiQoIGRvY3VtZW50ICkucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgY29uc29sZS5sb2coIFwicmVhZHkhXCIgKTtcclxuICBhZGRBcGlLZXkoKTtcclxufSk7XHJcbiovXHJcblxyXG4vLyB0byBpbXByb3ZlIGF1ZGl0IHNjb3JlLCBkZXByZWNhdGUgalF1ZXJ5XHJcbi8vIG1ldGhvZCBjcmVkaXQ6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzIzMDQ5NDEvd2hhdC1pcy10aGUtbm9uLWpxdWVyeS1lcXVpdmFsZW50LW9mLWRvY3VtZW50LXJlYWR5XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcclxuICBjb25zb2xlLmxvZyhcInJlYWR5IVwiKTtcclxuICBhZGRBcGlLZXkoKTtcclxufSk7XHJcblxyXG4iXX0=
