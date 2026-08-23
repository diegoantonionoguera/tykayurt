const ITEMS = [
  "Geleia 100% fruta",
  "Zero conservantes",
  "Produção a cada 48h",
  "18 unidades por dia",
  "Feito à mão em Curitiba",
  "Delicie-se sem culpa",
];

export function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden border-y border-white/10 bg-magenta py-4">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-xl text-white md:text-2xl">{item}</span>
            <span className="h-2 w-2 rounded-full bg-white/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
