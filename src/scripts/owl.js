
function setupCarousel() {
  let activeIndex = 0;
  const mockupTexts = $('.mockup-text');

  const owl = $('.owl-carousel');
  if (owl) {
    (function ($) {
      owl.owlCarousel(
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
          autoplay: false,
          autoplaySpeed: 2000,
          responsive: {
            0: {
              items: 1
            },
            768: {
              items: 3
            },
            960: {
              items: 5
            }
          }
        }
      );
    })(jQuery);
  }

  owl.on('changed.owl.carousel', function(event) {
    $(mockupTexts[activeIndex]).removeClass('appear').addClass('appear-is-hidden');
    activeIndex = event.page.index;
    $(mockupTexts[activeIndex]).removeClass('appear-is-hidden').addClass('appear');
  });

}

$('document').ready(() => {
  setupCarousel();
});
