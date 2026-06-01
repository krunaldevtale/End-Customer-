$(document).ready(function () {
  // Share popup
  $("#shareBtn").on("click", function () {
    $("#sharePopup").removeClass("hidden");
  });

  $("#shareCloseBtn, #sharePopup").on("click", function (e) {
    if (
      $(e.target).is("#shareCloseBtn, #sharePopup, .material-symbols-outlined")
    ) {
      $("#sharePopup").addClass("hidden");
    }
  });

  // Proforma Bill popup
  $(".billBtn").on("click", function () {
    $("#proformaPopup").removeClass("hidden");
  });

  $("#proformaCloseBtn, #proformaPopup").on("click", function (e) {
    if (
      $(e.target).is(
        "#proformaCloseBtn, #proformaPopup, .material-symbols-outlined",
      )
    ) {
      $("#proformaPopup").addClass("hidden");
    }
  });

  // Close both popups on Escape key
  $(document).on("keydown", function (e) {
    if (e.key === "Escape") {
      $("#sharePopup").addClass("hidden");
      $("#proformaPopup").addClass("hidden").removeClass("flex");
    }
  });

  $(".orderSummaryBtn").on("click", function () {
    $(".orderSummaryDetails").toggleClass("hidden");
    $(this).find(".material-symbols-outlined").toggleClass("rotate-180");
  });

  //Share Popup
  const openPopupBtns = document.querySelectorAll(".share-open-btn");
  const popupOverlay = document.querySelector(".popup-overlay");
  const closePopupBtn = document.querySelector(".popup-close-btn");

  // Open Popup
  openPopupBtns.forEach((button) => {
    button.addEventListener("click", () => {
      popupOverlay.classList.remove("hidden");
    });
  });

  // Close Popup
  closePopupBtn.addEventListener("click", () => {
    popupOverlay.classList.add("hidden");
  });

  // Close On Outside Click
  popupOverlay.addEventListener("click", (e) => {
    if (e.target === popupOverlay) {
      popupOverlay.classList.add("hidden");
    }
  });

  //Proforma Popup
  // Open Popup
  const proformaOpenBtn = document.querySelector(".proforma-open-btn");
  const proformaPopup = document.querySelector(".proforma-popup-overlay");
  const proformaCloseBtn = document.querySelector(".proforma-close-btn");

  proformaOpenBtn.addEventListener("click", () => {
    proformaPopup.classList.remove("hidden");
  });

  // Close Popup Button
  // proformaCloseBtn.addEventListener("click", () => {
  //   proformaPopup.classList.add("hidden");
  // });

  // Outside Click Close
  // proformaPopup.addEventListener("click", (e) => {
  //   if (e.target === proformaPopup) {
  //     proformaPopup.classList.add("hidden");
  //   }
  // });

  $(".proformaBtn").on("click", function (e) {
    e.stopPropagation();
    $(".proformaBillPopup").removeClass("hidden");
  });

  // Close when clicking the dark overlay (not the inner white box)
  $(".proformaBillPopup").on("click", function (e) {
    if ($(e.target).hasClass("proformaBillPopup")) {
      $(".proformaBillPopup").addClass("hidden");
    }
  });
});
