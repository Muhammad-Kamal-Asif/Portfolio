const form = document.getElementById('testimonialForm');
const statusMsg = document.getElementById('statusMsg');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const message = document.getElementById('message').value.trim();
  const rating = document.getElementById('rating').value;

  if (!name || !message || !rating) {
    statusMsg.textContent = "Please fill in all fields.";
    return;
  }

  const data = { name, message, rating };

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbzM9mcS-JVdJGj3Lw3yEGYLuoJ2GXT2tMiQWpNBVh-x7XN_SLtRLOLy6lHpY-kgEkShyg/exec", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const result = await response.json();

    if (result.status === "success") {
      statusMsg.textContent = "Thanks! Your review will appear after approval.";
      form.reset();
    } else {
      statusMsg.textContent = "Oops! Something went wrong.";
    }
  } catch (error) {
    statusMsg.textContent = "Submission failed. Try again.";
    console.error(error);
  }
});



  // Replace with your actual Web App URL
  const testimonialsURL = "https://script.google.com/macros/s/AKfycbzM9mcS-JVdJGj3Lw3yEGYLuoJ2GXT2tMiQWpNBVh-x7XN_SLtRLOLy6lHpY-kgEkShyg/exec";

  async function loadTestimonials() {
    try {
      const res = await fetch(testimonialsURL);
      const data = await res.json();

      const approved = data.testimonials.filter(t => t.Status === "Approved");
      const container = document.getElementById("testimonial-container");

      if (approved.length === 0) {
        container.innerHTML = "<p>No testimonials available yet.</p>";
        return;
      }

      approved.forEach(t => {
        const card = document.createElement("div");
        card.className = "testimonial-card";
        card.innerHTML = `
          <p>${t.Message}</p>
          <p><strong>– ${t.Name}</strong></p>
        `;
        container.appendChild(card);
      });

    } catch (error) {
      console.error("Error loading testimonials:", error);
      document.getElementById("testimonial-container").innerHTML = "<p>Could not load testimonials.</p>";
    }
  }

  window.addEventListener("DOMContentLoaded", loadTestimonials);