// Renders a big average-rating number computed from the reviews data,
// plus the full list of individual reviews below it.

function renderStars(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += i <= rating ? "★" : "☆";
  }
  return stars;
}

function renderAverage() {
  // Add up every rating, then divide by how many reviews there are.
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  const average = total / reviews.length;

  document.getElementById("rating-average").textContent = average.toFixed(1);
  document.getElementById("rating-count").textContent =
    `based on ${reviews.length} review${reviews.length === 1 ? "" : "s"}`;
}

function renderReviews() {
  const container = document.getElementById("reviews-container");

  reviews.forEach(review => {
    const card = document.createElement("div");
    card.className = "review-card reveal";

    card.innerHTML = `
      <div class="review-stars">${renderStars(review.rating)}</div>
      <p class="review-summary">${review.summary}</p>
    `;

    container.appendChild(card);
  });
}

renderAverage();
renderReviews();

// trigger reveal observer for dynamically-added review cards
const reviewObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      reviewObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".review-card.reveal").forEach(el => reviewObserver.observe(el));
