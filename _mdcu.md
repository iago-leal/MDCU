# Sessão [YYYY-MM-DD] — Correção de Governança MDCU

Tentativas de Reenquadramento: 1/2

## F1 Preparação
- [x] Lido ARCHITECTURE.md
- [x] Lido rsop/dados_base.md e rsop/lista_problemas.md
- [x] Último SOAP lido (cli-install)
- [x] Rastreio de Segurança F1: OK

## F2 Escuta → S:
### Demandas
- Ajustar estruturalmente o framework para proibir permanentemente o `mdcu` de escrever ou alterar código ("vibecoding").
- Forçar a delegação estrita das tarefas de materialização (código, push, git add) para a skill `cto`.

### Queixas
- O agente que opera o `mdcu` atropelou as fases, começou a editar código e a fazer commits automáticos (vibecoding) sem aprovação. Isso fere completamente a "fricção intencional" metodológica que o MDCU propõe.

### Notas
- Estamos na F2. O erro foi não aguardar a Avaliação e Plano (F4/F5) e pular direto para ferramentas de delegação/código na F6.

## F3 Exploração → O:
- A regra atual na skill `skills/mdcu/SKILL.md` (linhas 34-35) diz: *"Se não houver engine (modo monolítico), declare no _mdcu.md que o orquestrador rodará o código como engine ad-hoc"*. Essa brecha legalizou o meu comportamento indesejado.
- Para consertar, precisaremos remover essa cláusula e fechar o escopo do MDCU para atuação 100% deliberativa.

## F4 Avaliação → A:
**Hipótese estrutural:** o comportamento de "vibecoding" não é desvio do agente, é uma *brecha legalizada* na própria governança. A frase de F6.a (`skills/mdcu/SKILL.md:35`) cria um modo *engine ad-hoc* que dissolve a fronteira entre orquestrador clínico (deliberativo) e executor técnico (`/cto`). Com isso, o MDCU pode se autoeleger executor — exatamente a fricção que o método existia para impedir.

**Diagnóstico:** brecha de governança em duas camadas:
- *Camada 1 — Princípios:* a seção "Princípios" diz que MDCU "NÃO FAZ execução de código", mas não declara isso como **invariante**.
- *Camada 2 — F6.a:* a cláusula `engine ad-hoc` contradiz diretamente o princípio acima e tem precedência operacional (é o que o agente lê na hora de agir).

**Novo problema estrutural** a ser registrado em `rsop/lista_problemas.md` pelo `/cto`:
- `#GOV-001` — Brecha permissiva de execução ad-hoc na skill `mdcu` viola o princípio de delegação estrita.

**Rastreio de Segurança F5:** o único side-effect relevante é a alteração de `SKILL.md`, que afeta comportamento futuro do agente. **Mitigação obrigatória:** ADR precede a edição (regra 3 do `/cto`).

## F5 Plano → P:

### Alternativas (≥2, com trade-offs)

**Alternativa A — Cirúrgica (mínima):** apenas remover a frase ofensora em F6.a e substituí-la por "Se não houver engine downstream, **suspenda o ciclo** e exija decisão do usuário."
- *Prós:* diff mínimo, baixo risco de regressão.
- *Contras:* mantém a Camada 1 sem reforço — o princípio continua não sendo invariante; outra brecha futura pode reaparecer com a mesma justificativa.

**Alternativa B — Estrutural em duas barreiras (RECOMENDADA):** combina três alterações coordenadas em `skills/mdcu/SKILL.md`:
  1. Adicionar **Invariante #0** no topo da seção "Regras de Negócio": *"MDCU é deliberativo. Edição de código, comandos `git`, execução de scripts e qualquer side-effect fora de `_mdcu.md` e `rsop/` são PROIBIDOS ao orquestrador. Toda materialização técnica é delegada ao `/cto`."*
  2. Reforçar a seção "Princípios" trocando "NÃO FAZ execução de código" por "**É PROIBIDO** executar código, editar arquivos fora de `_mdcu.md`/`rsop/`, ou rodar comandos `git`."
  3. Reescrever F6.a para: *"Relê o `_mdcu.md`. Aciona obrigatoriamente o engine `/cto` passando o plano. **Se não houver engine downstream disponível, SUSPENDA o ciclo e devolva controle ao usuário** — o modo *engine ad-hoc* está PROIBIDO."*
- *Prós:* fecha as duas camadas; cria redundância proposital (princípio + invariante + cláusula); torna o desvio inviável mesmo se uma das três barreiras for ignorada.
- *Contras:* diff maior; exige ADR formal e revisão; alterações em três pontos do mesmo arquivo precisam ser consistentes.

**Alternativa C — Refatoração ampla:** mover toda a lógica de "delegação" para um documento externo (`framework/governanca/delegacao.md`) e referenciar do SKILL.md.
- *Prós:* separação de concerns, permite versionar a governança independentemente.
- *Contras:* fora de escopo para esta sessão (overengineering); adiciona indireção sem ganho proporcional ao problema atual.

### Decisão Compartilhada
Recomendo **Alternativa B**. Motivo: o problema observado *não* foi falta de clareza local na F6.a — o agente leu a Camada 1 ("NÃO FAZ execução"), mas a Camada 2 (cláusula ad-hoc) prevaleceu por ser operacional. Apenas remover a frase (Alternativa A) deixa a inconsistência arquitetural inalterada. **Aguardo sinal verde** ou contraproposta do usuário antes de emitir o handoff. Em Auto Mode, prossigo com B se não houver objeção.

### Guardrails verificados
- ✅ Não viola "fricção intencional" — ao contrário, a reforça.
- ✅ Não cria dependência circular entre `mdcu` e `cto`.
- ✅ Não bloqueia uso legítimo do MDCU em projetos sem CTO instalado: nesse cenário, o MDCU **suspende explicitamente** em vez de assumir execução (comportamento desejado).

## F6 Execução

### F6.a — Delegação (Handoff para `/cto`)
**Persona ativa a partir daqui: `@/cto`.** O MDCU encerra sua atuação executiva neste turno.

**Briefing entregue ao `/cto`:**
- *Plano aprovado:* Alternativa B (3 edições coordenadas em `skills/mdcu/SKILL.md`).
- *Pré-requisito obrigatório (regra 3 do CTO — "ADR Precede Issue"):* gerar ADR via `.mdcu/scripts/adr_new.py "Proibição de Execução Ad-Hoc no MDCU"` ANTES de editar o SKILL.md. ADR deve documentar o trade-off (Alt A vs B vs C) e a decisão.
- *Issue rastreável (regra 2):* criar issue `#GOV-001` via `gh` referenciando o ADR.
- *Edição:* aplicar as 3 alterações em `skills/mdcu/SKILL.md` conforme redação proposta na Alternativa B acima.
- *Atualização do prontuário:* adicionar `#GOV-001` em `rsop/lista_problemas.md`.
- *Gate de Integração (F6.c):* não há `test`/`build` aplicáveis a esta alteração documental — substituir por verificação manual de consistência (grep por "ad-hoc" e "engine ad-hoc" no SKILL.md deve retornar zero ocorrências permissivas).
- *Commit:* mensagem sugerida `governance(mdcu): proíbe modo engine ad-hoc e formaliza invariante de delegação` — sem trailer de co-autoria (regra global do usuário).

### F6.b — Acompanhamento
A ser preenchido pelo `/cto` ou em retorno para `/mdcu fechar`.

### F6.c — Fechamento
Pendente. Após execução do `/cto`, retornar para `/mdcu fechar` (Gate + SOAP + commit-soap + delete `_mdcu.md`).
