/* ============================ */
/* ===== SCROLL ANIMATION ===== */
/* ============================ */

// 1. Universal Scroll Observer (Runs on every page)
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// target elements with .scroll-effect class
document.querySelectorAll('.scroll-effect').forEach(el => observer.observe(el));


/* ============================ */
/* ========= CAROUSEL ========= */
/* ============================ */

// 2. Carousel Logic (Only runs if carousel exists)
const carousel = document.getElementById('carousel');

if (carousel) {
  let index = 0;
  
  // Define functions inside the scope so they don't pollute global namespace
  // or attach them to window if you need them in HTML 'onclick' attributes
  window.showSlide = function(i) {
    const slides = document.querySelectorAll('.carousel img');
    if (slides.length === 0) return;
    
    index = (i + slides.length) % slides.length;
    carousel.style.transform = `translateX(-${index * 100}%)`;
  };

  window.nextSlide = function() { showSlide(index + 1); };
  window.prevSlide = function() { showSlide(index - 1); };

  // Auto-play (Optional - 4 seconds)
  setInterval(window.nextSlide, 4000);
}