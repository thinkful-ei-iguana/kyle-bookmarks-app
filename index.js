import $ from 'jquery';

import 'normalize.css';
import './index.css';

import bookmark from './bookmark';

const main = function() {
  bookmark.render();
};

$(main);