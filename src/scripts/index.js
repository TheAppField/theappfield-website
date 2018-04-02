import './../scss/main.scss';
import 'jquery';
import 'jquery-validation';
import 'jquery-form';
import './contact-form';

$('#btnMore').click(function () {
  $('html, body').animate({
    scrollTop: $('#aboutContainer').offset().top
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
  const tiles = $('.tile');
  const contactFields = $('.contact');
  //hide timeline blocks which are outside the viewport
  timelineItems.each(function () {
    if ($(this).offset().top > $(window).scrollTop() + $(window).height() * 0.75) {
      $(this).find('.timeline-icon, .timeline-content, .timeline-img').addClass('is-hidden');
    }
  });
  tiles.each(function (idx) {
    if ($(this).offset().top > $(window).scrollTop() + $(window).height() * 0.75) {
      $(tiles[idx]).addClass('is-hidden');
    }
  });
  contactFields.each(function (idx) {
    if ($(this).offset().top > $(window).scrollTop() + $(window).height() * 0.75) {
      $(contactFields[idx]).addClass('is-hidden');
    }
  });

  //on scolling, show/animate timeline blocks when enter the viewport
  $(window).on('scroll', function () {
    timelineItems.each(function () {
      if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * 0.75 && $(this).find('.timeline-icon, .timeline-img').hasClass('is-hidden')) {
        $(this).find('.timeline-icon').removeClass('is-hidden').addClass('bounce-in');
        $(this).find('.timeline-content, .timeline-img').removeClass('is-hidden').addClass('fade-in');
      }
    });
    tiles.each(function (idx) {
      if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * 0.75 && $(tiles[idx]).hasClass('is-hidden')) {
        $(tiles[idx]).removeClass('is-hidden').addClass('fade-in');
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

$('document').ready(() => {
  // headerShrinker();
  timelineAnimatons();
});
