# Sessão 2026-05-03 — MDCU Framework Evolução

Tentativas de Reenquadramento: 0/2

## F1 Preparação
- [x] Lido ARCHITECTURE.md
- [!] Prontuário `rsop/` ausente (novo projeto ou não inicializado).
- [x] Rastreio de Segurança F1: OK (Nenhum incidente ativo aparente).

## F2 Escuta → S:
### Demandas
- Corrigir a discrepância entre a documentação (README) e a infraestrutura física do framework MDCU.
- Definir de forma clara como o framework deve ser empacotado/instalado para que o usuário não perca arquivos importantes (como os templates e scripts) ao copiar apenas a pasta de skills.

### Queixas
- O README orienta a "apenas copiar a pasta de skills" para usar o framework.
- Ao fazer isso, o usuário percebe que perde o acesso a artefatos cruciais do repositório (como a pasta `templates/`, `scripts/` e possivelmente `framework/`), gerando a sensação de uma instalação quebrada ou incompleta.

### Notas
- Estamos aplicando "MDCU no MDCU" (Metadesenvolvimento).

## F3 Exploração → O:
- O repositório atual possui pastas vitais além de `skills/`:
  1. `scripts/`: Ferramentas Python exigidas pela skill `cto`.
  2. `templates/`: Arquivos de formatação exigidos por `mdcu`, `rsop`, `mdcu-seg` e `project-init`.
  3. `framework/`: Regras de domínio globais.
- A promessa atual do README ("copie apenas skills") é tecnicamente inviável sem quebrar o acesso aos templates e scripts, pois o agente de IA no workspace de destino não terá a estrutura física necessária para completar tarefas como gerar um ADR ou um SOAP.

## F4 Avaliação
- #1 [Fragmentação de Empacotamento]: O framework perde integridade ao ser instalado porque suas dependências de execução (scripts e templates) não "viajam" junto com as skills ao se seguir o README atual.
- #2 [Dívida de Documentação]: O README documenta um comportamento utópico ("Agent-Native") que a arquitetura atual do repositório ainda não suporta mecanicamente.

## F5 Plano
- **Alternativa A: Tornar a Promessa do README Verdadeira (Abordagem "Agent-Native")**
  - *O que é:* Embutir os textos da pasta `templates/` diretamente dentro dos arquivos `SKILL.md` como instruções de prompt. Remover os `scripts/` em Python e atualizar a skill `cto` para usar ferramentas nativas (Bash, GH CLI).
  - *Trade-off:* O repositório fica extremamente limpo e a promessa "só copie as skills" vira verdade absoluta. Porém, engessa a manutenção, pois qualquer ajuste em um template exigirá a edição do corpo do prompt da skill.
- **Alternativa B: Criar um Instalador Oficial (Abordagem "Framework Distribuído")**
  - *O que é:* Assumir que o MDCU é um pacote complexo. Criar um script `install.sh` (ou via NPM) que, com um comando, copia as skills para o agente, e copia as pastas `templates/` e `scripts/` para o repositório de trabalho do usuário ou para o diretório global da IA.
  - *Trade-off:* Mantém a organização atual modular e separada (fácil de editar templates), mas exige que o usuário rode comandos de instalação, ferindo um pouco a ideia de "só copiar" do README atual. O README seria corrigido para explicar esse comando de instalação.

## F6 Execução
- [ ] Inicializar o repositório como um projeto NPM (`package.json`).
- [ ] Criar o script executável CLI em Node.js (`bin/mdcu.js`).
- [ ] O CLI deverá ter comandos como `init` (para copiar infraestrutura pro projeto atual) e `agents` (para instalar as skills nos diretórios globais de IA).
- [ ] Atualizar o `README.md` refletindo a nova instalação via `npx mdcu`.
