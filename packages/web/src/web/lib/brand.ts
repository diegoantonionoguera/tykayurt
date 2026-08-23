export const WHATSAPP_NUMBER = "554191731323";
export const WHATSAPP_DISPLAY = "(41) 9173-1323";
export const INSTAGRAM_HANDLE = "tykayurt_oficial";
export const INSTAGRAM_URL = "https://www.instagram.com/tykayurt_oficial";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export type Flavor = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  accent: string;
  bg: string;
  image: string;
  post: string;
  soon?: boolean;
  hero?: boolean;
};

export const FLAVORS: Flavor[] = [
  {
    id: "morango",
    name: "Morango",
    tagline: "O carro-chefe",
    description:
      "Geleia de morango feita com fruta inteira, cozida devagar até ficar densa e vermelha de verdade. Doçura equilibrada, acidez presente.",
    accent: "#d72772",
    bg: "#3a0f22",
    image: "/images/morango-hero.png",
    post: "/images/morango-post.png",
    hero: true,
  },
  {
    id: "amora",
    name: "Amora",
    tagline: "Intenso e profundo",
    description:
      "Amoras escuras em geleia rústica, com sementinhas e tudo. Sabor marcante para quem gosta de fruta ácida e encorpada.",
    accent: "#a12ea0",
    bg: "#2a0f36",
    image: "/images/amora-hero.png",
    post: "/images/amora-post.png",
  },
  {
    id: "abacaxi",
    name: "Abacaxi",
    tagline: "Tropical e refrescante",
    description:
      "Abacaxi em pedaços caramelizados no próprio suco. Fresco, cítrico e leve — o preferido nos dias quentes.",
    accent: "#e8a317",
    bg: "#3a2a06",
    image: "/images/abacaxi-hero.png",
    post: "/images/abacaxi-post.png",
  },
  {
    id: "ameixa",
    name: "Ameixa",
    tagline: "Doce na medida",
    description:
      "Ameixa cozida lentamente até virar geleia aveludada. Aveludado, levemente amadeirado, sem exagero no açúcar.",
    accent: "#7a1b4a",
    bg: "#2b0f1d",
    image: "/images/morango-post.png",
    post: "/images/morango-post.png",
  },
  {
    id: "pessego",
    name: "Pêssego",
    tagline: "Em desenvolvimento",
    description:
      "Nosso próximo sabor está em teste na cozinha. Chame no WhatsApp para entrar na lista e provar primeiro.",
    accent: "#f585b6",
    bg: "#33212a",
    image: "/images/abacaxi-post.png",
    post: "/images/abacaxi-post.png",
    soon: true,
  },
];

export const SIZES = [
  { id: "500", label: "500 ml", price: "R$ 20", note: "tamanho família" },
  { id: "250", label: "250 ml", price: "R$ 12", note: "porção individual" },
];
