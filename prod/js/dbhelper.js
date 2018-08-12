"use strict";var _createClass=function(){function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var DBHelper=function(){function r(){_classCallCheck(this,r)}return _createClass(r,null,[{key:"urlForRestaurant",value:function(e){return"./restaurant.html?id="+e.id}},{key:"imageUrlForRestaurant",value:function(e){return e.photograph?"/img/"+e.photograph+".jp2":"/img/"+e.id+".jp2"}},{key:"mapMarkerForRestaurant",value:function(e,t){return new google.maps.Marker({position:e.latlng,title:e.name,url:r.urlForRestaurant(e),map:t,animation:google.maps.Animation.DROP})}},{key:"DATABASE_URL",get:function(){return"http://localhost:1337/restaurants"}}]),r}();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRiaGVscGVyLmpzIl0sIm5hbWVzIjpbIkRCSGVscGVyIiwicmVzdGF1cmFudCIsImlkIiwicGhvdG9ncmFwaCIsIm1hcCIsImdvb2dsZSIsIm1hcHMiLCJNYXJrZXIiLCJwb3NpdGlvbiIsImxhdGxuZyIsInRpdGxlIiwibmFtZSIsInVybCIsInVybEZvclJlc3RhdXJhbnQiLCJhbmltYXRpb24iLCJBbmltYXRpb24iLCJEUk9QIl0sIm1hcHBpbmdzIjoiaVlBR01BLDRIQTBCb0JDLEdBSHhCLE1BQUEsd0JBQUFBLEVBQUFDLGlEQVU2QkQsR0FIN0IsT0FBQUEsRUFBQUUsV0FLSSxRQUFnQkYsRUFBV0UsV0FBM0IsT0FFQSxRQUFnQkYsRUFBV0MsR0FBM0Isc0RBQ0RELEVBQUFHLEdBZUQsT0FiRCxJQUFBQyxPQUFBQyxLQUFBQyxPQUFBLENBT0dDLFNBQVVQLEVBQVdRLE9BTHpCQyxNQUFBVCxFQUFBVSxLQU9JQyxJQUFLWixFQUFTYSxpQkFBaUJaLEdBQy9CRyxJQUFLQSxFQUNMVSxVQUFXVCxPQUFPQyxLQUFLUyxVQUFVQyw0Q0EzQ25DLE1BQUEiLCJmaWxlIjoiZGJoZWxwZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ29tbW9uIGRhdGFiYXNlIGhlbHBlciBmdW5jdGlvbnMuXHJcbiAqL1xyXG5jbGFzcyBEQkhlbHBlciB7XHJcblxyXG4gIC8qKlxyXG4gICAqIERhdGFiYXNlIFVSTC5cclxuICAgKiBDaGFuZ2UgdGhpcyB0byByZXN0YXVyYW50cy5qc29uIGZpbGUgbG9jYXRpb24gb24geW91ciBzZXJ2ZXIuXHJcbiAgICovXHJcbiAgc3RhdGljIGdldCBEQVRBQkFTRV9VUkwoKSB7XHJcbiAgICBjb25zdCBwb3J0ID0gMTMzNyAvLyBDaGFuZ2UgdGhpcyB0byB5b3VyIHNlcnZlciBwb3J0XHJcbiAgICByZXR1cm4gYGh0dHA6Ly9sb2NhbGhvc3Q6JHtwb3J0fS9yZXN0YXVyYW50c2A7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGdW5jdGlvbnMgZGVwcmVjYXRlZCBpbiBmYXZvciBvZiBmZXRjaCBBUEk6XHJcbiAgICogKDEpIEZldGNoIGFsbCByZXN0YXVyYW50czogZmV0Y2hSZXN0YXVyYW50cygpXHJcbiAgICogKDIpIEZldGNoIGEgcmVzdGF1cmFudCBieSBpdHMgSUQ6IGZldGNoUmVzdGF1cmFudEJ5SWQoKVxyXG4gICAqICgzKSBGZXRjaCByZXN0YXVyYW50cyBieSBhIGN1aXNpbmUgdHlwZSB3aXRoIHByb3BlciBlcnJvciBoYW5kbGluZzogZmV0Y2hSZXN0YXVyYW50QnlDdWlzaW5lKClcclxuICAgKiAoNCkgRmV0Y2ggcmVzdGF1cmFudHMgYnkgYSBuZWlnaGJvcmhvb2Qgd2l0aCBwcm9wZXIgZXJyb3IgaGFuZGxpbmc6IGZldGNoUmVzdGF1cmFudEJ5TmVpZ2hib3Job29kKClcclxuICAgKiAoNSkgRmV0Y2ggcmVzdGF1cmFudHMgYnkgYSBjdWlzaW5lIGFuZCBhIG5laWdoYm9yaG9vZCB3aXRoIHByb3BlciBlcnJvciBoYW5kbGluZzogZmV0Y2hSZXN0YXVyYW50QnlDdWlzaW5lQW5kTmVpZ2hib3Job29kKClcclxuICAgKiAoNikgRmV0Y2ggYWxsIG5laWdoYm9yaG9vZHMgd2l0aCBwcm9wZXIgZXJyb3IgaGFuZGxpbmc6IGZldGNoTmVpZ2hib3Job29kcygpXHJcbiAgICogKDcpIEZldGNoIGFsbCBjdWlzaW5lcyB3aXRoIHByb3BlciBlcnJvciBoYW5kbGluZzogZmV0Y2hDdWlzaW5lcygpXHJcbiAgICogc2VlIG1haW4uanMgYW5kIHJlc3RhdXJhbnRfaW5mby5qcyBmb3IgdXBkYXRlZCBmZXRjaCBBUEkgY29kZS5cclxuICAgKi9cclxuXHJcbiAgLyoqXHJcbiAgICogUmVzdGF1cmFudCBwYWdlIFVSTC5cclxuICAgKi9cclxuICBzdGF0aWMgdXJsRm9yUmVzdGF1cmFudChyZXN0YXVyYW50KSB7XHJcbiAgICByZXR1cm4gKGAuL3Jlc3RhdXJhbnQuaHRtbD9pZD0ke3Jlc3RhdXJhbnQuaWR9YCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXN0YXVyYW50IGltYWdlIFVSTC5cclxuICAgKi9cclxuICBzdGF0aWMgaW1hZ2VVcmxGb3JSZXN0YXVyYW50KHJlc3RhdXJhbnQpIHtcclxuICAgIGlmIChyZXN0YXVyYW50LnBob3RvZ3JhcGgpIHtcclxuICAgICAgcmV0dXJuIChgL2ltZy8ke3Jlc3RhdXJhbnQucGhvdG9ncmFwaH0uanAyYCk7IC8vIGFkZGVkIC5qcGcgZXh0ZW5zaW9uIHRvIHBhdGg7IHVwZGF0ZWQgdG8gLnBuZyA4LzQvMjAxOFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIChgL2ltZy8ke3Jlc3RhdXJhbnQuaWR9LmpwMmApIC8vIGFzc3VtZXMgSUQgYW5kIHBob3RvZ3JhcGggbnVtYmVyIGFyZSBlcXVhbDsgdXBkYXRlZCB0byAucG5nIDgvNC8yMDE4XHJcbiAgICB9XHJcbiAgICBcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hcCBtYXJrZXIgZm9yIGEgcmVzdGF1cmFudC5cclxuICAgKi9cclxuICBzdGF0aWMgbWFwTWFya2VyRm9yUmVzdGF1cmFudChyZXN0YXVyYW50LCBtYXApIHtcclxuICAgIGNvbnN0IG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICBwb3NpdGlvbjogcmVzdGF1cmFudC5sYXRsbmcsXHJcbiAgICAgIHRpdGxlOiByZXN0YXVyYW50Lm5hbWUsXHJcbiAgICAgIHVybDogREJIZWxwZXIudXJsRm9yUmVzdGF1cmFudChyZXN0YXVyYW50KSxcclxuICAgICAgbWFwOiBtYXAsXHJcbiAgICAgIGFuaW1hdGlvbjogZ29vZ2xlLm1hcHMuQW5pbWF0aW9uLkRST1B9XHJcbiAgICApO1xyXG4gICAgcmV0dXJuIG1hcmtlcjtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==
