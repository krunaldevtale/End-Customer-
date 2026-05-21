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
});
