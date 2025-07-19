// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const searchInput = document.getElementById("searchInput");
  const modal = document.getElementById("modal");
  const modalImage = document.getElementById("modalImage");
  const backToTop = document.getElementById("backToTop");

  // Scroll Reveal Animation
  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.9;
    cards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;
      if (cardTop < triggerBottom) {
        card.classList.add("show");
      }
    });
  };

  // Initial reveal
  revealOnScroll();

  // Listen for scroll
  window.addEventListener("scroll", () => {
    revealOnScroll();
    if (window.scrollY > 300) {
      backToTop.style.display = "block";
    } else {
      backToTop.style.display = "none";
    }
  });

  // Filter by category
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.category;
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      cards.forEach(card => {
        if (category === "all" || card.dataset.category === category) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
      revealOnScroll();
    });
  });

  // Search by title
  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();
    cards.forEach(card => {
      const title = card.dataset.title.toLowerCase();
      card.style.display = title.includes(keyword) ? "block" : "none";
    });
  });

  // Modal view
  cards.forEach(card => {
    card.addEventListener("click", (e) => {
      if (!e.target.classList.contains("download")) {
        const img = card.querySelector("img").src;
        modalImage.src = img;
        modal.classList.add("show");
      }
    });
  });

  // Close modal
  modal.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  // Back to top
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// Update done mannually

// Fetch and render certificates from JSON
fetch("certificates.json")
  .then((res) => res.json())
  .then((certificates) => {
    const gallery = document.getElementById("gallery");

    certificates.forEach(cert => {
      const card = document.createElement("div");
      card.className = "card show";
      card.setAttribute("data-category", cert.category);
      card.setAttribute("data-title", cert.title.toLowerCase());

      card.innerHTML = `
        <img src="${cert.image}" alt="${cert.title}" />
        <div class="info">
          <h3>${cert.title}</h3>
          <p>${cert.issuer}</p>
          <a href="${cert.image}" download class="download">Download</a>
        </div>
      `;

      gallery.appendChild(card);

      // Click to open modal
      card.addEventListener("click", (e) => {
        if (!e.target.classList.contains("download")) {
          modalImage.src = cert.image;
          modal.classList.add("show");
        }
      });
    });

    // Trigger scroll reveal again
    revealOnScroll();
  })
  .catch((err) => console.error("Error loading certificates:", err));

// Print Button
document.getElementById("printBtn").addEventListener("click", () => {
  window.print();
});

if (modal.classList.contains("show")) {
  modal.classList.remove("show");
}
