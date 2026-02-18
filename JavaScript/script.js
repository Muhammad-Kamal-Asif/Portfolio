/* ============================== */
/* ===== CERTIFICATE FILTER ===== */
/* ============================== */

document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const certCards = document.querySelectorAll(".cert-card");
  const mobileToggleBtn = document.querySelector(".mobile-filter-toggle");
  const filterMenu = document.querySelector(".filter-buttons");

  // 1. MOBILE: Toggle Menu Open/Close
  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent immediate closing
      filterMenu.classList.toggle("show");
    });

    // Close menu if clicking outside of it
    document.addEventListener("click", (e) => {
      if (!filterMenu.contains(e.target) && !mobileToggleBtn.contains(e.target)) {
        filterMenu.classList.remove("show");
      }
    });
  }

  // 2. FILTERING LOGIC
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        
        // A. Update Active State
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // B. MOBILE: Update Toggle Text & Close Menu
        if (mobileToggleBtn && window.innerWidth <= 768) {
          const btnText = btn.innerText;
          // Update the button text to show what is selected
          mobileToggleBtn.innerHTML = `<i class="fa-solid fa-filter"></i> ${btnText} ▾`;
          // Close the dropdown
          filterMenu.classList.remove("show");
        }

        // C. Filter The Cards
        const category = btn.getAttribute("data-filter");
        
        certCards.forEach(card => {
          // If category is 'all' OR the card has the specific category class
          if (category === "all" || card.classList.contains(category)) {
            // CRITICAL: Use 'flex' to keep your button alignment perfect
            card.style.display = "flex"; 
            
            // Add fade-in animation
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";
            
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, 50);
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }
});

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