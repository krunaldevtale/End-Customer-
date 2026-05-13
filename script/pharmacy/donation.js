
// Select all platform bill buttons and donation bill buttons (including spans)
const platformBillBtns = document.querySelectorAll('.platform-bill-btn');
const donationBillBtns = document.querySelectorAll('.donation-bill-btn');

// Get the popups (these are unique so querySelector is fine)
const platformBillPopup = document.querySelector('.platform-bill-modal.assignmentPopup');
const donationBillPopup = document.querySelector('.platform-bill-modal.donationPopup');

// Close functions remain the same
function closePopup() {
    if (platformBillPopup) {
        platformBillPopup.classList.add('hidden');
    }
}

function closePopupDonation() {
    if (donationBillPopup) {
        donationBillPopup.classList.add('hidden');
    }
}

// Add click event to all platform bill buttons/spans
platformBillBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (platformBillPopup) {
            platformBillPopup.classList.remove('hidden');
        }
    });
});

// Add click event to all donation bill buttons/spans
donationBillBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (donationBillPopup) {
            donationBillPopup.classList.remove('hidden');
        }
    });
});

// Close when clicking outside (remains the same)
window.addEventListener('click', (e) => {
    if (e.target === platformBillPopup) closePopup();
    if (e.target === donationBillPopup) closePopupDonation();
});

//Filter Button 

function showFullscreenTable() {
    const fsTable = document.getElementById('fullscreenTable');
    fsTable.style.display = 'flex';  // show it
    document.body.style.overflow = 'hidden'; // Disable page scrolling
    window.scrollTo(0, 0); // Scroll to top
}

function exitFullscreen() {
    const fsTable = document.getElementById('fullscreenTable');
    fsTable.style.display = 'none'; // hide it again
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".filter-toggle-btn");
  const filterPopups = document.querySelectorAll(".filter-popup");

  filterBtns.forEach((btn, index) => {
    const popup = filterPopups[index];

    // Toggle popup when clicking filter button
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      popup.classList.toggle("hidden");
    });

    // Handle dropdown item click
    popup.querySelectorAll("div").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        const selectedValue = item.textContent.trim();

        // ✅ Do something with selected value (example: console log)
        console.log("Selected:", selectedValue);

        // ✅ Close popup but keep Filter button text unchanged
        popup.classList.add("hidden");
      });
    });
  });

  // Close popup if clicking outside
  document.addEventListener("click", () => {
    filterPopups.forEach((popup) => popup.classList.add("hidden"));
  });
});

//Pagination //

  const rows = document.querySelectorAll('.docTable tbody tr');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const pageBtns = document.querySelectorAll('.page-btn');

  const rowsPerPage = 3;
  let currentPage = 1;
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  // Initialize
  showPage(currentPage);
  updatePaginationButtons();

  function showPage(page) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    rows.forEach((row, index) => {
      row.style.display = (index >= start && index < end) ? '' : 'none';
    });

    // Update active page button styles
    pageBtns.forEach(btn => {
      const btnPage = parseInt(btn.dataset.page);
      if (btnPage === page) {
        btn.classList.remove('bg-gray-100', 'text-black', 'border-gray-300');
        btn.classList.add('bg-sea-green-dark', 'text-white', 'border-sea-green-dark');
      } else {
        btn.classList.remove('bg-sea-green-dark', 'text-white', 'border-sea-green-dark');
        btn.classList.add('bg-gray-100', 'text-black', 'border-gray-300');
      }
    });

    currentPage = page;
    updatePaginationButtons();
  }

  function updatePaginationButtons() {
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  }

  // Event listeners
  pageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      showPage(parseInt(btn.dataset.page));
    });
  });

  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      showPage(currentPage - 1);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
      showPage(currentPage + 1);
    }
  });


$(document).ready(function(){
  $('.view-all-btn').on('click',function(){
    $('.carousel-section-donate').hide();
    $('.search-section').hide();
    $('.sharing-section').hide();
    $('.nearby-campaign').hide();
    $('.donation-history').hide();
    $('.table-section').removeClass('hidden')
  })

  $(".tab-btn-donation").on("click", function() {
        // deactivate all tabs
        $(".tab-btn-donation").removeClass("active");
        // activate current
        $(this).addClass("active");

        // hide all contents
        $(".tab-content").addClass("hidden");
        // show matching content
        $("#" + $(this).data("tab")).removeClass("hidden");
    });

})
