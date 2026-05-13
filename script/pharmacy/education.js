$(document).ready(function () {
  $(".read-more-btn").on("click", function () {
    const moreText = $(this).siblings(".more-text");

    if (moreText.hasClass("hidden")) {
      moreText.removeClass("hidden");
      $(this).text("Read less");
    } else {
      moreText.addClass("hidden");
      $(this).text("Read more");
    }
  });

  $(".donate-now-btn").on("click", function () {
    $(".organization-info").hide();
    $(".campaign-story").hide();
    $(".donate-btns").hide();
    $(".donate-section").removeClass("hidden");
  });

  $(".cancel-payment-btn").on("click", function () {
    $(".organization-info").show();
    $(".campaign-story").show();
    $(".donate-btns").show();
    $(".donate-section").addClass("hidden");
  });
  $(".upload-btn").on("click", function () {
    $("#fileInput").click();
  });

  // Handle file selection
  $("#fileInput").on("change", function () {
    const file = this.files[0];
    if (file) {
      $(".upload-content").html(
        `<span class="text-gray-700 text-sm truncate max-w-[9rem]">${file.name}</span>`
      );
    }
  });
});
