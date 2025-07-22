    // Scroll-in animation
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-effect').forEach(el => observer.observe(el));

    // Carousel
    const carousel = document.getElementById('carousel');
    let index = 0;

    function showSlide(i) {
      const slides = document.querySelectorAll('.carousel img');
      index = (i + slides.length) % slides.length;
      carousel.style.transform = `translateX(-${index * 100}%)`;
    }

    function nextSlide() { showSlide(index + 1); }
    function prevSlide() { showSlide(index - 1); }

    // Optional: Auto-play
    setInterval(nextSlide, 4000);