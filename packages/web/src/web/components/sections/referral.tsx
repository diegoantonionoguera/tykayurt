import { REFERRAL } from "../../lib/brand";
import { ArrowUpRight, Gift, Heart, UsersRound } from "lucide-react";
import { OrderButton } from "../ui/order-button";

export function Referral() {
  return (
    <section aria-labelledby="referral-title" className="referral-section">
      <div className="site-container">
        <div className="referral-panel">
          <div className="referral-copy">
            <p className="label">Programa de indicação</p>
            <h2 id="referral-title">
              Compartilhou,
              <br />
              <span>Ganhou.</span>
            </h2>
            <p>
              A cada {REFERRAL.requiredPurchases} amigas que você indicar e comprarem, você ganha 1
              pote de {REFERRAL.rewardSizeMl}ml grátis. Simples assim — sem sorteio, sem pegadinha.
            </p>
            <div className="referral-actions">
              <OrderButton message={REFERRAL.message} tracking="whatsapp_indicacao">
                Quero meu código
              </OrderButton>
              <a className="text-link" href="/regulamento">
                Ver regulamento completo <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
          <div
            className="referral-summary"
            aria-label={`${REFERRAL.requiredPurchases} amigas compram, você ganha um pote de ${REFERRAL.rewardSizeMl} ml`}
          >
            <Heart className="referral-heart" size={42} />
            <div>
              <UsersRound size={26} />
              <strong>{REFERRAL.requiredPurchases} amigas</strong>
              <span>indicadas por você compram</span>
            </div>
            <span className="referral-connector" aria-hidden="true" />
            <div>
              <Gift size={26} />
              <strong>1 pote de {REFERRAL.rewardSizeMl} ml</strong>
              <span>de presente para você</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
