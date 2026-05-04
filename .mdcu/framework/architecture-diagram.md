# Diagrama de Arquitetura — mdcu-framework

## Anatomia de 4 Camadas
1. **Interface humana**: Extração de requisitos via MCCP + tradução de complexidade técnica.
2. **Governança e Arquitetura**: Coordenação, spawn de agents, Vitruvius e CTO.
3. **Delegação técnica**: Execução em engines externos desacopláveis.
4. **Acompanhamento longitudinal**: Registro estrutural e git history (rsop, commit-soap).
5. **Fundação**: Setup de projeto e controle de segurança (project-init, mdcu-seg).

## Direcionalidade
- Usuário ↔ MDCU: bidirecional
- MCCP → MDCU
- MDCU → Delegação técnica
