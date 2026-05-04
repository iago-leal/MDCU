# MDCU Framework

O **Método de Desenvolvimento Centrado no Usuário** (MDCU) é um framework de engenharia de software desenhado para ambientes onde IAs atuam como agentes desenvolvedores autônomos. 

Inspirado no Método Clínico Centrado na Pessoa (MCCP), o MDCU orquestra sessões de desenvolvimento com foco extremo no entendimento do problema real antes da escrita de qualquer código, dividindo o ciclo de vida em 6 fases clínicas (F1-F6).

## O que tem aqui?

- **`skills/`**: Contém as 7 skills executáveis do framework (`mdcu`, `vitruvius`, `cto`, `rsop`, `commit-soap`, `project-init`, `mdcu-seg`). Elas foram construídas para rodar nativamente em agentes baseados em IA (Claude, Gemini, etc). As skills usam as ferramentas do próprio agente (como File System e Terminal) para executar tudo.
- **`framework/`**: O dicionário de dados, princípios, regras de domínio e máquinas de estado globais que regem o framework. (Principalmente para referência humana ou RAG).
- **`docs/reconstruction-case-study/`**: O histórico e os artefatos de quando o MDCU foi inteiramente reconstruído "bottom-up" por IA.

## Como instalar e usar (100% Portátil)

O MDCU é "Agent-Native". Ele não depende de scripts locais ou infraestrutura física instalada no seu projeto. A inteligência reside inteiramente nas skills.

1. Copie o conteúdo das subpastas de `skills/` para a raiz de skills do seu agente hospedeiro (ex: `~/.gemini/antigravity/skills/` ou `~/.claude/skills/`).
2. Digite `/project-init` no seu repositório de trabalho. O agente usará suas próprias ferramentas para criar o `ARCHITECTURE.md` e os arquivos de infraestrutura necessários (como a pasta `.cto/`).
3. Inicie uma sessão de desenvolvimento chamando `/mdcu`.

Consulte o arquivo `MANIFEST.md` para ver o mapa completo de comandos de invocação.
