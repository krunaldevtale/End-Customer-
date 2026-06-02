(function () {
  const MAP_IMAGE = "/assets/img/map.png";
  const MAP_FALLBACK = "/assets/img/location-icon.svg";

  const TYPE_LABELS = {
    home: "Home Address",
    office: "Office Address",
    city: "City Address",
  };

  const TYPE_ICONS = {
    home: "home",
    office: "apartment",
    city: "location_city",
  };

  let addresses = [
    {
      id: "1",
      firstName: "Anjali",
      lastName: "Sharma",
      phone: "9876543210",
      address: "Block H, Neb Sarai",
      area: "Sainik Farm",
      zipCode: "110062",
      city: "New Delhi",
      country: "India",
      addressType: "home",
      isDefault: true,
    },
    {
      id: "2",
      firstName: "Monica",
      lastName: "Singh",
      phone: "9123456780",
      address: "Block H, Neb Sarai",
      area: "Sainik Farm",
      zipCode: "110062",
      city: "New Delhi",
      country: "India",
      addressType: "office",
      isDefault: false,
    },
  ];

  let pendingRemoveId = null;
  let selectedAddressType = "home";
  let countryDropdowns = [];

  const section = document.querySelector(".js-manage-address");
  if (!section) return;

  const listView = section.querySelector(".js-address-list-view");
  const addPanel = section.querySelector(".js-address-add-panel");
  const editPanel = section.querySelector(".js-address-edit-panel");
  const listEl = section.querySelector(".js-address-list");
  const emptyEl = section.querySelector(".js-address-empty");

  const addForm = section.querySelector(".js-address-add-form");
  const editForm = section.querySelector(".js-address-edit-form");
  const removeModal = document.querySelector(".js-remove-modal");

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function getDisplayLabel(addr) {
    return TYPE_LABELS[addr.addressType] || TYPE_LABELS.home;
  }

  function getDisplayCity(addr) {
    return `${addr.city}, ${addr.country}`;
  }

  function getDisplayFull(addr) {
    return `${addr.address}, ${addr.area}, ${addr.city}, ${addr.country} ${addr.zipCode}`;
  }

  function getIcon(type) {
    return TYPE_ICONS[type] || TYPE_ICONS.home;
  }

  function showToast(message) {
    const toast = document.querySelector(".toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove("hidden");
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => toast.classList.add("hidden"), 2000);
  }

  function showView(view) {
    listView?.classList.toggle("hidden", view !== "list");
    addPanel?.classList.toggle("hidden", view !== "add");
    editPanel?.classList.toggle("hidden", view !== "edit");
  }

  function getFormData(form) {
    const data = Object.fromEntries(new FormData(form));
    const countryEl = form.querySelector(".js-custom-dropdown");
    data.country =
      countryEl?.getAttribute("data-value") ||
      form.querySelector(".js-custom-dropdown-label")?.textContent.trim() ||
      "India";
    return data;
  }

  function setCountryDropdown(container, country) {
    if (!container) return;
    const label = container.querySelector(".js-custom-dropdown-label");
    if (label) {
      label.textContent = country;
      label.classList.remove("text-gray-light1");
      label.classList.add("text-gray");
    }
    container.setAttribute("data-value", country);
  }

  function initCountryDropdowns() {
    if (typeof CustomDropdown === "undefined") return;
    countryDropdowns = [];
    document.querySelectorAll(".js-form-dropdown").forEach((container) => {
      const instance = new CustomDropdown(container, {
        onChange({ label }) {
          const labelEl = container.querySelector(".js-custom-dropdown-label");
          if (labelEl) {
            labelEl.classList.remove("text-gray-light1");
            labelEl.classList.add("text-gray");
          }
          container.setAttribute("data-value", label);
        },
      });
      countryDropdowns.push(instance);
    });
  }

  function resetAddForm() {
    addForm?.reset();
    selectedAddressType = "home";
    setAddressTypeButtons(addForm, "home");
    const addCountry = addForm?.querySelector(".js-custom-dropdown");
    setCountryDropdown(addCountry, "India");
    const countryLabel = addCountry?.querySelector(".js-custom-dropdown-label");
    if (countryLabel) {
      countryLabel.textContent = "Country";
      countryLabel.classList.add("text-gray-light1");
      countryLabel.classList.remove("text-gray");
    }
  }

  function setAddressTypeButtons(form, type) {
    if (!form) return;
    form.querySelectorAll(".js-address-type-btn").forEach((btn) => {
      const isActive = btn.getAttribute("data-type") === type;
      btn.classList.toggle("active", isActive);
    });
  }

  function initAddressTypeButtons() {
    addForm?.querySelectorAll(".js-address-type-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        selectedAddressType = btn.getAttribute("data-type") || "home";
        setAddressTypeButtons(addForm, selectedAddressType);
      });
    });
  }

  function openAddPanel() {
    resetAddForm();
    showView("add");
    addPanel?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function openEditPanel(address) {
    if (!editForm || !address) return;

    editForm.querySelector(".js-edit-id").value = address.id;
    editForm.elements.firstName.value = address.firstName;
    editForm.elements.lastName.value = address.lastName;
    editForm.elements.phone.value = address.phone;
    editForm.elements.address.value = address.address;
    editForm.elements.area.value = address.area;
    editForm.elements.zipCode.value = address.zipCode;
    editForm.elements.city.value = address.city;

    setCountryDropdown(editForm.querySelector(".js-custom-dropdown"), address.country);
    showView("edit");
    editPanel?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderCards() {
    if (!listEl) return;

    if (!addresses.length) {
      listEl.innerHTML = "";
      emptyEl?.classList.remove("hidden");
      return;
    }

    emptyEl?.classList.add("hidden");

    listEl.innerHTML = addresses
      .map((addr) => {
        const label = getDisplayLabel(addr);
        const icon = getIcon(addr.addressType);
        return `
          <article class="address-card js-address-card bg-white rounded-[10px] shadow-hospital-card overflow-hidden flex flex-col"
            data-id="${escapeHtml(addr.id)}">
            <div class="h-36 sm:h-40 bg-gray-tint overflow-hidden relative">
              <img src="${MAP_IMAGE}" alt="Map preview"
                class="w-full h-full object-cover"
                onerror="this.onerror=null;this.src='${MAP_FALLBACK}';this.classList.add('object-contain','p-8');" />
            </div>
            <div class="p-4 flex flex-col gap-3 flex-1">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div class="flex items-center gap-2 min-w-0">
                  <span class="material-symbols-outlined text-sea-green2 text-xl shrink-0">${icon}</span>
                  <span class="font-semibold text-sm sm:text-base text-gray truncate">${escapeHtml(label)}</span>
                </div>
                <div class="flex items-center gap-2 shrink-0">
                  <button type="button" class="js-remove-address remove-address-btn px-3 py-1.5 rounded-md border border-tomato-red text-tomato-red text-xs sm:text-sm font-normal whitespace-nowrap">Remove</button>
                  <button type="button" class="js-edit-address flex items-center justify-center gap-1 px-3 py-1.5 rounded-md border border-sea-green-dark1 text-sea-green2 text-xs sm:text-sm font-normal hover:bg-soft-cloud-2 transition whitespace-nowrap">
                    <span class="material-symbols-outlined mini-icon">edit</span> Edit
                  </button>
                </div>
              </div>
              <div class="flex flex-col gap-1">
                <p class="font-semibold text-sm sm:text-base text-dark-gray">${escapeHtml(getDisplayCity(addr))}</p>
                <p class="text-xs sm:text-sm text-dark-gray leading-relaxed font-normal">${escapeHtml(getDisplayFull(addr))}</p>
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    bindCardActions();
  }

  function bindCardActions() {
    listEl.querySelectorAll(".js-edit-address").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.closest(".js-address-card")?.getAttribute("data-id");
        const address = addresses.find((a) => a.id === id);
        if (address) openEditPanel(address);
      });
    });

    listEl.querySelectorAll(".js-remove-address").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.closest(".js-address-card")?.getAttribute("data-id");
        if (id) openRemoveModal(id);
      });
    });
  }

  function buildAddressFromForm(data, existingId) {
    const existing = existingId ? addresses.find((a) => a.id === existingId) : null;
    const isDefault = existingId
      ? Boolean(existing?.isDefault)
      : data.isDefault === "on" || addresses.length === 0;

    if (!existingId && data.isDefault === "on") {
      addresses = addresses.map((a) => ({ ...a, isDefault: false }));
    }

    return {
      id: existingId || String(Date.now()),
      firstName: data.firstName?.trim() || "",
      lastName: data.lastName?.trim() || "",
      phone: data.phone?.trim() || "",
      address: data.address?.trim() || "",
      area: data.area?.trim() || "",
      zipCode: data.zipCode?.trim() || "",
      city: data.city?.trim() || "",
      country: data.country?.trim() || "India",
      addressType: existing?.addressType || selectedAddressType,
      isDefault,
    };
  }

  function handleAddSubmit(event) {
    event.preventDefault();
    const data = getFormData(addForm);
    const required = ["firstName", "lastName", "phone", "address", "area", "zipCode", "city"];
    if (required.some((key) => !data[key]?.trim())) return;
    if (data.country === "Country" || !data.country) data.country = "India";

    addresses.push(buildAddressFromForm(data));
    showToast("Address saved successfully!");
    showView("list");
    renderCards();
  }

  function handleEditSubmit(event) {
    event.preventDefault();
    const data = getFormData(editForm);
    const id = data.id;
    if (!id) return;

    const index = addresses.findIndex((a) => a.id === id);
    if (index === -1) return;

    const updated = buildAddressFromForm(data, id);
    updated.addressType = addresses[index].addressType;
    addresses[index] = updated;

    showToast("Address updated successfully!");
    showView("list");
    renderCards();
  }

  function openRemoveModal(id) {
    pendingRemoveId = id;
    removeModal?.classList.remove("hidden");
    removeModal?.classList.add("flex");
    document.body.classList.add("overflow-hidden");
  }

  function closeRemoveModal() {
    pendingRemoveId = null;
    removeModal?.classList.add("hidden");
    removeModal?.classList.remove("flex");
    document.body.classList.remove("overflow-hidden");
  }

  function confirmRemove() {
    if (!pendingRemoveId) return;
    addresses = addresses.filter((a) => a.id !== pendingRemoveId);
    closeRemoveModal();
    renderCards();
    showToast("Address removed successfully!");
  }

  function initEvents() {
    section.querySelector(".js-show-add-form")?.addEventListener("click", openAddPanel);
    section.querySelector(".js-cancel-add")?.addEventListener("click", () => {
      showView("list");
      resetAddForm();
    });
    section.querySelector(".js-cancel-edit")?.addEventListener("click", () => showView("list"));

    addForm?.addEventListener("submit", handleAddSubmit);
    editForm?.addEventListener("submit", handleEditSubmit);

    document.querySelector(".js-remove-cancel")?.addEventListener("click", closeRemoveModal);
    document.querySelector(".js-remove-confirm")?.addEventListener("click", confirmRemove);

    removeModal?.addEventListener("click", (e) => {
      if (e.target === removeModal) closeRemoveModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && removeModal && !removeModal.classList.contains("hidden")) {
        closeRemoveModal();
      }
    });

    document.getElementById("menu-btn")?.addEventListener("click", () => {
      document.getElementById("mobile-menu")?.classList.toggle("hidden");
    });
    document.getElementById("mobile-submenu-btn")?.addEventListener("click", () => {
      document.getElementById("mobile-submenu")?.classList.toggle("hidden");
    });
  }

  initCountryDropdowns();
  initAddressTypeButtons();
  initEvents();
  showView("list");
  renderCards();
})();
