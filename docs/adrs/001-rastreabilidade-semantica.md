# ADR 001: Matrizes de Rastreabilidade Semântica e Controle de Blast Radius

## 1. Status
**Aceito** (Data: 2026-05-03)

## 2. Contexto (Rastreabilidade: `_session.md`)
O framework MDCU carecia de um mecanismo estrutural para prevenir degradação arquitetural (entropia) ocasionada pela edição livre de agentes e desenvolvedores operando sem visão holística. Conforme levantado na *Anamnese* (vide `_session.md`), a ausência de um "disjuntor" baseado em *blast radius* permite que regras de negócio transversais sejam quebradas silenciosamente. Uma abordagem puramente mecânica (CI/CD gerando mapas sintáticos) é cega à semântica das intenções, sendo insuficiente para um ecossistema governado por agentes IA.

## 3. Decisão
Institui-se o **Motor de Rastreabilidade Semântica** como componente basilar do MDCU, operando sob as seguintes diretrizes inegociáveis:

1. **Dinâmica de Agência (Manutenção Semântica):** As matrizes `code-spec-matrix.md` e `spec-impact-matrix.md` não serão artefatos gerados passivamente por scripts. Devem ser tratadas como código-fonte vivo, obrigatoriamente atualizadas pelos agentes (CTO, Writer) a cada mutação de domínio.
2. **Autoridade Disjuntora (Gate Rígido):** A `spec-impact-matrix.md` operará como um Gate Bloqueante (Disjuntor). Qualquer *Pull Request*, *Commit* ou proposta de mudança que incida sobre um alvo mapeado com *blast radius* sistêmico (células vermelhas na matriz) será automaticamente barrada pelo fluxo do MDCU caso não inclua uma ADR correspondente atestando a avaliação do impacto.
3. **Ponto de Partida Retroativo (Stop the World):** Fica suspensa a aprovação de novas *features* lógicas no framework até que as matrizes retroativas que mapeiam o estado *atual e exato* de 100% dos skills e regras do repositório MDCU sejam compiladas e validadas, formando o *Ground Truth*.

## 4. Consequências (Trade-offs)
- **Positivas:**
  - Tolerância zero à alucinação arquitetural de agentes LLM operando no framework.
  - Blindagem contra quebras acidentais de contrato entre Módulos/Skills.
  - Explicitação obrigatória de *trade-offs* antes de grandes refatorações.
- **Negativas:**
  - Aumento agudo da fricção para modificações transversais simples (ex: mudança de nomenclatura ubíqua), exigindo burocracia (ADR).
  - Bloqueio imediato da esteira de desenvolvimento funcional até que o mapeamento retroativo esteja concluído.

## 5. Lock
Lock da Decisão (Hash): `sha256:4d8b671...` (Trancado para alteração sem substituição de ADR).
