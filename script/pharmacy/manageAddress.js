$(document).ready(function () {
  const cards = $(".cards > div");
  const itemsPerPage = 4;
  let currentPage = 1;

  function showPage(page) {
    // Hide all cards first
    cards.hide();

    // Calculate the start and end index for the current page
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Show only the cards for the current page
    cards.slice(startIndex, endIndex).show();

    // Update the active state of pagination buttons
    updatePaginationLinks();
  }

  function createPaginationLinks() {
    const totalItems = cards.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageNumbersContainer = $("#page-numbers");
    pageNumbersContainer.empty();

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = $("<a></a>")
        .attr("href", "#")
        .addClass(
          "w-8 h-8 flex items-center justify-center rounded-md bg-silver cursor-pointer"
        )
        .text(i)
        .on("click", function (e) {
          e.preventDefault();
          currentPage = i;
          showPage(currentPage);
        });
      pageNumbersContainer.append(pageButton);
    }
  }

  function updatePaginationLinks() {
    const totalItems = cards.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Remove active class from all buttons
    $("#page-numbers a").removeClass("active bg-sea-green-deep text-white");

    // Add active class to the current page button
    $(`#page-numbers a:contains(${currentPage})`).addClass(
      "active bg-sea-green-deep text-white"
    );

    // Disable or enable Prev/Next buttons
    $("#prev-page").prop("disabled", currentPage === 1);
    $("#next-page").prop("disabled", currentPage === totalPages);

    $("#prev-page").toggleClass("opacity-50", currentPage === 1);
    $("#next-page").toggleClass("opacity-50", currentPage === totalPages);
  }

  // Add click listeners for Prev/Next buttons
  $("#prev-page").on("click", function () {
    if (currentPage > 1) {
      currentPage--;
      showPage(currentPage);
    }
  });

  $("#next-page").on("click", function () {
    const totalItems = cards.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      showPage(currentPage);
    }
  });

  // Initialize the pagination
  createPaginationLinks();
  showPage(currentPage);

  // Show specific popup
  $(".popup-btn").on("click", function () {
    let popupId = $(this).data("popup");
    $("." + popupId)
      .removeClass("hidden")
      .addClass("flex");
    $("body").addClass("overflow-hidden");
  });

  // Close popup
  $(".close-popup").on("click", function () {
    let popupId = $(this).data("popup");
    $(this)
      .closest("." + popupId)
      .addClass("hidden")
      .removeClass("flex");
    $("body").removeClass("overflow-hidden");
  });

  $(document).on(
    "click",
    ".input-group input, .input-group .dropdown-toggle",
    function (e) {
      e.stopPropagation();
      const $group = $(this).closest(".input-group");
      const $dropdown = $group.find(".dropdown-menu");
      const $chevron = $group.find(".dropdown-toggle");

      // Close other dropdowns first
      $(".dropdown-menu").not($dropdown).addClass("hidden");
      $(".dropdown-toggle").not($chevron).removeClass("rotate-180");

      // Toggle this one
      $dropdown.toggleClass("hidden");
      $chevron.toggleClass("rotate-180");
    }
  );

  // Select option
  $(document).on("click", ".input-group .dropdown-menu li", function () {
    const $group = $(this).closest(".input-group");
    $group.find("input").val($(this).text());
    $group.find(".dropdown-menu").addClass("hidden");
    $group.find(".dropdown-toggle").removeClass("rotate-180");
  });

  // Close dropdowns when clicking outside
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".input-group").length) {
      $(".dropdown-menu").addClass("hidden");
      $("dropdown-toggle").removeClass("rotate-180");
    }
  });

  $(document).on("click", ".remove-address-btn", function () {
    $(this)
      .closest(".address-card")
      .fadeOut(300, function () {
        $(this).remove();
      });
  });

  // Use both click and touchend to ensure mobile taps work
  $(document).on("click touchend", ".copy-address-btn", function (e) {
    e.preventDefault(); // Prevent any default behavior
    e.stopPropagation(); // Stop bubbling if inside other clickable areas

    const addressText = $(this)
      .closest(".address-card")
      .find("p")
      .text()
      .trim();

    if (!navigator.clipboard) {
      // Fallback for older browsers
      const tempInput = $("<textarea>");
      $("body").append(tempInput);
      tempInput.val(addressText).select();
      document.execCommand("copy");
      tempInput.remove();
      showToast("Copied successfully!");
      return;
    }

    navigator.clipboard
      .writeText(addressText)
      .then(() => showToast("Copied successfully!"))
      .catch(() => showToast("Copy failed!"));
  });

  $(document).on("click", ".save-address-btn", function () {
    $(".newAddressPopup").addClass("hidden");
    showToast("Saved successfully!");
  });

  //sidebar
  $("#menu-toggle").click(function () {
    $("#sidebar").toggleClass("hidden");
  });

  //header
  $("#menu-btn").on("click", function () {
    $("#mobile-menu").toggleClass("hidden");
  });
  $("#mobile-submenu-btn").on("click", function () {
    $("#mobile-submenu").toggleClass("hidden");
  });
});
function showToast(message) {
  const $toast = $(".toast");
  $toast.text(message).removeClass("hidden").hide().fadeIn(300);

  setTimeout(() => {
    $toast.fadeOut(300, function () {
      $toast.addClass("hidden");
    });
  }, 2000);
}
