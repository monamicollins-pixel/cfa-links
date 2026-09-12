/* =========================================================
   CFA COMPAS LOADER
   Site-wide reusable loader
   ========================================================= */

(function () {
  "use strict";

  if (document.getElementById("cfa-page-loader")) {
    return;
  }

  const loader = document.createElement("div");

  loader.id = "cfa-page-loader";
  loader.setAttribute(
    "aria-label",
    "Chargement de Collins French Academy"
  );

  loader.innerHTML = `
    <div class="cfa-loader-core">
      <div class="cfa-loader-orbit" aria-hidden="true">
        <span class="cfa-loader-line"></span>
        <span class="cfa-loader-line"></span>
        <span class="cfa-loader-line"></span>
      </div>

      <div class="cfa-loader-center" aria-hidden="true">
        CFA
      </div>
    </div>
  `;

  document.body.insertBefore(loader, document.body.firstChild);

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
})();
