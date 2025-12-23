/* ============================== */
/* ===== CERTIFICATE FILTER ===== */
/* ============================== */

const filterBtns = document.querySelectorAll(".filter-btn");
const certCards = document.querySelectorAll(".cert-card");

// Check if filter buttons exist before running logic
if (filterBtns.length > 0) {
  
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // 1. Remove 'active' class from all buttons
      filterBtns.forEach(b => b.classList.remove("active"));
      // 2. Add 'active' class to clicked button
      btn.classList.add("active");

      // 3. Filter cards
      const category = btn.getAttribute("data-filter");
      
      certCards.forEach(card => {
        // If category is 'all' OR the card has the category class
        if (category === "all" || card.classList.contains(category)) {
          card.style.display = "block";
          
          // Add a tiny animation when appearing
          card.style.opacity = "0";
          setTimeout(() => card.style.opacity = "1", 50);
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/* ============================ */
/* ===== LIGHTBOX LOGIC ======= */
/* ============================ */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector(".close-lightbox");

// Function to open the lightbox
// We attach this to window so it can be called from HTML onclick
window.openLightbox = function(imageSrc, caption) {
  lightbox.style.display = "block";
  lightboxImg.src = imageSrc;
  captionText.innerHTML = caption;
}

// Close when clicking the 'x'
if (closeBtn) {
  closeBtn.onclick = function() {
    lightbox.style.display = "none";
  }
}

// Close when clicking outside the image
if (lightbox) {
  lightbox.onclick = function(e) {
    if (e.target !== lightboxImg) {
      lightbox.style.display = "none";
    }
  }
}