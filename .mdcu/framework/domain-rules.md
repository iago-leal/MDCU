# Regras de Negócio de Domínio — mdcu-framework

Este documento consolida as prescrições normativas implícitas do framework (RN-D).

## Metodologia e Fluxo
- **RN-D-001 — Co-autoria, não validação:** O usuário é coautor. Se apenas aprovou, não houve decisão compartilhada.
- **RN-D-002 — Telegráfico por princípio:** A forma como a informação é organizada determina a forma como se pensa. Prosa longa não é cosmética — é falha epistemológica. A ≤ 5 palavras, R = 1 linha.
- **RN-D-003 — "Na dúvida, inclua":** Aplicado a problemas no RSOP. Reclassificar é barato; reconstruir contexto perdido não.
- **RN-D-004 — S e O bem feitos são a fundação:** De escuta confusa sai plano confuso. A e P são consequência.
- **RN-D-005 — Anamnese antes do exame físico:** Sem contrato técnico definido (stack, estrutura, convenções, lock file), não há terreno estável para escutar demanda sobre código.
- **RN-D-006 — Reflexão é uma linha ou nada:** R é uma linha. Síntese ou omissão — nunca parágrafo.
- **RN-D-007 — _mdcu.md é substrato:** A conversa no chat é volátil; o arquivo é o substrato. O agente sempre relê o arquivo.
- **RN-D-008 — Reset do disjuntor só com novo /mdcu:** O disjuntor (2/2) é estado por sessão, não por interação.

## Segurança e Pós-Incidente
- **RN-D-009 — Postmortem ataca estrutura:** Falhas estruturais, nunca pessoais. Aprendizado vale mais que culpa. Vetada a redação com nome próprio.
- **RN-D-010 — LGPD não é opcional:** Tratamento de dado pessoal sem base legal documentada é problema de Alta severidade.
- **RN-D-011 — Segredo vazado = F0 Imediato:** Se um segredo entrou em código/log/repo/issue, dispara F0 imediato.

## Commits e Histórico
- **RN-D-012 — Skill exclusiva para fechamento:** Se a sessão gerou SOAP, merece `commit-soap`. Se não gerou, é apenas micro-commit (ruído operacional).
- **RN-D-013 — Co-Authored-By globalmente proibido:** O framework é autoria do humano exclusivamente. NUNCA incluir trailer de coautoria para a IA.
