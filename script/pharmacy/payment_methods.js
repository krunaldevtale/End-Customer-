$(document).ready(function () {
  $(".editBtn").on("click", function () {
    $(".paymentMethods").hide();
    $(".addNewPaymentBtn").hide();
    $(".heading").hide();
    $(".editCardDetails").removeClass("hidden");
  });

  $(".cancelEditBtn").on("click", function () {
    $(".paymentMethods").show();
    $(".addNewPaymentBtn").show();
    $(".heading").show();
    $(".editCardDetails").addClass("hidden");
  });

  $(".addNewPaymentBtn").on("click", function () {
    $(".addNewPaymentPopup").removeClass("hidden");
  });

  $(".addNewPaymentPopup").on("click", function (e) {
    if ($(e.target).hasClass("addNewPaymentPopup")) {
      $(".addNewPaymentPopup").addClass("hidden");
    }
  });

  $(".methodType").on("click", function () {
    $(".addNewPaymentPopup").addClass("hidden");
    $(".paymentMethods").hide();
    $(".addNewPaymentBtn").hide();
    $(".heading").hide();
    $('.cardDetails').removeClass('hidden')
  });
});
