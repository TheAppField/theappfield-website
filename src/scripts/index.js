import './../scss/main.scss';
import fontawesome from '@fortawesome/fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import 'jquery';
import 'jquery-validation';
import 'jquery-form';
import 'bootstrap';
import './contact-form';
import 'owl.carousel';
import './owl';

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

const setupAnimations = function () {
  // animations for timeline
  const timelineItems = $('.timeline-item');
  const animateFadeIn = $('.to-fade-in');
  const animateBounceIn = $('.to-bounce-in');


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
  animateBounceIn.each(function (idx) {
    if ($(this).offset().top > $(window).scrollTop() + $(window).height() * 0.75) {
      $(animateBounceIn[idx]).addClass('is-hidden');
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

        if ($(animateFadeIn[idx]).hasClass('contact-message')) {
          $(animateFadeIn[idx + 1]).removeClass('is-hidden').addClass('fade-in');
        }
      }
    });

    animateBounceIn.each(function (idx) {
      if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * 0.75 && $(animateBounceIn[idx]).hasClass('is-hidden')) {
        $(animateBounceIn[idx]).removeClass('is-hidden').addClass('bounce-in');
      }
    });
  });
};

$('document').ready(() => {
  // headerShrinker();
  setupAnimations();
});
