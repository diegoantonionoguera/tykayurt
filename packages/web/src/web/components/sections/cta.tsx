import { motion } from "motion/react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa6";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_DISPLAY, whatsappLink } from "../../lib/brand";

export function Cta() {
  return (
    <section className="relative overflow-hidden bg-plum py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(215,39,114,0.6), transparent 55%), radial-gradient(circle at 85% 80%, rgba(245,133,182,0.45), transparent 55%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-[1000px] px-5 text-center md:px-10"
      >
        <p className="label text-cream/70">Pedidos pelo WhatsApp</p>
        <h2 className="mt-6 font-display text-[clamp(2.6rem,8vw,6rem)] text-cream">
          Delicie-se sem culpa
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-cream/75">
          Fazemos apenas 18 potes por dia. Chame no WhatsApp, escolha o sabor e combinamos a
          entrega em Curitiba.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href={whatsappLink("Oi! Quero pedir um TykaYurt. Quais sabores tem hoje?")}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-full bg-cream px-8 py-4 text-base font-bold text-ink transition-transform hover:scale-[1.03]"
          >
            <FaWhatsapp className="h-5 w-5 text-magenta" />
            {WHATSAPP_DISPLAY}
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-full border border-cream/40 px-8 py-4 text-base font-semibold text-cream transition-colors hover:bg-cream/10"
          >
            <FaInstagram className="h-5 w-5" />@{INSTAGRAM_HANDLE}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
