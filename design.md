# TykaYurt — Design

Landing page única (web) do iogurte artesanal TykaYurt (Curitiba — Hauer/Boqueirão). Visual editorial premium e escuro, com blocos alternando preto e creme, produto em destaque em escala grande e tipografia impactante. Objetivo único: levar o visitante ao pedido no WhatsApp.

A interface segue automaticamente o tema claro ou escuro configurado no dispositivo. O modo claro usa superfícies creme quentes; o modo escuro preserva o carvão original. Os dois temas compartilham tokens semânticos e mantêm o magenta como cor principal de ação.

## Brand & Colors

Tokens em `packages/web/src/web/styles.css` (`:root`).

| Token | Hex | Uso |
|-------|-----|-----|
| ink | #212325 | Fundo escuro principal |
| cream | #F8F6F3 | Fundo claro / texto sobre escuro |
| magenta | #C21863 | CTAs, links, destaques com contraste AA |
| pink | #F585B6 | Tags, ícones, detalhes |
| plum | #810080 | Fundos de arte, marca, gradientes |

Sabores (cor de acento por card): Morango #C21863 · Abacaxi #E8A317 · Amora #810080.

## Typography

- **Display**: Lobster 400 — títulos, wordmark textual e números de destaque, com ênfase por escala e cor.
- **Body**: Open Sans 400–800 — corpo, labels, botões e navegação. Line-height generoso (1.7), labels em uppercase com letter-spacing 0.2em.

## Tom de marca

- Comunicar o frescor com orgulho e afirmação, nunca como desculpa ou limitação.
- Não comparar a validade do TykaYurt com a de produtos concorrentes.
- Evitar construções defensivas sobre conservação ou duração; destacar produção recente, cuidado artesanal e ausência de conservantes.

## Pages & Sections

- **Web — Home** (`packages/web/src/web/pages/index.tsx`), composta por seções em `src/web/components/sections/`:
  1. `nav.tsx` — barra fixa translúcida, logo + CTA WhatsApp.
  2. `hero.tsx` — fundo ink, pote em destaque com parallax, headline "IOGURTE DE VERDADE", selo 48h, CTA duplo.
  3. `marquee.tsx` — faixa magenta rolando com as provas da marca.
  4. `about.tsx` — bloco creme, método artesanal, números (48h, 18 un/dia, 0 conservantes).
  5. `flavors.tsx` — seletor de Morango, Amora e Abacaxi; troca imagem + cor de fundo, informa o pote de 500ml e abre o WhatsApp com a mensagem pronta.
  6. `gallery.tsx` — grid editorial com lightbox.
  7. `cta.tsx` + `footer.tsx` — fechamento com WhatsApp e Instagram.

## Motion

Motion (framer-motion): reveals em stagger no scroll (`whileInView`), parallax leve no pote do hero, marquee infinito em CSS, transições de cor suaves na troca de sabor. Sem micro-animações dispersas.

Todas as animações respeitam `prefers-reduced-motion`; nesse modo, parallax, marquee e deslocamentos são removidos ou reduzidos a transições discretas.

## Key User Flow

Abre → vê o produto e as provas (48h, fruta real, sem conservantes) → escolhe sabor e tamanho → clica "Pedir no WhatsApp" → abre wa.me/5541991731323 com mensagem pré-preenchida do sabor/tamanho.

## Contatos

WhatsApp (41) 91731323 → `https://wa.me/554191731323` · Instagram `@tykayurt_oficial`.
