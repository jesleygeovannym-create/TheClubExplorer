(function () {
  "use strict";

  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const DESKTOP_SPEED = 120;
  const MOBILE_SPEED = 36;
  const mobileQuery = window.matchMedia ? window.matchMedia("(max-width: 850px)") : null;
  const initialized = new WeakSet();

  function initCarousel(element) {
    if (!element || initialized.has(element)) return;
    initialized.add(element);

    let paused = false;
    let resumeTimer = null;

    function pause(ms) {
      paused = true;
      if (resumeTimer) clearTimeout(resumeTimer);
      if (ms) resumeTimer = setTimeout(function () { paused = false; }, ms);
    }

    element.addEventListener("mouseenter", function () { pause(0); });
    element.addEventListener("mouseleave", function () { paused = false; });
    element.addEventListener("touchstart", function () { pause(0); }, { passive: true });
    element.addEventListener("touchend", function () { pause(3000); }, { passive: true });
    element.addEventListener("wheel", function () { pause(2000); }, { passive: true });

    let lastFrame = 0;
    function tick(now) {
      if (element.isConnected) {
        const elapsed = lastFrame ? Math.min(now - lastFrame, 50) : 16;
        lastFrame = now;
        if (!paused && element.scrollWidth > element.clientWidth + 2) {
          element.style.scrollSnapType = "none";
          const speed = mobileQuery && mobileQuery.matches ? MOBILE_SPEED : DESKTOP_SPEED;
          element.scrollLeft += (speed * elapsed) / 1000;
          if (element.scrollLeft + element.clientWidth >= element.scrollWidth - 1) {
            element.scrollLeft = 0;
          }
        } else {
          element.style.scrollSnapType = "";
        }
        requestAnimationFrame(tick);
      }
    }
    requestAnimationFrame(tick);
  }

  function scan() {
    document.querySelectorAll(".portal-card-carousel").forEach(initCarousel);
  }

  const observer = new MutationObserver(scan);
  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scan, { once: true });
  } else {
    scan();
  }
  setInterval(scan, 1200);
})();