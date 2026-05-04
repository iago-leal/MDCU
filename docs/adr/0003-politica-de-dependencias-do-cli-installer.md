# 0003. Política de dependências do CLI installer

Data: 2026-05-04
Status: Aceito

## Contexto e Problema

O `bin/mdcu.js` foi originalmente escrito como **zero-deps** — apenas Node.js builtins (`fs`, `path`, `readline`). Essa decisão alinhava-se com o princípio de "fricção intencional" do MDCU e zero supply chain.

A monitoria do problema `#1` ("usabilidade do npx") expôs três limitações funcionais e estéticas:

1. **D1 — Single-engine:** o prompt `readline` força escolha radio (1 engine por execução). Workflows multi-agente (Claude + Antigravity + Cursor coexistindo) exigem reexecutar o `install` N vezes.
2. **D2 — Path Antigravity:** sintoma percebido pelo usuário de instalação em `~/.agents/skills` (home) em vez de `<workspace>/.agents/skills` (raiz). O código local atual já está correto (usa `CWD`), mas como o pacote nunca foi publicado no npm registry, qualquer execução prévia foi diretamente do código fonte — a queixa pode refletir comportamento anterior ao fix do SOAP `cli-install`.
3. **D3 — UX visual sub-padrão:** linhas `===`, numeração `1) 2) 3)`, sem cores, sem hierarquia, sem sumário consolidado. Primeira impressão fraca para um framework que se posiciona como "metodológico/profissional".

A skill `mdcu` apresentou três alternativas (A: zero-deps cirúrgico, B: 2 deps mínimas, C: refatoração modular). O usuário decidiu pela **Alternativa B**.

## Opções Consideradas

* **Opção A (Zero-deps cirúrgico):** manter `bin/mdcu.js` sem dependências. Multi-engine via input `"1,2"` parseado, cores via códigos ANSI brutos (`\x1b[…m`), banner via `=`/box-drawing manual. Coerente com a filosofia, mas verboso (~+80 linhas), frágil em terminais Windows legados sem suporte ANSI, e o multi-select por vírgula é UX inferior a checkboxes navegáveis.

* **Opção B (Micro-deps `picocolors` + `prompts`):** adiciona duas dependências minimalistas e largamente auditadas. `picocolors` (~1KB, zero-dep transitiva, mantida pelo autor de `nanocolors`) entrega cores cross-platform. `prompts` (~25M downloads/semana) entrega multi-select navegável por setas/espaço — padrão moderno esperado em CLIs profissionais.

* **Opção C (Refatoração modular com registry abstrato):** separa `bin/install.js`, `bin/ui.js`, `bin/engines.js`. Investe em arquitetura para sustentar adição futura de mais engines. Inclui flag `--force` opcional para resolver pendência herdada da Invariante #0 (cópia instalada divergente do template). Risco YAGNI: o ecossistema atual tem 2 engines reais (Antigravity, Claude); criar registry abstrato antes de uma 3ª demanda concreta é especulativo.

## Decisão

Optamos pela **Opção B (Micro-deps `picocolors` + `prompts`)**.

Justificativa:
1. Resolve as 3 demandas (D1+D2+D3) com UX significativamente superior à A — multi-select por setas é o padrão esperado em CLIs profissionais modernos (npm, vite, create-*, etc).
2. C foi descartada por YAGNI: o registry abstrato só se justifica quando há ≥3 engines reais ou quando uma 3ª demanda concreta surge. O custo de refatorar agora supera o benefício especulativo.
3. As dependências escolhidas têm risco de supply chain marginal: `picocolors` é zero-dep transitiva e ~1KB; `prompts` é amplamente adotada e auditada. Ambas são mantidas ativamente.
4. A "fricção intencional" do MDCU é um princípio do **método clínico**, não do **installer**. No installer, fricção é UX negativa — o usuário não está num momento deliberativo, está configurando ambiente. Aplicar o mesmo princípio aos dois contextos seria consistência sintática sem coerência semântica.
5. A pendência da Invariante #0 (`--force`) foi escopada para issue separada, evitando inflar este PR e mantendo a auditabilidade dos commits.

## Consequências

* **Positivas:**
  - Multi-engine numa única execução elimina reexecução manual em setups multi-agente.
  - UX visual coerente com expectativas modernas (cores, hierarquia, sumário).
  - O fix do path Antigravity (D2) finalmente chega ao usuário final via primeiro `npm publish` real (`1.1.0`).
  - Cria precedente: o installer pode ter dependências, a skill clínica não pode.

* **Negativas:**
  - Adiciona 2 dependências ao footprint do `npx mdcu`. Tamanho de download estimado: <50KB combinados.
  - Quebra a propriedade "código nu" do `bin/`. Compensação: as deps são auditáveis em <100 linhas cada.

* **Riscos mitigados:**
  - Regressão silenciosa do path Antigravity: o registry receberá a primeira versão pública com o fix correto.
  - Reexecução manual do install para cada engine: eliminada por design.

* **Riscos remanescentes:**
  - A pendência herdada da Invariante #0 (cópia `.claude/skills/mdcu/SKILL.md` divergente do template após updates) **não** é resolvida nesta ADR — fica registrada em issue separada para tratamento futuro com flag `--force` opt-in.
  - Se `picocolors` ou `prompts` mudarem licença ou abandonarem manutenção, será necessário substituir. Risco baixo dado o histórico de ambas.
