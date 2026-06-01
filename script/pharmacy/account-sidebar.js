/**
 * Highlights the active link in the pharmacy account sidebar
 * based on the current page URL.
 *
 * Usage: add data-account-sidebar on the sidebar wrapper and include this script.
 */
(function () {
  const SIDEBAR_SELECTOR = "[data-account-sidebar]";
  const LINK_SELECTOR = "nav a[href]";

  const SHARED_CLASSES = [
    "flex",
    "items-center",
    "text-sm",
    "px-4",
    "py-2",
    "rounded",
    "gap-2",
    "hover:bg-green-light",
    "hover:text-white",
  ];

  const ACTIVE_CLASSES = ["text-white", "bg-green-light", "font-medium"];
  const INACTIVE_CLASSES = ["text-gray-med", "font-normal"];

  function getPageKey(pathname) {
    const segment = pathname.split("/").filter(Boolean).pop();
    return (segment || "").toLowerCase();
  }

  function getLinkKey(href) {
    if (!href || href === "#") return null;

    try {
      return getPageKey(new URL(href, window.location.href).pathname);
    } catch {
      return null;
    }
  }

  function applyLinkClasses(link, isActive) {
    link.className = [
      ...SHARED_CLASSES,
      ...(isActive ? ACTIVE_CLASSES : INACTIVE_CLASSES),
    ].join(" ");

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  }

  function initAccountSidebar() {
    const sidebar = document.querySelector(SIDEBAR_SELECTOR);
    if (!sidebar) return;

    const links = sidebar.querySelectorAll(LINK_SELECTOR);
    if (!links.length) return;

    const currentKey = getPageKey(window.location.pathname);

    links.forEach((link) => {
      const linkKey = getLinkKey(link.getAttribute("href"));
      const isActive = Boolean(linkKey && linkKey === currentKey);
      applyLinkClasses(link, isActive);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAccountSidebar);
  } else {
    initAccountSidebar();
  }
})();
