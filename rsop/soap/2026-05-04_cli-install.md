# SOAP — [2026-05-04_cli-install]

## S (Subjetivo)
**Demandas:**
1. Consolidar a cópia de dependências de infraestrutura (`.mdcu/`) e de skills no agente num único comando unificado: `npx mdcu install`.
2. Tornar o processo de instalação seguro (non-destructive): nunca sobrescrever arquivos ou pastas já existentes, permitindo que as customizações do usuário no framework sejam preservadas e reaproveitadas.

**Queixas:**
- A execução anterior de `copyFileSync` sobrescrevia os arquivos silenciosamente, apagando eventuais customizações.
- Ter que rodar dois comandos para instalar o framework gerava fricção na adoção.

**Notas:**
- A não-destrutividade é fundamental porque permite que equipes modelem seus próprios `templates/` e `framework/` sem o risco de perderem o trabalho em reinstalações futuras.

## O (Objetivo)
- Analisando `bin/mdcu.js`, a função atual `copyDirRecursiveSync` usava `fs.copyFileSync`, que sobrescreve por padrão.
- A CLI foi refatorada. A função recursiva agora usa `fs.existsSync(currentTarget)` para pular arquivos existentes, garantindo que versões "ejetadas" ou customizadas (ex: o `soap-template.md` local do projeto) não sejam destruídas.
- A CLI agrupa os comandos `install-skills` e `init` num único passo interativo via `npx mdcu install`.

## A (Avaliação)
1. [#1] A ejetabilidade e personalização local do MDCU estão seguras com o *fail-safe* na cópia.
2. [#1] O comando único reduz o atrito e simplifica o README de uso.
3. [#1] A separação dos scripts sob o NPM mantém a rastreabilidade e integridade que a abordagem "100% embutido nas skills" (Agent-Native extremo) falharia em prover.

## P (Plano)
1. Monitorar a adoção e possíveis erros em setups de Windows no NPM.
2. Planejar futuro suporte a templates locais vs atualizações globais.

## R (Recursos/Referências)
- `bin/mdcu.js` (Lógica centralizada).
