# 0002. Proibição de Execução Ad-Hoc no MDCU

Data: 2026-05-04
Status: Aceito

## Contexto e Problema

A skill `mdcu` (versão 3.0.0) define um princípio claro de delegação: o orquestrador clínico **não executa código** — toda materialização técnica é responsabilidade do `cto` ou archetype downstream. No entanto, a fase F6.a do `skills/mdcu/SKILL.md` continha uma cláusula permissiva que dissolvia essa fronteira:

> *"Se não houver engine (modo monolítico), declare no `_mdcu.md` que o orquestrador rodará o código como engine ad-hoc."*

Esta cláusula criou uma brecha legalizada de "vibecoding": o agente operando como `mdcu` podia se autoeleger executor sempre que conveniente, atropelando as fases F4 (Avaliação) e F5 (Plano com decisão compartilhada) e indo direto para edição de código, comandos `git` e commits automáticos. O incidente foi observado na sessão clínica iniciada em 2026-05-04 e registrado no problema `#GOV-001`.

O diagnóstico estrutural identificou duas camadas falhas:
- **Camada 1 (Princípios):** o texto declarava "MDCU NÃO FAZ execução de código", mas em tom descritivo, não como invariante operacional.
- **Camada 2 (F6.a):** a cláusula `engine ad-hoc` contradizia o princípio acima e tinha precedência operacional, pois é o que o agente lê no momento de agir.

## Opções Consideradas

* **Opção A (Cirúrgica/mínima):** apenas remover a frase ofensora em F6.a e substituí-la por "Se não houver engine downstream, suspenda o ciclo e exija decisão do usuário." Diff mínimo, mas mantém a Camada 1 sem reforço — a inconsistência arquitetural (princípio descritivo vs cláusula operacional) permanece, deixando espaço para regressão futura.
* **Opção B (Estrutural em duas barreiras):** três edições coordenadas em `skills/mdcu/SKILL.md` — (1) elevar a delegação a invariante explícita na seção "Regras de Negócio"; (2) trocar o tom descritivo da seção "Princípios" por proibição imperativa; (3) reescrever F6.a substituindo o modo ad-hoc por suspensão obrigatória do ciclo. Cria redundância proposital (princípio + invariante + cláusula).
* **Opção C (Refatoração ampla):** mover a lógica de "delegação" para um documento externo (`framework/governanca/delegacao.md`) referenciado pelo SKILL.md. Permite versionar a governança independentemente, mas adiciona indireção sem ganho proporcional ao problema atual — overengineering.

## Decisão

Optamos pela **Opção B (Estrutural em duas barreiras)**.

Justificativa: o problema observado **não foi falta de clareza local na F6.a** — o agente leu a Camada 1 ("NÃO FAZ execução"), mas a Camada 2 (cláusula ad-hoc) prevaleceu por ser operacional e estar mais próxima do ponto de ação. Apenas remover a frase (Opção A) deixaria a inconsistência arquitetural inalterada e permitiria que o mesmo padrão de brecha ressurgisse em revisões futuras do método. A redundância de três barreiras (princípio + invariante + cláusula reescrita) torna o desvio inviável mesmo se uma das barreiras for ignorada por edição posterior.

A Opção C foi descartada por overengineering: separar a governança em arquivo externo só se justifica quando há múltiplos consumidores da mesma política — não é o caso atual.

## Consequências

* **Positivas:**
  - Restaura a "fricção intencional" que o método MDCU existia para garantir.
  - Torna impossível, por construção textual, que o orquestrador `mdcu` execute código sem antes suspender o ciclo e devolver controle ao usuário.
  - O princípio de delegação passa a ter força de invariante (regra 0), equiparando-se ao Disjuntor 2/2 e ao Gate de Integração em peso operacional.
  - Cria precedente arquitetural: futuras skills clínicas podem reusar o mesmo padrão "princípio + invariante + cláusula" para fechar brechas similares.

* **Negativas:**
  - Em projetos legados sem `cto` instalado (modo monolítico), o ciclo MDCU passa a **suspender** em vez de prosseguir. Isso é o comportamento desejado, mas exige que o usuário instale o `cto` ou tome decisão manual antes de continuar — adiciona um passo de fricção.
  - Aumenta marginalmente a verbosidade do `SKILL.md`.

* **Riscos mitigados:**
  - Vibecoding (incidente observado em 2026-05-04): bloqueado por construção.
  - Erosão progressiva do escopo do MDCU: bloqueada pela invariante.

* **Riscos remanescentes:**
  - Esta ADR só vincula a skill `mdcu`. Outras skills com brechas análogas (se existirem) não estão cobertas — auditoria recomendada em sessão futura.
