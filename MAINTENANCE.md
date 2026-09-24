# Manutenção dos três projetos TykaYurt

A limpeza de setembro de 2026 preserva o visual aprovado e mantém cada projeto publicável separadamente. `demo-cliente` é apenas referência e não participa da sincronização.

## Organização

- **Site:** componentes em `packages/web/src/web/components/sections`, identidade e dados comerciais em `packages/web/src/web/lib/brand.ts`. `REFERRAL` alimenta a seção de indicação e o regulamento; prêmio atual: 1 pote de 500 ml a cada 2 compras indicadas. Classes `site-*` e classes das seções substituem os nomes herdados do demo.
- **Sabores:** na pasta vizinha `TykaYurt Sabores/flavors-showcase`, `src/catalog.js` reúne sabores, produto e mensagens; `src/main.js` cuida dos controles. Os controles são criados uma única vez. As imagens usam URLs analisáveis pelo Vite para também funcionarem no build.
- **Link da Bio:** na pasta vizinha `tykayurt-link-da-bio`, `styles.css` reúne os estilos e `script.js` configura WhatsApp e tracking. Os nomes dos eventos e os links existentes foram preservados.

## Abertura compartilhada

A fonte oficial está em `packages/web/public/intro`. O objeto `CONFIG` de `intro.js` define velocidade e tempos. Mantenha a duração de saída compatível com a transição de `intro.css`.

Depois de editar, execute a partir desta pasta:

```sh
node tools/sync-intro.mjs
node tools/sync-intro.mjs --check
```

O primeiro comando atualiza somente os quatro arquivos conhecidos nas duas pastas vizinhas; o segundo apenas compara os bytes. Os projetos continuam independentes no deploy.

Comportamento preservado: vídeo em tela cheia com `cover`, velocidade 2x, sem repetição, em cada abertura/recarregamento; botão para pular, Escape, liberação de foco/rolagem, tratamento de falhas e alternativa sem vídeo para movimento reduzido.

## Verificação

```sh
bun run lint
npm --prefix packages/web run check
node tools/sync-intro.mjs --check
node tools/check-frontends.cjs
```

O último comando usa Edge headless e exige os três servidores locais ativos. Verifica abertura, menus, galeria, seleção de sabores, conservação de quantidade/observação, imagens e eventos de tracking sem enviar pedidos. Para testar o build de Sabores, defina `SABORES_URL=http://localhost:4175` depois de iniciar seu preview.

Em Sabores: `npm test`, `npm run build`, `npm run dev` (4174), `npm run preview` (4175).

No Link da Bio: `npm test`, `npm run dev` (3000); não existe build.

No site: `bun run dev` a partir desta pasta (4200).

Compare desktop e celular antes de publicar. Os registros locais de antes/depois e o CSS aposentado estão em `.migration-stage/`, ignorada pelo Git. Nenhuma dependência do backend, desktop ou mobile foi removida por suposição; essas aplicações compartilham o monorepo.
