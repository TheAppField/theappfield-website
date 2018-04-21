function setupCarousel() {
  let activeIndex = 0;
  const mockupTexts = $('.mockup-text');

  const owl = $('.owl-carousel');
  if (owl) {
    (function ($) {
      $(owl[0]).owlCarousel({
        items: 1,
        loop: true,
        margin: 0,
        center: true,
        nav: false,
        autoplay: true,
        autoplaySpeed: 2000,

      });
      $(owl[1]).owlCarousel({
        items: 1,
        animateOut: 'fadeOut',
        loop: true,
        margin: 5,
        center: true,
        nav: false,
        dots: false,
        mouseDrag: false,
        autoplaySpeed: 1000,
        autoplay: false
      });
      document.getElementById('carouselBtnPrev').onclick = function () {
        owl.trigger('prev.owl.carousel');
      };

      document.getElementById('carouselBtnNext').onclick = function () {
        owl.trigger('next.owl.carousel');
      };
    })(jQuery);
  }

  $(owl[0]).on('changed.owl.carousel', function (event) {
    $(owl[1]).trigger('to.owl.carousel', event.page.index);
    // $(mockupTexts[activeIndex]).removeClass('appear').addClass('appear-is-hidden');
    // activeIndex = event.page.index;
    // $(mockupTexts[activeIndex]).removeClass('appear-is-hidden').addClass('appear');
  });

}

$('document').ready(() => {
  setupCarousel();
});
