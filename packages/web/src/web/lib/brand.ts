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
  bgLight: string;
  bgDark: string;
  image: string;
};

export const PRODUCT = {
  size: "500 ml",
  price: "R$ 20",
  note: "tamanho família",
} as const;

export const FLAVORS: Flavor[] = [
  {
    id: "morango",
    name: "Morango",
    tagline: "O carro-chefe",
    description:
      "Morango de verdade, sentido em cada colherada. A geleia é feita com fruta de verdade, não com xarope — por isso o sabor é limpo, fresco, sem aquele doce artificial que a gente já cansou de comer.",
    accent: "#c21863",
    bgLight: "#fff0f5",
    bgDark: "#3a0f22",
    image: "/images/morango-sabor.svg",
  },
  {
    id: "amora",
    name: "Amora",
    tagline: "Intenso e profundo",
    description:
      "Amoras escuras em geleia rústica, com sementinhas e tudo. Sabor marcante para quem gosta de fruta ácida e encorpada.",
    accent: "#a12ea0",
    bgLight: "#f8effa",
    bgDark: "#2a0f36",
    image: "/images/amora-sabor.svg",
  },
  {
    id: "abacaxi",
    name: "Abacaxi",
    tagline: "Tropical e refrescante",
    description:
      "Abacaxi em pedaços caramelizados no próprio suco. Fresco, cítrico e leve — o preferido nos dias quentes.",
    accent: "#e8a317",
    bgLight: "#fff7df",
    bgDark: "#3a2a06",
    image: "/images/abacaxi-sabor.svg",
  },
];
