# MDCU Framework Architecture

## 1. Visão Geral
O MDCU (Metodologia de Desenvolvimento Clínico Universal) é um framework regido por fricção intencional, projetado para suportar o desenvolvimento hiper-estruturado operado por Agentes IA e desenvolvedores, garantindo a sanidade arquitetural ao longo do tempo.

## 2. Governança e Rastreabilidade
Para prevenir a entropia inerente aos modelos de linguagem de larga escala (LLMs), a arquitetura blinda o código através de **Gates Rígidos** baseados em Rastreabilidade Semântica.

### 2.1 Rastreabilidade como Disjuntor (Ver `ADR-001`)
Nenhuma modificação de sistema com *blast radius* estrutural avança para os repositórios vitais sem o acompanhamento de uma **ADR**. 
O raio de impacto é delimitado *manualmente* pelos agentes (manutenção semântica) nos artefatos da pasta `traceability/`. 

- **Artefatos Chave:**
  - `code-spec-matrix.md` (Garante que todo código possui especificação)
  - `spec-impact-matrix.md` (Informa que a quebra da "Regra A" impacta fatalmente o "Módulo C")

## 3. Estado e Sessão
O MDCU avança o estado através da elaboração contínua de "Prontuários" (formato SOAP RCOP), garantindo que todo *commit* (ou evolução) possua:
- Subjetivo (O que se pediu)
- Objetivo (Arquivos e dados modificados)
- Avaliação (Diagnóstico da mudança e seus impactos testados na matriz)
- Plano (Os próximos passos daquela linha de feature)

*(Nota: Este é um documento fundacional, ramificando para `framework/*.md` para especificações granulares).*
