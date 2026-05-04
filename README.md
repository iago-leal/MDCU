# MDCU Framework

O **Método de Desenvolvimento Centrado no Usuário** (MDCU) é um framework de engenharia de software desenhado para ambientes onde IAs atuam como agentes desenvolvedores autônomos. 

Inspirado no Método Clínico Centrado na Pessoa (MCCP), o MDCU orquestra sessões de desenvolvimento com foco extremo no entendimento do problema real antes da escrita de qualquer código, dividindo o ciclo de vida em 6 fases clínicas (F1-F6).

## O que tem aqui?

- **`skills/`**: Contém as 7 skills executáveis do framework (`mdcu`, `vitruvius`, `cto`, `rsop`, `commit-soap`, `project-init`, `mdcu-seg`). Elas foram construídas para rodar em agentes baseados no Claude (ou compatíveis via Markdown + frontmatter).
- **`framework/`**: O dicionário de dados, princípios, regras de domínio e máquinas de estado globais que regem o framework.
- **`scripts/`**: Ferramentas e scripts Python infraestruturais exigidos pelo componente `cto` (governança).
- **`docs/reconstruction-case-study/`**: O histórico fascinante e os artefatos (incluindo o framework *Reversa*) de quando o MDCU foi inteiramente mapeado, engenheirado de forma reversa e reconstruído "bottom-up" por IA.

## Como instalar e usar

1. Copie o conteúdo das subpastas de `skills/` para a raiz de skills do seu agente hospedeiro (ex: `~/.claude/skills/`).
2. Digite `/project-init` no seu repositório de trabalho para selar o contrato técnico inicial.
3. Inicie uma sessão de desenvolvimento chamando `/mdcu`.

Consulte o arquivo `MANIFEST.md` para ver o mapa completo de comandos de invocação.
