import './../scss/main.scss';
import fontawesome from '@fortawesome/fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import 'jquery';
import 'jquery-validation';
import 'jquery-form';
import './contact-form';
import 'owl.carousel';


fontawesome.library.add(brands);

$('#btnMore').click(function () {
  $('html, body').animate({
    scrollTop: $('#first').offset().top
  }, 500);
});

/*  Header */
const headerShrinker = function () {
  const header = $('.header');
  const heroHeight = header.outerHeight(true);
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
  const timelineItems = $('.timeline-item');
  const animateFadeIn = $('.to-fade-in');
  const contactFields = $('.contact');


  //hide timeline blocks which are outside the viewport
  timelineItems.each(function () {
    if ($(this).offset().top > $(window).scrollTop() + $(window).height() * 0.75) {
      $(this).find('.timeline-icon').addClass('is-hidden');
    }
  });
  animateFadeIn.each(function (idx) {
    if ($(this).offset().top > $(window).scrollTop() + $(window).height() * 0.75) {
      $(animateFadeIn[idx]).addClass('is-hidden');
    }
  });
  contactFields.each(function (idx) {
    if (idx !== contactFields.length - 1) {
      if ($(this).offset().top > $(window).scrollTop() + $(window).height() * 0.75) {
        $(contactFields[idx]).addClass('is-hidden');
      }
    } else {
      if ($(this).offset().top > $(window).scrollTop() + $(window).height()) {
        $(contactFields[idx]).addClass('is-hidden');
      }
    }
  });

  //on scolling, show/animate timeline blocks when enter the viewport
  $(window).on('scroll', function () {
    timelineItems.each(function () {
      if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * 0.75 && $(this).find('.timeline-icon, .timeline-img').hasClass('is-hidden')) {
        $(this).find('.timeline-icon').removeClass('is-hidden').addClass('bounce-in');
      }
    });
    animateFadeIn.each(function (idx) {
      if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * 0.75 && $(animateFadeIn[idx]).hasClass('is-hidden')) {
        $(animateFadeIn[idx]).removeClass('is-hidden').addClass('fade-in');
      }
    });

    contactFields.each(function (idx) {
      if (idx !== contactFields.length - 1) {
        if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * 0.75 && $(contactFields[idx]).hasClass('is-hidden')) {
          $(contactFields[idx]).removeClass('is-hidden').addClass('fade-in');
        }
      } else {
        if ($(this).offset().top <= $(window).scrollTop() + $(window).height() && $(contactFields[idx]).hasClass('is-hidden')) {
          $(contactFields[idx]).removeClass('is-hidden').addClass('fade-in');
        }
      }

    });
  });
};

function setupCarousel() {

  const mockupCarousel = $('.owl-carousel');
  if (mockupCarousel) {
    (function ($) {
      $('.owl-carousel').owlCarousel(
        {
          loop: true,
          margin: 5,
          center: true,
          nav: false,
          dot: true,
          lazyload: true,
          slideSpeed: 5000,
          paginationSpeed: 5000,
          rewindSpeed: 5000,
          navigation: true,
          pagination: true,
          autoplay: true,
          autoplaySpeed: 2000,
          responsive: {
            0: {
              items: 1
            },
            600: {
              items: 3
            },
            1000: {
              items: 5
            }
          }
        }
      );
    })(jQuery);


    // mockupCarousel.carousel(
    //   {
    //     loop: true,
    //     margin: 5,
    //     center: true,
    //     nav: false,
    //     dot: true,
    //     lazyload: true,
    //     slideSpeed: 5000,
    //     paginationSpeed: 5000,
    //     rewindSpeed: 5000,
    //     navigation: true,
    //     pagination: true,
    //     autoplay: true,
    //     autoplaySpeed: 2000,
    //     responsive: {
    //       0: {
    //         items: 1
    //       },
    //       600: {
    //         items: 3
    //       },
    //       1000: {
    //         items: 5
    //       }
    //     }
    //   });
  }

}

$('document').ready(() => {
  // headerShrinker();
  timelineAnimatons();
  setupCarousel();
});
