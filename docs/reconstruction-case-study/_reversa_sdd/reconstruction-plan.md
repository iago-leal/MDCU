# Reconstruction Plan — MDCU

**Stack:** Markdown puro + Agent Skills
**Gerado em:** 2026-05-04
**Status:** 11 tarefas | 0 concluídas | 11 pendentes

---

## Alertas de pré-voo

> Revise estes pontos antes de iniciar. Gaps marcados com ⚠️ bloqueiam a tarefa associada.

Nenhum gap crítico identificado. Pode iniciar com segurança.

---

## Tarefas

### Tarefa 01 — Schema de Dados e Artefatos
**Status:** done
**Lê:** `_reversa_sdd/erd-complete.md`, `_reversa_sdd/data-dictionary.md`
**Constrói:** Definição dos schemas dos artefatos e estruturas fundamentais
**Pronto quando:** Todos os schemas dos artefatos documentados (ex: `ARCHITECTURE.md`, `_mdcu.md`, arquivos SOAP) existirem.

---

### Tarefa 02 — Entidades de Domínio
**Status:** done
**Lê:** `_reversa_sdd/domain.md`, `_reversa_sdd/data-dictionary.md`
**Constrói:** Princípios arquiteturais de domínio e restrições
**Pronto quando:** Todas as regras de negócio de domínio estiverem descritas e implementadas.

---

### Tarefa 03 — Máquinas de Estado
**Status:** done
**Lê:** `_reversa_sdd/state-machines.md`
**Constrói:** Lógica dos fluxos de estados para MDCU, F6 e demais máquinas
**Pronto quando:** Todos os estados e transições documentados estiverem implementados nos fluxos de cada componente.

---

### Tarefa 04 — Componente project-init
**Status:** done
**Lê:** `_reversa_sdd/sdd/project-init.md`, `_reversa_sdd/dependencies.md`
**Constrói:** `project-init/SKILL.md`
**Pronto quando:** A skill conseguir ler a stack do projeto, exigir `ARCHITECTURE.md` e validar ferramentas fundamentais.

---

### Tarefa 05 — Componente rsop
**Status:** done
**Lê:** `_reversa_sdd/sdd/rsop.md`, `_reversa_sdd/dependencies.md`
**Constrói:** `rsop/SKILL.md`
**Pronto quando:** A skill conseguir manter a estrutura de anamnese, queixas, SOAPs, passivos e segurança.

---

### Tarefa 06 — Componente vitruvius
**Status:** done
**Lê:** `_reversa_sdd/sdd/vitruvius.md`, `_reversa_sdd/dependencies.md`
**Constrói:** `vitruvius/SKILL.md`
**Pronto quando:** A skill conseguir fornecer coprocessamento arquitetural em modos clínico, handoff e arquiteto.

---

### Tarefa 07 — Componente cto
**Status:** done
**Lê:** `_reversa_sdd/sdd/cto.md`, `_reversa_sdd/dependencies.md`
**Constrói:** `cto/SKILL.md`
**Pronto quando:** A skill conseguir orquestrar as decisões arquiteturais da equipe de IA e aplicar o desenvolvimento iterativo.

---

### Tarefa 08 — Componente commit-soap
**Status:** done
**Lê:** `_reversa_sdd/sdd/commit-soap.md`, `_reversa_sdd/dependencies.md`
**Constrói:** `commit-soap/SKILL.md`
**Pronto quando:** A skill gerar corretamente commits seguindo o padrão SOAP exigido.

---

### Tarefa 09 — Componente mdcu-seg
**Status:** done
**Lê:** `_reversa_sdd/sdd/mdcu-seg.md`, `_reversa_sdd/dependencies.md`
**Constrói:** `mdcu-seg/SKILL.md`
**Pronto quando:** A skill conseguir auditar credenciais e avaliar protocolos de incidentes (F0).

---

### Tarefa 10 — Componente mdcu
**Status:** done
**Lê:** `_reversa_sdd/sdd/mdcu.md`, `_reversa_sdd/dependencies.md`
**Constrói:** `mdcu/SKILL.md`
**Pronto quando:** A skill orquestrar as 6 fases principais (F1-F6), disjuntor 2/2 e gate de integração de acordo com a arquitetura completa do framework.

---

### Tarefa 11 — Fluxos de Usuário
**Status:** done
**Lê:** `_reversa_sdd/user-stories/comandos-de-invocacao.md`
**Constrói:** Integração final dos comandos de invocação `/`
**Pronto quando:** Todos os comandos de invocação responderem adequadamente nos agentes hospedeiros.
