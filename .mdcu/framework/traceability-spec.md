# Spec: Traceability Engine

## 1. Identidade e Propósito
Este documento define o contrato de especificação (Spec) do motor de rastreabilidade semântica do MDCU Framework, conforme delineado na `ADR-001`.

## 2. Modelagem do Domínio (Matrizes)

### 2.1 Code-Spec Matrix (`traceability/code-spec-matrix.md`)
- **Responsabilidade:** Mapear a relação 1:1 e 1:N entre os arquivos físicos do projeto (ex: `skills/cto/SKILL.md`) e suas especificações de design correspondentes (SDDs).
- **Invariantes:** Nenhum arquivo de lógica (Skill, Script vital, Framework markdown) pode existir sem correspondência na matriz apontando para a sua SDD.

### 2.2 Spec Impact Matrix (`traceability/spec-impact-matrix.md`)
- **Responsabilidade:** Declarar o *Blast Radius* (raio de impacto) das entidades abstratas do domínio.
- **Estrutura:** Eixos `Alvo de Mudança` vs `Componente Impactado`.
- **Pesos de Impacto:**
  - 🟥 **Impacto Direto (Quebra):** Aciona o *Gate Disjuntor*. Requer ADR.
  - 🟨 **Impacto Indireto (Atenção):** Requer adaptação local, sem necessidade formal de ADR, mas exige revisão manual do Agente.
  - 🟩 **Sem Impacto:** Fluxo livre.

## 3. Comportamento do Disjuntor (Gate)
1. **Gatilho:** Início do ciclo de `commit-soap` ou proposta gerada pelo `CTO`.
2. **Avaliação:** O agente orquestrador cruza o Diff (arquivos tocados) com a matriz `spec-impact-matrix.md`.
3. **Decisão:** Se contiver `>= 1` célula vermelha e não houver um arquivo na pasta `docs/adrs/` referenciando a mudança na *session* atual, o processo falha (Exit Code 1).

## 4. Matriz Retroativa (Stop the World)
O *Ground Truth* será compilado extraindo-se as relações lógicas da pasta `docs/reconstruction-case-study/_reversa_sdd/traceability/` e adaptando-as ao escopo atual e exato dos artefatos em `/skills/` e `/framework/`.

## 5. Autoridade e Lock
**Spec Lock:** `traceability.spec.lock` (Arquivo imaginário associado à versão, garantindo imutabilidade destas regras até a quebra contratual via ADR).
