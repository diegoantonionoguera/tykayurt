import { useEffect, useState } from "react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa6";
import { INSTAGRAM_URL, whatsappLink } from "../../lib/brand";

const LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#sabores", label: "Sabores" },
  { href: "#galeria", label: "Galeria" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ${
        scrolled ? "nav-material backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-10">
        <a href="#topo" className="flex items-center gap-3">
          <img src="/images/logo.png" alt="" width="44" height="44" className="h-11 w-11 rounded-full object-cover" />
          <span className="font-display text-xl tracking-tight text-content md:text-2xl">TykaYurt</span>
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="label text-content-muted transition-colors hover:text-magenta"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram da TykaYurt"
            className="button-press grid h-11 w-11 place-items-center rounded-full border border-line text-content hover:border-magenta hover:text-magenta"
          >
            <FaInstagram className="h-5 w-5" />
          </a>
          <a
            href={whatsappLink("Oi! Vim pelo site e quero pedir um TykaYurt.")}
            data-track="whatsapp_header"
            target="_blank"
            rel="noreferrer"
            className="button-press flex items-center gap-2 rounded-full bg-magenta px-5 py-3 text-sm font-bold text-white hover:bg-[#bc1f60] hover:scale-[1.02]"
          >
            <FaWhatsapp className="h-4 w-4" />
            <span className="hidden sm:inline">Pedir agora</span>
            <span className="sm:hidden">Pedir</span>
          </a>
        </div>
      </div>
      </header>
    </>
  );
}
