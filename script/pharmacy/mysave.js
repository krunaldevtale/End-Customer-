$(document).ready(function () {
  const $placesPanel = $("#wishlist-places-panel");
  const $medicinesPanel = $("#wishlist-medicines-panel");
  const $tabBtns = $(".wishlist-tab-btn");
  const $searchInput = $("#wishlist-search");
  const $resultsTitle = $("#wishlist-results-count");
  const $filterContainer = $("#wishlist-filter");
  const $filterInput = $filterContainer.find(".custom-select-input");
  const $filterMenu = $filterContainer.find(".custom-select-menu");
  const $filterOptions = $filterContainer.find(".custom-select-option");

  const FILTER_OPTIONS = {
    places: ["All", "General Hospital", "Multi-specialty", "Clinic"],
    medicines: ["All", "Protein", "Paracetamol", "Vitamins"],
  };

  let activeTab = "places";

  const TAB_ACTIVE =
    "wishlist-tab-btn rounded-full bg-sea-green-dark1 py-2.5 px-4 sm:px-5 text-xs sm:text-sm font-medium text-white cursor-pointer whitespace-nowrap";
  const TAB_INACTIVE =
    "wishlist-tab-btn rounded-full border border-charcoal-black bg-transparent py-2.5 px-4 sm:px-5 text-xs sm:text-sm font-medium text-gray cursor-pointer whitespace-nowrap";

  function getActiveCards() {
    return activeTab === "places"
      ? $placesPanel.find(".hospital-card")
      : $medicinesPanel.find(".medicine-card");
  }

  function updateResultsCount(visibleCount) {
    const total = getActiveCards().length;
    const count = visibleCount ?? total;
    $resultsTitle.text(`My save (${count} result${count === 1 ? "" : "s"})`);
  }

  function setActiveTab(tab) {
    activeTab = tab;

    $tabBtns.each(function () {
      const isActive = $(this).data("tab") === tab;
      $(this).attr("class", isActive ? TAB_ACTIVE : TAB_INACTIVE);
      $(this).attr("aria-selected", isActive);
    });

    if (tab === "places") {
      $placesPanel.removeClass("hidden");
      $medicinesPanel.addClass("hidden");
    } else {
      $placesPanel.addClass("hidden");
      $medicinesPanel.removeClass("hidden");
    }

    buildFilterOptions(tab);
    $filterInput.val("All");
    $searchInput.val("");
    filterCards();
  }

  function buildFilterOptions(tab) {
    const options = FILTER_OPTIONS[tab] || FILTER_OPTIONS.places;
    const $list = $filterMenu.find("ul").empty();

    options.forEach((label) => {
      $list.append(
        `<li class="custom-select-option block w-full text-left px-4 py-2.5 text-sm text-gray-med hover:bg-gray-100 cursor-pointer">${label}</li>`
      );
    });
  }

  function filterCards() {
    const query = $searchInput.val().trim().toLowerCase();
    const category = ($filterInput.val() || "All").trim();
    const $cards = getActiveCards();
    let visibleCount = 0;

    $cards.each(function () {
      const $card = $(this);
      const name = $card.find("h2").text().trim().toLowerCase();
      const cardCategory = ($card.data("category") || "").toString();
      const matchesSearch = !query || name.includes(query);
      const matchesCategory =
        category === "All" || cardCategory === category;

      const show = matchesSearch && matchesCategory;
      $card.toggleClass("hidden", !show);
      if (show) visibleCount += 1;
    });

    updateResultsCount(visibleCount);
  }

  $tabBtns.on("click", function () {
    setActiveTab($(this).data("tab"));
  });

  $searchInput.on("input", filterCards);

  $filterContainer.on("click", ".custom-select-input", function (e) {
    e.stopPropagation();
    $(".custom-select-menu")
      .not($filterMenu)
      .addClass("hidden");
    $filterMenu.toggleClass("hidden");
  });

  $filterContainer.on("click", ".custom-select-option", function (e) {
    e.stopPropagation();
    $filterInput.val($(this).text().trim());
    $filterMenu.addClass("hidden");
    filterCards();
  });

  $(document).on("click", function (e) {
    if (!$(e.target).closest(".custom-select-container").length) {
      $(".custom-select-menu").addClass("hidden");
    }
  });

  $("#menu-btn").on("click", function () {
    $("#mobile-menu").toggleClass("hidden");
  });

  $("#mobile-submenu-btn").on("click", function () {
    $("#mobile-submenu").toggleClass("hidden");
  });

  setActiveTab("places");
});
