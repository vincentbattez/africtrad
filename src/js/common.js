// JS commun à toutes les pages
import * as navbar from './components/navbar';

export default {
  init() {
    console.log('Je suis dans toutes les pages');
    $('#toggle-nav').on('click', function (e) { 
      e.preventDefault();
      navbar.responsiveNav();
    });
  },
  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
  },
};
