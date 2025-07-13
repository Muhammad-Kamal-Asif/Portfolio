document.getElementById("showMoreBtn").addEventListener("click", function () {
  const hiddenCards = document.querySelectorAll(".cert-card.hidden");
  hiddenCards.forEach(card => card.classList.remove("hidden"));
  this.style.display = "none"; // hide the button
});


function toggleMenu() {
  const nav = document.querySelector('nav ul');
  nav.classList.toggle('show');
};