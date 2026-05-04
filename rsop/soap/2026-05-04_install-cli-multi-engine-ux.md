# SOAP — [2026-05-04_install-cli-multi-engine-ux]

## S (Subjetivo)

**Demandas:**
1. Permitir escolher mais de uma engine numa única execução de `npx mdcu install` (multi-engine).
2. Garantir que para Antigravity a instalação vá para `<workspace>/.agents/skills` (raiz do workspace), não para `~/.agents/skills` (home).
3. Melhorar o design visual da CLI ("está bem feio").

**Queixas:**
- "Para o Antigravity, está se instalando `~/.agents/skills`. O que é errado."
- "Vamos precisar melhorar o design dela também. Está bem feio."
- Implícito: hoje o instalador é single-engine — exige reexecução para cobrir múltiplos agentes.

**Notas:**
- Padrão de demanda: monitoria pós-entrega do problema `#1` (cli-install) — usabilidade real divergiu da expectativa após primeiros usos.
- A queixa sobre path do Antigravity divergia da análise estática do código local — investigação revelou que o pacote nunca havia sido publicado no npm, então qualquer execução prévia foi sob código fonte direto, possivelmente em estado pré-fix.

## O (Objetivo)

- **F1-F4 (deliberação MDCU):** rastreio de segurança 5-itens passou em F1 e F3 sem incidentes. F4 identificou problema estrutural em duas camadas: CLI funcionalmente single-track e visualmente plano, deixando primeira impressão fraca para um framework que se vende como "metodológico/profissional".
- **F5 (decisão compartilhada):** 3 alternativas apresentadas (A: zero-deps cirúrgico, B: micro-deps `picocolors`+`prompts`, C: refatoração modular com registry abstrato). Usuário escolheu B (recomendação do orquestrador). Bump de versão: `1.0.0` → `1.1.0`. Pendência herdada (`--force` para Invariante #0 propagation): issue separada (#6, GitHub #3). Publish: automatizado.
- **F6.a (execução):**
  - ADR 0003 criado e aceito: política de dependências do CLI installer.
  - Issue rastreável principal: [iago-leal/MDCU#2](https://github.com/iago-leal/MDCU/issues/2).
  - Reescrita de [bin/mdcu.js](../../bin/mdcu.js): `prompts.multiselect` para 3 engines (Antigravity → `CWD/.agents/skills`, Claude → `HOME/.claude/skills`, Custom), banner box-drawing, hierarquia `[1/3]`/`[2/3]`/`[3/3]`, sumário consolidado por engine com símbolos `✓ → ↺`, cores via `picocolors`. Fail-safe não-destrutivo preservado.
  - [package.json](../../package.json): bump + `dependencies` (`picocolors@^1.1.1`, `prompts@^2.4.2`) + campo `files` controlando publish (28 arquivos / 22.5kB no tarball).
  - [.gitignore](../../.gitignore): output local do install (`.claude/`, `.mdcu/`, `.agents/`, `node_modules/`, `_mdcu.md`).
  - Commit `bffd9a7`: feat(install) — escopo D1+D2+D3 num único commit coeso.
  - Smoke tests: `node bin/mdcu.js help` ✅, install em tmpdir cria `.mdcu/` (17 arquivos) ✅, `npm pack --dry-run` confirma payload ✅.
  - Issue separada [iago-leal/MDCU#3](https://github.com/iago-leal/MDCU/issues/3): flag `--force` para Invariante #0 propagation.
- **F6.b (acompanhamento — reenquadramento 1/2):**
  - 1ª tentativa de publish: warnings auto-corrigidos no tarball (`bin[mdcu]` com `./`, `repository.url` sem `git+`) → corrigidos em commit `1c7d337`.
  - 2ª tentativa: `E403 Two-factor authentication required` → resolvido pelo usuário via `npm publish --otp=...`.
  - 3ª tentativa: `E403 Package name too similar to existing package md5` → reenquadramento estrutural (decisão de identidade do pacote). Disjuntor MDCU incrementado para **1/2**.
  - 3 alternativas apresentadas (N1: scoped `@iago-leal/mdcu`, N2: nome unscoped alternativo, N3: apelar npm support). Usuário escolheu N1.
  - ADR 0004 criado: rename para `@iago-leal/mdcu`. Atualizações em `package.json` (com `publishConfig.access: public`), README, `rsop/dados_base.md`. Commit `43fba0c`.
  - 4ª tentativa: `+ @iago-leal/mdcu@1.1.0` ✅. Validação registry: `npm view @iago-leal/mdcu version` retorna `1.1.0`; tarball acessível em `https://registry.npmjs.org/@iago-leal/mdcu/-/mdcu-1.1.0.tgz`.
- **F6.c (Gate de Integração):** projeto não tem suite de testes; gate alternativo via smoke test manual + publish bem-sucedido + verificação no registry. Aprovado.

## A (Avaliação)

1. [#2] CLI single-engine: resolvido via `prompts.multiselect`.
2. [#3] Path Antigravity: resolvido — código já estava correto, mas só chegou aos usuários com primeiro publish real.
3. [#4] UX visual: resolvido via redesign com `picocolors` + box drawing + sumário consolidado.
4. [#5] Bloqueio anti-typosquatting do registry: resolvido via rename scoped (ADR 0004).
5. [#6] Pendência da flag `--force` (Invariante #0 propagation): rastreada externamente (GitHub #3) — não inflar esta sessão.
6. [#1] Monitoria de usabilidade do npx: substancialmente avançada nesta sessão. Próxima janela de revisão: 2026-06-04.

## P (Plano)

1. Monitorar primeiras instalações reais de `@iago-leal/mdcu@1.1.0` via `npm view @iago-leal/mdcu downloads` e issues no GitHub.
2. Tratar GitHub #3 (flag `--force`) em sessão dedicada quando houver pressão real (usuário relatando SKILL.md desatualizada).
3. Reservar namespace `@iago-leal/*` para futuros pacotes derivados (skills standalone, ferramentas auxiliares).
4. Considerar adicionar smoke test automatizado em `package.json:scripts.test` substituindo o placeholder atual de erro — débito técnico mais leve que sustenta o Gate de Integração futuro.

## R (Recursos/Referências)

- ADRs: [docs/adr/0003-politica-de-dependencias-do-cli-installer.md](../../docs/adr/0003-politica-de-dependencias-do-cli-installer.md), [docs/adr/0004-rename-do-pacote-para-scoped-iago-leal-mdcu.md](../../docs/adr/0004-rename-do-pacote-para-scoped-iago-leal-mdcu.md)
- Commits: `bffd9a7` (feat), `1c7d337` (npm pkg fix), `43fba0c` (rename scoped)
- Issues GitHub: [iago-leal/MDCU#2](https://github.com/iago-leal/MDCU/issues/2) (sessão), [iago-leal/MDCU#3](https://github.com/iago-leal/MDCU/issues/3) (flag --force)
- Pacote no registry: https://www.npmjs.com/package/@iago-leal/mdcu
- Lista de problemas: [rsop/lista_problemas.md](../lista_problemas.md) (`#2`, `#3`, `#4`, `#5`, `#6`)
- Sessão CTO: [.cto/last-session.md](../../.cto/last-session.md)
