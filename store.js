const STORE = {
    bookmarks: [],
    adding: false,
    error: null,
    filter: 0
  };
  
  //returns the id of a bookmark
  const findById = function(id) {
    return STORE.bookmarks.find(item => item.id === id);
  };
  
  //adds bookmarks to the store
  const addBookmark = function(item) {
    return STORE.bookmarks.push(item);
  };
  
  //filters the item with given id out of the bookmarks array
  const deleteBookmark = function(id) {
    STORE.items = STORE.items.filter(item => item.id !== id);
  };
  
  //sets the filter value in the store object
  const setFilter = function(rating) {
    STORE.filter = rating;
  };
  
  //toggles the adding value of the store object
  const toggleAdding = function() {
    STORE.adding = !STORE.adding;
  };
  
  const setError = function(error) {
    STORE.error = error;
  }
  
  export default {
    STORE,
    findById,
    deleteBookmark,
    addBookmark,
    setFilter,
    toggleAdding,
    setError
  };