# Code/Spec Matrix — MDCU Framework

> **Ground Truth (Ponto de Partida Retroativo)**
> Compilado via varredura integral para estabelecer a fundação de rastreabilidade.
> Status: **LOCKED** (Sob proteção da ADR-001)

---

## 1. Matriz: Arquivo Físico → Especificação de Design (SDD)

| Arquivo (Código / Skill) | Spec (SDD) Correspondente | Status de Cobertura |
|---|---|---|
| `skills/mdcu/SKILL.md` | `docs/sdd/mdcu.md` | 🟢 Coberto |
| `skills/rsop/SKILL.md` | `docs/sdd/rsop.md` | 🟢 Coberto |
| `skills/commit-soap/SKILL.md` | `docs/sdd/commit-soap.md` | 🟢 Coberto |
| `skills/project-init/SKILL.md` | `docs/sdd/project-init.md` | 🟢 Coberto |
| `skills/mdcu-seg/SKILL.md` | `docs/sdd/mdcu-seg.md` | 🟢 Coberto |
| `skills/vitruvius/SKILL.md` | `docs/sdd/vitruvius.md` | 🟢 Coberto |
| `skills/cto/SKILL.md` | `docs/sdd/cto.md` | 🟢 Coberto |
| `ARCHITECTURE.md` | — (Fundacional) | 🟢 Base |
| `framework/traceability-spec.md` | `docs/adrs/001-rastreabilidade-semantica.md` | 🟢 Coberto |

---

## 2. Matriz Inversa: Visão por Artefato de Conhecimento

| Artefato Gerado | Origem (Fontes de Extração) |
|---|---|
| `framework/state-machines.md` | Skills MDCU, RSOP, Commit-SOAP |
| `framework/domain-rules.md` | Domínio Geral MDCU |
| `framework/glossary.md` | Termos ubíquos do repositório |
| `framework/commands.md` | Extração de gatilhos `/` nas 7 skills |
| `traceability/spec-impact-matrix.md` | Cruzamento de todas as SDDs e ADRs |

---

## 3. Lacunas Mapeadas (Technical Debt)

Nenhuma lacuna arquitetural ativa. O mapeamento cobre 100% dos *skills* operacionais e estabelece o bloqueio semântico necessário para progressão segura, de acordo com as regras estabelecidas na ADR-001.
