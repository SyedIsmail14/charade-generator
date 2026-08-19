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

  var style = document.createElement("style");
  style.textContent =
    /* ---------- Desktop / tablet sidebar box ---------- */
    ".support-widget{background:#f6f1ff;border:1px solid #d9c8f7;border-radius:12px;" +
    "padding:14px 16px;box-shadow:0 4px 18px rgba(122,63,214,0.18);font-family:inherit;" +
    "z-index:999;box-sizing:border-box;}" +
    ".support-widget__title{font-weight:700;color:#1a1a1a;margin:0 0 10px 0;font-size:15px;}" +
    ".support-widget__links{list-style:none;margin:0;padding:0;}" +
    ".support-widget__links li{margin-bottom:8px;}" +
    ".support-widget__links a{color:#7a3fd6;text-decoration:none;font-size:14px;" +
    "display:flex;align-items:center;gap:6px;}" +
    ".support-widget__links a:hover{text-decoration:underline;}" +
    ".support-widget__icon{font-size:15px;}" +
    "@media (min-width:769px){.support-widget{position:fixed;top:140px;right:20px;width:230px;}" +
    ".support-fab{display:none;}}" +

    /* ---------- Mobile: catchy floating action button ---------- */
    "@media (max-width:768px){" +
    ".support-widget{display:none;}" +
    ".support-fab{position:fixed;bottom:18px;right:16px;z-index:1000;" +
    "width:56px;height:56px;border-radius:50%;" +
    "background:linear-gradient(135deg,#8b5cf6,#6d28d9);" +
    "box-shadow:0 6px 20px rgba(109,40,217,0.45);" +
    "display:flex;align-items:center;justify-content:center;" +
    "font-size:26px;cursor:pointer;border:none;" +
    "animation:support-pulse 2.4s ease-in-out infinite;}" +
    "@keyframes support-pulse{0%,100%{transform:scale(1);}50%{transform:scale(1.08);}}" +
    ".support-fab-panel{position:fixed;bottom:82px;right:16px;z-index:1000;" +
    "background:#fff;border:1px solid #e3d6fb;border-radius:14px;" +
    "box-shadow:0 10px 30px rgba(0,0,0,0.22);padding:12px 14px;width:200px;" +
    "display:none;box-sizing:border-box;}" +
    ".support-fab-panel.open{display:block;}" +
    ".support-fab-panel__title{font-weight:700;color:#1a1a1a;margin:0 0 8px 0;font-size:13px;}" +
    ".support-fab-panel ul{list-style:none;margin:0;padding:0;}" +
    ".support-fab-panel li{margin-bottom:8px;}" +
    ".support-fab-panel a{color:#7a3fd6;text-decoration:none;font-size:13px;" +
    "display:flex;align-items:center;gap:6px;}" +
    ".support-fab-panel a:hover{text-decoration:underline;}" +
    "}";
  document.head.appendChild(style);

  var linksHTML =
    '<li><a href="https://buymeacoffee.com/charadegenerator" target="_blank" rel="noopener noreferrer">' +
    '<span class="support-widget__icon">\u2615</span> Caffeinate us!</a></li>' +
    '<li><a href="https://payhip.com/Charadegenerator" target="_blank" rel="noopener noreferrer">' +
    '<span class="support-widget__icon">\uD83D\uDCC4</span> Buy printables</a></li>' +
    '<li><a href="https://amzn.to/45xaM8j" target="_blank" rel="noopener noreferrer">' +
    '<span class="support-widget__icon">\uD83C\uDFB2</span> Browse games on Amazon</a></li>';

  // Desktop/tablet sidebar box
  var sidebar = document.createElement("div");
  sidebar.className = "support-widget";
  sidebar.id = "support-widget";
  sidebar.innerHTML =
    '<p class="support-widget__title">Support Charade Generator!</p>' +
    '<ul class="support-widget__links">' + linksHTML + "</ul>";
  document.body.appendChild(sidebar);

  // Mobile floating action button + expandable panel
  var fab = document.createElement("button");
  fab.className = "support-fab";
  fab.setAttribute("aria-label", "Support us");
  fab.innerHTML = "\uD83D\uDC9C";

  var panel = document.createElement("div");
  panel.className = "support-fab-panel";
  panel.innerHTML =
    '<p class="support-fab-panel__title">Support GetCharadesIdeas!</p>' +
    "<ul>" + linksHTML + "</ul>";

  fab.addEventListener("click", function () {
    panel.classList.toggle("open");
  });

  document.body.appendChild(fab);
  document.body.appendChild(panel);
})();
