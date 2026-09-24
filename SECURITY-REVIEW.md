# Revisão pré-publicação — concluída em 24/09/2026

Escopo: site web e dependências compartilhadas, inclusive os templates desktop/mobile. Sabores e Link da Bio são repositórios separados. A pasta demo-cliente não integra este commit.

## Correções

- Dependências atualizadas; auditoria Bun passou de 169 alertas para zero alertas conhecidos. Isso não substitui pentest nem garante ausência de vulnerabilidades.
- Electron e seus empacotadores Windows foram alinhados em versões corrigidas; Sharp atualizado.
- Overrides explícitos para PostCSS, js-yaml, esbuild, uuid, image-size e decode-uri-component. Revisar/remover quando as dependências superiores incorporarem versões seguras.
- Dois patches reproduzíveis em `patches/`: Metro passa bytes à API nova de image-size; query-string acessa o export default do decodificador ESM. Requer Node >=22.12; CI usa Node 24 e Bun 1.4.2.
- `tools/check-dependency-compat.cjs` cobre parsing de URLs, dimensões de imagens pelo Metro e geração de UUIDs pelo Xcode.
- Analytics movido para arquivo externo; CSP permite apenas origens necessárias, sem liberar scripts inline/eval. Adicionadas proteções contra embedding em frames.
- Testes de navegador usam opcionalmente o servidor Bun de produção (`PLAYWRIGHT_PRODUCTION=1`). O teste de métricas intercepta fornecedores externos para não enviar leads fictícios.
- Tema claro alinhado nos metadados/testes; contraste corrigido em dois textos verdes sobre bege. Identidade e layout preservados.

## Validação e limites

Resultado local: 27 testes unitários web e 16 testes de navegador (desktop/celular) aprovados; typecheck nos três workspaces, lint, builds web/desktop, bundle Android e limites de performance aprovados. Auditorias Bun (principal) e npm (Sabores e Bio) sem alertas conhecidos em 24/09/2026. O detector Impeccable não sinalizou problemas no CSS; sua orientação de contraste motivou o ajuste pontual dos textos verdes.

Executar `bun install --frozen-lockfile`, `bun audit`, `bun run typecheck`, `bun run lint`, `node tools/check-dependency-compat.cjs` e o script `check` do workspace web.

O build desktop e a exportação do bundle Android verificam compatibilidade de compilação. Não substituem testes nativos completos em aparelhos nem geração/assinatura de instaladores. Os testes locais de navegador usam Edge/Chromium; Firefox e WebKit são cobertos pelo workflow remoto, cujo resultado deve ser conferido após o push.

Os cabeçalhos de `packages/web/src/security.ts` são aplicados pelo servidor Bun. Hospedagem puramente estática deve configurar cabeçalhos equivalentes no provedor; esta revisão não valida a configuração remota de produção nem gestão de consentimento dos serviços de métricas.

Não executar o dev server publicamente. Não incluir `.env`, arquivos de credenciais, artefatos locais ou a demo-cliente em commits dos três projetos.
