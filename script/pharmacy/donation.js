// ── Popup open/close ──────────────────────────────────────────────

function closePopup() {
  document
    .querySelector(".platform-bill-modal.assignmentPopup")
    ?.classList.add("hidden");
}

function closePopupDonation() {
  document
    .querySelector(".platform-bill-modal.donationPopup")
    ?.classList.add("hidden");
}

function openPopupDonation() {
  document
    .querySelector(".platform-bill-modal.donationPopup")
    ?.classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  const platformBillPopup = document.querySelector(
    ".platform-bill-modal.assignmentPopup",
  );
  const donationBillPopup = document.querySelector(
    ".platform-bill-modal.donationPopup",
  );

  // Platform bill buttons
  document.querySelectorAll(".platform-bill-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      platformBillPopup?.classList.remove("hidden");
    });
  });

  // Donation bill buttons
  document.querySelectorAll(".donation-bill-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      donationBillPopup?.classList.remove("hidden");
    });
  });

  // Close when clicking the dark overlay backdrop
  window.addEventListener("click", (e) => {
    if (e.target === platformBillPopup) closePopup();
    if (e.target === donationBillPopup) closePopupDonation();
  });

  // ── Filter toggle ──────────────────────────────────────────────
  const filterBtns = document.querySelectorAll(".filter-toggle-btn");
  const filterPopups = document.querySelectorAll(".filter-popup");

  filterBtns.forEach((btn, index) => {
    const popup = filterPopups[index];
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      popup.classList.toggle("hidden");
    });
    popup.querySelectorAll("div").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        console.log("Selected:", item.textContent.trim());
        popup.classList.add("hidden");
      });
    });
  });

  document.addEventListener("click", () => {
    filterPopups.forEach((popup) => popup.classList.add("hidden"));
  });
});

// ── Pagination ────────────────────────────────────────────────────

function initPagination({
  tableSelector,
  prevBtnId,
  nextBtnId,
  pageBtnClass,
  rowsPerPage,
}) {
  const rows = document.querySelectorAll(`${tableSelector} tbody tr`);
  const prevBtn = document.getElementById(prevBtnId);
  const nextBtn = document.getElementById(nextBtnId);
  const pageBtns = document.querySelectorAll(`.${pageBtnClass}`);

  if (!rows.length || !prevBtn || !nextBtn) return;

  const totalPages = Math.ceil(rows.length / rowsPerPage);
  let currentPage = 1;

  function showPage(page) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    rows.forEach((row, index) => {
      row.style.display = index >= start && index < end ? "" : "none";
    });
    pageBtns.forEach((btn) => {
      const isActive = parseInt(btn.dataset.page) === page;
      btn.classList.toggle("bg-sea-green-dark", isActive);
      btn.classList.toggle("text-white", isActive);
      btn.classList.toggle("border-sea-green-dark", isActive);
      btn.classList.toggle("bg-gray-100", !isActive);
      btn.classList.toggle("text-black", !isActive);
      btn.classList.toggle("border-gray-300", !isActive);
    });
    currentPage = page;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  }

  pageBtns.forEach((btn) =>
    btn.addEventListener("click", () => showPage(parseInt(btn.dataset.page))),
  );
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) showPage(currentPage - 1);
  });
  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) showPage(currentPage + 1);
  });

  showPage(1);
}

// Initialize both tables
initPagination({
  tableSelector: "#donation-history .docTable",
  prevBtnId: "prevBtn",
  nextBtnId: "nextBtn",
  pageBtnClass: "page-btn",
  rowsPerPage: 3,
});

initPagination({
  tableSelector: "#organizations .docTable",
  prevBtnId: "prevBtnOrg",
  nextBtnId: "nextBtnOrg",
  pageBtnClass: "page-btn-org",
  rowsPerPage: 3,
});
// ── jQuery section ────────────────────────────────────────────────

$(document).ready(function () {
  $(".view-all-btn").on("click", function () {
    $(
      ".carousel-section-donate, .search-section, .sharing-section, .nearby-campaign, .donation-history",
    ).hide();
    $(".table-section").removeClass("hidden");
  });

  $(".tab-btn-donation").on("click", function () {
    $(".tab-btn-donation").removeClass("active");
    $(this).addClass("active");
    $(".tab-content").addClass("hidden");
    $("#" + $(this).data("tab")).removeClass("hidden");
  });

  let currentCategory = "";

  $(".educationBtn, .healthBtn, .povertyBtn, .othersBtn").on(
    "click",
    function () {
      currentCategory = $(this).data("category");
      $(".category-label-campaign").text(currentCategory);
      $(".mainSection").hide();
      $(".campaign-section").removeClass("hidden");
    },
  );

  $(".contributeBtn").on("click", function () {
    $(".category-link-contribute").text(currentCategory);
    $(".category-pill-label").text(currentCategory);
    $(".campaign-section").addClass("hidden");
    $(".contribute-section").removeClass("hidden");
  });


  $('.payment-btn').on('click',function(){
    $('.paymentProcessingOverlay').removeClass('hidden')
    setTimeout(()=>{
    $('.paymentProcessingOverlay').addClass('hidden')
    $('.donationSuccessPopup').removeClass('hidden')
    },[3000])
  })
});
