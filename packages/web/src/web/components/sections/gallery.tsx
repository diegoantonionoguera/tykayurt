import { AnimatePresence, m } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const SHOTS = [
  {
    src: "/images/morango-a.webp",
    alt: "Iogurte TykaYurt com geleia de morango",
    width: 720,
    height: 1080,
  },
  {
    src: "/images/amora-b.webp",
    alt: "Iogurte TykaYurt com geleia de amora",
    width: 1080,
    height: 1080,
  },
  {
    src: "/images/abacaxi-a.webp",
    alt: "Iogurte TykaYurt com geleia de abacaxi",
    width: 720,
    height: 1080,
  },
];

export function Gallery() {
  const [open, setOpen] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (dialog && !dialog.open) dialog.showModal();
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog?.open) dialog.close();
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <section id="galeria" className="bg-page py-24 md:py-32">
      <div className="site-container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label text-brand">Galeria</p>
            <h2 className="mt-5 text-balance font-display text-[clamp(2.4rem,6vw,4.6rem)] text-content">
              Direto da nossa cozinha
            </h2>
          </div>
          <p className="gallery-description max-w-sm text-pretty text-content-muted">
            Sabores e pequenos detalhes que fazem parte da TykaYurt. Toque nas imagens para ver de
            perto.
          </p>
        </div>

        <div className="gallery-grid mt-12 grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-4 md:auto-rows-[240px]">
          {SHOTS.map((shot, i) => (
            <m.button
              key={shot.src + i}
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setOpen(shot.src);
              }}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              aria-label={`Ampliar: ${shot.alt}`}
              className="group relative overflow-hidden rounded-2xl bg-surface-alt"
            >
              <img
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/20"
              />
            </m.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.dialog
            ref={dialogRef}
            aria-modal="true"
            aria-label="Imagem ampliada da galeria TykaYurt"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            onCancel={(event) => {
              event.preventDefault();
              setOpen(null);
            }}
            className="fixed inset-0 z-[60] m-0 max-h-none max-w-none overscroll-contain border-0 bg-ink/92 p-6 backdrop-blur-sm open:grid open:place-items-center"
          >
            <button
              ref={closeButtonRef}
              aria-label="Fechar"
              className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full border border-white/20 text-cream"
              onClick={() => setOpen(null)}
            >
              <X className="h-5 w-5" />
            </button>
            <m.img
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={open}
              alt={`Imagem ampliada: ${SHOTS.find((shot) => shot.src === open)?.alt ?? "produto TykaYurt"}`}
              onClick={(event) => event.stopPropagation()}
              decoding="async"
              className="max-h-[85vh] max-w-full rounded-2xl object-contain"
            />
          </m.dialog>
        )}
      </AnimatePresence>
    </section>
  );
}
