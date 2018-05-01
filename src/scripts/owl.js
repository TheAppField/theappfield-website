function setupCarousel() {

  const btnSmartphone = document.getElementById('mockupSmartphoneSelected');
  const btnNotebook = document.getElementById('mockupNotebokSelected');
  const carouselSmartphoneContainer = $('#carouselSmartphone');
  const carouselNotebookContainer = $('#carouselNotebook');
  const mockupTextContainer = $('#mockupTextContainer');
  let isSmartphoneActive = true;

  btnSmartphone.onclick = function () {
    console.log('switch mockups carousel!');
    carouselNotebookContainer.addClass('hide-mockup');
    carouselSmartphoneContainer.removeClass('hide-mockup');
    mockupTextContainer.css('margin-top', '-50px');
    isSmartphoneActive = true;
  };

  btnNotebook.onclick = function () {
    console.log('switch mockups carousel!');
    carouselSmartphoneContainer.addClass('hide-mockup');
    carouselNotebookContainer.removeClass('hide-mockup');
    mockupTextContainer.css('margin-top', 0);
    isSmartphoneActive = false;
  };

  const owlSmartphone = $('#carouselSmartphone>.owl-carousel');
  const owlNotebook = $('#carouselNotebook>.owl-carousel');
  const owlText = $('.mockup-text-container>.owl-carousel');

  if (owlSmartphone && owlNotebook && owlText) {
    (function ($) {
      owlSmartphone.owlCarousel({
        items: 1,
        loop: true,
        margin: 0,
        center: true,
        nav: false,
        autoplay: false,
        autoplaySpeed: 2000,
      });
      owlNotebook.owlCarousel({
        items: 1,
        loop: true,
        margin: 0,
        center: true,
        nav: false,
        autoplay: false,
        autoplaySpeed: 2000,
      });

      owlText.owlCarousel({
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
        owlSmartphone.trigger('prev.owl.carousel');
        owlNotebook.trigger('prev.owl.carousel');
      };

      document.getElementById('carouselBtnNext').onclick = function () {
        owlSmartphone.trigger('next.owl.carousel');
        owlNotebook.trigger('next.owl.carousel');
      };

      owlSmartphone.on('changed.owl.carousel', function (event) {
        if (isSmartphoneActive) owlText.trigger('to.owl.carousel', event.page.index);
      });
      owlNotebook.on('changed.owl.carousel', function (event) {
        if (!isSmartphoneActive) owlText.trigger('to.owl.carousel', event.page.index);
      });
    })(jQuery);
  }
}

$('document').ready(() => {
  setupCarousel();
});
