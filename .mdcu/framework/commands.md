# User Flows e Comandos (Cheatsheet)

## Iniciando Projetos e Sessões
- Novo projeto: `/project-init` → Cria `ARCHITECTURE.md` (Contrato Técnico).
- Nova sessão: `/mdcu` → Cria `_mdcu.md` (Transita F1→F6).
- Validar contrato: `/project-init --check` → Garante que o disco reflete o `ARCHITECTURE.md`.

## Durante a Execução (F6)
- Se a arquitetura mudar o escopo: `/mdcu reenquadrar` → Aciona disjuntor de loops (limite 2/2).
- Para invocar uma decisão arquitetural sistêmica: `/vitruvius` → `/anamnese`, `/handoff`, `/arquiteto`.
- Para gerar um ADR e materializar a decisão: Executar `python scripts/adr_new.py "Titulo"`.

## Segurança e Incidentes
- Auditoria trimestral de segurança: `/mdcu-seg auditoria`
- Para modelar ameaças antes de implementar: `/mdcu-seg threat-model`
- **Emergência / Vazamento (F0):** `/mdcu-seg incidente` → **SUSPENDE MDCU IMEDIATAMENTE** → Cria SOAP de incidente.

## Fechamento de Sessão
1. Rodar testes de integração (Gate F6.c).
2. `/mdcu fechar` → Este comando invoca internamente:
   - `/rsop soap` (Lê `_mdcu.md` e destila no prontuário `rsop/soap/`).
   - `/commit-soap` (Gera mensagem de commit A:/P:/Refs: e comita).
   - Deleta `_mdcu.md`.

## Gestão de Problemas (RSOP)
- Listar problemas ativos: `/rsop lista`
- Revisar e fechar problemas resolvidos: `/rsop revisar`
- Suspeita de bug antigo reaparecendo: `/rsop regressao N`
