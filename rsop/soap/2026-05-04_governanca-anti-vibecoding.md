# SOAP — [2026-05-04_governanca-anti-vibecoding]

## S (Subjetivo)
**Demandas:**
1. Ajustar estruturalmente o framework para proibir permanentemente o `mdcu` de escrever ou alterar código ("vibecoding").
2. Forçar a delegação estrita das tarefas de materialização (código, push, git add) para a skill `cto`.

**Queixas:**
- O agente que opera o `mdcu` atropelou as fases, começou a editar código e a fazer commits automáticos (vibecoding) sem aprovação. Isso fere completamente a "fricção intencional" metodológica que o MDCU propõe.

**Notas:**
- Padrão de demanda: governança/integridade do método. Erro foi pular F4/F5 e ir direto para ferramentas de delegação/código na F6.

## O (Objetivo)
- A cláusula em `skills/mdcu/SKILL.md:34-35` permitia ao orquestrador rodar código como *engine ad-hoc* na ausência de engine downstream. Texto removido: *"Se não houver engine (modo monolítico), declare no `_mdcu.md` que o orquestrador rodará o código como engine ad-hoc."*
- Diagnóstico em duas camadas: (1) Princípios em tom descritivo ("NÃO FAZ"), (2) F6.a operacional contradizia o princípio. A camada operacional venceu por estar mais próxima do ponto de ação do agente.
- ADR 0002 ("Proibição de Execução Ad-Hoc no MDCU") aceito; Alternativa B escolhida sobre A (cirúrgica) e C (refatoração externa) por criar redundância intencional de três barreiras.
- 3 edições aplicadas em `skills/mdcu/SKILL.md`: (1) Princípios em tom imperativo "É PROIBIDO"; (2) Invariante #0 não-negociável adicionada; (3) F6.a reescrita ("SUSPENDA o ciclo" no lugar de modo ad-hoc).
- Verificação grep: única ocorrência de "ad-hoc" no SKILL.md está em contexto explicitamente proibitivo (linha 36, "...PROIBIDO pela Invariante #0").
- Issue `iago-leal/MDCU#1` rastreável criada. Commit `7710cf9` pushado para `origin/main` (4 arquivos, +122/-33), sem trailer Co-Authored-By.
- Pendência observada: `.claude/skills/mdcu/SKILL.md` (cópia instalada, untracked) ainda contém versão antiga — Invariante #0 só será efetiva no runtime após `npx mdcu install` ou cópia manual.

## A (Avaliação)
1. [#GOV-001] Brecha F6.a permitia vibecoding.
2. [#GOV-001] Princípio sem força de invariante.
3. [#GOV-001] Cópia instalada divergente do template.

## P (Plano)
1. F6.a reescrita; modo ad-hoc PROIBIDO. ✅
2. Invariante #0 não-negociável adicionada. ✅
3. Rodar `npx mdcu install` em sessão futura. ⏸️

## R (Recursos/Referências)
- ADR: [docs/adr/0002-proibicao-de-execucao-ad-hoc-no-mdcu.md](../../docs/adr/0002-proibicao-de-execucao-ad-hoc-no-mdcu.md)
- Skill alterada: [skills/mdcu/SKILL.md](../../skills/mdcu/SKILL.md) (linhas 15, 20, 36)
- Issue: [iago-leal/MDCU#1](https://github.com/iago-leal/MDCU/issues/1)
- Commit: `7710cf9` em `origin/main`
- Lista de problemas: [rsop/lista_problemas.md](../lista_problemas.md) (`#GOV-001`)
