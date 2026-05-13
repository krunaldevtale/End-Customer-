$(document).ready(function() {
     $(".tab-btn").on("click", function() {
        // deactivate all tabs
        $(".tab-btn").removeClass("active");
        // activate current
        $(this).addClass("active");

        // hide all contents
        $(".tab-content").addClass("hidden");
        // show matching content
        $("#" + $(this).data("tab")).removeClass("hidden");
    });

    $('.trigger-time').on('click', function () {
      const inputId = $(this).data('target');
      const $input = $('#' + inputId);

      // Show the native time picker
      if ($input[0].showPicker) {
        $input[0].showPicker(); // Chrome & modern
      } else {
        $input.focus(); // Fallback
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
})