$(document).ready(function () {
  $(".custom-select-container").on(
    "click",
    ".custom-select-input",
    function (e) {
      e.stopPropagation();
      $(".custom-select-menu")
        .not(
          $(this)
            .closest(".custom-select-container")
            .find(".custom-select-menu")
        )
        .addClass("hidden");
      $(this)
        .closest(".custom-select-container")
        .find(".custom-select-menu")
        .toggleClass("hidden");
    }
  );

  // Handle option selection by getting text content
  $(".custom-select-container").on(
    "click",
    ".custom-select-option",
    function (e) {
      const selectedText = $(this).text().trim();
      $(this)
        .closest(".custom-select-container")
        .find(".custom-select-input")
        .val(selectedText);
      $(this).closest(".custom-select-menu").addClass("hidden");
    }
  );

  // Close all dropdowns when clicking outside
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".custom-select-container").length) {
      $(".custom-select-menu").addClass("hidden");
    }
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

  const rows = $("tbody tr"); // ✅ Target table rows instead of cards
  const itemsPerPage = 7; // Change per your need
  let currentPage = 1;

  function showPage(page) {
    // Hide all rows first
    rows.hide();

    // Calculate the start and end index for the current page
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Show only the rows for the current page
    rows.slice(startIndex, endIndex).show();

    // Update the active state of pagination buttons
    updatePaginationLinks();
  }

  function createPaginationLinks() {
    const totalItems = rows.length;
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
    const totalItems = rows.length;
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
    const totalItems = rows.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      showPage(currentPage);
    }
  });

  // Initialize the pagination
  createPaginationLinks();
  showPage(currentPage);
});
