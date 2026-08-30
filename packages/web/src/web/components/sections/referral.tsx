import { FaWhatsapp } from "react-icons/fa6";
import { whatsappLink } from "../../lib/brand";

const REFERRAL_MESSAGE =
  "Oi! Quero participar do Compartilhou, Ganhou e pegar meu código de indicação";

export function Referral() {
  return (
    <section aria-labelledby="referral-title" className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="relative overflow-hidden rounded-2xl bg-ink px-6 py-12 text-cream shadow-[0_22px_60px_rgba(33,35,37,0.18)] sm:px-10 md:px-16 md:py-16">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-plum/50 blur-3xl"
          />
          <div className="relative max-w-3xl">
            <p className="label text-pink">Programa de indicação</p>
            <h2
              id="referral-title"
              className="mt-5 text-balance font-display text-[clamp(2.8rem,7vw,5.6rem)]"
            >
              <span className="block">Compartilhou,</span>
              <span className="block text-pink">Ganhou</span>
            </h2>
            <p className="mt-7 max-w-2xl text-pretty text-base leading-8 text-cream/80 md:text-lg">
              A cada 2 amigas que você indicar e comprarem, você ganha 1 pote de 250ml grátis.
              Simples assim — sem sorteio, sem pegadinha.
            </p>
            <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <a
                href={whatsappLink(REFERRAL_MESSAGE)}
                data-track="whatsapp_indicacao"
                target="_blank"
                rel="noreferrer"
                className="button-press inline-flex items-center gap-3 rounded-full bg-magenta px-7 py-4 text-sm font-bold text-white hover:bg-[#bc1f60] hover:scale-[1.02]"
              >
                <FaWhatsapp className="h-5 w-5" />
                Quero meu código
              </a>
              <a
                href="/regulamento"
                className="font-semibold text-cream underline decoration-pink/70 underline-offset-4 transition-colors hover:text-pink"
              >
                Ver regulamento completo →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
