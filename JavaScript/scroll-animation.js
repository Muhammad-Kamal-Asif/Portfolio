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

/* ========================================= */
/* ===== TOUCH SWIPE SUPPORT FOR CAROUSEL == */
/* ========================================= */

// 1. Select the carousel element
const carouselTrack = document.getElementById('carousel');

// 2. Variables to track touch positions
let touchStartX = 0;
let touchEndX = 0;

// 3. Listen for the "Touch Start" event
carouselTrack.addEventListener('touchstart', (e) => {
  // Record the X (horizontal) position where the finger first touches
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true }); // 'passive: true' improves scrolling performance

// 4. Listen for the "Touch End" event
carouselTrack.addEventListener('touchend', (e) => {
  // Record the X position where the finger leaves the screen
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, { passive: true });

// 5. Calculate direction and trigger slide
function handleSwipe() {
  const threshold = 50; // Minimum distance (px) to count as a swipe

  // Calculate the difference
  const swipeDistance = touchEndX - touchStartX;

  // Check if it was a Left Swipe (User moves finger Right to Left -> Next Slide)
  if (swipeDistance < -threshold) {
    nextSlide();
  }
  
  // Check if it was a Right Swipe (User moves finger Left to Right -> Prev Slide)
  if (swipeDistance > threshold) {
    prevSlide();
  }
}