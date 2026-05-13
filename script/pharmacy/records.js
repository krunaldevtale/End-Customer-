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
            .find(".custom-select-menu"),
        )
        .addClass("hidden");
      $(this)
        .closest(".custom-select-container")
        .find(".custom-select-menu")
        .toggleClass("hidden");
    },
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
    },
  );

  // Close all dropdowns when clicking outside
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".custom-select-container").length) {
      $(".custom-select-menu").addClass("hidden");
    }
  });

  $(".search-btn").on("click", function () {
    $(".left-img").hide();
    $(".right-img").hide();
    $(".content-div")
      .removeClass(" justify-between")
      .addClass("justify-center")
      .addClass("md:pt-[11rem]");
    $(".container")
      .removeClass("bg-gradient-to-r from-[#99EAD6] to-[#407672]")
      .addClass("bg-white");
    $(".search-box").addClass("border").addClass("border-deep-teal-green");
    $(".main-heading")
      .removeClass("text-white")
      .addClass("text-deep-teal-green");
    $(".secondary-heading")
      .removeClass("text-white")
      .addClass("text-deep-teal-green");
    $(".record-type").removeClass("hidden");
  });

  //header
  $("#menu-btn").on("click", function () {
    $("#mobile-menu").toggleClass("hidden");
  });
  $("#mobile-submenu-btn").on("click", function () {
    $("#mobile-submenu").toggleClass("hidden");
  });
  const cards = $(".cards > div");
  const itemsPerPage = 8;
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
          "w-8 h-8 flex items-center justify-center rounded-md bg-silver cursor-pointer",
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
      "active bg-sea-green-deep text-white",
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

  $(document).on("click", ".upload-area", function () {
    $("#fileInput").click();
  });

  // File selected
  $("#fileInput").on("change", function () {
    if (this.files && this.files[0]) {
      showPreview(this.files[0]);
    }
  });

  // Replace button click
  $(document).on("click", ".replaceBtn", function () {
    $("#fileInput").click();
  });

  $(".getDetailsBtn").on("click", function () {
    $(".detailsSection").removeClass("hidden");
    $(".getDetailsBtn").hide();
    $(".uploadPopup > div")
      .addClass("grow-transition")
      .css("max-height", "80vh");
    $(".uploadPopup > div").removeClass("mt-40").addClass("mt-10");
    $(".patient-doctor-dropdowns").hide();
    $(".point-detail").removeClass("hidden");
    $(".editDetails-btn").removeClass("hidden");
    $(".replaceBtn").addClass("hidden");
  });

  $(".cancelBtn").on("click", function () {
    $(".detailsSection").addClass("hidden");
    $(".getDetailsBtn").show();
    $(".uploadPopup > div")
      .removeClass("grow-transition")
      .css("max-height", "45vh");
    $(".uploadPopup > div").addClass("mt-40").addClass("mt-10");
    $(".patient-doctor-dropdowns").show();
    $(".point-detail").addClass("hidden");
    $(".editDetails-btn").addClass("hidden");
    $(".replaceBtn").removeClass("hidden");
  });
  $(".submit-btn").on("click", function () {
    $(".uploadPopup").addClass("hidden");
    $(".successPopup").removeClass("hidden");
  });
  $(".backToHome-btn").on("click", function () {
    $(".successPopup").addClass("hidden");
    $("body").removeClass("overflow-hidden");
  });

  const dailyLabels = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const dailyData = [1200, 1850, 1400, 2100, 1750, 2400, 1900];

  const monthlyLabels = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const monthlyData = [
    2350, 3150, 2600, 2900, 3950, 3400, 3100, 3200, 2900, 2200, 2700, 3600,
  ];

  const ctx = document.getElementById("salesChart").getContext("2d");

  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, "rgba(29, 158, 117, 0.30)");
  gradient.addColorStop(1, "rgba(29, 158, 117, 0.02)");

  const verticalLinePlugin = {
    id: "verticalLine",
    afterDatasetsDraw(chart) {
      const {
        ctx,
        chartArea: { bottom },
        tooltip,
      } = chart;
      if (!tooltip || !tooltip._active || tooltip._active.length === 0) return;

      const activePoint = tooltip._active[0];
      const x = activePoint.element.x;
      const y = activePoint.element.y;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, bottom);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "#1D9E75";
      ctx.stroke();
      ctx.restore();
    },
  };

  const salesChart = new Chart(ctx, {
    type: "line",
    plugins: [verticalLinePlugin],
    data: {
      labels: monthlyLabels,
      datasets: [
        {
          label: "Sales",
          data: monthlyData,
          fill: true,
          backgroundColor: gradient,
          borderColor: "#1D9E75",
          borderWidth: 2.5,
          pointRadius: 0,
          pointHoverRadius: 7,
          pointBackgroundColor: "#1D9E75",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          tension: 0.45,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          backgroundColor: "#1a2332",
          titleColor: "#ffffff",
          bodyColor: "#ffffff",
          padding: 10,
          cornerRadius: 8,
          displayColors: false,
          callbacks: {
            title: (items) =>
              `${items[0].parsed.y.toLocaleString("en-IN")} sales`,
            label: () => "₹25,00",
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: {
            color: "#aaa",
            font: { size: 12 },
            autoSkip: false,
            maxRotation: 0,
          },
        },
        y: {
          min: 0,
          max: 5000,
          border: { display: false },
          grid: {
            color: "rgba(0,0,0,0.07)",
            drawTicks: false,
          },
          ticks: {
            color: "#aaa",
            font: { size: 12 },
            padding: 10,
            stepSize: 1000,
            callback: (v) => (v === 0 ? "0" : v / 1000 + "k"),
          },
        },
      },
      interaction: { mode: "nearest", intersect: false },
      layout: { padding: { top: 20, right: 10 } },
    },
  });

  // Active button style helpers
  function setActiveBtn(activeBtn, inactiveBtn) {
    activeBtn.classList.add("bg-sea-green-dark1");
    activeBtn.querySelector("span").classList.add("text-white");
    activeBtn.querySelector("span").classList.remove("text-gray");

    inactiveBtn.classList.remove("bg-sea-green-dark1");
    inactiveBtn.querySelector("span").classList.remove("text-white");
    inactiveBtn.querySelector("span").classList.add("text-gray");
  }

  // Button click handlers
  $(".monthlyBtn").on("click", function () {
    salesChart.data.labels = monthlyLabels;
    salesChart.data.datasets[0].data = monthlyData;
    salesChart.options.scales.y.max = 5000;
    salesChart.options.scales.y.ticks.stepSize = 1000;
    salesChart.update();
    setActiveBtn($(".monthlyBtn")[0], $(".dailyBtn")[0]);
  });

  $(".dailyBtn").on("click", function () {
    salesChart.data.labels = dailyLabels;
    salesChart.data.datasets[0].data = dailyData;
    salesChart.options.scales.y.max = 3000;
    salesChart.options.scales.y.ticks.stepSize = 500;
    salesChart.update();
    setActiveBtn($(".dailyBtn")[0], $(".monthlyBtn")[0]);
  });

  // Set monthly as default active
  setActiveBtn($(".monthlyBtn")[0], $(".dailyBtn")[0]);
});

function showPreview(file) {
  let reader = new FileReader();
  reader.onload = function (e) {
    $(".upload-area").html(`
            <div class="flex justify-center items-center">
                <img src="${e.target.result}" alt="image preview" class="h-[120px] object-contain"/>
            </div>
        `);
    $(".fileName").text(file.name);
    $(".fileInfo").removeClass("hidden");
  };
  reader.readAsDataURL(file);
}

// ─── Chart Dropdown (Select filter) ───────────────────────────────────────
$(document).on("click", ".dropdown-wrapper", function (e) {
  e.stopPropagation();
  $(this).find(".dropdown-menu").toggleClass("hidden");
});

$(document).on("click", ".dropdown-menu li", function (e) {
  e.stopPropagation();
  const value = $(this).text().trim();
  $(this).closest(".dropdown-wrapper").find(".dropdown-text").val(value);
  $(this).closest(".dropdown-menu").addClass("hidden");
});

// ─── Close dropdown on outside click ──────────────────────────────────────
$(document).on("click", function () {
  $(".dropdown-menu").addClass("hidden");
});

// ─── Calendar (Flatpickr) ──────────────────────────────────────────────────
$("head").append(
  '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">'
);

$.getScript("https://cdn.jsdelivr.net/npm/flatpickr", function () {
  const $input = $('input[placeholder="Select Date"]');

  flatpickr($input[0], {
    dateFormat: "d M Y",
    disableMobile: true,
    position: "below left", // best alignment for your UI
    allowInput: false,

   
  });

});
