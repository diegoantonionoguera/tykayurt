import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { FLAVORS, SIZES, whatsappLink } from "../../lib/brand";

export function Flavors() {
  const [active, setActive] = useState(0);
  const [size, setSize] = useState(SIZES[0].id);
  const flavor = FLAVORS[active];
  const chosen = SIZES.find((s) => s.id === size) ?? SIZES[0];

  const message = flavor.soon
    ? `Oi! Vi no site que o sabor ${flavor.name} está chegando. Quero entrar na lista para provar 🍑`
    : `Oi! Quero pedir um TykaYurt de ${flavor.name} de ${chosen.label} (${chosen.price}).`;

  return (
    <section
      id="sabores"
      className="grain relative overflow-hidden py-24 transition-colors duration-700 md:py-32"
      style={{ backgroundColor: flavor.bg }}
    >
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label" style={{ color: flavor.accent }}>
              Nossos sabores
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.4rem,6vw,4.6rem)] text-cream">
              Escolha o seu
            </h2>
          </div>
          <p className="max-w-sm text-cream/60">
            Todos os potes levam a mesma base cremosa. O que muda é a geleia — cozida com fruta
            inteira, uma panela por vez.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          {FLAVORS.map((f, i) => (
            <button
              key={f.id}
              onClick={() => setActive(i)}
              className={`rounded-full border px-6 py-3 text-sm font-bold transition-all ${
                i === active
                  ? "border-transparent text-white"
                  : "border-cream/20 text-cream/70 hover:border-cream/50 hover:text-cream"
              }`}
              style={i === active ? { backgroundColor: f.accent } : undefined}
            >
              {f.name}
              {f.soon && <span className="ml-2 text-[10px] uppercase opacity-80">em breve</span>}
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
                initial={{ opacity: 0, scale: 0.95, rotate: -1.5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45 }}
                className="absolute inset-0 h-full w-full rounded-[28px] border border-white/10 object-cover"
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
              <p className="label" style={{ color: flavor.accent }}>
                {flavor.tagline}
              </p>
              <h3 className="mt-4 font-display text-[clamp(3rem,8vw,6rem)] text-cream">
                {flavor.name}
              </h3>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-cream/70">
                {flavor.description}
              </p>

              {!flavor.soon && (
                <div className="mt-9 flex flex-wrap gap-3">
                  {SIZES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSize(s.id)}
                      className={`min-w-[160px] rounded-2xl border p-5 text-left transition-all ${
                        s.id === size
                          ? "border-transparent bg-cream text-ink"
                          : "border-cream/20 text-cream hover:border-cream/50"
                      }`}
                    >
                      <p className="font-display text-2xl">{s.price}</p>
                      <p className="mt-1 text-sm font-semibold">{s.label}</p>
                      <p className="text-xs opacity-60">{s.note}</p>
                    </button>
                  ))}
                </div>
              )}

              <a
                href={whatsappLink(message)}
                target="_blank"
                rel="noreferrer"
                className="mt-9 inline-flex items-center gap-3 rounded-full px-8 py-4 text-base font-bold text-white transition-transform hover:scale-[1.03]"
                style={{ backgroundColor: flavor.accent }}
              >
                <FaWhatsapp className="h-5 w-5" />
                {flavor.soon ? "Entrar na lista" : `Pedir ${flavor.name} ${chosen.label}`}
              </a>

              <p className="mt-4 text-sm text-cream/45">
                Abre o WhatsApp com o pedido já escrito. É só enviar.
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
