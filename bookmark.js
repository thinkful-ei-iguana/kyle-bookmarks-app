import $ from 'jquery';

import store from './store';

//creates the store from store.js to make it more accesible in this file
const STORE = store.STORE;

//builds html for add item container
const addItemForm = function() {
  return `
    <form class='add-item-form js-add-item-form'>      
      <label for='new-bookmark-title'>Add New Bookmark:</label>
      <input type='text' id='new-bookmark-title' name='title' required>
              
      <label for='new-bookmark-url'>URL:</label>
      <input type='url' id='new-bookmark-url' name='url' required>
              
      <label for='new-bookmark-rating'>Rating:</label>
      <select name='set-rating' id='new-bookmark-rating' name='rating' required>
        <option value=''>Set rating</option>
        <option value='5'>5 stars</option>
        <option value='4'>4 stars</option>
        <option value='3'>3 stars</option>
        <option value='2'>2 stars</option>
        <option value='1'>1 star</option>
      </select>
              
      <label for='new-bookmark-description'>Description:</label'>
      <textarea id='new-bookmark-description' name='description' placeholder='Give a brief description' rows='6' cols='34' wrap='hard' required></textarea>
              
      <button type='submit' class='button submit-form js-submit-form><span>Add Bookmark</span></button>
  `;
};

//generates the html for the add item button
const addItemButton = function() {
  return `
    <button type="button" class="button add-item-button         js-add-item-button"><span>Add item</span></button>
    `;
};

//renders either the form or button to the add item container
const renderAddItem = function() {
  
  //if adding is true in store renders form
  if (STORE.adding) {
    $('.js-add-item').html(addItemForm());
  } else {
    $('.js-add-item').html(addItemButton());
  }
};

//generates the html for expanded items
const createBookmarkElement = function(item) {
  
  //if item is expanded returns the expanded view
  if (item.expanded) {
    return `
        <li class='bookmark-item' data-item-id='${item.id}'>
        <div class='expanded-title-container'>
          <h2 class='bookmark-title'>${item.title}</h2>
          <button class='button delete-item js-delete-item'>
          <span>Delete Item</span></button>
        </div>
        <div class='expanded-body'>
          <p class='description'>${item.description}</p>
        </div>
        <div class='rating-url'>
          <a href='${item.url}' target='_blank'>Visit Site</a>
          <p class'bookmark-rating'>${item.rating}/5 Stars</p>
        </div>
      </li>
    `;
  } 
  
  //else it returns the condensed view
  else {
    return `
    <li class='bookmark-item'>
      <div class='title-container'>
        <h2 class='bookmark-title'>${item.title}</h2>
        <p class='condensed-rating'>${item.rating}/5 Stars</p>
      </div>
    </li>
  `;
  }
};

//makes a string of the bookmark elements
const bookmarkString = function(bookmarkArray) {

  //runs bookmarks through the template function
  const bookmarks = bookmarkArray.map((item) => {
    
    //if rating >= filter value creates the element
    if (item.rating >= STORE.filter) {
      createBookmarkElement(item);
    }
  });

  //joins each of the templates together
  return bookmarks.join('');
};

//returns the error message to be displayed in the DOM
const createError = function(errorMessage) {
  return `
    <div class='error-content'>
      <p>${errorMessage}</p>
      <button class='cancel-error js-cancel-error'>Clear</button>
    </div>
    `;
};

//renders the error message in the DOM
const renderError = function() {

  //if error exists in store renders it in the DOM
  if (STORE.error) {
    const error = createError(STORE.error);
    $('.error-window').html(error);
  }

  //else it empties the error container in the DOM
  else {
    $('.error-window').empty();
  }
};

//renders all necessary data to the DOM
const render = function() {

  //calls the renderError and renderAddItem functions every time the page is rendered
  renderError();
  renderAddItem();

  //sets a variable equal to the bookmarks in the store
  const bookmarks = [...STORE.bookmarks];

  //creates a variable equal to the bookmarks html string
  const string = bookmarkString(bookmarks);

  //inserts the string into the DOM
  $('.js-bookmark').html(string);
};

//clears the error from the store after the user closes the error window
const handleClearError = function() {

  $('.error-window').submit('.js-cancel-error', event => {
    event.preventDefault();
    store.setError(null);
    renderError();
  });
};

export default {
  render
};