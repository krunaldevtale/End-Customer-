$(document).ready(function () {
  $(".consultBtn").on("click", function () {
    $(".homeSection").hide();
    $(".consultationForm").removeClass("hidden");
  });
  // ─── Health Issues Multi-Select ─────────────────────────────────────────────
  const healthWrapper = $("#health-issues-wrapper");
  const healthInputBox = $("#health-input-box");
  const healthPlaceholder = $("#health-placeholder");
  const healthHidden = $("#health-hidden-input");
  const healthMenu = healthWrapper.find(".dropdown-menu");
  const healthToggle = healthWrapper.find(".dropdown-toggle");
  let selectedHealthIssues = [];

  healthInputBox.on("click", function (e) {
    e.stopPropagation();
    closeAllDropdowns(healthWrapper[0]);
    healthMenu.toggleClass("hidden");
    healthToggle.text(
      healthMenu.hasClass("hidden")
        ? "keyboard_arrow_down"
        : "keyboard_arrow_up",
    );
  });

  healthMenu.find("li").on("click", function (e) {
    e.stopPropagation();
    const value = $(this).text().trim();
    if (!selectedHealthIssues.includes(value)) {
      selectedHealthIssues.push(value);
      //   $(this).addClass("bg-sea-green-selected").css("color", "#1a7a6e");
    } else {
      selectedHealthIssues = selectedHealthIssues.filter((v) => v !== value);
      //   $(this).removeClass("bg-sea-green-selected").css("color", "");
    }
    renderHealthTags();
  });

  function renderHealthTags() {
    healthInputBox.find(".health-tag").remove();
    if (selectedHealthIssues.length === 0) {
      healthPlaceholder.show();
    } else {
      healthPlaceholder.hide();
      selectedHealthIssues.forEach(function (issue) {
        const tag = $(
          '<span class="health-tag inline-flex items-center gap-1 text-black text-sm font-semibold px-2.5 py-1 rounded-full mr-0.5 bg-white shadow-request-box">' +
            "<span>" +
            issue +
            "</span>" +
            '<button type="button" class="remove-tag focus:outline-none flex items-center cursor-pointer" data-value="' +
            issue +
            '">' +
            '<svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">' +
            '<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>' +
            "</svg>" +
            "</button>" +
            "</span>",
        );
        healthToggle.before(tag);
      });
    }
    healthHidden.val(selectedHealthIssues.join(","));
    healthInputBox
      .find(".remove-tag")
      .off("click")
      .on("click", function (e) {
        e.stopPropagation();
        const val = $(this).data("value");
        selectedHealthIssues = selectedHealthIssues.filter((v) => v !== val);
        healthMenu.find("li").each(function () {
          if ($(this).text().trim() === val) {
            $(this).removeClass("bg-sea-green-selected").css("color", "");
          }
        });
        renderHealthTags();
      });
  }

  // ─── Specialization Single-Select with tag ───────────────────────────────────
  const specWrapper = $("#specialization-wrapper");
  const specInputBox = $("#spec-input-box");
  const specPlaceholder = $("#spec-placeholder");
  const specHidden = $("#spec-hidden-input");
  const specMenu = specWrapper.find(".dropdown-menu");
  const specToggle = specWrapper.find(".dropdown-toggle");
  let selectedSpec = null;

  specInputBox.on("click", function (e) {
    e.stopPropagation();
    closeAllDropdowns(specWrapper[0]);
    specMenu.toggleClass("hidden");
    specToggle.text(
      specMenu.hasClass("hidden") ? "keyboard_arrow_down" : "keyboard_arrow_up",
    );
  });

  specMenu.find("li").on("click", function (e) {
    e.stopPropagation();
    selectedSpec = $(this).find("p").text().trim();
    specMenu.find("li").css("background", "");
    $(this).css("background", "#e8f5f0");
    specMenu.addClass("hidden");
    specToggle.text("keyboard_arrow_down");
    renderSpecTag();
  });

  function renderSpecTag() {
    specInputBox.find(".spec-tag").remove();
    if (!selectedSpec) {
      specPlaceholder.show();
    } else {
      specPlaceholder.hide();
      const tag = $(
        '<span class="spec-tag inline-flex items-center gap-1 bg-white shadow-request-box text-black text-sm font-semibold px-2.5 py-1 rounded-full mr-0.5">' +
          "<span>" +
          selectedSpec +
          "</span>" +
          '<button type="button" class="remove-spec focus:outline-none flex items-center cursor-pointer">' +
          '<svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">' +
          '<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>' +
          "</svg>" +
          "</button>" +
          "</span>",
      );
      specToggle.before(tag);
    }
    specHidden.val(selectedSpec || "");
    specInputBox
      .find(".remove-spec")
      .off("click")
      .on("click", function (e) {
        e.stopPropagation();
        selectedSpec = null;
        specMenu.find("li").css("background", "");
        renderSpecTag();
      });
  }

  // ─── Close all dropdowns ─────────────────────────────────────────────────────
  function closeAllDropdowns(except) {
    $(".dropdown-menu").each(function () {
      if ($(this).closest(".dropdown-wrapper")[0] !== except) {
        $(this).addClass("hidden");
      }
    });
    // address dropdowns
    $(".addr-dropdown-menu").each(function () {
      if ($(this).closest(".dropdown-wrapper")[0] !== except) {
        $(this).addClass("hidden");
        const wrapper = $(this).closest(".dropdown-wrapper");
        wrapper.find(".dropdown-toggle").text("keyboard_arrow_down");
      }
    });
    if (!except) {
      $(".dropdown-wrapper .dropdown-toggle").text("keyboard_arrow_down");
    }
    ["#hour-menu", "#minute-menu", "#ampm-menu"].forEach(function (id) {
      if ($(id).closest(".time-part-wrapper")[0] !== except) {
        $(id).addClass("hidden");
        $(id)
          .siblings(".time-part-trigger")
          .find(".material-symbols-outlined")
          .text("keyboard_arrow_down");
      }
    });
  }

  $(document).on("click", function () {
    closeAllDropdowns(null);
    closeDateTimePicker();
  });

  // ─── Time — 3 separate dropdowns (Hour / Minute / AM-PM) ────────────────────
  let selHour = "9",
    selMinute = "00",
    selAmpm = "AM";

  const hourMenu = $("#hour-menu");
  for (let h = 1; h <= 12; h++) {
    const item = $(
      '<div class="time-option px-3 py-1.5 text-sm font-medium cursor-pointer hover:bg-green-50 transition flex items-center justify-between" data-val="' +
        h +
        '">' +
        "<span>" +
        h +
        "</span>" +
        (h === 9
          ? '<span class="check-icon material-symbols-outlined text-sm" style="color:#1a7a6e;font-size:15px;">check</span>'
          : "") +
        "</div>",
    );
    hourMenu.append(item);
  }

  const minuteMenu = $("#minute-menu");
  for (let m = 0; m < 60; m += 5) {
    const val = m < 10 ? "0" + m : "" + m;
    const item = $(
      '<div class="time-option px-3 py-1.5 text-sm font-medium cursor-pointer hover:bg-green-50 transition flex items-center justify-between" data-val="' +
        val +
        '">' +
        "<span>" +
        val +
        "</span>" +
        (val === "00"
          ? '<span class="check-icon material-symbols-outlined text-sm" style="color:#1a7a6e;font-size:15px;">check</span>'
          : "") +
        "</div>",
    );
    minuteMenu.append(item);
  }

  const ampmMenu = $("#ampm-menu");
  ["AM", "PM"].forEach(function (ap) {
    const item = $(
      '<div class="time-option px-3 py-1.5 text-sm font-medium cursor-pointer hover:bg-green-50 transition flex items-center justify-between" data-val="' +
        ap +
        '">' +
        "<span>" +
        ap +
        "</span>" +
        (ap === "AM"
          ? '<span class="check-icon material-symbols-outlined text-sm" style="color:#1a7a6e;font-size:15px;">check</span>'
          : "") +
        "</div>",
    );
    ampmMenu.append(item);
  });

  function bindTimePart(triggerId, menuId, displayId, onSelect) {
    const trigger = $("#" + triggerId);
    const menu = $("#" + menuId);
    const display = $("#" + displayId);
    const arrow = trigger.find(".material-symbols-outlined");

    trigger.on("click", function (e) {
      e.stopPropagation();
      const wasHidden = menu.hasClass("hidden");
      closeAllDropdowns(null);
      if (wasHidden) {
        menu.removeClass("hidden");
        arrow.text("keyboard_arrow_up");
      }
    });

    menu.on("click", ".time-option", function (e) {
      e.stopPropagation();
      const val = $(this).data("val").toString();
      display.text(val);

      // Update check icons
      menu.find(".time-option").each(function () {
        $(this).find(".check-icon").remove();
        if ($(this).data("val").toString() === val) {
          $(this).append(
            '<span class="check-icon material-symbols-outlined text-sm" style="color:#1a7a6e;font-size:15px;">check</span>',
          );
        }
      });

      menu.addClass("hidden");
      arrow.text("keyboard_arrow_down");

      // Active styling: blue border + white bg; others go gray
      setActiveTimeTrigger(triggerId);

      onSelect(val);
      updateDateTimeInput();
    });

    menu.on("click", function (e) {
      e.stopPropagation();
    });
  }
  function setActiveTimeTrigger(activeId) {
    ["hour-trigger", "minute-trigger", "ampm-trigger"].forEach(function (id) {
      const el = $("#" + id);
      if (id === activeId) {
        el.removeClass("border-gray-200 bg-gray-100").addClass(
          "border-2 border-blue-400 bg-white",
        );
        el.find(".material-symbols-outlined").css("color", "");
        el.find("span:first").css("color", "#374151"); // gray-700
      } else {
        el.removeClass("border-2 border-blue-400 bg-white").addClass(
          "border border-gray-200 bg-gray-100",
        );
        el.find("span:first").css("color", "#9ca3af"); // gray-400
      }
    });
  }
  bindTimePart("hour-trigger", "hour-menu", "hour-display", function (v) {
    selHour = v;
  });
  bindTimePart("minute-trigger", "minute-menu", "minute-display", function (v) {
    selMinute = v;
  });
  bindTimePart("ampm-trigger", "ampm-menu", "ampm-display", function (v) {
    selAmpm = v;
  });

  // Hour is active by default
  setActiveTimeTrigger("hour-trigger");

  // ─── Custom Calendar Picker ───────────────────────────────────────────────────
  const calendarIcon = $("#calendar-icon");
  const dtInput = $("#datetime-input");
  const pickerEl = $("#datetime-picker");
  let currentYear,
    currentMonth,
    selectedDate = null;
  const now = new Date();
  currentYear = now.getFullYear();
  currentMonth = now.getMonth();

  calendarIcon.on("click", function (e) {
    e.stopPropagation();
    closeAllDropdowns(null);
    if (pickerEl.hasClass("hidden")) {
      renderCalendar(currentYear, currentMonth);
      pickerEl.removeClass("hidden");
    } else {
      pickerEl.addClass("hidden");
    }
  });

  dtInput.on("click", function (e) {
    e.stopPropagation();
    if (pickerEl.hasClass("hidden")) {
      renderCalendar(currentYear, currentMonth);
      pickerEl.removeClass("hidden");
    }
  });

  pickerEl.on("click", function (e) {
    e.stopPropagation();
  });

  function closeDateTimePicker() {
    pickerEl.addClass("hidden");
  }

  function renderCalendar(year, month) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    $("#cal-month-year").text(monthNames[month] + " " + year);

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    let html = '<div class="grid grid-cols-7 gap-1 mb-1 bg-[#F5F7FA]">';
    ["S", "M", "T", "W", "T", "F", "S"].forEach(function (d) {
      html +=
        '<div class="text-center text-sm font-normal text-[#424242] py-3 px-2.5">' +
        d +
        "</div>";
    });
    html += '</div><div class="grid grid-cols-7 gap-1">';
    for (let i = 0; i < firstDay; i++) html += "<div></div>";
    for (let d = 1; d <= daysInMonth; d++) {
      const isPast =
        new Date(year, month, d) <
        new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === d &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year;
      const isToday =
        today.getDate() === d &&
        today.getMonth() === month &&
        today.getFullYear() === year;

      let style = "",
        cls =
          "cal-day text-center text-sm py-1.5 rounded-lg font-medium transition-all ";
      if (isPast) {
        cls += "text-gray-300 cursor-not-allowed";
      } else if (isSelected) {
        cls += "text-white cursor-pointer";
        style = 'style="background-color:#238B6D;"';
      } else if (isToday) {
        cls += "cursor-pointer";
        style = 'style="font-weight:700;color:#1a7a6e;"';
      } else {
        cls += "hover:bg-[#4EAD603D] text-[#494E50] cursor-pointer";
      }

      html +=
        '<div class="' +
        cls +
        '" ' +
        style +
        ' data-day="' +
        d +
        '" data-past="' +
        isPast +
        '">' +
        d +
        "</div>";
    }
    html += "</div>";
    $("#cal-days").html(html);
    $("#cal-days .cal-day").on("click", function () {
      if ($(this).data("past")) return;
      selectedDate = new Date(year, month, parseInt($(this).data("day")));
      renderCalendar(year, month);
      updateDateTimeInput();
    });
  }

  $("#cal-prev").on("click", function () {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar(currentYear, currentMonth);
  });
  $("#cal-next").on("click", function () {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar(currentYear, currentMonth);
  });

  $("#confirm-datetime").on("click", function () {
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }
    updateDateTimeInput();
    closeDateTimePicker();
  });

  function updateDateTimeInput() {
    if (selectedDate) {
      const dateStr = selectedDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      dtInput.val(
        dateStr + "  &  " + selHour + ":" + selMinute + " " + selAmpm,
      );
    }
  }

  // ─── Submit ──────────────────────────────────────────────────────────────────
  let submitState = 0;

  $(".stepBtn1").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    console.log("stepBtn1 clicked, submitState =", submitState);

    if (submitState === 0) {
      submitState = 1;
      $(".addressBtn").removeClass("hidden");

      const step2 = $(".step2-indicator");
      step2.removeClass("border border-sea-green-dark1");
      step2.css("background-color", "#1a7a6e");
      step2.find("span").css("color", "white");
      $(".step-connector").css("background-color", "#1a7a6e");
    } else if (submitState === 1) {
      submitState = 2;
      console.log("Transitioning to searchingDoctorsSection");
      $(".consultationForm").addClass("hidden");
      $(".searchingDoctorsSection").removeClass("hidden");
      $('.headerMapArea').removeClass('hidden')
    }
  });

  $(".addNewAddress").on("click", function () {
    $(".stepForm").addClass("hidden");
    $(".heading").text("Add Your Address");
    $(".addressForm").removeClass("hidden");
    $(".stepIndicator").hide();
  });

  // ─── Address Form Dropdowns ───────────────────────────────────────────────────

  // Data
  const addressData = {
    countries: [
      "India",
      "United States",
      "United Kingdom",
      "Canada",
      "Australia",
      "UAE",
      "Singapore",
    ],
    cities: {
      India: [
        "Bengaluru",
        "Mumbai",
        "Delhi",
        "Chennai",
        "Hyderabad",
        "Kolkata",
        "Pune",
        "Ahmedabad",
        "Jaipur",
        "Surat",
      ],
      "United States": [
        "New York",
        "Los Angeles",
        "Chicago",
        "Houston",
        "Phoenix",
        "Philadelphia",
        "San Antonio",
        "San Diego",
      ],
      "United Kingdom": [
        "London",
        "Birmingham",
        "Manchester",
        "Leeds",
        "Glasgow",
        "Southampton",
        "Liverpool",
      ],
      Canada: [
        "Toronto",
        "Montreal",
        "Vancouver",
        "Calgary",
        "Edmonton",
        "Ottawa",
        "Winnipeg",
      ],
      Australia: [
        "Sydney",
        "Melbourne",
        "Brisbane",
        "Perth",
        "Adelaide",
        "Gold Coast",
        "Canberra",
      ],
      UAE: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah"],
      Singapore: ["Singapore"],
    },
    areas: {
      Bengaluru: [
        "Koramangala",
        "Indiranagar",
        "Whitefield",
        "HSR Layout",
        "Jayanagar",
        "BTM Layout",
        "Electronic City",
        "Marathahalli",
        "Bannerghatta Road",
        "Yelahanka",
        "Hebbal",
        "JP Nagar",
        "Rajajinagar",
        "Malleshwaram",
        "Vijayanagar",
      ],
      Mumbai: [
        "Andheri",
        "Bandra",
        "Dadar",
        "Kurla",
        "Thane",
        "Borivali",
        "Powai",
        "Juhu",
        "Goregaon",
        "Malad",
      ],
      Delhi: [
        "Connaught Place",
        "Dwarka",
        "Rohini",
        "Lajpat Nagar",
        "Saket",
        "Karol Bagh",
        "Vasant Kunj",
        "Pitampura",
      ],
      Chennai: [
        "T. Nagar",
        "Anna Nagar",
        "Adyar",
        "Velachery",
        "Tambaram",
        "Porur",
        "Nungambakkam",
      ],
      Hyderabad: [
        "Banjara Hills",
        "Jubilee Hills",
        "Gachibowli",
        "Madhapur",
        "Kukatpally",
        "Ameerpet",
        "Secunderabad",
      ],
      Kolkata: [
        "Park Street",
        "Salt Lake",
        "New Town",
        "Howrah",
        "Behala",
        "Tollygunge",
      ],
      Pune: [
        "Koregaon Park",
        "Viman Nagar",
        "Hinjewadi",
        "Kothrud",
        "Baner",
        "Wakad",
        "Pimple Saudagar",
      ],
      "New York": [
        "Manhattan",
        "Brooklyn",
        "Queens",
        "The Bronx",
        "Staten Island",
      ],
      London: [
        "Westminster",
        "Camden",
        "Islington",
        "Hackney",
        "Tower Hamlets",
        "Kensington",
        "Chelsea",
      ],
      Dubai: [
        "Downtown Dubai",
        "Deira",
        "Bur Dubai",
        "Jumeirah",
        "Marina",
        "Business Bay",
        "Al Barsha",
      ],
    },
    zipCodes: {
      Koramangala: ["560034", "560095"],
      Indiranagar: ["560038", "560008"],
      Whitefield: ["560066", "560067"],
      "HSR Layout": ["560102"],
      Jayanagar: ["560011", "560041", "560069", "560070"],
      "BTM Layout": ["560076", "560029"],
      "Electronic City": ["560100"],
      Marathahalli: ["560037"],
      "Bannerghatta Road": ["560076", "560083"],
      Yelahanka: ["560064"],
      Hebbal: ["560024"],
      "JP Nagar": ["560078"],
      Rajajinagar: ["560010", "560021", "560055"],
      Malleshwaram: ["560003"],
      Vijayanagar: ["560040"],
      Andheri: ["400053", "400058", "400069"],
      Bandra: ["400050", "400051"],
      "Koregaon Park": ["411001"],
      Gachibowli: ["500032"],
      "Downtown Dubai": ["00000"],
      Manhattan: ["10001", "10002", "10003"],
      Westminster: ["SW1A 1AA", "SW1A 2AA"],
    },
  };

  let addrCountry = "",
    addrCity = "",
    addrArea = "",
    addrZip = "";

  // Helper: build a dropdown menu element
  function buildAddrDropdown(items, onSelect, emptyMsg) {
    const menu = $(
      '<div class="addr-dropdown-menu hidden absolute left-0 right-0 bg-white border border-cool-fog rounded-lg shadow-lg z-[200] max-h-[200px] overflow-y-auto no-scrollbar" style="top:100%; margin-top:4px;"></div>',
    );
    if (!items || items.length === 0) {
      menu.append(
        '<div class="px-3 py-2 text-sm text-gray-400">' +
          (emptyMsg || "No options available") +
          "</div>",
      );
    } else {
      items.forEach(function (item) {
        const li = $(
          '<div class="addr-option px-3 py-2 text-base font-semibold text-black cursor-pointer hover:bg-light-gray transition"></div>',
        ).text(item);
        li.on("click", function (e) {
          e.stopPropagation();
          onSelect(item);
          menu.addClass("hidden");
          menu
            .closest(".dropdown-wrapper")
            .find(".dropdown-toggle")
            .text("keyboard_arrow_down");
        });
        menu.append(li);
      });
    }
    return menu;
  }

  // Helper: get the input inside a wrapper
  function getAddrInput(wrapper) {
    return wrapper.find('input[type="text"]');
  }

  // Helper: open address dropdown
  function openAddrDropdown(wrapper, items, onSelect, emptyMsg) {
    // Remove any existing addr-dropdown-menu inside this wrapper
    wrapper.find(".addr-dropdown-menu").remove();
    const toggle = wrapper.find(".dropdown-toggle");

    if (items !== null) {
      const menu = buildAddrDropdown(items, onSelect, emptyMsg);
      wrapper.append(menu);
      // Close on outside click handled by document
      setTimeout(function () {
        menu.removeClass("hidden");
      }, 0);
      toggle.text("keyboard_arrow_up");

      menu.on("click", function (e) {
        e.stopPropagation();
      });
    }
  }

  // ── Country ──────────────────────────────────────────────────────────────────
  const countryWrapper = $(".addressForm .dropdown-wrapper").eq(0);
  countryWrapper.css("position", "relative");
  countryWrapper.on("click", function (e) {
    e.stopPropagation();
    const isOpen =
      !countryWrapper.find(".addr-dropdown-menu").hasClass("hidden") &&
      countryWrapper.find(".addr-dropdown-menu").length > 0;
    closeAllAddrDropdowns();
    if (!isOpen) {
      openAddrDropdown(countryWrapper, addressData.countries, function (val) {
        addrCountry = val;
        addrCity = "";
        addrArea = "";
        addrZip = "";
        getAddrInput(countryWrapper).val(val);
        getAddrInput(cityWrapper).val("");
        getAddrInput(areaWrapper).val("");
        getAddrInput(zipWrapper).val("");
      });
    }
  });

  // ── City ──────────────────────────────────────────────────────────────────────
  const cityWrapper = $(".addressForm .dropdown-wrapper").eq(1);
  cityWrapper.css("position", "relative");
  cityWrapper.on("click", function (e) {
    e.stopPropagation();
    if (!addrCountry) {
      alert("Please select a country first.");
      return;
    }
    const cities = addressData.cities[addrCountry] || [];
    const isOpen =
      !cityWrapper.find(".addr-dropdown-menu").hasClass("hidden") &&
      cityWrapper.find(".addr-dropdown-menu").length > 0;
    closeAllAddrDropdowns();
    if (!isOpen) {
      openAddrDropdown(
        cityWrapper,
        cities,
        function (val) {
          addrCity = val;
          addrArea = "";
          addrZip = "";
          getAddrInput(cityWrapper).val(val);
          getAddrInput(areaWrapper).val("");
          getAddrInput(zipWrapper).val("");
        },
        "No cities available",
      );
    }
  });

  // ── Area ──────────────────────────────────────────────────────────────────────
  const areaWrapper = $(".addressForm .dropdown-wrapper").eq(2);
  areaWrapper.css("position", "relative");
  areaWrapper.on("click", function (e) {
    e.stopPropagation();
    if (!addrCity) {
      alert("Please select a city first.");
      return;
    }
    const areas = addressData.areas[addrCity] || [];
    const isOpen =
      !areaWrapper.find(".addr-dropdown-menu").hasClass("hidden") &&
      areaWrapper.find(".addr-dropdown-menu").length > 0;
    closeAllAddrDropdowns();
    if (!isOpen) {
      openAddrDropdown(
        areaWrapper,
        areas,
        function (val) {
          addrArea = val;
          addrZip = "";
          getAddrInput(areaWrapper).val(val);
          // Auto-populate zip if available
          const zips = addressData.zipCodes[val];
          if (zips && zips.length === 1) {
            addrZip = zips[0];
            getAddrInput(zipWrapper).val(zips[0]);
          } else {
            getAddrInput(zipWrapper).val("");
          }
        },
        "No areas available",
      );
    }
  });

  // ── Zip Code ──────────────────────────────────────────────────────────────────
  const zipWrapper = $(".addressForm .dropdown-wrapper").eq(3);
  zipWrapper.css("position", "relative");
  zipWrapper.on("click", function (e) {
    e.stopPropagation();
    if (!addrArea) {
      alert("Please select an area first.");
      return;
    }
    const zips = addressData.zipCodes[addrArea] || [];
    const isOpen =
      !zipWrapper.find(".addr-dropdown-menu").hasClass("hidden") &&
      zipWrapper.find(".addr-dropdown-menu").length > 0;
    closeAllAddrDropdowns();
    if (!isOpen) {
      openAddrDropdown(
        zipWrapper,
        zips,
        function (val) {
          addrZip = val;
          getAddrInput(zipWrapper).val(val);
        },
        "No zip codes available",
      );
    }
  });

  function closeAllAddrDropdowns() {
    $(".addr-dropdown-menu").addClass("hidden");
    $(".addressForm .dropdown-wrapper .dropdown-toggle").text(
      "keyboard_arrow_down",
    );
  }

  $(document).on("click.addrClose", function () {
    closeAllAddrDropdowns();
  });

  // Address type toggle
  $(".addressForm .shadow-addressType").on("click", function () {
    $(".addressForm .shadow-addressType").css({
      "background-color": "",
      color: "",
    });
    $(this).css("background-color", "#e8f5f0");
    $(this).find("span.font-medium").css("color", "#1a7a6e");
  });

 $(".saveNowBtn").on("click", function (e) {
  e.preventDefault();
  e.stopPropagation();

  console.log("saveNowBtn clicked, submitState before =", submitState);

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

  console.log("saveNowBtn done, submitState after =", submitState);
});
});
