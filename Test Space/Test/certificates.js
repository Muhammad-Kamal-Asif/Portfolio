// FILTER BUTTONS
const filterBtns = document.querySelectorAll(".filter-btn");
const certCards = document.querySelectorAll(".cert-card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // Remove 'active' class
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.getAttribute("data-filter");
    certCards.forEach(card => {
      if (category === "all" || card.classList.contains(category)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// LIGHTBOX
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const close = document.querySelector(".close");

certCards.forEach(card => {
  card.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = card.querySelector("img").src;
  });
});

close.addEventListener("click", () => {
  lightbox.style.display = "none";
});


// ==============

  const btn = document.getElementById("backToTop");

  window.onscroll = () => {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  };

  btn.onclick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

