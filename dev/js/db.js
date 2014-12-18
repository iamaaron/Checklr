var todo = {};
todo.indexedDB = {};
todo.indexedDB.db = null;

todo.indexedDB.open = function() {
  var version = 1;
  var request = indexedDB.open("todos", version);

  request.onsuccess = function(e) {
    todo.indexedDB.db = e.target.result;
    // Do some more stuff in a minute
  };

  request.onerror = todo.indexedDB.onerror;
};