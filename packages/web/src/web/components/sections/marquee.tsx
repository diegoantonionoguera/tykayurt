import { Leaf, Heart, MapPin, Utensils } from "lucide-react";
const ITEMS = [
  { Icon: Utensils, text: "Fermentado lentamente" },
  { Icon: Leaf, text: "Ingredientes selecionados" },
  { Icon: Heart, text: "Produção artesanal" },
  { Icon: MapPin, text: "Feito em Curitiba" },
];
export function Marquee() {
  return (
    <div className="benefit-bar">
      <div className="site-container">
        {ITEMS.map(({ Icon, text }) => (
          <span key={text}>
            <Icon size={24} />
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
