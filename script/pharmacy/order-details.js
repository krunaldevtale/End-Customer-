(function () {
  const summaryToggle = document.querySelector(".js-order-summary-toggle");
  const summaryPanel = document.querySelector(".js-order-summary-panel");
  const summaryChevron = document.querySelector(".js-order-summary-chevron");

  if (summaryToggle && summaryPanel) {
    summaryToggle.addEventListener("click", () => {
      const isHidden = summaryPanel.classList.contains("hidden");
      summaryPanel.classList.toggle("hidden", !isHidden);
      summaryToggle.setAttribute("aria-expanded", isHidden ? "true" : "false");
      if (summaryChevron) {
        summaryChevron.textContent = isHidden
          ? "keyboard_arrow_up"
          : "keyboard_arrow_down";
      }
    });
  }

  const starButtons = document.querySelectorAll(".js-rating-star");
  starButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const rating = parseInt(btn.getAttribute("data-rating"), 10);
      starButtons.forEach((star) => {
        const starRating = parseInt(star.getAttribute("data-rating"), 10);
        const filled = starRating <= rating;
        star.classList.toggle("text-ochre-yellow1", filled);
        star.classList.toggle("text-gray-light1", !filled);
        star.style.fontVariationSettings = filled
          ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
          : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24";
      });
    });
  });
})();
