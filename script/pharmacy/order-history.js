(function () {
  const ROWS_PER_PAGE = 5;

  const ORDERS = [
    {
      id: "#R4785",
      category: "Pharmacy",
      title: "Pharmacy",
      subtitle: "Sunrise Pharmacy",
      price: "₹750",
      status: "Ongoing",
    },
    {
      id: "#R4786",
      category: "Doctor",
      title: "Doctor",
      subtitle: "Dr. Monika Singh",
      price: "₹1,200",
      status: "Successful",
    },
    {
      id: "#R4787",
      category: "Hospital",
      title: "Hospital",
      subtitle: "City Care Hospital",
      price: "₹3,450",
      status: "Successful",
    },
    {
      id: "#R4788",
      category: "Lab",
      title: "Lab",
      subtitle: "HealthScan Diagnostics",
      price: "₹550",
      status: "Ongoing",
    },
    {
      id: "#R4789",
      category: "Pharmacy",
      title: "Pharmacy",
      subtitle: "MedPlus Store",
      price: "₹420",
      status: "Successful",
    },
    {
      id: "#R4790",
      category: "Doctor",
      title: "Doctor",
      subtitle: "Dr. Aniket Sharma",
      price: "₹850",
      status: "Ongoing",
    },
    {
      id: "#R4791",
      category: "Hospital",
      title: "Hospital",
      subtitle: "Apollo Multispecialty",
      price: "₹2,100",
      status: "Successful",
    },
    {
      id: "#R4792",
      category: "Lab",
      title: "Lab",
      subtitle: "PathLab Express",
      price: "₹680",
      status: "Successful",
    },
    {
      id: "#R4793",
      category: "Pharmacy",
      title: "Pharmacy",
      subtitle: "Wellness Chemist",
      price: "₹290",
      status: "Ongoing",
    },
    {
      id: "#R4794",
      category: "Doctor",
      title: "Doctor",
      subtitle: "Dr. Priya Mehta",
      price: "₹1,100",
      status: "Successful",
    },
  ];

  const CATEGORY_ICONS = {
    Pharmacy: {
      bg: "bg-light-powder-blue",
      src: "/assets/img/ic_info.svg",
    },
    Doctor: {
      bg: "bg-pale-mint",
      src: "/assets/img/ic_info-green.svg",
    },
    Hospital: {
      bg: "bg-light-cream",
      src: "/assets/img/ic_info-yellow.svg",
    },
    Lab: {
      bg: "bg-lightest-pale-pink",
      src: "/assets/img/ic_info-red.svg",
    },
  };

  const section = document.querySelector(".js-order-history-section");
  if (!section) return;

  const rowsContainer = section.querySelector(".js-order-rows");
  const paginationEl = section.querySelector(".js-order-pagination");
  const searchInput = document.querySelector(".js-order-history-search");
  const emptyState = section.querySelector(".js-order-empty");

  let currentCategory = "all";
  let currentPage = 1;
  let searchQuery = "";
  let tabManager = null;

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function getFilteredOrders() {
    return ORDERS.filter((order) => {
      const matchesCategory =
        currentCategory === "all" || order.category === currentCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        order.id.toLowerCase().includes(q) ||
        order.title.toLowerCase().includes(q) ||
        order.subtitle.toLowerCase().includes(q) ||
        order.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }

  function getCategoryIcon(category) {
    const icon = CATEGORY_ICONS[category] || CATEGORY_ICONS.Pharmacy;
    return `
      <div class="w-9 h-9 md:w-10 md:h-10 rounded-full ${icon.bg} flex items-center justify-center shrink-0">
        <img src="${icon.src}" alt="" class="w-4 h-4 md:w-5 md:h-5 object-contain" />
      </div>
    `;
  }

  function renderRows() {
    const filtered = getFilteredOrders();
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
      .map((order) => {
        const statusClass =
          order.status === "Ongoing" ? "status-ongoing" : "status-success";
        return `
          <div class="order-history-row order-row grid grid-cols-5 items-center py-4 md:py-5 text-xs md:text-sm border-b border-gray-light3 last:border-b-0" data-category="${escapeHtml(order.category)}">
            <div class="text-center font-normal text-gray px-2">${escapeHtml(order.id)}</div>
            <div class="flex items-center justify-start gap-2 md:gap-3 px-2 md:px-4">
              ${getCategoryIcon(order.category)}
              <div class="text-left min-w-0">
                <p class="font-semibold text-sm text-gray-dark-5 truncate">${escapeHtml(order.title)}</p>
                <p class="text-xs text-dark-gray font-normal truncate">${escapeHtml(order.subtitle)}</p>
              </div>
            </div>
            <div class="text-center font-normal text-sea-green-dark1 text-sm md:text-base">${escapeHtml(order.price)}</div>
            <div class="text-center px-1">
              <span class="status-badge ${statusClass}">${escapeHtml(order.status)}</span>
            </div>
            <div class="text-center">
              <a href="/src/Pharmacy/order-details.html" class="text-sea-green2 font-normal text-xs md:text-sm hover:underline">View Details</a>
            </div>
          </div>
        `;
      })
      .join("");
  }

  function renderPagination() {
    if (!paginationEl) return;

    const filtered = getFilteredOrders();
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

    const prevBtn = paginationEl.querySelector(".js-page-prev");
    const nextBtn = paginationEl.querySelector(".js-page-next");

    prevBtn?.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage -= 1;
        renderRows();
        renderPagination();
      }
    });

    nextBtn?.addEventListener("click", () => {
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

    tabManager = new TabManager(tabGroup, {
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
    CustomDropdown.initAll(".js-custom-dropdown");
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

  initDropdowns();
  initTabs();
  initSearch();
  refresh();
})();
