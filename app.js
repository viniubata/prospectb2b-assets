/* ProspectB2B PRO — comportamento da página de vendas */
(function () {
  "use strict";

  var cfg = window.PROSPECT_CONFIG || {};

  /* ---------- menu mobile ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("menu-mobile");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      menu.hidden = open;
    });
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        menu.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- ano no rodapé ---------- */
  var ano = document.getElementById("ano");
  if (ano) ano.textContent = String(new Date().getFullYear());

  /* ---------- cabeçalho ao rolar ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var aoRolar = function () {
      if (window.scrollY > 12) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    window.addEventListener("scroll", aoRolar, { passive: true });
    aoRolar();
  }

  /* ---------- animação de entrada ---------- */
  var alvos = document.querySelectorAll(
    ".section-head, .feature-row, .card, .price-card, .price-side, .mcp-grid > *, .cta-inner > *"
  );
  if ("IntersectionObserver" in window) {
    alvos.forEach(function (el) { el.classList.add("reveal"); });
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("is-in");
          io.unobserve(entrada.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    alvos.forEach(function (el) { io.observe(el); });
  }

  /* ---------- links de checkout ---------- */
  var links = document.querySelectorAll("[data-checkout]");
  links.forEach(function (a) {
    if (cfg.checkoutAtivo) a.setAttribute("href", cfg.checkoutAtivo);
    a.setAttribute("target", "_blank");
    a.addEventListener("click", function () {
      rastrearCheckout();
    });
  });

  function rastrearCheckout() {
    try {
      if (typeof window.fbq === "function") {
        window.fbq("track", cfg.eventoCheckout || "InitiateCheckout", {
          content_name: "ProspectB2B PRO",
          content_category: "software",
          value: 997.0,
          currency: "BRL"
        });
      }
      if (typeof window.gtag === "function" && cfg.ga4Id) {
        window.gtag("event", "begin_checkout", {
          currency: "BRL",
          value: 997.0,
          items: [{ item_name: "ProspectB2B PRO", price: 997.0, quantity: 1 }]
        });
      }
    } catch (e) { /* rastreamento nunca deve quebrar a página */ }
  }

  /* ---------- Meta Pixel ---------- */
  if (cfg.metaPixelId) {
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", cfg.metaPixelId);
    window.fbq("track", cfg.eventoLead || "ViewContent", {
      content_name: "ProspectB2B PRO",
      value: 997.0,
      currency: "BRL"
    });
  }

  /* ---------- GA4 ---------- */
  if (cfg.ga4Id) {
    var g = document.createElement("script");
    g.async = true;
    g.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(cfg.ga4Id);
    document.head.appendChild(g);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", cfg.ga4Id, { anonymize_ip: true });
  }

  if (window.console && cfg.versao) {
    console.info("ProspectB2B PRO — site v" + cfg.versao);
  }
})();
