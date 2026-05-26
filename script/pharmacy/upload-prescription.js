$(document).ready(function () {
  // =========================================
  // CREATE HIDDEN FILE INPUT
  // =========================================

  $("body").append(`
            <input 
                type="file"
                id="fileInput"
                multiple
                hidden
                accept=".jpg,.jpeg,.png,.pdf,.mp4"
            >
        `);

  // =========================================
  // OPEN FILE PICKER
  // =========================================

  $(".selectFileBtn").on("click", function () {
    $("#fileInput").click();
  });

  // =========================================
  // FILE SELECT
  // =========================================

  $(document).on("change", "#fileInput", function (e) {
    handleFiles(e.target.files);

    $(this).val("");
  });

  // =========================================
  // DRAG & DROP
  // =========================================

  const dropArea = $(".border-dashed");

  dropArea.on("dragenter dragover", function (e) {
    e.preventDefault();
    e.stopPropagation();

    $(this).addClass("border-aurora-blue bg-[#F7FBFF]");
  });

  dropArea.on("dragleave", function (e) {
    e.preventDefault();
    e.stopPropagation();

    $(this).removeClass("border-aurora-blue bg-[#F7FBFF]");
  });

  dropArea.on("drop", function (e) {
    e.preventDefault();
    e.stopPropagation();

    $(this).removeClass("border-aurora-blue bg-[#F7FBFF]");

    const files = e.originalEvent.dataTransfer.files;

    handleFiles(files);
  });

  // =========================================
  // HANDLE FILES
  // =========================================

  function handleFiles(files) {
    const uploadContainer = $(".overflow-y-auto");

    uploadContainer.removeClass("hidden");

    Array.from(files).forEach((file, index) => {
      const uniqueId = "file_" + Date.now() + "_" + index;

      const fileHTML = `
                    <div 
                        id="${uniqueId}"
                        class="w-full border border-[#D8DAEB] rounded-[10px] p-2.5 flex items-center justify-between bg-[#FEFEFE]"
                    >

                        <!-- LEFT -->
                        <div class="flex items-center gap-3">

                            <!-- FILE ICON -->
                            <div class="w-[56px] h-[56px] rounded-xl  flex items-center justify-center">
                                <img 
                                    src="/assets/img/upload-placeholder.svg"
                                    alt="file"
                                    class="w-7 h-7 object-contain"
                                >
                            </div>

                            <!-- FILE DETAILS -->
                            <div class="flex flex-col gap-2">

                                <!-- FILE NAME -->
                                <p class="font-medium text-base leading-none text-[#101111] break-all">
                                    ${file.name}
                                </p>

                                <!-- META -->
                                <div class="flex items-center gap-3 flex-wrap">

                                    <!-- SIZE -->
                                    <span class="text-sm font-normal text-[#949FB1]">
                                        ${formatBytes(file.size)}
                                    </span>

                                    <!-- DOT -->
                                    <span class="text-[#C9CFD7]">|</span>

                                    <!-- PROGRESS -->
                                    <span class="upload-progress text-sm font-normal text-[#949FB1]">
                                        0%
                                    </span>

                                    <!-- DOT -->
                                    <span class="w-[6px] h-[6px] rounded-full bg-[#949FB180]"></span>

                                    <!-- TIME -->
                                    <span class="upload-time text-sm font-normal text-[#949FB1]">
                                        37 sec left
                                    </span>

                                    <!-- LOADER -->
                                    <div class="loader"></div>

                                    <!-- STATUS -->
                                    <span class="upload-status text-sm font-normal text-[#949FB1]">
                                        Uploading
                                    </span>

                                </div>

                            </div>

                        </div>

                        <!-- DELETE BUTTON -->
                        <button 
                            class="removeFileBtn w-11 h-11 rounded-[10px] border border-[#D5D3E0] bg-white flex items-center justify-center cursor-pointer"
                            data-id="${uniqueId}"
                        >
                            <span class="material-symbols-outlined">delete</span>
                        </button>

                    </div>
                `;

      uploadContainer.append(fileHTML);

      simulateUpload(uniqueId);
    });
  }

  // =========================================
  // UPLOAD SIMULATION
  // =========================================

  function simulateUpload(id) {
    let progress = 0;

    let totalSeconds = 37;

    $("#" + id)
      .find(".upload-time")
      .text(totalSeconds + " sec left");

    const interval = setInterval(function () {
      progress += 5;

      totalSeconds--;

      // UPDATE PROGRESS
      $("#" + id)
        .find(".upload-progress")
        .text(progress + "%");

      // UPDATE TIME
      if (totalSeconds > 0) {
        $("#" + id)
          .find(".upload-time")
          .text(totalSeconds + " sec left");
      }

      // COMPLETE
      if (progress >= 100) {
        clearInterval(interval);

        $("#" + id)
          .find(".upload-progress")
          .text("100%");

        $("#" + id)
          .find(".upload-time")
          .text("");

        $("#" + id).find(".upload-status").html(`
                            <span class="text-[#949FB1] font-medium">
                                Uploaded Successfully
                            </span>
                        `);

        $("#" + id)
          .find(".loader")
          .remove();
      }
    }, 1000);
  }

  // =========================================
  // REMOVE FILE
  // =========================================

  $(document).on("click", ".removeFileBtn", function () {
    const id = $(this).data("id");

    $("#" + id).remove();

    if ($(".overflow-y-auto").children().length === 0) {
      $(".overflow-y-auto").addClass("hidden");
    }
  });

  // =========================================
  // FORMAT FILE SIZE
  // =========================================

  function formatBytes(bytes) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;

    const sizes = ["Bytes", "KB", "MB", "GB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + sizes[i];
  }

  // =========================================
  // LOADER CSS
  // =========================================

  $("head").append(`
            <style>

                .loader {
                    width: 22px;
                    height: 22px;
                    border: 3px solid #DCFCE7;
                    border-top: 3px solid #22C55E;
                    border-radius: 50%;
                    animation: spin 0.7s linear infinite;
                }

                @keyframes spin {
                    100% {
                        transform: rotate(360deg);
                    }
                }

            </style>
        `);

  $(function () {
    /* ── STATE ── */
    let selectedDoctor = null;
    let selectedPatients = [];

    /* ── ADD data-value ATTRS TO EXISTING LI ITEMS ── */
    $("#doctorList li").each(function () {
      const text = $.trim($(this).text());
      if (text.startsWith("Custom")) $(this).attr("data-value", "custom");
      else $(this).attr("data-value", text);
    });
    $("#patientList li").each(function () {
      const text = $.trim($(this).text());
      if (text.startsWith("Custom")) $(this).attr("data-value", "custom");
      else $(this).attr("data-value", text);
    });

    /* ── WRAP INPUTS IN TAG CONTAINERS ── */
    $("#doctorBox input").wrap(
      '<div id="doctorTags" class="flex flex-wrap gap-1.5 flex-1 items-center"></div>',
    );
    $("#patientBox input").wrap(
      '<div id="patientTags" class="flex flex-wrap gap-1.5 flex-1 items-center"></div>',
    );

    /* ── INJECT MODALS ── */
    $("body").append(`
    <div id="addDoctorModal" class="hidden fixed inset-0 bg-black/40 z-[9999] flex items-center justify-center">
      <div class="bg-white rounded-2xl p-6 w-[800px] shadow-2xl">
        <h3 class="text-base font-semibold text-gray-800 mb-4">Add New Doctor</h3>
        <div class="grid grid-cols-2 gap-3">
          <div class="mb-3">
            <input id="newDoctorFirstName" type="text" placeholder="First Name"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-0">
          </div>
          <div class="mb-3">
            <input id="newDoctorLastName" type="text" placeholder="Last Name"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-0">
          </div>
        </div>
        <div class="mb-3 dropdown-wrapper relative">
          <label class="block text-xs font-medium text-gray-600 mb-1">Speciality</label>
          <div class="flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg cursor-pointer" id="specBox">
            <input id="newDoctorSpec" type="text" placeholder="e.g. Cardiologist"
              class="w-full text-sm focus:outline-none focus:ring-0 cursor-pointer bg-transparent" readonly>
            <span class="material-symbols-outlined dropdown-toggle" id="specArrow">keyboard_arrow_down</span>
          </div>
          <div class="dropdown-menu absolute bg-white rounded-2xl py-2 px-3 hidden w-full z-10 shadow-lg top-full mt-1" id="specMenu">
            <ul class="space-y-2 font-normal text-sm text-[#484848]" id="specList">
              <li class="py-1 px-1 rounded-md cursor-pointer hover:bg-green-50" data-value="Cardiology">Cardiology</li>
              <li class="py-1 px-1 rounded-md cursor-pointer hover:bg-green-50" data-value="General Physician">General Physician</li>
              <li class="py-1 px-1 rounded-md cursor-pointer hover:bg-green-50" data-value="Dermatologist">Dermatologist</li>
              <li class="py-1 px-1 rounded-md cursor-pointer hover:bg-green-50" data-value="Neurologist">Neurologist</li>
              <li class="py-1 px-1 rounded-md cursor-pointer hover:bg-green-50" data-value="Psychiatrist">Psychiatrist</li>
              <li class="py-1 px-1 rounded-md cursor-pointer hover:bg-green-50" data-value="Dentist">Dentist</li>
              <li class="py-1 px-1 rounded-md cursor-pointer hover:bg-green-50" data-value="ENT Specialist">ENT Specialist</li>
              <li class="py-1 px-1 rounded-md cursor-pointer hover:bg-green-50" data-value="Endocrinologist">Endocrinologist</li>
              <li class="py-1 px-1 rounded-md cursor-pointer hover:bg-green-50" data-value="Ophthalmologist">Ophthalmologist</li>
            </ul>
          </div>
        </div>
        <div class="flex gap-2.5 justify-end mt-4">
          <button id="cancelDoctorModal"
            class="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 bg-white text-gray-700 cursor-pointer hover:bg-gray-50">Cancel</button>
          <button id="saveDoctorBtn"
            class="px-4 py-2 rounded-lg text-sm font-medium bg-sea-green-dark1 text-white border-none cursor-pointer">Add Doctor</button>
        </div>
      </div>
    </div>

    <div id="addPatientModal" class="hidden fixed inset-0 bg-black/40 z-[9999] flex items-center justify-center">
      <div class="bg-white rounded-2xl p-6 w-[800px] shadow-2xl">
        <h3 class="text-base font-semibold text-gray-800 mb-4">Add New Patient</h3>
        <div class="grid grid-cols-2 gap-3">
          <div class="mb-3">
            <input id="newPatientFirstName" type="text" placeholder="First Name"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-0">
          </div>
          <div class="mb-3">
            <input id="newPatientLastName" type="text" placeholder="Last Name"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-0">
          </div>
          <div class="mb-3 dropdown-wrapper relative">
            <div class="flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg cursor-pointer" id="genderBox">
              <input id="gender" type="text" placeholder="Select Gender"
                class="w-full text-sm focus:outline-none focus:ring-0 cursor-pointer bg-transparent" readonly>
              <span class="material-symbols-outlined dropdown-toggle" id="genderArrow">keyboard_arrow_down</span>
            </div>
            <div class="dropdown-menu absolute bg-white rounded-2xl py-2 px-3 hidden w-full z-10 shadow-lg top-full mt-1" id="genderMenu">
              <ul class="space-y-2 font-normal text-sm text-[#484848]" id="genderList">
                <li class="py-1 px-1 rounded-md cursor-pointer hover:bg-green-50" data-value="Male">Male</li>
                <li class="py-1 px-1 rounded-md cursor-pointer hover:bg-green-50" data-value="Female">Female</li>
                <li class="py-1 px-1 rounded-md cursor-pointer hover:bg-green-50" data-value="Others">Others</li>
              </ul>
            </div>
          </div>
          <div class="mb-3">
            <input id="newPatientAge" type="number" placeholder="Age"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-0">
          </div>
        </div>
        <div class="mb-3 dropdown-wrapper relative">
          <label class="block text-xs font-medium text-gray-600 mb-1">Relation</label>
          <div class="flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg cursor-pointer" id="relationBox">
            <input id="relation" type="text" placeholder="Select Relation"
              class="w-full text-sm focus:outline-none focus:ring-0 cursor-pointer bg-transparent" readonly>
            <span class="material-symbols-outlined dropdown-toggle" id="relationArrow">keyboard_arrow_down</span>
          </div>
          <div class="dropdown-menu absolute bg-white rounded-2xl py-2 px-3 hidden w-full z-10 shadow-lg top-full mt-1" id="relationMenu">
            <ul class="space-y-2 font-normal text-sm text-[#484848]" id="relationList">
              <li class="py-1 px-1 rounded-md cursor-pointer hover:bg-green-50" data-value="Father">Father</li>
              <li class="py-1 px-1 rounded-md cursor-pointer hover:bg-green-50" data-value="Mother">Mother</li>
              <li class="py-1 px-1 rounded-md cursor-pointer hover:bg-green-50" data-value="Brother">Brother</li>
              <li class="py-1 px-1 rounded-md cursor-pointer hover:bg-green-50" data-value="Sister">Sister</li>
              <li class="py-1 px-1 rounded-md cursor-pointer hover:bg-green-50" data-value="Husband">Husband</li>
              <li class="py-1 px-1 rounded-md cursor-pointer hover:bg-green-50" data-value="Wife">Wife</li>
              <li class="py-1 px-1 rounded-md cursor-pointer hover:bg-green-50" data-value="Son">Son</li>
              <li class="py-1 px-1 rounded-md cursor-pointer hover:bg-green-50" data-value="Daughter">Daughter</li>
            </ul>
          </div>
        </div>
        <div class="flex gap-2.5 justify-end mt-4">
          <button id="cancelPatientModal"
            class="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 bg-white text-gray-700 cursor-pointer hover:bg-gray-50">Cancel</button>
          <button id="savePatientBtn"
            class="px-4 py-2 rounded-lg text-sm font-medium bg-sea-green-dark1 text-white border-none cursor-pointer">Add Patient</button>
        </div>
      </div>
    </div>
  `);

    /* ── HELPERS ── */

    function makeTag(value, type) {
      return $(`
      <span class="inline-flex items-center gap-1 bg-white text-black text-xs font-semibold px-2.5 py-2 rounded-full shadow-request-box">
        ${value}
        <span class="material-symbols-outlined text-[#484848] cursor-pointer tag-close"
          style="font-size:14px;" data-type="${type}" data-value="${value}">close</span>
      </span>`);
    }

    function renderDoctorTag() {
      $("#doctorTags").empty();
      if (selectedDoctor) {
        $("#doctorTags").append(makeTag(selectedDoctor, "doctor"));
      } else {
        $("#doctorTags").append(
          $(
            '<input type="text" class="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-sm placeholder:font-normal focus:outline-none focus:ring-0 min-w-[80px]" placeholder="Select Doctor" readonly>',
          ),
        );
      }
      renderDoctorList();
    }

    function renderPatientTags() {
      $("#patientTags").empty();
      selectedPatients.forEach((val) =>
        $("#patientTags").append(makeTag(val, "patient")),
      );
      $("#patientTags").append(
        $(
          `<input type="text" class="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-sm placeholder:font-normal focus:outline-none focus:ring-0 min-w-[60px]" placeholder="${selectedPatients.length ? "" : "Select Patient"}" readonly>`,
        ),
      );
      renderPatientList();
    }

    function renderDoctorList() {
      $("#doctorList li").each(function () {
        const val = $(this).data("value");
        if (val === "custom") {
          $(this).html(
            `<span class="flex items-center gap-1.5"><span class="inline-block w-5"></span>Custom : ___________</span>`,
          );
          return;
        }
        if (val === selectedDoctor) {
          $(this).html(
            `<span class="flex items-center gap-1.5 text-green-700 font-semibold"><span class="material-symbols-outlined text-green-700" style="font-size:16px;">check</span>${val}</span>`,
          );
        } else {
          $(this).html(
            `<span class="flex items-center gap-1.5"><span class="inline-block w-5"></span>${val}</span>`,
          );
        }
      });
    }

    function renderPatientList() {
      $("#patientList li").each(function () {
        const val = $(this).data("value");
        if (val === "custom") {
          $(this).html(
            `<span class="flex items-center gap-1.5"><span class="inline-block w-5"></span>Custom : ___________</span>`,
          );
          return;
        }
        if (selectedPatients.includes(val)) {
          $(this).html(
            `<span class="flex items-center gap-1.5 text-green-700 font-semibold"><span class="material-symbols-outlined text-green-700" style="font-size:16px;">check</span>${val}</span>`,
          );
        } else {
          $(this).html(
            `<span class="flex items-center gap-1.5"><span class="inline-block w-5"></span>${val}</span>`,
          );
        }
      });
    }

    /* ── CLOSE ALL DROPDOWNS (main + modal) ── */
    function closeAllDropdowns() {
      $(
        "#doctorMenu, #patientMenu, #specMenu, #genderMenu, #relationMenu",
      ).addClass("hidden");
      $(".dropdown-toggle").text("keyboard_arrow_down");
    }

    /* ── GENERIC MODAL DROPDOWN TOGGLE HELPER ── */
    function bindModalDropdown(boxId, menuId, arrowId, inputId, listId) {
      $(document).on("click", "#" + boxId, function (e) {
        e.stopPropagation();
        const $menu = $("#" + menuId);
        const isOpen = !$menu.hasClass("hidden");
        // close only modal dropdowns
        $("#specMenu, #genderMenu, #relationMenu").addClass("hidden");
        $("#specArrow, #genderArrow, #relationArrow").text(
          "keyboard_arrow_down",
        );
        if (!isOpen) {
          $menu.removeClass("hidden");
          $("#" + arrowId).text("keyboard_arrow_up");
        }
      });

      $(document).on("click", "#" + listId + " li", function (e) {
        e.stopPropagation();
        const val = $(this).data("value");
        $("#" + inputId).val(val);
        // tick mark
        $("#" + listId + " li").each(function () {
          const v = $(this).data("value");
          if (v === val) {
            $(this).html(
              `<span class="flex items-center gap-1.5 text-green-700 font-semibold"><span class="material-symbols-outlined text-green-700" style="font-size:16px;">check</span>${v}</span>`,
            );
          } else {
            $(this).html(
              `<span class="flex items-center gap-1.5"><span class="inline-block w-5"></span>${v}</span>`,
            );
          }
        });
        $("#" + menuId).addClass("hidden");
        $("#" + arrowId).text("keyboard_arrow_down");
      });
    }

    // Bind all three modal dropdowns
    bindModalDropdown(
      "specBox",
      "specMenu",
      "specArrow",
      "newDoctorSpec",
      "specList",
    );
    bindModalDropdown(
      "genderBox",
      "genderMenu",
      "genderArrow",
      "gender",
      "genderList",
    );
    bindModalDropdown(
      "relationBox",
      "relationMenu",
      "relationArrow",
      "relation",
      "relationList",
    );

    /* ── MAIN DOCTOR BOX TOGGLE ── */
    $("#doctorBox").on("click", function (e) {
      e.stopPropagation();
      const $menu = $("#doctorMenu");
      const isOpen = !$menu.hasClass("hidden");
      closeAllDropdowns();
      if (!isOpen) {
        $menu.removeClass("hidden");
        $(this).find(".dropdown-toggle").text("keyboard_arrow_up");
      }
    });

    /* ── MAIN PATIENT BOX TOGGLE ── */
    $("#patientBox").on("click", function (e) {
      e.stopPropagation();
      const $menu = $("#patientMenu");
      const isOpen = !$menu.hasClass("hidden");
      closeAllDropdowns();
      if (!isOpen) {
        $menu.removeClass("hidden");
        $(this).find(".dropdown-toggle").text("keyboard_arrow_up");
      }
    });

    /* ── DOCTOR ITEM CLICK ── */
    $("#doctorList").on("click", "li", function (e) {
      e.stopPropagation();
      const val = $(this).data("value");
      if (val === "custom") {
        closeAllDropdowns();
        $("#newDoctorFirstName, #newDoctorLastName, #newDoctorSpec").val("");
        // reset spec list ticks
        $("#specList li").each(function () {
          const v = $(this).data("value");
          $(this).html(
            `<span class="flex items-center gap-1.5"><span class="inline-block w-5"></span>${v}</span>`,
          );
        });
        $("#addDoctorModal").removeClass("hidden");
        return;
      }
      selectedDoctor = selectedDoctor === val ? null : val;
      renderDoctorTag();
      closeAllDropdowns();
    });

    /* ── PATIENT ITEM CLICK ── */
    $("#patientList").on("click", "li", function (e) {
      e.stopPropagation();
      const val = $(this).data("value");
      if (val === "custom") {
        closeAllDropdowns();
        $(
          "#newPatientFirstName, #newPatientLastName, #newPatientAge, #gender, #relation",
        ).val("");
        // reset gender & relation list ticks
        $("#genderList li, #relationList li").each(function () {
          const v = $(this).data("value");
          $(this).html(
            `<span class="flex items-center gap-1.5"><span class="inline-block w-5"></span>${v}</span>`,
          );
        });
        $("#addPatientModal").removeClass("hidden");
        return;
      }
      const idx = selectedPatients.indexOf(val);
      if (idx === -1) selectedPatients.push(val);
      else selectedPatients.splice(idx, 1);
      renderPatientTags();
    });

    /* ── TAG CLOSE ── */
    $(document).on("mousedown", ".tag-close", function (e) {
      e.stopPropagation();
      e.preventDefault();
      const type = $(this).data("type");
      const val = $(this).data("value");
      if (type === "doctor") {
        selectedDoctor = null;
        renderDoctorTag();
      } else {
        selectedPatients = selectedPatients.filter((v) => v !== val);
        renderPatientTags();
      }
    });

    /* ── OUTSIDE CLICK ── */
    $(document).on("click", function () {
      closeAllDropdowns();
    });
    $(document).on("click", ".dropdown-menu", function (e) {
      e.stopPropagation();
    });

    /* ── DOCTOR MODAL SAVE ── */
    $("#cancelDoctorModal").on("click", function () {
      $("#addDoctorModal").addClass("hidden");
    });

    $("#saveDoctorBtn").on("click", function () {
      const firstName = $.trim($("#newDoctorFirstName").val());
      const lastName = $.trim($("#newDoctorLastName").val());
      if (!firstName) {
        alert("First name is required.");
        return;
      }
      const fullName = lastName ? firstName + " " + lastName : firstName;
      const exists = $("#doctorList li").filter(function () {
        return $(this).data("value") === fullName;
      }).length;
      if (!exists) {
        $('#doctorList li[data-value="custom"]').before(
          $(
            `<li class="font-normal text-base text-dark-gray cursor-pointer hover:bg-green-50 rounded-md" data-value="${fullName}"></li>`,
          ),
        );
      }
      selectedDoctor = fullName;
      renderDoctorTag();
      $("#addDoctorModal").addClass("hidden");
    });

    /* ── PATIENT MODAL SAVE ── */
    $("#cancelPatientModal").on("click", function () {
      $("#addPatientModal").addClass("hidden");
    });

    $("#savePatientBtn").on("click", function () {
      const firstName = $.trim($("#newPatientFirstName").val());
      const lastName = $.trim($("#newPatientLastName").val());
      if (!firstName) {
        alert("First name is required.");
        return;
      }
      const fullName = lastName ? firstName + " " + lastName : firstName;
      const exists = $("#patientList li").filter(function () {
        return $(this).data("value") === fullName;
      }).length;
      if (!exists) {
        $('#patientList li[data-value="custom"]').before(
          $(
            `<li class="font-normal text-base text-dark-gray cursor-pointer hover:bg-green-50 rounded-md" data-value="${fullName}"></li>`,
          ),
        );
      }
      if (!selectedPatients.includes(fullName)) selectedPatients.push(fullName);
      renderPatientTags();
      $("#addPatientModal").addClass("hidden");
    });

    /* ── INITIAL RENDER ── */
    renderDoctorTag();
    renderPatientTags();
  });
});
