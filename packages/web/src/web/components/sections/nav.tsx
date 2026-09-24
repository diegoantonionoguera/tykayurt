import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { whatsappLink } from "../../lib/brand";
import { OrderButton } from "../ui/order-button";

const LINKS = [
  { href: "#topo", label: "Início" },
  { href: "#sabores", label: "Sabores" },
  { href: "#sobre", label: "Nossa história" },
  { href: "#entrega", label: "Onde encontrar" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [floating, setFloating] = useState(false);
  const [active, setActive] = useState("#topo");
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const primaryActions = new Map<Element, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => primaryActions.set(entry.target, entry.isIntersecting));
        setFloating(![...primaryActions.values()].some(Boolean));
      },
      { threshold: 0.2 },
    );
    document
      .querySelectorAll(".order-button:not(.header-cta)")
      .forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const sections = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive("#" + entry.target.id);
        });
      },
      { rootMargin: "-76px 0px -55% 0px" },
    );
    LINKS.forEach((link) => {
      const section = document.querySelector(link.href);
      if (section) sections.observe(section);
    });
    return () => sections.disconnect();
  }, []);
  useEffect(() => {
    const breakpoint = window.matchMedia("(min-width: 961px)");
    const close = () => {
      if (breakpoint.matches) setOpen(false);
    };
    breakpoint.addEventListener("change", close);
    return () => breakpoint.removeEventListener("change", close);
  }, []);
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header
        className="site-header"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setOpen(false);
            menuButton.current?.focus();
          }
        }}
      >
        <div className="site-container header-row">
          <a href="/#topo" className="site-logo" aria-label="TykaYurt, início">
            <img src="/images/isologo-tykayurt.webp" alt="" width="44" height="44" />
            <span>TykaYurt</span>
          </a>
          <nav aria-label="Navegação principal" className="desktop-nav">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={"/" + link.href}
                aria-current={active === link.href ? "location" : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <OrderButton
            className="header-cta"
            tracking="whatsapp_header"
            message="Oi! Quero pedir um TykaYurt."
          >
            Pedir pelo WhatsApp
          </OrderButton>
          <button
            ref={menuButton}
            className="menu-toggle"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        <nav id="mobile-nav" className="mobile-nav" aria-label="Navegação mobile" hidden={!open}>
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={"/" + link.href}
              onClick={() => setOpen(false)}
              aria-current={active === link.href ? "location" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </header>
      {floating && (
        <a
          className="floating-whatsapp"
          href={whatsappLink("Oi! Quero conhecer os sabores TykaYurt.")}
          target="_blank"
          rel="noreferrer"
          aria-label="Pedir pelo WhatsApp"
        >
          <FaWhatsapp />
        </a>
      )}
    </>
  );
}
