(function () {
  // Pages where the widget should NOT appear
  var excluded = [
    "/about-us.html",
    "/contact-us.html",
    "/privacy-policy.html",
    "/terms-and-conditions.html",
    "/disclaimer.html"
  ];

  var path = window.location.pathname;

  var isExcluded = excluded.some(function (p) {
    return path === p || path.endsWith(p);
  });

  if (isExcluded) return;

  // Prevent duplicate widget
  if (
    document.getElementById("support-widget-container") ||
    document.getElementById("support-widget-fab")
  ) {
    return;
  }

  var isMobile =
    (window.innerWidth || document.documentElement.clientWidth) <= 768;

  var linksHTML =
    '<li style="margin-bottom:8px;list-style:none;">' +
      '<a href="https://buymeacoffee.com/charadegenerator" target="_blank" rel="noopener noreferrer" ' +
      'style="color:#7a3fd6;text-decoration:none;font-size:14px;display:flex;align-items:center;gap:6px;">' +
      '<span style="font-size:15px;">☕</span> Caffeinate us!</a>' +
    '</li>' +

    '<li style="margin-bottom:8px;list-style:none;">' +
      '<a href="https://payhip.com/Charadegenerator" target="_blank" rel="noopener noreferrer" ' +
      'style="color:#7a3fd6;text-decoration:none;font-size:14px;display:flex;align-items:center;gap:6px;">' +
      '<span style="font-size:15px;">📄</span> Buy printables</a>' +
    '</li>' +

    '<li style="margin-bottom:0;list-style:none;">' +
      '<a href="https://amzn.to/45xaM8j" target="_blank" rel="noopener noreferrer" ' +
      'style="color:#7a3fd6;text-decoration:none;font-size:14px;display:flex;align-items:center;gap:6px;">' +
      '<span style="font-size:15px;">🎲</span> Browse games on Amazon</a>' +
    '</li>';

  /* =====================================
     MOBILE
     ===================================== */

  if (isMobile) {

    var fab = document.createElement("button");

    fab.id = "support-widget-fab";
    fab.setAttribute("aria-label", "Support us");
    fab.innerHTML = "💜";

    fab.style.cssText =
      "position:fixed !important;" +
      "bottom:18px !important;" +
      "right:16px !important;" +
      "z-index:99999 !important;" +
      "width:56px;height:56px;border-radius:50%;" +
      "background:linear-gradient(135deg,#8b5cf6,#6d28d9);" +
      "box-shadow:0 6px 20px rgba(109,40,217,0.45);" +
      "display:flex;align-items:center;justify-content:center;" +
      "font-size:26px;cursor:pointer;border:none;color:#fff;padding:0;";

    var panel = document.createElement("div");

    panel.id = "support-widget-panel";

    panel.style.cssText =
      "position:fixed !important;" +
      "bottom:82px !important;" +
      "right:16px !important;" +
      "z-index:99999 !important;" +
      "background:#fff;" +
      "border:1px solid #e3d6fb;" +
      "border-radius:14px;" +
      "box-shadow:0 10px 30px rgba(0,0,0,0.22);" +
      "padding:12px 14px;" +
      "width:200px;" +
      "box-sizing:border-box;" +
      "font-family:system-ui,Arial,sans-serif;" +
      "display:none;";

    panel.innerHTML =
      '<p style="font-weight:700;color:#1a1a1a;margin:0 0 8px 0;font-size:13px;">Support Us</p>' +
      '<ul style="list-style:none;margin:0;padding:0;">' +
      linksHTML +
      '</ul>';

    fab.addEventListener("click", function () {
      panel.style.display =
        panel.style.display === "none" ? "block" : "none";
    });

    document.body.appendChild(fab);
    document.body.appendChild(panel);

    return;
  }

  /* =====================================
     DESKTOP / TABLET
     ===================================== */

  var container = document.createElement("div");

  container.id = "support-widget-container";

  container.style.cssText =
    "position:fixed !important;" +
    "top:140px;" +
    "right:20px !important;" +
    "width:230px !important;" +
    "z-index:99999 !important;" +
    "background:#f6f1ff;" +
    "border:1px solid #d9c8f7;" +
    "border-radius:12px;" +
    "padding:14px 16px;" +
    "box-shadow:0 4px 18px rgba(122,63,214,0.18);" +
    "font-family:system-ui,Arial,sans-serif;" +
    "box-sizing:border-box;";

  container.innerHTML =
    '<p style="font-weight:700;color:#1a1a1a;margin:0 0 10px 0;font-size:15px;">Support Us</p>' +
    '<ul style="list-style:none;margin:0;padding:0;">' +
    linksHTML +
    '</ul>';

  document.body.appendChild(container);

  /* =====================================
     PREVENT FOOTER OVERLAP
     ===================================== */

  var footer = document.querySelector("footer.footer");

  if (!footer) {
    footer = document.querySelector("footer");
  }

  if (footer) {

    function positionWidget() {

      var footerRect = footer.getBoundingClientRect();
      var widgetHeight = container.offsetHeight;

      var normalTop = 140;
      var gap = 20;

      /*
       * Footer position relative to viewport.
       */
      var maximumTop =
        footerRect.top - widgetHeight - gap;

      /*
       * Normal position.
       */
      if (maximumTop >= normalTop) {

        container.style.top = normalTop + "px";

      } else {

        /*
         * Footer is approaching.
         * Move widget upward.
         */
        var newTop = Math.max(10, maximumTop);

        container.style.top = newTop + "px";
      }
    }

    window.addEventListener("scroll", positionWidget);
    window.addEventListener("resize", positionWidget);

    positionWidget();
  }

})();