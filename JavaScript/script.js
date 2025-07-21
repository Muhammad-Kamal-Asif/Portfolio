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