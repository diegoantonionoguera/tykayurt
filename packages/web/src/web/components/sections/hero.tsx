import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { whatsappLink } from "../../lib/brand";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="topo" ref={ref} className="grain relative overflow-hidden bg-ink pt-28 pb-16 md:pt-36">
      <div
        className="pointer-events-none absolute -left-40 top-10 h-[520px] w-[520px] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(129,0,128,0.55), transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(215,39,114,0.45), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="label text-pink"
        >
          Curitiba · Hauer / Boqueirão
        </motion.p>

        <div className="mt-6 grid items-end gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h1 className="font-display text-cream text-[clamp(3.4rem,11vw,9rem)]">
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className="block"
              >
                Iogurte
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="block text-magenta"
              >
                de verdade
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-7 max-w-lg text-lg leading-relaxed text-cream/70 md:text-xl"
            >
              Artesanal, cremoso e coberto com geleia feita de fruta inteira. Sem conservantes,
              sem aromatizante, sem atalho. Produzido fresco a cada 48 horas.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href={whatsappLink("Oi! Vim pelo site e quero pedir um TykaYurt 🍓")}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-full bg-magenta px-8 py-4 text-base font-bold text-white transition-transform hover:scale-[1.03]"
              >
                <FaWhatsapp className="h-5 w-5" />
                Pedir no WhatsApp
              </a>
              <a
                href="#sabores"
                className="rounded-full border border-cream/25 px-8 py-4 text-base font-semibold text-cream transition-colors hover:border-pink hover:text-pink"
              >
                Ver sabores
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-cream/55"
            >
              <span>500 ml — R$ 20</span>
              <span className="text-cream/20">·</span>
              <span>250 ml — R$ 12</span>
              <span className="text-cream/20">·</span>
              <span>Entrega combinada no WhatsApp</span>
            </motion.div>
          </div>

          <motion.div style={{ y, opacity: fade }} className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative overflow-hidden rounded-[28px] border border-white/10"
            >
              <img
                src="/images/morango-hero.png"
                alt="Pote de iogurte artesanal TykaYurt com geleia de morango"
                className="w-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              className="absolute -bottom-6 -left-4 rounded-2xl bg-cream px-5 py-4 text-ink shadow-2xl md:-left-10"
            >
              <p className="font-display text-3xl leading-none text-magenta">48h</p>
              <p className="mt-1 text-xs font-semibold leading-tight text-ink/70">
                giro de produção
                <br />
                sempre fresco
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="absolute -top-4 right-0 rounded-2xl bg-plum px-5 py-4 text-cream shadow-2xl md:-right-6"
            >
              <p className="font-display text-3xl leading-none">18</p>
              <p className="mt-1 text-xs font-semibold leading-tight text-cream/75">
                unidades
                <br />
                por dia
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
