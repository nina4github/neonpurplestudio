/* Neon Purple studio — behaviour for the theme toggle and the neon sign.
   A classic script, no dependencies. Exposes window.NeonPurpleStudioUI and
   wires up [data-np-theme-toggle] and [data-np-sign] when the page loads. */
(function () {
  var KEY = "np-theme";
  var root = document.documentElement;
  var mq = function (q) { return window.matchMedia ? window.matchMedia(q) : { matches: false }; };

  function saved() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function current() {
    var t = root.getAttribute("data-theme");
    if (t === "light" || t === "dark") return t;
    return mq("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  // Run as early as possible (inline in <head>) to avoid a flash of the wrong theme.
  function applySavedTheme() {
    var t = saved();
    if (t === "light" || t === "dark") root.setAttribute("data-theme", t);
  }

  function initThemeToggle(btn) {
    var sync = function () { btn.setAttribute("aria-pressed", current() === "dark" ? "true" : "false"); };
    sync();
    btn.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      save(next);
      sync();
    });
  }

  function initSign(sign) {
    var still = function () {
      return mq("(prefers-reduced-motion: reduce)").matches || mq("(pointer: coarse)").matches || window.innerWidth < 640;
    };
    var frame = 0;
    window.addEventListener("pointermove", function (e) {
      if (still() || frame) return;
      frame = requestAnimationFrame(function () {
        frame = 0;
        var r = sign.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
        var dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
        sign.style.setProperty("--ry", (dx * 12).toFixed(2) + "deg");
        sign.style.setProperty("--rx", (-dy * 8).toFixed(2) + "deg");
      });
    }, { passive: true });
    document.addEventListener("pointerleave", function () {
      sign.style.setProperty("--rx", "0deg");
      sign.style.setProperty("--ry", "0deg");
    });
  }

  function init() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-np-theme-toggle]"), initThemeToggle);
    Array.prototype.forEach.call(document.querySelectorAll("[data-np-sign]"), initSign);
  }

  window.NeonPurpleStudioUI = { applySavedTheme: applySavedTheme, initThemeToggle: initThemeToggle, initSign: initSign, init: init };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
