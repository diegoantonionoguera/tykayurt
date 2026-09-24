import { ArrowUpRight, Leaf } from "lucide-react";
import { OrderButton } from "../ui/order-button";
import { Strawberry } from "./organic";

export function Hero() {
  return (
    <section id="topo" className="site-hero paper">
      <div className="site-container hero-grid">
        <div className="hero-copy">
          <p className="label">
            <Leaf size={16} /> Iogurte artesanal · Curitiba
          </p>
          <h1>
            Iogurte artesanal
            <br />
            em Curitiba
            <br />
            <span>de verdade.</span>
          </h1>
          <p className="hero-description">
            Fermentado devagar. Feito à mão.
            <br />
            Iogurte cremoso com geleia de fruta inteira e aquele cuidado que começa na nossa
            cozinha.
          </p>
          <div className="hero-actions">
            <OrderButton
              message="Oi! Vim pelo site e quero pedir um TykaYurt."
              tracking="whatsapp_hero"
            >
              Pedir pelo WhatsApp
            </OrderButton>
            <a className="text-link" href="#sabores">
              Conhecer os sabores <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
        <figure className="hero-visual">
          <div className="hero-photo">
            <img
              src="/images/morango-b.webp"
              alt="Pote TykaYurt de morango, com geleia de fruta e iogurte cremoso"
              width="1080"
              height="1080"
              fetchPriority="high"
            />
          </div>
          <div className="fresh-note">
            <Leaf size={24} />
            <span>
              porque cuidar de você também
              <br />é uma forma de carinho.
            </span>
          </div>
          <Strawberry className="hero-berry" />
          <figcaption className="photo-caption">Da nossa cozinha para a sua colher.</figcaption>
        </figure>
      </div>
    </section>
  );
}
