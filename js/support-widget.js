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
    ".support-widget{background:#f6f1ff;border:1px solid #d9c8f7;border-radius:12px;" +
    "padding:14px 16px;box-shadow:0 2px 10px rgba(0,0,0,0.08);font-family:inherit;" +
    "z-index:999;box-sizing:border-box;}" +
    ".support-widget__title{font-weight:700;color:#1a1a1a;margin:0 0 10px 0;font-size:15px;}" +
    ".support-widget__links{list-style:none;margin:0;padding:0;}" +
    ".support-widget__links li{margin-bottom:8px;}" +
    ".support-widget__links a{color:#7a3fd6;text-decoration:none;font-size:14px;" +
    "display:flex;align-items:center;gap:6px;}" +
    ".support-widget__links a:hover{text-decoration:underline;}" +
    ".support-widget__icon{font-size:15px;}" +
    ".support-widget__footer{margin-top:12px;padding-top:10px;border-top:1px solid #e3d6fb;" +
    "font-size:12px;color:#444;}" +
    "@media (min-width:769px){.support-widget{position:fixed;top:140px;right:20px;width:230px;}}" +
    "@media (max-width:768px){.support-widget{position:fixed;right:10px;bottom:10px;top:auto;" +
    "width:170px;padding:10px 12px;}" +
    ".support-widget__title{font-size:13px;margin-bottom:6px;}" +
    ".support-widget__links a{font-size:12px;}" +
    ".support-widget__footer{font-size:10px;margin-top:8px;padding-top:6px;}}";
  document.head.appendChild(style);

  var wrapper = document.createElement("div");
  wrapper.innerHTML =
    '<div class="support-widget" id="support-widget">' +
    '<p class="support-widget__title">Support GetCharadesIdeas!</p>' +
    '<ul class="support-widget__links">' +
    '<li><a href="https://buymeacoffee.com/charadegenerator" target="_blank" rel="noopener noreferrer">' +
    '<span class="support-widget__icon">\u2615</span> Caffeinate us!</a></li>' +
    '<li><a href="https://payhip.com/Charadegenerator" target="_blank" rel="noopener noreferrer">' +
    '<span class="support-widget__icon">\uD83D\uDCC4</span> Buy printables</a></li>' +
    '<li><a href="https://amzn.to/45xaM8j" target="_blank" rel="noopener noreferrer">' +
    '<span class="support-widget__icon">\uD83C\uDFB2</span> Browse games on Amazon</a></li>' +
    "</ul>" +
    '<div class="support-widget__footer"><span>Brought to you by brothers Ciar\u00e1n &amp; Brian from \uD83C\uDDEE\uD83C\uDDEA</span></div>' +
    "</div>";

  document.body.appendChild(wrapper.firstElementChild);
})();
