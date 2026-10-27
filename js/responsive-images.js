/* Helper de imágenes responsivas.
   Depende de src/ri-manifest.js (window.RI_MANIFEST), generado por
   tools/optimize_images.py, que indica el ancho real y las variantes WebP
   disponibles para cada raster local.

   RI.img(src, opts) -> <picture> con <source type="image/webp" srcset>
   RI.bg(src, opts)  -> <img class="ri-bg"> + <span class="ri-shade"> para
                        contenedores que usaban background-image. */
(function () {
  "use strict";

  var manifest = window.RI_MANIFEST || {};

  function esc(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function encodePath(path) {
    return path
      .split("/")
      .map(function (part) {
        return encodeURIComponent(part);
      })
      .join("/");
  }

  function findEntry(src) {
    if (typeof src !== "string" || !src) return null;
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(src)) return null;
    return manifest[src] || null;
  }

  function srcsetFor(src, entry) {
    var base = src.replace(/\.(jpe?g|png)$/i, "");
    var parts = [];
    for (var i = 0; i < entry.v.length; i += 1) {
      parts.push(encodePath(base + "-" + entry.v[i] + ".webp") + " " + entry.v[i] + "w");
    }
    parts.push(encodePath(base + ".webp") + " " + entry.w + "w");
    return parts.join(", ");
  }

  function baseAttrs(opts) {
    var attrs = "";
    if (opts.cls) attrs += ' class="' + esc(opts.cls) + '"';
    if (opts.id) attrs += ' id="' + esc(opts.id) + '"';
    if (opts.style) attrs += ' style="' + esc(opts.style) + '"';
    return attrs;
  }

  function loadAttrs(opts) {
    var loading = opts.loading || (opts.priority ? "eager" : "lazy");
    var attrs = ' loading="' + loading + '" decoding="' + (opts.decoding || "async") + '"';
    if (opts.priority) attrs += ' fetchpriority="high"';
    return attrs;
  }

  function img(src, opts) {
    opts = opts || {};
    var entry = findEntry(src);
    var alt = opts.alt == null ? "" : String(opts.alt);
    var common = baseAttrs(opts) + ' alt="' + esc(alt) + '"' + loadAttrs(opts);

    if (!entry) {
      return '<img src="' + esc(src) + '"' + common + " />";
    }

    var sizes = opts.sizes || "100vw";
    return (
      "<picture>" +
      '<source type="image/webp" srcset="' + esc(srcsetFor(src, entry)) + '" sizes="' + esc(sizes) + '">' +
      '<img src="' + encodePath(src) + '"' + common +
      " />" +
      "</picture>"
    );
  }

  function bg(src, opts) {
    opts = opts || {};
    var entry = findEntry(src);
    var cls = "ri-bg" + (opts.cls ? " " + opts.cls : "");
    var attrs =
      ' class="' + esc(cls) + '" alt="" aria-hidden="true"' + loadAttrs(opts);

    var markup;
    if (entry) {
      var sizes = opts.sizes || "100vw";
      markup =
        "<picture>" +
        '<source type="image/webp" srcset="' + esc(srcsetFor(src, entry)) + '" sizes="' + esc(sizes) + '">' +
        '<img src="' + encodePath(src) + '"' + attrs +
        ' srcset="' + esc(srcsetFor(src, entry)) + '" sizes="' + esc(sizes) + '" />' +
        "</picture>";
    } else {
      markup = '<img src="' + esc(src) + '"' + attrs + " />";
    }

    if (opts.gradient) {
      markup += '<span class="ri-shade" style="background:' + esc(opts.gradient) + '"></span>';
    }
    return markup;
  }

  window.RI = { img: img, bg: bg };
})();
