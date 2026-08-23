import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { X } from "lucide-react";

const SHOTS = [
  { src: "/images/morango-hero.png", alt: "Calda de morango caindo no pote", span: "md:row-span-2" },
  { src: "/images/amora-post.png", alt: "Pote de iogurte com geleia de amora", span: "" },
  { src: "/images/abacaxi-post.png", alt: "Pote de iogurte com geleia de abacaxi", span: "" },
  { src: "/images/amora-hero.png", alt: "Calda de amora caindo no pote", span: "md:row-span-2" },
  { src: "/images/morango-post.png", alt: "Pote de iogurte com geleia de morango", span: "" },
  { src: "/images/abacaxi-hero.png", alt: "Calda de abacaxi caindo no pote", span: "" },
];

export function Gallery() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="galeria" className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label text-pink">Galeria</p>
            <h2 className="mt-5 font-display text-[clamp(2.4rem,6vw,4.6rem)] text-cream">
              Direto da cozinha
            </h2>
          </div>
          <p className="max-w-sm text-cream/60">
            Sem banco de imagem: tudo que você vê aqui é o pote que chega até você. Clique para
            ampliar.
          </p>
        </div>

        <div className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-4 md:auto-rows-[240px]">
          {SHOTS.map((shot, i) => (
            <motion.button
              key={shot.src + i}
              onClick={() => setOpen(shot.src)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 ${shot.span}`}
            >
              <img
                src={shot.src}
                alt={shot.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/25" />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[60] grid place-items-center bg-ink/92 p-6 backdrop-blur-sm"
          >
            <button
              aria-label="Fechar"
              className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full border border-white/20 text-cream"
              onClick={() => setOpen(null)}
            >
              <X className="h-5 w-5" />
            </button>
            <motion.img
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={open}
              alt="TykaYurt"
              className="max-h-[85vh] max-w-full rounded-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
