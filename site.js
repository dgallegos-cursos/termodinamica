// Muestra un enlace solo si el PDF ya está en el sitio; si no, «Próximamente».
(function () {
  function exists(url) {
    return fetch(url, { method: "HEAD", cache: "no-cache" })
      .then(function (r) { return r.ok; })
      .catch(function () { return false; });
  }
  document.querySelectorAll("[data-pdf]").forEach(function (el) {
    var url = el.getAttribute("data-pdf");
    exists(url).then(function (ok) {
      if (ok) {
        el.innerHTML = '<a class="btn" href="' + url + '">Abrir PDF</a>';
      } else {
        el.innerHTML = '<span class="soon">Próximamente</span>';
      }
    });
  });
  document.querySelectorAll("[data-avail]").forEach(function (el) {
    exists(el.getAttribute("data-avail")).then(function (ok) {
      el.textContent = ok ? "Disponible" : "Próximamente";
      if (ok) el.classList.add("ok");
    });
  });
})();
