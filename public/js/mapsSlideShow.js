console.log('mapsSlideshow.js loaded');

document.addEventListener('DOMContentLoaded', function(event) {
  const mapSlides = document.querySelectorAll('.map-slide');
  const prevBtn = document.querySelector('.map-prev-btn');
  const nextBtn = document.querySelector('.map-next-btn');

  let currentSlide = 0;

  showSlide(currentSlide);

  prevBtn.addEventListener('click', () => {
    currentSlide--;
    if (currentSlide < 0) {
      currentSlide = mapSlides.length - 1;
    }
    showSlide(currentSlide);
  });

  nextBtn.addEventListener('click', () => {
    currentSlide++;
    if (currentSlide > mapSlides.length - 1) {
      currentSlide = 0;
    }
    showSlide(currentSlide);
  });

  function showSlide(slideIndex) {
    mapSlides.forEach((slide) => {
      slide.style.display = 'none';
    });
    mapSlides[slideIndex].style.display = 'block';
  }
});

