import './../scss/main.scss';
import 'jquery';

$("#btnMore").click(function () {
  $('html, body').animate({
    scrollTop: $("#aboutContainer").offset().top
  }, 500);
});


/*  Header */
const headerShrinker = function () {
  const header = $('.header'),
    heroHeight = header.outerHeight(true);
  $(header).parent().css('padding-top', heroHeight);
  $(window).scroll(function () {
    const scrollOffset = $(window).scrollTop();
    if (scrollOffset < heroHeight) {
      $(header).css('height', (heroHeight - scrollOffset));
    }
    if (scrollOffset > (heroHeight - 215)) {
      header.addClass('fixme');
    } else {
      header.removeClass('fixme');
    }
  });
};

const timelineAnimatons = function () {
  // animations for timeline
  const $timelineBlock = $('.timeline-item');

  //hide timeline blocks which are outside the viewport
  $timelineBlock.each(function () {
    if ($(this).offset().top > $(window).scrollTop() + $(window).height() * 0.75) {
      $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
    }
  });

  //on scolling, show/animate timeline blocks when enter the viewport
  $(window).on('scroll', function () {
    $timelineBlock.each(function () {
      console.log("item");
      if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * 0.75 && $(this).find('.timeline-icon').hasClass('is-hidden')) {
        $(this).find("timeline-icon").removeClass('is-hidden').addClass('bounce-in');
      }
    });
  });
};

$('document').ready(() => {
  // headerShrinker();
  timelineAnimatons();
});

// import 'bootstrap';
// import ScrollReveal from 'scrollreveal';
//
// const css = require('../scss/main.scss');
//
// (function ($) {
//     "use strict"; // Start of use strict
//
//     // Smooth scrolling using jQuery easing
//     $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
//         if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
//             var target = $(this.hash);
//             target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
//             if (target.length) {
// (function ($) {
//     "use strict"; // Start of use strict
//
//     // Smooth scrolling using jQuery easing
//     $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
//         if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
//             var target = $(this.hash);
//             target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
//             if (target.length) {
//                 $('html, body').animate({
//                     scrollTop: (target.offset().top - 48)
//                 }, 1000, "easeInOutExpo");
//                 return false;
//             }
//         }
//     });
//
//     // Closes responsive menu when a scroll trigger link is clicked
//     $('.js-scroll-trigger').click(func
//                 $('html, body').animate({
//                     scrollTop: (target.offset().top - 48)
//                 }, 1000, "easeInOutExpo");
//                 return false;
//             }
//         }
//     });
//
//     // Closes responsive menu when a scroll trigger link is clicked
//     $('.js-scroll-trigger').click(function () {
//         $('.navbar-collapse').collapse('hide');
//     });
//
//     // Activate scrollspy to add active class to navbar items on scroll
//     $('body').scrollspy({
//         target: '#mainNav',
//         offset: 48
//     });
//
//     // Collapse the navbar when page is scrolled
//     $(window).scroll(function () {
//         if ($("#mainNav").offset().top > 100) {
//             $("#mainNav").addClass("navbar-shrink");
//         } else {
//             $("#mainNav").removeClass("navbar-shrink");
//         }
//     });
//
//     // Scroll reveal calls
//     window.sr = ScrollReveal();
//     sr.reveal('.sr-icons', {
//         duration: 600,
//         scale: 0.3,
//         distance: '0px'
//     }, 200);
//     sr.reveal('.sr-button', {
//         duration: 1000,
//         delay: 200
//     });
//     sr.reveal('.sr-contact', {
//         duration: 600,
//         scale: 0.3,
//         distance: '0px'
//     }, 300);
//
// })(jQuery); // End of use strict
