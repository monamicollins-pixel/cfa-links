(function () {
  "use strict";

  function themeValue() {
    try {
      return (
        localStorage.getItem("cfa-theme") ||
        localStorage.getItem("theme") ||
        "light"
      );
    } catch (_) {
      return "light";
    }
  }

  function applyTheme(value) {
    const theme = value === "dark" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", theme);

    try {
      localStorage.setItem("cfa-theme", theme);
      localStorage.setItem("theme", theme);
    } catch (_) {}

    updateThemeLabels();
  }

  function updateThemeLabels() {
    const dark =
      document.documentElement.getAttribute("data-theme") === "dark";

    const label = dark
      ? "☀️ Mode clair"
      : "🌙 Mode sombre";

    document.querySelectorAll(
      "#themeToggle, .theme-toggle"
    ).forEach(function (button) {
      button.textContent = label;
    });

    const mobile =
      document.getElementById("drawer-theme-toggle");

    if (mobile) {
      mobile.textContent = label;
    }
  }

  function moveDesktopTheme() {
    document.querySelectorAll(
      "header .container.nav, .auth-site-header .container.nav"
    ).forEach(function (container) {

      const brand =
        container.querySelector(":scope > .brand");

      const navRight =
        container.querySelector(":scope > .nav-right");

      if (!brand || !navRight) return;

      const theme =
        container.querySelector(
          ":scope > #themeToggle, :scope > .theme-toggle"
        ) ||
        navRight.querySelector(
          ":scope > #themeToggle, :scope > .theme-toggle"
        );

      if (!theme) return;

      /* CFA → THEME → NAV → CONNEXION */
      container.insertBefore(theme, navRight);
    });
  }

  function currentPage(link) {
    const href = link.getAttribute("href");

    if (!href || href.startsWith("#")) {
      return false;
    }

    try {
      const target =
        new URL(href, window.location.href)
          .pathname
          .replace(/\/+$/, "") || "/";

      const current =
        window.location.pathname
          .replace(/\/+$/, "") || "/";

      return target === current;
    } catch (_) {
      return false;
    }
  }

  function markCurrentPage() {
    document.querySelectorAll(
      "header nav a, .account-links a"
    ).forEach(function (link) {

      link.classList.remove("cfa-current-page");

      if (currentPage(link)) {
        link.classList.add("cfa-current-page");
      }
    });
  }

  function mobileOrder() {
    document.querySelectorAll(
      "#site-mobile-drawer .cfa-mobile-nav"
    ).forEach(function (nav) {

      const theme =
        nav.querySelector(
          "#drawer-theme-toggle, .cfa-mobile-theme"
        );

      if (!theme) return;

      /* Theme first */
      nav.insertBefore(theme, nav.firstElementChild);

      const links =
        Array.from(
          nav.querySelectorAll(
            ".cfa-mobile-link, .cfa-mobile-login"
          )
        );

      links.forEach(function (link) {
        link.classList.remove("cfa-current-page");
      });

      const current =
        links.find(currentPage);

      if (current) {
        current.classList.add("cfa-current-page");

        /* Theme → Current page */
        nav.insertBefore(
          current,
          theme.nextElementSibling
        );
      }
    });
  }

  function bindThemeButtons() {
    document.addEventListener(
      "click",
      function (event) {

        const button =
          event.target.closest(
            "#themeToggle, .theme-toggle, #drawer-theme-toggle, .cfa-mobile-theme"
          );

        if (!button) return;

        /* One shared theme controller across every page */
        event.preventDefault();
        event.stopImmediatePropagation();

        const dark =
          document.documentElement.getAttribute("data-theme") === "dark";

        applyTheme(dark ? "light" : "dark");
      },
      true
    );
  }

  function boot() {
    applyTheme(themeValue());
    moveDesktopTheme();
    markCurrentPage();
    mobileOrder();
    updateThemeLabels();
    bindThemeButtons();

    new MutationObserver(updateThemeLabels).observe(
      document.documentElement,
      {
        attributes: true,
        attributeFilter: ["data-theme"]
      }
    );

    window.addEventListener(
      "storage",
      function (event) {
        if (
          event.key === "cfa-theme" ||
          event.key === "theme"
        ) {
          applyTheme(event.newValue || "light");
        }
      }
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      boot,
      { once: true }
    );
  } else {
    boot();
  }
})();
