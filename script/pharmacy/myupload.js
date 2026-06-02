(function () {
  const ROWS_PER_PAGE = 5;

  const UPLOADS = [
    {
      category: "Prescription",
      patient: "Anjali Sharma",
      doctor: "Dr. Aisha Rahman",
      date: "12/04/2025",
      time: "12:45 PM",
    },
    {
      category: "Bill",
      patient: "Monica Singh",
      doctor: "Dr. Aisha Rahman",
      date: "11/04/2025",
      time: "10:30 AM",
    },
    {
      category: "Medicine",
      patient: "Rahul Verma",
      doctor: "Dr. Monika Singh",
      date: "10/04/2025",
      time: "04:15 PM",
    },
    {
      category: "Prescription",
      patient: "Priya Patel",
      doctor: "Dr. Aniket Sharma",
      date: "09/04/2025",
      time: "09:00 AM",
    },
    {
      category: "Bill",
      patient: "Anjali Sharma",
      doctor: "Dr. Priya Mehta",
      date: "08/04/2025",
      time: "02:20 PM",
    },
    {
      category: "Medicine",
      patient: "Monica Singh",
      doctor: "Dr. Aisha Rahman",
      date: "07/04/2025",
      time: "11:10 AM",
    },
    {
      category: "Prescription",
      patient: "Rahul Verma",
      doctor: "Dr. Monika Singh",
      date: "06/04/2025",
      time: "03:50 PM",
    },
    {
      category: "Bill",
      patient: "Priya Patel",
      doctor: "Dr. Aniket Sharma",
      date: "05/04/2025",
      time: "08:40 AM",
    },
    {
      category: "Medicine",
      patient: "Anjali Sharma",
      doctor: "Dr. Aisha Rahman",
      date: "04/04/2025",
      time: "05:25 PM",
    },
    {
      category: "Prescription",
      patient: "Monica Singh",
      doctor: "Dr. Priya Mehta",
      date: "03/04/2025",
      time: "01:15 PM",
    },
  ];

  const TYPE_ICONS = {
    Prescription: {
      bg: "bg-light-powder-blue",
      src: "/assets/img/ic_info.svg",
    },
    Bill: {
      bg: "bg-pale-mint",
      src: "/assets/img/ic_info-green.svg",
    },
    Medicine: {
      bg: "bg-light-cream",
      src: "/assets/img/ic_info-yellow.svg",
    },
  };

  const section = document.querySelector(".js-my-uploads-section");
  if (!section) return;

  const rowsContainer = section.querySelector(".js-upload-rows");
  const paginationEl = section.querySelector(".js-upload-pagination");
  const searchInput = document.querySelector(".js-my-uploads-search");
  const emptyState = section.querySelector(".js-upload-empty");

  let currentCategory = "all";
  let currentPage = 1;
  let searchQuery = "";

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function getFilteredUploads() {
    return UPLOADS.filter((row) => {
      const matchesCategory =
        currentCategory === "all" || row.category === currentCategory;

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        row.category.toLowerCase().includes(q) ||
        row.patient.toLowerCase().includes(q) ||
        row.doctor.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }

  function getTypeIcon(category) {
    const icon = TYPE_ICONS[category] || TYPE_ICONS.Prescription;
    return `
      <div class="w-9 h-9 md:w-10 md:h-10 rounded-full ${icon.bg} flex items-center justify-center shrink-0">
        <img src="${icon.src}" alt="" class="w-4 h-4 md:w-5 md:h-5 object-contain" />
      </div>
    `;
  }

  function renderRows() {
    const filtered = getFilteredUploads();
    const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));

    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const start = (currentPage - 1) * ROWS_PER_PAGE;
    const pageItems = filtered.slice(start, start + ROWS_PER_PAGE);

    if (!pageItems.length) {
      rowsContainer.innerHTML = "";
      if (emptyState) emptyState.classList.remove("hidden");
      return;
    }

    if (emptyState) emptyState.classList.add("hidden");

    rowsContainer.innerHTML = pageItems
      .map(
        (row) => `
          <div class="order-history-row order-row grid grid-cols-5 items-center py-4 md:py-5 text-xs md:text-sm border-b border-gray-light3 last:border-b-0" data-category="${escapeHtml(row.category)}">
            <div class="flex items-center justify-start gap-2 md:gap-3 px-2 md:px-4">
              ${getTypeIcon(row.category)}
              <div class="text-left min-w-0">
                <p class="font-normal text-sm text-gray-dark-5 truncate">${escapeHtml(row.category)}</p>
              </div>
            </div>
            <div class="text-center font-normal text-gray px-2">${escapeHtml(row.patient)}</div>
            <div class="text-center font-normal text-gray px-2">${escapeHtml(row.doctor)}</div>
            <div class="text-center px-2">
              <p class="font-normal text-sm text-gray">${escapeHtml(row.date)}</p>
              <p class="text-xs text-dark-gray font-normal">${escapeHtml(row.time)}</p>
            </div>
            <div class="text-center flex items-center justify-center">
              <button type="button"
                class="js-upload-view flex items-center justify-center border border-mint-cream w-9 h-9 rounded-full cursor-pointer hover:bg-soft-cloud-2 transition"
                aria-label="View ${escapeHtml(row.category)} for ${escapeHtml(row.patient)}">
                <span class="material-symbols-outlined mini-icon text-sea-green-dark1">visibility</span>
              </button>
            </div>
          </div>
        `
      )
      .join("");

    bindPreviewButtons();
  }

  function renderPagination() {
    if (!paginationEl) return;

    const filtered = getFilteredUploads();
    const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);

    if (!filtered.length) {
      paginationEl.innerHTML = "";
      return;
    }

    if (totalPages <= 1) {
      paginationEl.innerHTML =
        '<span class="text-sm text-smoky-blue-gray">Page 1 of 1</span>';
      return;
    }

    let html = `<button type="button" class="js-page-prev text-gray3 font-medium hover:text-sea-green2 px-2 md:px-3 py-1 transition">Previous</button>`;

    for (let i = 1; i <= totalPages; i++) {
      const activeClass = i === currentPage ? "active-page" : "";
      html += `<button type="button" class="page-num ${activeClass} js-page-num" data-page="${i}">${i}</button>`;
    }

    html += `<button type="button" class="js-page-next text-gray3 font-medium hover:text-sea-green2 px-2 md:px-3 py-1 transition">Next</button>`;
    paginationEl.innerHTML = html;

    paginationEl.querySelector(".js-page-prev")?.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage -= 1;
        renderRows();
        renderPagination();
      }
    });

    paginationEl.querySelector(".js-page-next")?.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage += 1;
        renderRows();
        renderPagination();
      }
    });

    paginationEl.querySelectorAll(".js-page-num").forEach((btn) => {
      btn.addEventListener("click", () => {
        const page = parseInt(btn.getAttribute("data-page"), 10);
        if (!Number.isNaN(page) && page !== currentPage) {
          currentPage = page;
          renderRows();
          renderPagination();
        }
      });
    });
  }

  function refresh() {
    renderRows();
    renderPagination();
  }

  function initTabs() {
    const tabGroup = section.querySelector(".js-tab-group");
    if (!tabGroup || typeof TabManager === "undefined") return;

    new TabManager(tabGroup, {
      tabSelector: ".js-tab-btn",
      activeClass: "active",
      filterAttribute: "data-filter",
      allValue: "all",
      onChange(filterValue) {
        currentCategory = filterValue;
        currentPage = 1;
        refresh();
      },
    });
  }

  function initDropdowns() {
    if (typeof CustomDropdown === "undefined") return;
    section.querySelectorAll(".js-custom-dropdown").forEach((container) => {
      new CustomDropdown(container);
    });
  }

  function initSearch() {
    if (!searchInput) return;
    let debounce;
    searchInput.addEventListener("input", () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        searchQuery = searchInput.value;
        currentPage = 1;
        refresh();
      }, 250);
    });
  }

  const previewPopup = document.querySelector(".js-upload-preview-popup");

  function openUploadPreview() {
    if (!previewPopup) return;
    previewPopup.classList.remove("hidden");
    previewPopup.classList.add("flex");
    document.body.classList.add("overflow-hidden");
  }

  function closeUploadPreview() {
    if (!previewPopup) return;
    previewPopup.classList.add("hidden");
    previewPopup.classList.remove("flex");
    document.body.classList.remove("overflow-hidden");
  }

  function initUploadPreviewPopup() {
    if (!previewPopup) return;

    previewPopup.querySelector(".js-upload-preview-close")?.addEventListener("click", closeUploadPreview);

    previewPopup.addEventListener("click", (e) => {
      if (e.target === previewPopup) closeUploadPreview();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !previewPopup.classList.contains("hidden")) {
        closeUploadPreview();
      }
    });
  }

  function bindPreviewButtons() {
    if (!rowsContainer) return;
    rowsContainer.querySelectorAll(".js-upload-view").forEach((btn) => {
      btn.addEventListener("click", openUploadPreview);
    });
  }

  $("#menu-btn").on("click", function () {
    $("#mobile-menu").toggleClass("hidden");
  });

  initUploadPreviewPopup();
  initDropdowns();
  initTabs();
  initSearch();
  refresh();
})();
