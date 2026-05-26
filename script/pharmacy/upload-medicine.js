(function () {
  const MAX_FILE_SIZE = 1024 * 1024;
  const ALLOWED_MIME = new Set([
    "image/jpeg",
    "image/png",
    "image/gif",
    "video/mp4",
    "video/quicktime",
  ]);
  const ALLOWED_EXT = /\.(jpe?g|png|gif|mp4|mov)$/i;
  const ERROR_MESSAGE =
    "Video (MP4, MOV), and Image (JPG, PNG, GIF). Maximum file size: 1MB.";

  document.querySelectorAll(".medicine-upload-zone").forEach(initUploadZone);

  function initUploadZone(zone) {
    const area = zone.querySelector(".medicine-upload-area");
    const input = zone.querySelector(".medicine-upload-input");
    const defaultView = zone.querySelector(".medicine-upload-default");
    const preview = zone.querySelector(".medicine-upload-preview");
    const errorView = zone.querySelector(".medicine-upload-error");
    const previewImg = zone.querySelector(".medicine-upload-preview-img");
    const previewVideo = zone.querySelector(".medicine-upload-preview-video");
    const removeBtn = zone.querySelector(".medicine-upload-remove");
    const hint = zone.querySelector(".medicine-upload-hint");
    const defaultHintText = hint.textContent.trim();
    const errorHintText = hint.dataset.errorText || ERROR_MESSAGE;
    let objectUrl = null;

    area.addEventListener("click", function (e) {
      if (e.target.closest(".medicine-upload-remove")) return;
      if (!preview.classList.contains("hidden")) return;
      input.click();
    });

    input.addEventListener("change", function () {
      const file = input.files && input.files[0];
      if (!file) return;

      if (!isAllowedFile(file)) {
        input.value = "";
        showError();
        return;
      }

      clearError();
      showPreview(file);
    });

    removeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      resetZone();
    });

    function showPreview(file) {
      revokeObjectUrl();
      objectUrl = URL.createObjectURL(file);
      const isVideo =
        file.type.startsWith("video/") || /\.(mp4|mov)$/i.test(file.name);

      if (isVideo) {
        previewImg.classList.add("hidden");
        previewImg.removeAttribute("src");
        previewVideo.src = objectUrl;
        previewVideo.classList.remove("hidden");
      } else {
        previewVideo.classList.add("hidden");
        previewVideo.removeAttribute("src");
        previewVideo.load();
        previewImg.src = objectUrl;
        previewImg.classList.remove("hidden");
      }

      defaultView.classList.add("hidden");
      errorView.classList.add("hidden");
      preview.classList.remove("hidden");
      removeBtn.classList.remove("hidden");
    }

    function showError() {
      revokeObjectUrl();
      clearPreviewMedia();

      defaultView.classList.add("hidden");
      preview.classList.add("hidden");
      errorView.classList.remove("hidden");
      removeBtn.classList.remove("hidden");

      area.classList.remove("border-green-light");
      area.classList.add("border-tomato-red");

      hint.textContent = errorHintText;
      hint.classList.remove("text-gray");
      hint.classList.add("text-tomato-red");
    }

    function clearError() {
      errorView.classList.add("hidden");
      area.classList.remove("border-tomato-red");
      area.classList.add("border-green-light");
      hint.textContent = defaultHintText;
      hint.classList.remove("text-tomato-red");
      hint.classList.add("text-gray");
    }

    function clearPreviewMedia() {
      previewImg.removeAttribute("src");
      previewImg.classList.add("hidden");
      previewVideo.removeAttribute("src");
      previewVideo.classList.add("hidden");
      previewVideo.load();
      preview.classList.add("hidden");
    }

    function resetZone() {
      revokeObjectUrl();
      input.value = "";
      clearPreviewMedia();
      clearError();
      removeBtn.classList.add("hidden");
      defaultView.classList.remove("hidden");
    }

    function revokeObjectUrl() {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
        objectUrl = null;
      }
    }
  }

  function isAllowedFile(file) {
    if (file.size > MAX_FILE_SIZE) return false;
    if (ALLOWED_MIME.has(file.type)) return true;
    return ALLOWED_EXT.test(file.name);
  }
})();
