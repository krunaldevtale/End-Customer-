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
});
