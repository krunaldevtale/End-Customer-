$(document).ready(function () {
  $(".help-option").on("click", function () {
    $(".help-option")
      .removeClass("bg-mint-cream border-none")
      .addClass("border-gainsboro-gray")
      .find("p")
      .removeClass("text-deep-teal-green")
      .addClass("text-gray");

    $(this)
      .addClass("bg-mint-cream border-none")
      .removeClass("border-gainsboro-gray")
      .find("p")
      .removeClass("text-gray")
      .addClass("text-deep-teal-green");
  });

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
