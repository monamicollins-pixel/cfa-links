/* =========================================================
   CFA COMPAS LOADER
   Early-render site-wide loader controller
   ========================================================= */

(function () {
  "use strict";

  function startCfaLoader() {
    const loader = document.getElementById("cfa-page-loader");

    if (!loader) {
      return;
    }

    let hidden = false;

    function hideCfaLoader() {
      if (hidden) return;

      hidden = true;
      loader.classList.add("cfa-loader-hidden");

      window.setTimeout(function () {
        if (loader && loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
      }, 650);
    }

    if (document.readyState === "complete") {
      window.setTimeout(hideCfaLoader, 120);
    } else {
      window.addEventListener("load", hideCfaLoader, {
        once: true
      });
    }

    /* Safety fallback */
    window.setTimeout(hideCfaLoader, 8000);
  }

  /*
   * The loader HTML is already present immediately after <body>.
   * This script only controls its removal.
   */
  if (document.readyState === "loading") {
    startCfaLoader();
  } else {
    startCfaLoader();
  }
})();
