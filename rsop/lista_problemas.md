# Lista de Problemas Ativos

| # | Data | Problema/Necessidade | Tipo | Status | Revisitar |
|---|---|---|---|---|---|
| #1 | 2026-05-04 | Dívida arquitetural de empacotamento (README vs Realidade) resolvida, monitorar usabilidade do npx. | técnico | resolvido | 2026-06-04 |
| #GOV-001 | 2026-05-04 | Brecha permissiva de execução ad-hoc na skill `mdcu` (cláusula F6.a) violava o princípio de delegação estrita, permitindo "vibecoding". Resolvido via ADR 0002 (Alternativa B: princípio + invariante #0 + F6.a reescrita). | governança | resolvido | 2026-08-04 |
| #2 | 2026-05-04 | CLI `npx mdcu install` era single-engine — forçava reexecução para cada agente (Antigravity, Claude). Resolvido via `prompts.multiselect` em commit `bffd9a7`. | técnico | resolvido | 2026-07-04 |
| #3 | 2026-05-04 | Sintoma percebido: Antigravity instalando em `~/.agents/skills` em vez de `<workspace>/.agents/skills`. Hipótese confirmada parcialmente — código local já estava correto desde SOAP `cli-install`, mas pacote nunca foi publicado, então o fix não chegava aos usuários. Resolvido com primeiro publish real (`@iago-leal/mdcu@1.1.0`). | técnico | resolvido | 2026-07-04 |
| #4 | 2026-05-04 | UX visual da CLI sub-padrão (sem cores, sem hierarquia, sem sumário consolidado). Resolvido via redesign com `picocolors` + box drawing + sumário por engine em commit `bffd9a7`. ADR 0003 formaliza adoção de micro-deps no installer. | UX | resolvido | 2026-07-04 |
| #5 | 2026-05-04 | Nome `mdcu` rejeitado pelo registry npm por similaridade com `md5` (anti-typosquatting). Resolvido via rename para `@iago-leal/mdcu` em commit `43fba0c`. ADR 0004 formaliza decisão. Reenquadramento MDCU 1/2 — disjuntor preserva 1 crédito. | infra | resolvido | 2026-08-04 |
| #6 | 2026-05-04 | Pendência herdada: cópia instalada `.claude/skills/mdcu/SKILL.md` permanece divergente do template após updates (install é não-destrutivo por design). Demanda futura: flag `--force` opt-in com confirmação dupla e backup automático. | técnico | em-aberto-rastreado | 2026-08-04 |
