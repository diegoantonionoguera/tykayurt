import { m } from "motion/react";

const STATS = [
  { value: "100%", label: "Fruta de verdade na geleia" },
  { value: "0", label: "Conservantes e aromatizantes" },
  { value: "100%", label: "Feito à mão, pote a pote" },
  { value: "♥", label: "Feito para quem você ama" },
];

export function About() {
  return (
    <section id="sobre" className="relative bg-surface py-24 text-content md:py-32">
      <div className="site-container">
        <div className="about-grid grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <m.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="label text-brand">Nosso jeito de fazer</p>
            <h2 className="mt-5 text-balance font-display text-[clamp(2.4rem,6vw,4.6rem)] text-content">
              Feito na cozinha de casa,
              <br />
              com carinho de casa.
            </h2>
          </m.div>

          <m.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="about-copy space-y-6 text-pretty text-lg leading-relaxed text-content-muted"
          >
            <p>
              A TykaYurt nasceu na cozinha de casa, em Curitiba, de um jeito simples de cuidar de
              quem a gente gosta. Cada pote é montado à mão, com iogurte cremoso e geleia cozida com
              fruta de verdade, sem pressa e sem atalhos.
            </p>
            <p className="about-highlight border-l border-brand pl-5 font-medium text-content">
              Porque comer bem também é uma forma de se cuidar. Venha fazer parte da nossa mesa.
            </p>
          </m.div>
        </div>

        <div className="about-stats about-grid mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line md:grid-cols-4">
          {STATS.map((s, i) => (
            <m.div
              key={s.label}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-surface p-7 md:p-9"
            >
              <p className="stat-value font-display text-[clamp(2.6rem,5vw,4rem)] text-brand">
                {s.value}
              </p>
              <p className="stat-label mt-2 text-sm leading-snug text-content-muted">{s.label}</p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
