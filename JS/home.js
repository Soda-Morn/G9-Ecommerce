let slideIndex = 0;
    const slides = document.querySelectorAll('.slides');
    const dots = document.querySelectorAll('.dot');

    function showSlides() {
      slides.forEach((slide, index) => {
        slide.style.display = index === slideIndex ? 'block' : 'none';
      });

      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === slideIndex);
      });

      slideIndex = (slideIndex + 1) % slides.length; // Cycle through slides
    }

    function currentSlide(index) {
      slideIndex = index;
      showSlides();
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => currentSlide(index));
    });

    // Initialize slideshow
    showSlides();
    setInterval(showSlides, 5000); // Change slide every 5 seconds