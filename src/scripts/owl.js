function setupCarousel() {
  let activeIndex = 0;
  const mockupTexts = $('.mockup-text');

  const owl = $('.owl-carousel');
  if (owl) {
    (function ($) {
      owl.owlCarousel(
        {
          loop: true,
          margin: 0,
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
            }
          }
        }
      );
      document.getElementById('carouselBtnPrev').onclick = function () {
        owl.trigger('prev.owl.carousel');
      };

      document.getElementById('carouselBtnNext').onclick = function () {
        owl.trigger('next.owl.carousel');
      };
    })(jQuery);
  }

  owl.on('changed.owl.carousel', function (event) {
    $(mockupTexts[activeIndex]).removeClass('appear').addClass('appear-is-hidden');
    activeIndex = event.page.index;
    $(mockupTexts[activeIndex]).removeClass('appear-is-hidden').addClass('appear');
  });

}

$('document').ready(() => {
  setupCarousel();
});
