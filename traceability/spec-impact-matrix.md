# Spec Impact Matrix — MDCU Framework

> **Ground Truth (Matriz de Blast Radius)**
> Compilado conforme ADR-001. Atua como **Gate Disjuntor**.
> Legenda: 🟥 **Impacto Direto** (Bloqueia sem ADR) | 🟨 **Indireto** (Exige atenção) | 🟩 **Livre** (Sem impacto)

---

## 1. Matriz: Alvo de Mudança × Componente Impactado

| Proposta de Modificação ↓ / Impactado → | mdcu | rsop | commit-soap | project-init | mdcu-seg | cto | vitruvius | ARCHITECTURE.md |
|---|---|---|---|---|---|---|---|---|
| **Mudar estrutura do SOAP (S/O/A/P)** | 🟥 | 🟥 | 🟥 | 🟩 | 🟥 | 🟩 | 🟨 | 🟩 |
| **Alterar o fluxo de Rastreabilidade** | 🟥 | 🟩 | 🟥 | 🟩 | 🟩 | 🟥 | 🟥 | 🟥 |
| **Adicionar novo estado ao Ciclo de Vida**| 🟥 | 🟥 | 🟩 | 🟩 | 🟩 | 🟨 | 🟩 | 🟩 |
| **Mudança no template de Commit** | 🟩 | 🟩 | 🟥 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 |
| **Nova regra de governança (C-Level)** | 🟨 | 🟩 | 🟩 | 🟩 | 🟩 | 🟥 | 🟥 | 🟥 |
| **Alterar gatilho `/anamnese`** | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟩 | 🟥 | 🟩 |
| **Adicionar nível de Severidade Crítica** | 🟥 | 🟥 | 🟩 | 🟩 | 🟥 | 🟩 | 🟩 | 🟩 |
| **Modificar lock-files (Dependências)** | 🟨 | 🟩 | 🟩 | 🟥 | 🟩 | 🟩 | 🟩 | 🟩 |

---

## 2. Leitura do Disjuntor (Para o CTO/Reviewer)

### Mudanças Restritas (Alta Fricção):
Qualquer alteração que proponha modificar o **formato do SOAP** ou o **Fluxo de Rastreabilidade** espalha células 🟥 através da maioria dos componentes críticos. A alteração não poderá prosseguir de forma orgânica; o processo **deve falhar e ser bloqueado** até que uma ADR detalhada mapeando a transição completa de todas as skills impactadas seja validada pelo arquiteto.

### Suspensão de Skills:
- A remoção ou refatoração profunda de **`rsop`** afeta diretamente `mdcu`, `commit-soap` e `mdcu-seg`. (Risco Crítico).
- A modificação do **`cto`** isoladamente afeta a orquestração e a invocação do `vitruvius`.

---

## 3. Autoridade e Enforcement
Esta matriz **não é uma sugestão**. Ela é a fronteira de controle de sanidade do LLM. Se um *commit* tocar em áreas com interdependências 🟥 não documentadas, o sistema rejeitará a transição de estado. O agente que estiver escrevendo a modificação deverá **obrigatoriamente** criar um artefato em `docs/adrs/` e submetê-lo a aprovação prévia.
