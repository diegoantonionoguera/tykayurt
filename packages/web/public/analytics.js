/* External script so analytics works without allowing inline JavaScript in CSP. */
(() => {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", "G-YQ6BBBRRH4");

  if (!window.fbq) {
    const fbq = window.fbq = function () {
      fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
    };
    window._fbq = fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.append(script);
  }
  window.fbq("init", "8205101376167714");
  window.fbq("track", "PageView");

  // Delegation also covers links mounted later by React.
  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest("a, [data-track]");
    if (!link) return;
    if (link.matches('a[href*="wa.me"], a[href*="whatsapp.com"], [data-track*="whatsapp"]')) {
      const posicao = link.getAttribute("data-track") || "whatsapp_desconhecido";
      window.gtag("event", "click_whatsapp", { posicao });
      window.fbq("track", "Lead", { posicao });
    }
    if (link.matches('[data-track="ver_sabores"], a[href*="#sabores"]')) {
      window.fbq("trackCustom", "CliqueSecundario", { origem: "ver_sabores" });
    }
  });
})();
