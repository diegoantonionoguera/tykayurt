import { ArrowUpRight, MapPin } from "lucide-react";
import { OrderButton } from "../ui/order-button";
import { INSTAGRAM_URL } from "../../lib/brand";

export function Cta() {
  return (
    <section id="entrega" className="delivery paper">
      <div className="site-container delivery-grid">
        <div>
          <p className="label">
            <MapPin size={16} /> Feito perto. Entregue com carinho.
          </p>
          <h2>
            Iogurte artesanal
            <br />
            chegando até você.
          </h2>
        </div>
        <div className="delivery-details">
          <p>
            Escolha o seu sabor e combine a entrega com a gente.
            <br />
            Hauer, Xaxim, Boqueirão, Alto Boqueirão, Uberaba e Cajuru.
          </p>
          <OrderButton
            message="Oi! Quero pedir um TykaYurt. Quais sabores tem hoje?"
            tracking="whatsapp_entrega"
          >
            Pedir pelo WhatsApp
          </OrderButton>
          <a className="text-link" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            Acompanhe a TykaYurt <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
