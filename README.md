# MDCU Framework

O **Método de Desenvolvimento Centrado no Usuário** (MDCU) é um framework de engenharia de software desenhado para ambientes onde IAs atuam como agentes desenvolvedores autônomos. 

Inspirado no Método Clínico Centrado na Pessoa (MCCP), o MDCU orquestra sessões de desenvolvimento com foco extremo no entendimento do problema real antes da escrita de qualquer código, dividindo o ciclo de vida em 6 fases clínicas (F1-F6).

## O que tem aqui?

- **`skills/`**: Contém as 7 skills executáveis do framework (`mdcu`, `vitruvius`, `cto`, `rsop`, `commit-soap`, `project-init`, `mdcu-seg`). 
- **`templates/`**: Artefatos de texto exigidos para formatação dos relatórios (SOAP, Architecture, etc).
- **`framework/`**: Dicionário de dados, princípios e máquinas de estado globais.
- **`scripts/`**: Ferramentas Python exigidas pelo componente `cto`.
- **`docs/reconstruction-case-study/`**: Histórico e artefatos de quando o MDCU foi inteiramente mapeado e reconstruído por IA.

## Como instalar e usar (Via NPX)

O MDCU é distribuído como um pacote executável para que a infraestrutura seja montada de forma padronizada.

**1. Instale as Skills no seu Agente:**
Rode o comando interativo para copiar as skills para o seu Claude ou Gemini:
```bash
npx mdcu install-skills
```

**2. Inicialize a Infraestrutura no Projeto:**
No repositório em que você vai desenvolver o software, inicialize as pastas `.mdcu/`:
```bash
npx mdcu init
```

**3. Inicie o fluxo:**
No chat do seu agente, inicie uma sessão de desenvolvimento chamando `/mdcu`.

Consulte o arquivo `MANIFEST.md` para ver o mapa completo de comandos de invocação.
