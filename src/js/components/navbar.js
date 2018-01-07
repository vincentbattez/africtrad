export function responsiveNav() {
  $('.nav__main').toggleClass('open');
}


function toggle($window, nav, navHeight, botOfHeader) {
  if ($window.scrollTop() > botOfHeader - navHeight) {
    if (!nav.hasClass('active'))
      nav.addClass('active');
  } else {
    if (nav.hasClass('active'))
      nav.removeClass('active');
  }
}
