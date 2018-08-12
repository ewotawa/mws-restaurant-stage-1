"use strict";console.log("idb.js"),function(){function u(n){return new Promise(function(e,t){n.onsuccess=function(){e(n.result)},n.onerror=function(){t(n.error)}})}function i(n,o,r){var i,e=new Promise(function(e,t){u(i=n[o].apply(n,r)).then(e,t)});return e.request=i,e}function e(e,n,t){t.forEach(function(t){Object.defineProperty(e.prototype,t,{get:function(){return this[n][t]},set:function(e){this[n][t]=e}})})}function t(t,n,o,e){e.forEach(function(e){e in o.prototype&&(t.prototype[e]=function(){return i(this[n],e,arguments)})})}function n(t,n,o,e){e.forEach(function(e){e in o.prototype&&(t.prototype[e]=function(){return this[n][e].apply(this[n],arguments)})})}function o(e,o,t,n){n.forEach(function(n){n in t.prototype&&(e.prototype[n]=function(){return e=this[o],(t=i(e,n,arguments)).then(function(e){if(e)return new c(e,t.request)});var e,t})})}function r(e){this._index=e}function c(e,t){this._cursor=e,this._request=t}function s(e){this._store=e}function p(n){this._tx=n,this.complete=new Promise(function(e,t){n.oncomplete=function(){e()},n.onerror=function(){t(n.error)},n.onabort=function(){t(n.error)}})}function a(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new p(n)}function f(e){this._db=e}e(r,"_index",["name","keyPath","multiEntry","unique"]),t(r,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),o(r,"_index",IDBIndex,["openCursor","openKeyCursor"]),e(c,"_cursor",["direction","key","primaryKey","value"]),t(c,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach(function(n){n in IDBCursor.prototype&&(c.prototype[n]=function(){var t=this,e=arguments;return Promise.resolve().then(function(){return t._cursor[n].apply(t._cursor,e),u(t._request).then(function(e){if(e)return new c(e,t._request)})})})}),s.prototype.createIndex=function(){return new r(this._store.createIndex.apply(this._store,arguments))},s.prototype.index=function(){return new r(this._store.index.apply(this._store,arguments))},e(s,"_store",["name","keyPath","indexNames","autoIncrement"]),t(s,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),o(s,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),n(s,"_store",IDBObjectStore,["deleteIndex"]),p.prototype.objectStore=function(){return new s(this._tx.objectStore.apply(this._tx,arguments))},e(p,"_tx",["objectStoreNames","mode"]),n(p,"_tx",IDBTransaction,["abort"]),a.prototype.createObjectStore=function(){return new s(this._db.createObjectStore.apply(this._db,arguments))},e(a,"_db",["name","version","objectStoreNames"]),n(a,"_db",IDBDatabase,["deleteObjectStore","close"]),f.prototype.transaction=function(){return new p(this._db.transaction.apply(this._db,arguments))},e(f,"_db",["name","version","objectStoreNames"]),n(f,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach(function(i){[s,r].forEach(function(e){i in e.prototype&&(e.prototype[i.replace("open","iterate")]=function(){var e,t=(e=arguments,Array.prototype.slice.call(e)),n=t[t.length-1],o=this._store||this._index,r=o[i].apply(o,t.slice(0,-1));r.onsuccess=function(){n(r.result)}})})}),[r,s].forEach(function(e){e.prototype.getAll||(e.prototype.getAll=function(e,n){var o=this,r=[];return new Promise(function(t){o.iterateCursor(e,function(e){e?(r.push(e.value),void 0===n||r.length!=n?e.continue():t(r)):t(r)})})})});var l={open:function(e,t,n){var o=i(indexedDB,"open",[e,t]),r=o.request;return r&&(r.onupgradeneeded=function(e){n&&n(new a(r.result,e.oldVersion,r.transaction))}),o.then(function(e){return new f(e)})},delete:function(e){return i(indexedDB,"deleteDatabase",[e])}};"undefined"!=typeof module?(module.exports=l,module.exports.default=module.exports):self.idb=l}();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkYi5qcyJdLCJuYW1lcyI6WyJjb25zb2xlIiwibG9nIiwicHJvbWlzaWZ5UmVxdWVzdCIsInJlcXVlc3QiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlc3VsdCIsIm9uZXJyb3IiLCJlcnJvciIsInByb21pc2lmeVJlcXVlc3RDYWxsIiwib2JqIiwibWV0aG9kIiwiYXJncyIsInAiLCJhcHBseSIsInRoZW4iLCJwcm94eVByb3BlcnRpZXMiLCJQcm94eUNsYXNzIiwidGFyZ2V0UHJvcCIsInByb3BlcnRpZXMiLCJmb3JFYWNoIiwicHJvcCIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5Iiwic2V0IiwidGhpcyIsInZhbCIsInByb3h5UmVxdWVzdE1ldGhvZHMiLCJDb25zdHJ1Y3RvciIsInByb3RvdHlwZSIsImFyZ3VtZW50cyIsInByb3h5TWV0aG9kcyIsInByb3h5Q3Vyc29yUmVxdWVzdE1ldGhvZHMiLCJwcm9taXNpZnlDdXJzb3JSZXF1ZXN0Q2FsbCIsIkN1cnNvciIsInZhbHVlIiwiSW5kZXgiLCJpbmRleCIsIl9pbmRleCIsIm1ldGhvZE5hbWUiLCJfY3Vyc29yIiwiY3Vyc29yIiwiX3JlcXVlc3QiLCJUcmFuc2FjdGlvbiIsImlkYlRyYW5zYWN0aW9uIiwiX3R4IiwiREIiLCJ0cmFuc2FjdGlvbiIsImNvbXBsZXRlIiwiX2RiIiwib25jb21wbGV0ZSIsIklEQkRhdGFiYXNlIiwib25hYm9ydCIsIlVwZ3JhZGVEQiIsImRiIiwib2xkVmVyc2lvbiIsIk9iamVjdFN0b3JlIiwiZ2V0QWxsIiwiSURCSW5kZXgiLCJJREJDdXJzb3IiLCJfc3RvcmUiLCJjcmVhdGVJbmRleCIsIklEQk9iamVjdFN0b3JlIiwib2JqZWN0U3RvcmUiLCJmdW5jTmFtZSIsIm5hdGl2ZU9iamVjdCIsIklEQlRyYW5zYWN0aW9uIiwiY3JlYXRlT2JqZWN0U3RvcmUiLCJpdGVtcyIsIm9wZW4iLCJuYW1lIiwidmVyc2lvbiIsInVwZ3JhZGVDYWxsYmFjayIsImRlbGV0ZSIsInJlcGxhY2UiLCJhcnIiLCJBcnJheSIsInNsaWNlIiwiY2FsbCIsImV4cG9ydHMiLCJleHAiLCJsZW5ndGgiLCJtb2R1bGUiLCJzZWxmIiwiY2FsbGJhY2siLCJxdWVyeSIsImNvdW50IiwiaW5zdGFuY2UiLCJpdGVyYXRlQ3Vyc29yIiwicHVzaCIsInVuZGVmaW5lZCIsImNvbnRpbnVlIiwiaW5kZXhlZERCIiwib251cGdyYWRlbmVlZGVkIiwiZXZlbnQiLCJkZWZhdWx0IiwiaWRiIl0sIm1hcHBpbmdzIjoiYUFRQ0EsUUFBUUMsSUFBSSxVQUViLFdBS0csU0FBQUMsRUFBQUMsR0FHQyxPQUFPLElBQUlDLFFBQVEsU0FBU0MsRUFBU0MsR0FEdkNILEVBQVNELFVBQUFBLFdBQ1BHLEVBQVdELEVBQVFHLFNBR2hCSixFQUZESyxRQUFBLFdBS0VGLEVBQU9ILEVBQVFNLFVBR3BCLFNBQUFDLEVBQUFDLEVBQUFDLEVBQUFDLEdBR0MsSUFBSVYsRUFETlcsRUFBU0osSUFBQUEsUUFBQUEsU0FBcUJDLEVBQUtDLEdBRWpDVixFQURBQyxFQUFBUSxFQUFBQyxHQUFBRyxNQUFBSixFQUFBRSxJQUNvQkcsS0FBU1gsRUFBU0MsS0FNdEMsT0FIQ1EsRUFIRFgsUUFBQUEsRUFNT1csRUFTUixTQUFBRyxFQUFBQyxFQUFBQyxFQUFBQyxHQUdDQSxFQUFXQyxRQUFRLFNBQVNDLEdBRDlCQyxPQUFTTixlQUFnQkMsRUFBWUMsVUFBckNHLEVBQWlERixDQUMvQ0EsSUFBQUEsV0FDRUcsT0FBT0MsS0FBQUEsR0FBZU4sSUFFbEJPLElBQUEsU0FBWU4sR0FGa0NPLEtBQUFQLEdBQUFHLEdBQUFLLE9BU3JELFNBQUFDLEVBQUFWLEVBQUFDLEVBQUFVLEVBQUFULEdBR0NBLEVBQVdDLFFBQVEsU0FBU0MsR0FEckJNLEtBQUFBLEVBQW9CVixZQUMzQkUsRUFBV0MsVUFBUUMsR0FBU0EsV0FDMUIsT0FBTUEsRUFBb0JRLEtBQXRCWCxHQUFrQ0csRUFBQVMsZUFLekMsU0FBQUMsRUFBQWQsRUFBQUMsRUFBQVUsRUFB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LEdBQ2hDQSxFQUFZQyxVQUFVNEIsU0FDMUI3QixFQUFZQyxVQUFVNEIsT0FBUyxTQUFTNEIsRUFBT0MsR0FDN0MsSUFBSUMsRUFBVzlELEtBQ1gyQyxFQUFRLEdBRVosT0FBTyxJQUFJakUsUUFBUSxTQUFTQyxHQUMxQm1GLEVBQVNDLGNBQWNILEVBQU8sU0FBUzVDLEdBQ2hDQSxHQUlMMkIsRUFBTXFCLEtBQUtoRCxFQUFPTixZQUVKdUQsSUFBVkosR0FBdUJsQixFQUFNYSxRQUFVSyxFQUkzQzdDLEVBQU9rRCxXQUhMdkYsRUFBUWdFLElBTlJoRSxFQUFRZ0UsV0FlbEIsSUFBSVksRUFBTSxDQUNSWCxLQUFNLFNBQVNDLEVBQU1DLEVBQVNDLEdBQzVCLElBQUkzRCxFQUFJSixFQUFxQm1GLFVBQVcsT0FBUSxDQUFDdEIsRUFBTUMsSUFDbkRyRSxFQUFVVyxFQUFFWCxRQVVoQixPQVJJQSxJQUNGQSxFQUFRMkYsZ0JBQWtCLFNBQVNDLEdBQzdCdEIsR0FDRkEsRUFBZ0IsSUFBSW5CLEVBQVVuRCxFQUFRSSxPQUFRd0YsRUFBTXZDLFdBQVlyRCxFQUFRNkMsZ0JBS3ZFbEMsRUFBRUUsS0FBSyxTQUFTdUMsR0FDckIsT0FBTyxJQUFJUixFQUFHUSxNQUdsQm1CLE9BQVEsU0FBU0gsR0FDZixPQUFPN0QsRUFBcUJtRixVQUFXLGlCQUFrQixDQUFDdEIsTUFJeEMsb0JBQVhZLFFBQ1RBLE9BQU9ILFFBQVVDLEVBQ2pCRSxPQUFPSCxRQUFRZ0IsUUFBVWIsT0FBT0gsU0FHaENJLEtBQUthLElBQU1oQixFQXpUZiIsImZpbGUiOiJpZGIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGluY2x1ZGluZyBpZGIgbGlicmFyeSBoZXJlIHRvIHB1dCBpZGIgaW4gdGhlIGdsb2JhbCBzY29wZTpcbiAqIFNvdXJjZTpcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9qYWtlYXJjaGliYWxkL2lkYi9ibG9iL21hc3Rlci9saWIvaWRiLmpzXG4gKiBSZWFkbWU6XG4gKiBodHRwczovL2dpYmh1Yi5jb20vamFrZWFyY2hpYmFsZC9pZGIvYmxvYi9tYXN0ZXIvUkVBRE1FLm1kXG4gKi9cblxuIGNvbnNvbGUubG9nKCdpZGIuanMnKTtcblxuJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIHRvQXJyYXkoYXJyKSB7XG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFycik7XG4gIH1cblxuICBmdW5jdGlvbiBwcm9taXNpZnlSZXF1ZXN0KHJlcXVlc3QpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXNvbHZlKHJlcXVlc3QucmVzdWx0KTtcbiAgICAgIH07XG5cbiAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QocmVxdWVzdC5lcnJvcik7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJvbWlzaWZ5UmVxdWVzdENhbGwob2JqLCBtZXRob2QsIGFyZ3MpIHtcbiAgICB2YXIgcmVxdWVzdDtcbiAgICB2YXIgcCA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgcmVxdWVzdCA9IG9ialttZXRob2RdLmFwcGx5KG9iaiwgYXJncyk7XG4gICAgICBwcm9taXNpZnlSZXF1ZXN0KHJlcXVlc3QpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICB9KTtcblxuICAgIHAucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgcmV0dXJuIHA7XG4gIH1cblxuICBmdW5jdGlvbiBwcm9taXNpZnlDdXJzb3JSZXF1ZXN0Q2FsbChvYmosIG1ldGhvZCwgYXJncykge1xuICAgIHZhciBwID0gcHJvbWlzaWZ5UmVxdWVzdENhbGwob2JqLCBtZXRob2QsIGFyZ3MpO1xuICAgIHJldHVybiBwLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIGlmICghdmFsdWUpIHJldHVybjtcbiAgICAgIHJldHVybiBuZXcgQ3Vyc29yKHZhbHVlLCBwLnJlcXVlc3QpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJveHlQcm9wZXJ0aWVzKFByb3h5Q2xhc3MsIHRhcmdldFByb3AsIHByb3BlcnRpZXMpIHtcbiAgICBwcm9wZXJ0aWVzLmZvckVhY2goZnVuY3Rpb24ocHJvcCkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFByb3h5Q2xhc3MucHJvdG90eXBlLCBwcm9wLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNbdGFyZ2V0UHJvcF1bcHJvcF07XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgdGhpc1t0YXJnZXRQcm9wXVtwcm9wXSA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBwcm94eVJlcXVlc3RNZXRob2RzKFByb3h5Q2xhc3MsIHRhcmdldFByb3AsIENvbnN0cnVjdG9yLCBwcm9wZXJ0aWVzKSB7XG4gICAgcHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uKHByb3ApIHtcbiAgICAgIGlmICghKHByb3AgaW4gQ29uc3RydWN0b3IucHJvdG90eXBlKSkgcmV0dXJuO1xuICAgICAgUHJveHlDbGFzcy5wcm90b3R5cGVbcHJvcF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3RDYWxsKHRoaXNbdGFyZ2V0UHJvcF0sIHByb3AsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJveHlNZXRob2RzKFByb3h5Q2xhc3MsIHRhcmdldFByb3AsIENvbnN0cnVjdG9yLCBwcm9wZXJ0aWVzKSB7XG4gICAgcHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uKHByb3ApIHtcbiAgICAgIGlmICghKHByb3AgaW4gQ29uc3RydWN0b3IucHJvdG90eXBlKSkgcmV0dXJuO1xuICAgICAgUHJveHlDbGFzcy5wcm90b3R5cGVbcHJvcF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbdGFyZ2V0UHJvcF1bcHJvcF0uYXBwbHkodGhpc1t0YXJnZXRQcm9wXSwgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBwcm94eUN1cnNvclJlcXVlc3RNZXRob2RzKFByb3h5Q2xhc3MsIHRhcmdldFByb3AsIENvbnN0cnVjdG9yLCBwcm9wZXJ0aWVzKSB7XG4gICAgcHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uKHByb3ApIHtcbiAgICAgIGlmICghKHByb3AgaW4gQ29uc3RydWN0b3IucHJvdG90eXBlKSkgcmV0dXJuO1xuICAgICAgUHJveHlDbGFzcy5wcm90b3R5cGVbcHJvcF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeUN1cnNvclJlcXVlc3RDYWxsKHRoaXNbdGFyZ2V0UHJvcF0sIHByb3AsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gSW5kZXgoaW5kZXgpIHtcbiAgICB0aGlzLl9pbmRleCA9IGluZGV4O1xuICB9XG5cbiAgcHJveHlQcm9wZXJ0aWVzKEluZGV4LCAnX2luZGV4JywgW1xuICAgICduYW1lJyxcbiAgICAna2V5UGF0aCcsXG4gICAgJ211bHRpRW50cnknLFxuICAgICd1bmlxdWUnXG4gIF0pO1xuXG4gIHByb3h5UmVxdWVzdE1ldGhvZHMoSW5kZXgsICdfaW5kZXgnLCBJREJJbmRleCwgW1xuICAgICdnZXQnLFxuICAgICdnZXRLZXknLFxuICAgICdnZXRBbGwnLFxuICAgICdnZXRBbGxLZXlzJyxcbiAgICAnY291bnQnXG4gIF0pO1xuXG4gIHByb3h5Q3Vyc29yUmVxdWVzdE1ldGhvZHMoSW5kZXgsICdfaW5kZXgnLCBJREJJbmRleCwgW1xuICAgICdvcGVuQ3Vyc29yJyxcbiAgICAnb3BlbktleUN1cnNvcidcbiAgXSk7XG5cbiAgZnVuY3Rpb24gQ3Vyc29yKGN1cnNvciwgcmVxdWVzdCkge1xuICAgIHRoaXMuX2N1cnNvciA9IGN1cnNvcjtcbiAgICB0aGlzLl9yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIHByb3h5UHJvcGVydGllcyhDdXJzb3IsICdfY3Vyc29yJywgW1xuICAgICdkaXJlY3Rpb24nLFxuICAgICdrZXknLFxuICAgICdwcmltYXJ5S2V5JyxcbiAgICAndmFsdWUnXG4gIF0pO1xuXG4gIHByb3h5UmVxdWVzdE1ldGhvZHMoQ3Vyc29yLCAnX2N1cnNvcicsIElEQkN1cnNvciwgW1xuICAgICd1cGRhdGUnLFxuICAgICdkZWxldGUnXG4gIF0pO1xuXG4gIC8vIHByb3h5ICduZXh0JyBtZXRob2RzXG4gIFsnYWR2YW5jZScsICdjb250aW51ZScsICdjb250aW51ZVByaW1hcnlLZXknXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZE5hbWUpIHtcbiAgICBpZiAoIShtZXRob2ROYW1lIGluIElEQkN1cnNvci5wcm90b3R5cGUpKSByZXR1cm47XG4gICAgQ3Vyc29yLnByb3RvdHlwZVttZXRob2ROYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGN1cnNvciA9IHRoaXM7XG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICBjdXJzb3IuX2N1cnNvclttZXRob2ROYW1lXS5hcHBseShjdXJzb3IuX2N1cnNvciwgYXJncyk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KGN1cnNvci5fcmVxdWVzdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgIGlmICghdmFsdWUpIHJldHVybjtcbiAgICAgICAgICByZXR1cm4gbmV3IEN1cnNvcih2YWx1ZSwgY3Vyc29yLl9yZXF1ZXN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9KTtcblxuICBmdW5jdGlvbiBPYmplY3RTdG9yZShzdG9yZSkge1xuICAgIHRoaXMuX3N0b3JlID0gc3RvcmU7XG4gIH1cblxuICBPYmplY3RTdG9yZS5wcm90b3R5cGUuY3JlYXRlSW5kZXggPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IEluZGV4KHRoaXMuX3N0b3JlLmNyZWF0ZUluZGV4LmFwcGx5KHRoaXMuX3N0b3JlLCBhcmd1bWVudHMpKTtcbiAgfTtcblxuICBPYmplY3RTdG9yZS5wcm90b3R5cGUuaW5kZXggPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IEluZGV4KHRoaXMuX3N0b3JlLmluZGV4LmFwcGx5KHRoaXMuX3N0b3JlLCBhcmd1bWVudHMpKTtcbiAgfTtcblxuICBwcm94eVByb3BlcnRpZXMoT2JqZWN0U3RvcmUsICdfc3RvcmUnLCBbXG4gICAgJ25hbWUnLFxuICAgICdrZXlQYXRoJyxcbiAgICAnaW5kZXhOYW1lcycsXG4gICAgJ2F1dG9JbmNyZW1lbnQnXG4gIF0pO1xuXG4gIHByb3h5UmVxdWVzdE1ldGhvZHMoT2JqZWN0U3RvcmUsICdfc3RvcmUnLCBJREJPYmplY3RTdG9yZSwgW1xuICAgICdwdXQnLFxuICAgICdhZGQnLFxuICAgICdkZWxldGUnLFxuICAgICdjbGVhcicsXG4gICAgJ2dldCcsXG4gICAgJ2dldEFsbCcsXG4gICAgJ2dldEtleScsXG4gICAgJ2dldEFsbEtleXMnLFxuICAgICdjb3VudCdcbiAgXSk7XG5cbiAgcHJveHlDdXJzb3JSZXF1ZXN0TWV0aG9kcyhPYmplY3RTdG9yZSwgJ19zdG9yZScsIElEQk9iamVjdFN0b3JlLCBbXG4gICAgJ29wZW5DdXJzb3InLFxuICAgICdvcGVuS2V5Q3Vyc29yJ1xuICBdKTtcblxuICBwcm94eU1ldGhvZHMoT2JqZWN0U3RvcmUsICdfc3RvcmUnLCBJREJPYmplY3RTdG9yZSwgW1xuICAgICdkZWxldGVJbmRleCdcbiAgXSk7XG5cbiAgZnVuY3Rpb24gVHJhbnNhY3Rpb24oaWRiVHJhbnNhY3Rpb24pIHtcbiAgICB0aGlzLl90eCA9IGlkYlRyYW5zYWN0aW9uO1xuICAgIHRoaXMuY29tcGxldGUgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGlkYlRyYW5zYWN0aW9uLm9uY29tcGxldGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfTtcbiAgICAgIGlkYlRyYW5zYWN0aW9uLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KGlkYlRyYW5zYWN0aW9uLmVycm9yKTtcbiAgICAgIH07XG4gICAgICBpZGJUcmFuc2FjdGlvbi5vbmFib3J0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChpZGJUcmFuc2FjdGlvbi5lcnJvcik7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgVHJhbnNhY3Rpb24ucHJvdG90eXBlLm9iamVjdFN0b3JlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBPYmplY3RTdG9yZSh0aGlzLl90eC5vYmplY3RTdG9yZS5hcHBseSh0aGlzLl90eCwgYXJndW1lbnRzKSk7XG4gIH07XG5cbiAgcHJveHlQcm9wZXJ0aWVzKFRyYW5zYWN0aW9uLCAnX3R4JywgW1xuICAgICdvYmplY3RTdG9yZU5hbWVzJyxcbiAgICAnbW9kZSdcbiAgXSk7XG5cbiAgcHJveHlNZXRob2RzKFRyYW5zYWN0aW9uLCAnX3R4JywgSURCVHJhbnNhY3Rpb24sIFtcbiAgICAnYWJvcnQnXG4gIF0pO1xuXG4gIGZ1bmN0aW9uIFVwZ3JhZGVEQihkYiwgb2xkVmVyc2lvbiwgdHJhbnNhY3Rpb24pIHtcbiAgICB0aGlzLl9kYiA9IGRiO1xuICAgIHRoaXMub2xkVmVyc2lvbiA9IG9sZFZlcnNpb247XG4gICAgdGhpcy50cmFuc2FjdGlvbiA9IG5ldyBUcmFuc2FjdGlvbih0cmFuc2FjdGlvbik7XG4gIH1cblxuICBVcGdyYWRlREIucHJvdG90eXBlLmNyZWF0ZU9iamVjdFN0b3JlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBPYmplY3RTdG9yZSh0aGlzLl9kYi5jcmVhdGVPYmplY3RTdG9yZS5hcHBseSh0aGlzLl9kYiwgYXJndW1lbnRzKSk7XG4gIH07XG5cbiAgcHJveHlQcm9wZXJ0aWVzKFVwZ3JhZGVEQiwgJ19kYicsIFtcbiAgICAnbmFtZScsXG4gICAgJ3ZlcnNpb24nLFxuICAgICdvYmplY3RTdG9yZU5hbWVzJ1xuICBdKTtcblxuICBwcm94eU1ldGhvZHMoVXBncmFkZURCLCAnX2RiJywgSURCRGF0YWJhc2UsIFtcbiAgICAnZGVsZXRlT2JqZWN0U3RvcmUnLFxuICAgICdjbG9zZSdcbiAgXSk7XG5cbiAgZnVuY3Rpb24gREIoZGIpIHtcbiAgICB0aGlzLl9kYiA9IGRiO1xuICB9XG5cbiAgREIucHJvdG90eXBlLnRyYW5zYWN0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbih0aGlzLl9kYi50cmFuc2FjdGlvbi5hcHBseSh0aGlzLl9kYiwgYXJndW1lbnRzKSk7XG4gIH07XG5cbiAgcHJveHlQcm9wZXJ0aWVzKERCLCAnX2RiJywgW1xuICAgICduYW1lJyxcbiAgICAndmVyc2lvbicsXG4gICAgJ29iamVjdFN0b3JlTmFtZXMnXG4gIF0pO1xuXG4gIHByb3h5TWV0aG9kcyhEQiwgJ19kYicsIElEQkRhdGFiYXNlLCBbXG4gICAgJ2Nsb3NlJ1xuICBdKTtcblxuICAvLyBBZGQgY3Vyc29yIGl0ZXJhdG9yc1xuICAvLyBUT0RPOiByZW1vdmUgdGhpcyBvbmNlIGJyb3dzZXJzIGRvIHRoZSByaWdodCB0aGluZyB3aXRoIHByb21pc2VzXG4gIFsnb3BlbkN1cnNvcicsICdvcGVuS2V5Q3Vyc29yJ10uZm9yRWFjaChmdW5jdGlvbihmdW5jTmFtZSkge1xuICAgIFtPYmplY3RTdG9yZSwgSW5kZXhdLmZvckVhY2goZnVuY3Rpb24oQ29uc3RydWN0b3IpIHtcbiAgICAgIC8vIERvbid0IGNyZWF0ZSBpdGVyYXRlS2V5Q3Vyc29yIGlmIG9wZW5LZXlDdXJzb3IgZG9lc24ndCBleGlzdC5cbiAgICAgIGlmICghKGZ1bmNOYW1lIGluIENvbnN0cnVjdG9yLnByb3RvdHlwZSkpIHJldHVybjtcblxuICAgICAgQ29uc3RydWN0b3IucHJvdG90eXBlW2Z1bmNOYW1lLnJlcGxhY2UoJ29wZW4nLCAnaXRlcmF0ZScpXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYXJncyA9IHRvQXJyYXkoYXJndW1lbnRzKTtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdO1xuICAgICAgICB2YXIgbmF0aXZlT2JqZWN0ID0gdGhpcy5fc3RvcmUgfHwgdGhpcy5faW5kZXg7XG4gICAgICAgIHZhciByZXF1ZXN0ID0gbmF0aXZlT2JqZWN0W2Z1bmNOYW1lXS5hcHBseShuYXRpdmVPYmplY3QsIGFyZ3Muc2xpY2UoMCwgLTEpKTtcbiAgICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBjYWxsYmFjayhyZXF1ZXN0LnJlc3VsdCk7XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgIH0pO1xuICB9KTtcblxuICAvLyBwb2x5ZmlsbCBnZXRBbGxcbiAgW0luZGV4LCBPYmplY3RTdG9yZV0uZm9yRWFjaChmdW5jdGlvbihDb25zdHJ1Y3Rvcikge1xuICAgIGlmIChDb25zdHJ1Y3Rvci5wcm90b3R5cGUuZ2V0QWxsKSByZXR1cm47XG4gICAgQ29uc3RydWN0b3IucHJvdG90eXBlLmdldEFsbCA9IGZ1bmN0aW9uKHF1ZXJ5LCBjb3VudCkge1xuICAgICAgdmFyIGluc3RhbmNlID0gdGhpcztcbiAgICAgIHZhciBpdGVtcyA9IFtdO1xuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgICBpbnN0YW5jZS5pdGVyYXRlQ3Vyc29yKHF1ZXJ5LCBmdW5jdGlvbihjdXJzb3IpIHtcbiAgICAgICAgICBpZiAoIWN1cnNvcikge1xuICAgICAgICAgICAgcmVzb2x2ZShpdGVtcyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGl0ZW1zLnB1c2goY3Vyc29yLnZhbHVlKTtcblxuICAgICAgICAgIGlmIChjb3VudCAhPT0gdW5kZWZpbmVkICYmIGl0ZW1zLmxlbmd0aCA9PSBjb3VudCkge1xuICAgICAgICAgICAgcmVzb2x2ZShpdGVtcyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH0pO1xuXG4gIHZhciBleHAgPSB7XG4gICAgb3BlbjogZnVuY3Rpb24obmFtZSwgdmVyc2lvbiwgdXBncmFkZUNhbGxiYWNrKSB7XG4gICAgICB2YXIgcCA9IHByb21pc2lmeVJlcXVlc3RDYWxsKGluZGV4ZWREQiwgJ29wZW4nLCBbbmFtZSwgdmVyc2lvbl0pO1xuICAgICAgdmFyIHJlcXVlc3QgPSBwLnJlcXVlc3Q7XG5cbiAgICAgIGlmIChyZXF1ZXN0KSB7XG4gICAgICAgIHJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBpZiAodXBncmFkZUNhbGxiYWNrKSB7XG4gICAgICAgICAgICB1cGdyYWRlQ2FsbGJhY2sobmV3IFVwZ3JhZGVEQihyZXF1ZXN0LnJlc3VsdCwgZXZlbnQub2xkVmVyc2lvbiwgcmVxdWVzdC50cmFuc2FjdGlvbikpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHAudGhlbihmdW5jdGlvbihkYikge1xuICAgICAgICByZXR1cm4gbmV3IERCKGRiKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZGVsZXRlOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdENhbGwoaW5kZXhlZERCLCAnZGVsZXRlRGF0YWJhc2UnLCBbbmFtZV0pO1xuICAgIH1cbiAgfTtcblxuICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGV4cDtcbiAgICBtb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gbW9kdWxlLmV4cG9ydHM7XG4gIH1cbiAgZWxzZSB7XG4gICAgc2VsZi5pZGIgPSBleHA7XG4gIH1cbn0oKSk7Il19
