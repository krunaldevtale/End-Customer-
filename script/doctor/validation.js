$(document).ready(function () {
  /**
   * Show an error message beneath a field wrapper.
   */
  function showError($el, msg) {
    $el.find(".val-error").remove();
    const $err = $(
      '<p class="val-error text-xs font-medium mt-1" style="color:#e53e3e;">' +
        '<span style="margin-right:3px;">&#9888;</span>' +
        msg +
        "</p>",
    );
    $el.append($err);
    $el
      .find(
        "input:not([type=hidden]):not([type=checkbox]), .border.rounded-2xl, .border.rounded-lg, #health-input-box, #spec-input-box, #rooms-input-box, #desc-input-box",
      )
      .first()
      .addClass("!border-red-400");
  }

  function clearError($el) {
    $el.find(".val-error").remove();
    $el
      .find(
        "input:not([type=hidden]):not([type=checkbox]), .border.rounded-2xl, .border.rounded-lg, #health-input-box, #spec-input-box, #rooms-input-box, #desc-input-box",
      )
      .first()
      .removeClass("!border-red-400");
  }

  function markValid($el) {
    clearError($el);
  }

  /* ─────────────────────────────────────────────────────────────
     DETECT PAGE TYPE
  ───────────────────────────────────────────────────────────── */
  // We detect by presence of unique elements per page
  const isHospitalPage = $("#rooms-wrapper").length > 0;
  const isLabPage =
    !isHospitalPage &&
    $("#desc-input-box").length > 0 &&
    $('input[placeholder="Enter Description"]').length === 0;
  const isDoctorPage = !isHospitalPage && !isLabPage;

  /* ─────────────────────────────────────────────────────────────
     STEP FORM — FIELD REFERENCES
  ───────────────────────────────────────────────────────────── */

  const $healthWrapper = $("#health-issues-wrapper");
  const $specWrapper = $("#specialization-wrapper");
  const $dateInput = $("#datetime-input");
  const $dateWrapper = $dateInput.closest(".flex.flex-col.gap-2.relative");
  const $budgetInput = $('input[placeholder="Enter Budget"]');
  const $budgetWrapper = $budgetInput.closest(".flex.flex-col.gap-2");
  const $patientInput = $('input[placeholder="Select Patient"]');
  const $patientWrapper = $patientInput.closest(".flex.flex-col.gap-2");
  const $consultCheckboxes = $('input[type="checkbox"]').slice(0, 2);
  const $serviceCheckboxes = $('input[type="checkbox"]').slice(2, 4);

  // Description — text input (Doctor) or dropdown (Lab/Hospital)
  const $descriptionInput = $('input[placeholder="Enter Description"]');
  const $descWrapper = isDoctorPage
    ? $descriptionInput.closest(".flex.flex-col.gap-2")
    : $("#description-wrapper");

  // Hospital-only: rooms wrapper
  const $roomsWrapper = $("#rooms-wrapper");

  /* ─────────────────────────────────────────────────────────────
     INDIVIDUAL VALIDATORS
  ───────────────────────────────────────────────────────────── */

  function validateHealthIssues() {
    const val = $("#health-hidden-input").val();
    if (!val || val.trim() === "") {
      showError($healthWrapper, "Please select at least one option.");
      return false;
    }
    markValid($healthWrapper);
    return true;
  }

  function validateSpecialization() {
    const val = $("#spec-hidden-input").val();
    if (!val || val.trim() === "") {
      const label = isLabPage
        ? "Please select an example test/package."
        : isHospitalPage
          ? "Please select a category."
          : "Please select a specialization.";
      showError($specWrapper, label);
      return false;
    }
    markValid($specWrapper);
    return true;
  }

  function validateDescription() {
    if (isDoctorPage) {
      // Plain text input
      const val = $descriptionInput.val().trim();
      if (val === "") {
        showError($descWrapper, "Please describe your concern.");
        return false;
      }
      if (val.length < 5) {
        showError($descWrapper, "Description must be at least 5 characters.");
        return false;
      }
    } else {
      // Dropdown (Lab / Hospital)
      const val = $("#desc-hidden-input").val();
      if (!val || val.trim() === "") {
        showError($descWrapper, "Please select a description.");
        return false;
      }
    }
    markValid($descWrapper);
    return true;
  }

  function validateRooms() {
    if (!isHospitalPage) return true;
    const val = $("#rooms-hidden-input").val();
    if (!val || val.trim() === "") {
      showError($roomsWrapper, "Please select a bed/room type.");
      return false;
    }
    markValid($roomsWrapper);
    return true;
  }

  function validateConsultationType() {
    const checked = $consultCheckboxes.filter(":checked").length;
    const $row = $(".stepForm .flex.flex-col.gap-\\[17px\\]").eq(0);
    if (checked === 0) {
      showError($row, "Please select a consultation type.");
      return false;
    }
    clearError($row);
    return true;
  }

  function validateServiceType() {
    const checked = $serviceCheckboxes.filter(":checked").length;
    const $row = $(".stepForm .flex.flex-col.gap-\\[17px\\]").eq(1);
    if (checked === 0) {
      showError($row, "Please select a service type.");
      return false;
    }
    clearError($row);
    return true;
  }

  function validateDateTime() {
    const val = $dateInput.val().trim();
    if (val === "") {
      showError($dateWrapper, "Please select a preferred date & time.");
      return false;
    }
    markValid($dateWrapper);
    return true;
  }

  function validateBudget() {
    const val = parseFloat($budgetInput.val());
    if ($budgetInput.val().trim() === "" || isNaN(val)) {
      showError($budgetWrapper, "Please enter a budget.");
      return false;
    }
    if (val < 3000) {
      showError($budgetWrapper, "Budget must be at least \u20B93,000.");
      return false;
    }
    markValid($budgetWrapper);
    return true;
  }

  function validatePatient() {
    const val = $patientInput.val().trim();
    if (val === "") {
      showError($patientWrapper, "Please select a patient.");
      return false;
    }
    markValid($patientWrapper);
    return true;
  }

  /* ─────────────────────────────────────────────────────────────
     CHECKBOX MUTUAL EXCLUSION (radio-like behaviour)
  ───────────────────────────────────────────────────────────── */

  $consultCheckboxes.on("change", function () {
    if ($(this).is(":checked")) {
      $consultCheckboxes.not(this).prop("checked", false);
    }
    validateConsultationType();
  });

  $serviceCheckboxes.on("change", function () {
    if ($(this).is(":checked")) {
      $serviceCheckboxes.not(this).prop("checked", false);
    }
    validateServiceType();
  });

  /* ─────────────────────────────────────────────────────────────
     REAL-TIME LISTENERS
  ───────────────────────────────────────────────────────────── */

  // Health Issues
  $("#health-hidden-input").on("change input", validateHealthIssues);
  $("#health-issues-wrapper .dropdown-menu").on("click", "li", function () {
    setTimeout(validateHealthIssues, 150);
  });
  $("#health-input-box").on("click", ".remove-tag", function () {
    setTimeout(validateHealthIssues, 150);
  });

  // Specialization / Category / Example Tests
  $("#specialization-wrapper .dropdown-menu").on("click", "li", function () {
    setTimeout(validateSpecialization, 150);
  });
  $("#spec-input-box").on("click", ".remove-spec", function () {
    setTimeout(validateSpecialization, 150);
  });
  $("#spec-hidden-input").on("change input", validateSpecialization);

  // Description
  if (isDoctorPage) {
    $descriptionInput.on("input blur", validateDescription);
  } else {
    $("#description-wrapper .dropdown-menu").on("click", "li", function () {
      setTimeout(validateDescription, 150);
    });
    $("#desc-input-box").on("click", ".remove-desc", function () {
      setTimeout(validateDescription, 150);
    });
    $("#desc-hidden-input").on("change input", validateDescription);
  }

  // Rooms (Hospital only)
  if (isHospitalPage) {
    $("#rooms-wrapper .dropdown-menu").on("click", "li", function () {
      setTimeout(validateRooms, 150);
    });
    $("#rooms-input-box").on("click", ".remove-room", function () {
      setTimeout(validateRooms, 150);
    });
    $("#rooms-hidden-input").on("change input", validateRooms);
  }

  // Date / Time
  $dateInput.on("change input", validateDateTime);
  $("#confirm-datetime").on("click", function () {
    setTimeout(validateDateTime, 100);
  });

  // Budget
  $budgetInput.on("input blur", validateBudget);

  // Patient
  $patientWrapper.find(".material-symbols-outlined").on("click", function () {
    setTimeout(validatePatient, 100);
  });
  $patientInput.on("change input", validatePatient);

  /* ─────────────────────────────────────────────────────────────
     STEP FORM SUBMIT
  ───────────────   ────────────────────────────────────────────── */

  $(".stepBtn1")
    .off("click")
    .on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      // check if user selected saved address
      const hasSelectedSavedAddress = $(".savedAddressCard.activeAddress").length > 0;

      // check if add new address flow completed
      const hasNewAddress = !$(".selectedAddress").hasClass("hidden");

      // proceed only if one of them is true
      if (hasSelectedSavedAddress || hasNewAddress) {
        $(".consultationForm").addClass("hidden");
        $(".searchingDoctorsSection").removeClass("hidden");
        $(".headerMapArea").addClass("hidden");

        $(document).trigger("searchingSectionVisible");
        return;
      }

      // otherwise open address section
      $(".addressBtn").removeClass("hidden");

      const step2 = $(".step2-indicator");
      step2.removeClass("border border-sea-green-dark1");
      step2.css("background-color", "#1a7a6e");
      step2.find("span").css("color", "white");
      $(".step-connector").css("background-color", "#1a7a6e");
    });

  $(".savedAddressCard").on("click", function () {
    $(".savedAddressCard").removeClass("activeAddress");
    $(this).addClass("activeAddress");
  });
  /* ─────────────────────────────────────────────────────────────
     ADDRESS FORM — FIELD REFERENCES
  ───────────────────────────────────────────────────────────── */

  const $addrForm = $(".addressForm form");
  const $firstName = $addrForm.find('input[placeholder="First Name"]');
  const $lastName = $addrForm.find('input[placeholder="Last Name"]');
  const $phone = $addrForm.find('input[placeholder="Phone"]');
  const $addressLine = $addrForm.find('input[placeholder="Address"]');
  const $countryWrap = $(".addressForm .dropdown-wrapper").eq(0);
  const $cityWrap = $(".addressForm .dropdown-wrapper").eq(1);
  const $areaWrap = $(".addressForm .dropdown-wrapper").eq(2);
  const $zipWrap = $(".addressForm .dropdown-wrapper").eq(3);

  /* ─────────────────────────────────────────────────────────────
     ADDRESS FORM VALIDATORS
  ───────────────────────────────────────────────────────────── */

  function validateFirstName() {
    const val = $firstName.val().trim();
    if (val === "") {
      showInputError($firstName, "First name is required.");
      return false;
    }
    if (!/^[A-Za-z\s'-]{2,50}$/.test(val)) {
      showInputError(
        $firstName,
        "Enter a valid first name (letters only, 2\u201350 chars).",
      );
      return false;
    }
    clearInputError($firstName);
    return true;
  }

  function validateLastName() {
    const val = $lastName.val().trim();
    if (val === "") {
      showInputError($lastName, "Last name is required.");
      return false;
    }
    if (!/^[A-Za-z\s'-]{2,50}$/.test(val)) {
      showInputError($lastName, "Enter a valid last name.");
      return false;
    }
    clearInputError($lastName);
    return true;
  }

  function validatePhone() {
    const val = $phone.val().trim();
    if (val === "") {
      showInputError($phone, "Phone number is required.");
      return false;
    }
    if (!/^\d{7,15}$/.test(val)) {
      showInputError($phone, "Enter a valid phone number (7\u201315 digits).");
      return false;
    }
    clearInputError($phone);
    return true;
  }

  function validateCountry() {
    const val = $countryWrap.find("input").val().trim();
    if (val === "") {
      showDropError($countryWrap, "Please select a country.");
      return false;
    }
    clearDropError($countryWrap);
    return true;
  }

  function validateCity() {
    const val = $cityWrap.find("input").val().trim();
    if (val === "") {
      showDropError($cityWrap, "Please select a city.");
      return false;
    }
    clearDropError($cityWrap);
    return true;
  }

  function validateArea() {
    const val = $areaWrap.find("input").val().trim();
    if (val === "") {
      showDropError($areaWrap, "Please select an area.");
      return false;
    }
    clearDropError($areaWrap);
    return true;
  }

  function validateZip() {
    const val = $zipWrap.find("input").val().trim();
    if (val === "") {
      showDropError($zipWrap, "Please select a zip code.");
      return false;
    }
    clearDropError($zipWrap);
    return true;
  }

  function validateAddressLine() {
    const val = $addressLine.val().trim();
    if (val === "") {
      showInputError($addressLine, "Address is required.");
      return false;
    }
    if (val.length < 5) {
      showInputError($addressLine, "Address must be at least 5 characters.");
      return false;
    }
    clearInputError($addressLine);
    return true;
  }

  function validateAddressType() {
    const isSelected =
      $(".addressForm .shadow-addressType").filter(function () {
        return $(this).css("background-color") === "rgb(232, 245, 240)";
      }).length > 0;
    const $typeRow = $(".addressForm .flex.flex-col.gap-3");
    if (!isSelected) {
      showError($typeRow, "Please choose an address type.");
      return false;
    }
    clearError($typeRow);
    return true;
  }

  /* ─────────────────────────────────────────────────────────────
     ADDRESS ERROR HELPERS
  ───────────────────────────────────────────────────────────── */

  function showInputError($input, msg) {
    clearInputError($input);
    $input.addClass("!border-red-400");
    const $err = $(
      '<p class="val-error text-xs font-medium mt-1" style="color:#e53e3e;">' +
        '<span style="margin-right:3px;">&#9888;</span>' +
        msg +
        "</p>",
    );
    $input.after($err);
  }

  function clearInputError($input) {
    $input.removeClass("!border-red-400");
    $input.siblings(".val-error").remove();
  }

  function showDropError($wrap, msg) {
    clearDropError($wrap);
    $wrap.addClass("!border-red-400");
    const $err = $(
      '<p class="val-error text-xs font-medium mt-1" style="color:#e53e3e;">' +
        '<span style="margin-right:3px;">&#9888;</span>' +
        msg +
        "</p>",
    );
    $wrap.after($err);
  }

  function clearDropError($wrap) {
    $wrap.removeClass("!border-red-400");
    $wrap.siblings(".val-error").first().remove();
  }

  /* ─────────────────────────────────────────────────────────────
     ADDRESS FORM REAL-TIME LISTENERS
  ───────────────────────────────────────────────────────────── */

  $firstName.on("input blur", validateFirstName);
  $lastName.on("input blur", validateLastName);
  $phone.on("input blur", validatePhone);
  $addressLine.on("input blur", validateAddressLine);

  $countryWrap.on("click", ".addr-option", function () {
    setTimeout(validateCountry, 100);
    clearDropError($cityWrap);
    clearDropError($areaWrap);
    clearDropError($zipWrap);
  });

  $cityWrap.on("click", ".addr-option", function () {
    setTimeout(validateCity, 100);
    clearDropError($areaWrap);
    clearDropError($zipWrap);
  });

  $areaWrap.on("click", ".addr-option", function () {
    setTimeout(validateArea, 100);
    setTimeout(validateZip, 150);
  });

  $zipWrap.on("click", ".addr-option", function () {
    setTimeout(validateZip, 100);
  });

  $(".addressForm .shadow-addressType").on("click", function () {
    setTimeout(validateAddressType, 50);
  });

  /* ─────────────────────────────────────────────────────────────
     ADDRESS FORM SUBMIT
  ───────────────────────────────────────────────────────────── */

  $(".saveNowBtn")
    .off("click")
    .on("click", function (e) {
      e.preventDefault();

      const ok = [
        validateFirstName(),
        validateLastName(),
        validatePhone(),
        validateCountry(),
        validateCity(),
        validateArea(),
        validateZip(),
        validateAddressLine(),
        validateAddressType(),
      ].every(Boolean);

      if (!ok) {
        const $firstErr = $(".addressForm .val-error").first();
        if ($firstErr.length) {
          $("html, body").animate(
            { scrollTop: $firstErr.offset().top - 120 },
            300,
          );
        }
        return;
      }

      // All valid — run original save logic
      $(".addressForm").addClass("hidden");
      $(".heading").text("Select as per your Preference");
      $(".stepIndicator").show();
      $(".stepForm").removeClass("hidden");

      const step2 = $(".step2-indicator");
      step2.removeClass("border border-sea-green-dark1");
      step2.css("background-color", "#1a7a6e");
      step2.find("span").css("color", "white");
      $(".step-connector").css("background-color", "#1a7a6e");

      $(".addressBtn").addClass("hidden");
      $(".selectedAddress").removeClass("hidden");
    });

  // Clear address form errors when reopened
  $(".addNewAddress").on("click", function () {
    $(".addressForm .val-error").remove();
    $(".addressForm .border-red-400").removeClass("border-red-400");
  });
});
