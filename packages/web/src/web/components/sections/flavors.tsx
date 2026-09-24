import { useState } from "react";
import { Check, Leaf } from "lucide-react";
import { FLAVORS, PRODUCT } from "../../lib/brand";
import { OrderButton } from "../ui/order-button";

export function Flavors() {
  const [active, setActive] = useState(0);
  const flavor = FLAVORS[active];
  const image = flavor.image;
  return (
    <section id="sabores" className="flavor-section">
      <div className="site-container">
        <div className="section-heading">
          <div>
            <p className="label">Nossos sabores</p>
            <h2>
              Todo mundo tem
              <br />o seu favorito.
            </h2>
          </div>
          <p>
            Uma base cremosa que une todos os potes e uma geleia de fruta inteira que faz cada um
            ser único. Feito em lote pequeno, com atenção em cada pote.
          </p>
        </div>
        <div className="flavor-layout">
          <div className="flavor-options" role="group" aria-label="Escolha o sabor">
            {FLAVORS.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActive(index)}
                aria-pressed={index === active}
                aria-controls="flavor-details"
                className="flavor-option"
              >
                <span>{item.name}</span>
                {index === active ? <Check size={16} /> : null}
              </button>
            ))}
          </div>
          <figure className="flavor-visual">
            <img
              key={flavor.id}
              src={image}
              alt={`Pote de iogurte artesanal sabor ${flavor.name} TykaYurt, produção fresca em Curitiba`}
              width="1080"
              height="1080"
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              <Leaf size={15} /> Geleia de fruta inteira · feito à mão
            </figcaption>
          </figure>
          <div id="flavor-details" className="flavor-details">
            <div aria-live="polite" aria-atomic="true">
              <p className="flavor-tagline">{flavor.tagline}</p>
              <h3>{flavor.name}</h3>
              <p className="flavor-description">{flavor.description}</p>
            </div>
            <div className="purchase-group">
              <div className="flavor-price">
                <strong>{PRODUCT.price}</strong>
                <span>
                  <b>{PRODUCT.size}</b>
                  <small>{PRODUCT.note}</small>
                </span>
              </div>
              <p className="order-note">Abre o WhatsApp com o pedido já escrito. É só enviar.</p>
              <OrderButton
                message={`Oi! Quero pedir um TykaYurt de ${flavor.name} de ${PRODUCT.size} (${PRODUCT.price}).`}
                tracking="whatsapp_sabor"
              >
                Pedir {flavor.name} {PRODUCT.size}
              </OrderButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
