/**
 * Reusable custom dropdown — initialize on any container with class hooks.
 *
 * HTML structure:
 *   .js-custom-dropdown
 *     .js-custom-dropdown-trigger
 *       .js-custom-dropdown-avatar (optional img)
 *       .js-custom-dropdown-label
 *     .js-custom-dropdown-menu
 *       .js-custom-dropdown-option [data-value] (optional data-avatar)
 */
class CustomDropdown {
  static instances = [];

  constructor(container, options = {}) {
    this.container =
      typeof container === "string"
        ? document.querySelector(container)
        : container;

    if (!this.container) return;

    this.trigger = this.container.querySelector(".js-custom-dropdown-trigger");
    this.menu = this.container.querySelector(".js-custom-dropdown-menu");
    this.label = this.container.querySelector(".js-custom-dropdown-label");
    this.avatar = this.container.querySelector(".js-custom-dropdown-avatar");
    this.options = this.container.querySelectorAll(".js-custom-dropdown-option");

    this.onChange =
      typeof options.onChange === "function" ? options.onChange : null;
    this.closeOnSelect = options.closeOnSelect !== false;

    this._onTriggerClick = this._handleTriggerClick.bind(this);
    this._onOptionClick = this._handleOptionClick.bind(this);

    this._bind();
    CustomDropdown.instances.push(this);
  }

  _bind() {
    if (!this.trigger || !this.menu) return;
    this.trigger.addEventListener("click", this._onTriggerClick);
    this.options.forEach((option) => {
      option.addEventListener("click", this._onOptionClick);
    });
  }

  _handleTriggerClick(event) {
    event.stopPropagation();
    const isOpen = !this.menu.classList.contains("hidden");
    CustomDropdown.closeAll(this);
    if (!isOpen) {
      this.menu.classList.remove("hidden");
      this.trigger.setAttribute("aria-expanded", "true");
    }
  }

  _handleOptionClick(event) {
    event.stopPropagation();
    const option = event.currentTarget;
    const value = option.getAttribute("data-value") || option.textContent.trim();
    const label = option.getAttribute("data-label") || option.textContent.trim();
    const avatarSrc = option.getAttribute("data-avatar");

    this.setValue(value, label, avatarSrc);

    if (this.closeOnSelect) {
      this.close();
    }

    if (this.onChange) {
      this.onChange({ value, label, option });
    }
  }

  setValue(value, label, avatarSrc) {
    if (this.label) this.label.textContent = label;
    if (this.avatar && avatarSrc) {
      this.avatar.src = avatarSrc;
      this.avatar.alt = label;
    }
    this.container.setAttribute("data-value", value);
  }

  getValue() {
    return this.container.getAttribute("data-value") || "";
  }

  close() {
    if (!this.menu) return;
    this.menu.classList.add("hidden");
    if (this.trigger) this.trigger.setAttribute("aria-expanded", "false");
  }

  destroy() {
    if (this.trigger) {
      this.trigger.removeEventListener("click", this._onTriggerClick);
    }
    this.options.forEach((option) => {
      option.removeEventListener("click", this._onOptionClick);
    });
    CustomDropdown.instances = CustomDropdown.instances.filter((i) => i !== this);
  }

  static closeAll(except) {
    CustomDropdown.instances.forEach((instance) => {
      if (instance !== except) instance.close();
    });
  }

  static initAll(selector = ".js-custom-dropdown", options = {}) {
    const map = new Map();
    document.querySelectorAll(selector).forEach((container) => {
      const instance = new CustomDropdown(container, options);
      map.set(container, instance);
    });
    return map;
  }
}

/**
 * Reusable tab control — filters items or toggles panels via callbacks.
 *
 * Options:
 *   tabSelector        — tab button selector (default .js-tab-btn)
 *   activeClass        — class added to active tab (default "active")
 *   filterAttribute    — data attribute on tabs (default data-filter)
 *   filterTargetSelector — elements to show/hide when filtering
 *   filterKey          — data attribute on targets (default data-category)
 *   allValue           — show all targets (default "all")
 *   onChange           — (filterValue, tabEl) => void
 */
class TabManager {
  constructor(container, options = {}) {
    this.container =
      typeof container === "string"
        ? document.querySelector(container)
        : container;

    if (!this.container) return;

    this.tabSelector = options.tabSelector || ".js-tab-btn";
    this.activeClass = options.activeClass || "active";
    this.filterAttribute = options.filterAttribute || "data-filter";
    this.filterTargetSelector = options.filterTargetSelector || null;
    this.filterKey = options.filterKey || "data-category";
    this.allValue = options.allValue ?? "all";
    this.onChange =
      typeof options.onChange === "function" ? options.onChange : null;

    this.tabs = Array.from(this.container.querySelectorAll(this.tabSelector));
    this.currentFilter = this.allValue;

    this._onTabClick = this._handleTabClick.bind(this);
    this._bind();

    const initial =
      this.tabs.find((tab) => tab.classList.contains(this.activeClass)) ||
      this.tabs[0];
    if (initial) {
      this.setActive(initial.getAttribute(this.filterAttribute) || this.allValue);
    }
  }

  _bind() {
    this.tabs.forEach((tab) => {
      tab.addEventListener("click", this._onTabClick);
    });
  }

  _handleTabClick(event) {
    const tab = event.currentTarget;
    const value = tab.getAttribute(this.filterAttribute) || this.allValue;
    this.setActive(value);
  }

  setActive(filterValue) {
    this.currentFilter = filterValue;

    this.tabs.forEach((tab) => {
      const tabValue = tab.getAttribute(this.filterAttribute) || this.allValue;
      const isActive = tabValue === filterValue;
      tab.classList.toggle(this.activeClass, isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    if (this.filterTargetSelector) {
      this._applyFilter(filterValue);
    }

    if (this.onChange) {
      const activeTab = this.tabs.find(
        (tab) =>
          (tab.getAttribute(this.filterAttribute) || this.allValue) === filterValue
      );
      this.onChange(filterValue, activeTab);
    }
  }

  _applyFilter(filterValue) {
    const targets = document.querySelectorAll(this.filterTargetSelector);
    targets.forEach((el) => {
      const category = el.getAttribute(this.filterKey) || "";
      const show =
        filterValue === this.allValue || category === filterValue;
      el.classList.toggle("hidden", !show);
    });
  }

  getFilter() {
    return this.currentFilter;
  }

  destroy() {
    this.tabs.forEach((tab) => {
      tab.removeEventListener("click", this._onTabClick);
    });
  }
}

document.addEventListener("click", () => CustomDropdown.closeAll());

if (typeof window !== "undefined") {
  window.CustomDropdown = CustomDropdown;
  window.TabManager = TabManager;
}
