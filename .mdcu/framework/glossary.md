# Glossário Canônico — mdcu-framework

## Atores
- **Usuário**: Engenheiro/desenvolvedor que adota o framework. Coautor das decisões em F5, autoridade única após disjuntor 2/2.
- **Agente**: IA hospedeira (Claude Code / Codex / Cursor / Gemini CLI) que carrega as skills e executa as fases.
- **Stakeholder**: Pessoa afetada pelo sistema, mesmo que não interaja diretamente.
- **DPO / responsável**: Owner formal do tratamento de dados (LGPD/HIPAA).
- **Time**: Coletivo de engenharia com acesso a métricas internas.
- **Atacante**: Modelo de ameaça implícito do STRIDE.

## Conceitos Centrais
- **Demanda**: O que o usuário *espera resolver* (intenção declarada).
- **Queixa**: O que o usuário *reporta sem expectativa de solução*. Dado diagnóstico.
- **Demanda oculta**: Demanda real sob a aparente.
- **SIFE**: Sentimentos / Ideias sobre a causa / Funcionalidade afetada / Expectativas — instrumento para revelar demanda oculta.
- **Padrão de demanda aparente**: Taxonomia: cartão de visita / exploratória / shopping / cure-me.
- **Reenquadramento**: Reconhecer que o problema sendo resolvido ≠ problema descrito. Propriedade do sistema, não falha.
- **Disjuntor (Circuit Breaker)**: Mecanismo de loop-breaker. Após 2 reenquadramentos em F6, aborta e exige decisão humana.
- **Gatilho de conformidade**: Verificação não-negociável que pode interromper o fluxo.
- **Guardrail / invariante**: Decisão arquitetural irreversível registrada em `ARCHITECTURE.md`.
- **Lock file determinístico**: Arquivo que congela dependências. Sempre commitado.
- **Micro-commit**: Commit técnico atômico durante F6.
- **Selo longitudinal**: Commit de fechamento gerado por `commit-soap`.
- **Rastreio (de segurança)**: Checklist binário. Analogia com rastreio populacional Wilson-Jungner.
- **F0 (Protocolo de incidente)**: Contenção de incidente. Suspende o ciclo MDCU em curso.
- **Postmortem blameless**: Análise pós-incidente que ataca causas estruturais.
- **Satisfação clínica**: Resolução do problema real do usuário, independente de entrega de código.
- **Decisão informada**: O usuário entende os trade-offs antes de consentir.
- **Composição orquestrador**: O modelo de orquestração via chamadas entre skills.
- **Anamnese**: Levantamento do histórico e contexto antes de agir.
- **Engine downstream desacoplável**: A IA hospedeira que executa as skills é tratada como um motor trocável.
- **Precisa-resolver**: O mínimo escopo viável para fechar o ciclo.
- **Dívida consciente × acidental**: Dívida técnica documentada e assumida versus criada por falta de atenção.

## Regras de Negócio Canônicas Extras
- **RN-D-014**: Todo código gerado precisa ser precedido por testes (gate de integração).
- **RN-D-015**: IDs de problema na lista de problemas `#` são estáveis e podem receber prefixo `[aceito-arquivado]`.
- **RN-D-016**: Toda dívida técnica na lista de problemas deve ser classificada como `consciente` ou omitida (`acidental`).
