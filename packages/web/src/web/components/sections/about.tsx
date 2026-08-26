import { motion } from "motion/react";

const STATS = [
  { value: "48h", label: "Novo lote a cada dois dias" },
  { value: "18", label: "Unidades por dia, no máximo" },
  { value: "0", label: "Conservantes e aromatizantes" },
  { value: "100%", label: "Fruta de verdade na geleia" },
];

export function About() {
  return (
    <section id="sobre" className="relative bg-surface py-24 text-content md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="label text-magenta">Sobre a marca</p>
            <h2 className="mt-5 text-balance font-display text-[clamp(2.4rem,6vw,4.6rem)] text-content">
              Feito à mão,
              <br />
              em lotes pequenos
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="space-y-6 text-pretty text-lg leading-relaxed text-content-muted"
          >
            <p>
              A TykaYurt nasceu na cozinha de casa, no Hauer, em Curitiba. Cada pote é montado à
              mão: iogurte cremoso fermentado devagar e geleia cozida com fruta inteira — nada de
              polpa artificial, corante ou aromatizante.
            </p>
            <p>
              Produzimos no máximo <strong className="text-content">18 unidades por dia</strong> e
              renovamos a produção a cada 48 horas. Por isso a validade é curta: é exatamente essa
              a prova de que não tem conservante nenhum ali dentro.
            </p>
            <p className="border-l border-magenta pl-5 font-medium text-content">
              Se durar meses na geladeira, não é artesanal. O nosso dura poucos dias — e some antes
              disso.
            </p>
          </motion.div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line md:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.value}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-surface p-7 md:p-9"
            >
              <p className="font-display text-[clamp(2.6rem,5vw,4rem)] text-plum">{s.value}</p>
              <p className="mt-2 text-sm leading-snug text-content-muted">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
