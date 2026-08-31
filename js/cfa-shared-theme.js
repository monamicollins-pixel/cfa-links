/* =========================================================
   CFA SHARED THEME CONTROLLER
   Uses the same cfa_theme value as the homepage.
   ========================================================= */

(function () {

    const savedTheme =
        localStorage.getItem("cfa_theme") || "light";

    document.documentElement.setAttribute(
        "data-theme",
        savedTheme === "dark" ? "dark" : "light"
    );

})();
