# MDCU Framework Manifest

Este manifesto consolida as versões oficiais do `mdcu-framework`. A integração dos comandos de invocação depende de o agente hospedeiro carregar as seguintes skills:

| Skill | Versão | Responsabilidade | Comandos de Invocação Suportados |
|---|---|---|---|
| `mdcu` | 3.0.0 | Orquestrador Clínico (MCCP) | `/mdcu`, `/mdcu fase N`, `/mdcu reenquadrar`, `/mdcu status`, `/mdcu fechar` |
| `project-init` | 2.0.0 | Setup e Contrato Técnico | `/project-init`, `/project-init --refresh`, `/project-init --check`, `/project-init status` |
| `rsop` | 1.4.0 | Prontuário Longitudinal | `/rsop init`, `/rsop dados`, `/rsop lista`, `/rsop passivos`, `/rsop soap`, `/rsop revisar`, `/rsop regressao`, `/rsop status` |
| `commit-soap` | 2.0.0 | Selo Longitudinal Git | `/commit-soap`, `/commit-soap --from`, `/commit-soap --inline`, `/commit-soap --dry-run`, `/commit-soap --amend` |
| `mdcu-seg` | 1.0.0 | Segurança Adjunta e IRP | `/mdcu-seg`, `/mdcu-seg threat-model`, `/mdcu-seg incidente`, `/mdcu-seg auditoria`, `/mdcu-seg status` |
| `vitruvius` | 1.0.0 | Coprocessador Arquitetural | `/anamnese`, `/handoff`, `/arquiteto`, `/voltar`, `/status`, `/contestar`, `/spec`, `/adr` |
| `cto` | 1.0.0 | Governança Técnica Executiva | `scripts/briefing.py`, `scripts/decompose.py`, `scripts/milestone.py`, `scripts/issue.py`, `scripts/adr_new.py`, `scripts/prompt_contract.py`, `scripts/postmortem.py`, `scripts/session_close.py` |

## Integração de Agente Hospedeiro
Para que os comandos `/` funcionem, o agente de IA hospedeiro deve carregar os arquivos `SKILL.md` dos subdiretórios correspondentes.
Os gatilhos das "User Stories" operam avaliando os `description:` de cada skill.
