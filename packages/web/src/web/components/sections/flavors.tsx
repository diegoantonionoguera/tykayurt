import { AnimatePresence, motion } from "motion/react";
import { type CSSProperties, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { FLAVORS, PRODUCT, whatsappLink } from "../../lib/brand";

export function Flavors() {
  const [active, setActive] = useState(0);
  const flavor = FLAVORS[active];
  const message = `Oi! Quero pedir um TykaYurt de ${flavor.name} de ${PRODUCT.size} (${PRODUCT.price}).`;
  const flavorStyle = {
    "--flavor-bg-light": flavor.bgLight,
    "--flavor-bg-dark": flavor.bgDark,
    "--flavor-accent": flavor.accent,
  } as CSSProperties;

  return (
    <section
      id="sabores"
      className="flavor-section relative overflow-hidden py-24 transition-colors duration-500 md:py-32"
      style={flavorStyle}
    >
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label text-flavor-accent">
              Nossos sabores
            </p>
            <h2 className="mt-5 text-balance font-display text-[clamp(2.4rem,6vw,4.6rem)] text-flavor-content">
              Escolha o seu
            </h2>
          </div>
          <p className="max-w-sm text-pretty text-flavor-muted">
            Todos os potes levam a mesma base cremosa. O que muda é a geleia — cozida com fruta
            inteira, uma panela por vez.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          {FLAVORS.map((f, i) => (
            <button
              key={f.id}
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={`rounded-full border px-6 py-3 text-sm font-bold transition-all ${
                i === active
                  ? "border-transparent text-white shadow-sm"
                  : "border-flavor text-flavor-muted hover:border-flavor-strong hover:text-flavor-content"
              }`}
              style={i === active ? { backgroundColor: f.accent } : undefined}
            >
              {f.name}
            </button>
          ))}
        </div>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[420px] md:min-h-[540px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={flavor.id}
                src={flavor.image}
                alt={`Iogurte TykaYurt sabor ${flavor.name}`}
                width="1080"
                height="1350"
                initial={{ opacity: 0, scale: 0.95, rotate: -1.5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45 }}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full rounded-2xl object-cover shadow-[0_24px_70px_rgba(33,35,37,0.18)]"
              />
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={flavor.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              <p className="label text-flavor-accent">
                {flavor.tagline}
              </p>
              <h3 className="mt-4 text-balance font-display text-[clamp(3rem,8vw,6rem)] text-flavor-content">
                {flavor.name}
              </h3>
              <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-flavor-muted">
                {flavor.description}
              </p>

              <div className="mt-9 inline-flex items-end gap-5 border-y border-flavor py-4">
                <p className="font-display text-3xl text-flavor-content">{PRODUCT.price}</p>
                <div className="pb-0.5">
                  <p className="text-sm font-bold text-flavor-content">{PRODUCT.size}</p>
                  <p className="text-xs text-flavor-muted">{PRODUCT.note}</p>
                </div>
              </div>

              <p className="mt-5 text-sm text-flavor-muted">
                Abre o WhatsApp com o pedido já escrito. É só enviar.
              </p>

              <a
                href={whatsappLink(message)}
                target="_blank"
                rel="noreferrer"
                className="button-press mt-4 inline-flex items-center gap-3 rounded-full px-8 py-4 text-base font-bold text-white hover:scale-[1.02]"
                style={{ backgroundColor: flavor.accent }}
              >
                <FaWhatsapp className="h-5 w-5" />
                Pedir {flavor.name} {PRODUCT.size}
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
