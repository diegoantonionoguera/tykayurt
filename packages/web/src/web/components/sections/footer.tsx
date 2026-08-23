import { FaWhatsapp, FaInstagram } from "react-icons/fa6";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_DISPLAY, whatsappLink } from "../../lib/brand";

export function Footer() {
  return (
    <footer className="bg-ink py-14">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col gap-8 border-t border-white/10 pt-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <img src="/images/logo.png" alt="TykaYurt" className="h-14 w-14 rounded-full object-cover" />
            <div>
              <p className="font-display text-2xl text-cream">TykaYurt</p>
              <p className="text-sm text-cream/50">Iogurte artesanal · Curitiba — Hauer / Boqueirão</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={whatsappLink("Oi! Quero pedir um TykaYurt.")}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full bg-magenta px-6 py-3 text-sm font-bold text-white"
            >
              <FaWhatsapp className="h-4 w-4" />
              {WHATSAPP_DISPLAY}
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-cream hover:border-pink hover:text-pink"
            >
              <FaInstagram className="h-4 w-4" />@{INSTAGRAM_HANDLE}
            </a>
          </div>
        </div>

        <p className="mt-10 text-xs text-cream/35">
          © {new Date().getFullYear()} TykaYurt. Produto artesanal sem conservantes — consumir em
          poucos dias e manter refrigerado.
        </p>
      </div>
    </footer>
  );
}
