# 0004. Rename do pacote para scoped `@iago-leal/mdcu`

Data: 2026-05-04
Status: Aceito

## Contexto e Problema

Na primeira tentativa de `npm publish` da versão `1.1.0` (sessão MDCU `install-cli-multi-engine-ux`, ver [ADR 0003](0003-politica-de-dependencias-do-cli-installer.md) e issue [#2](https://github.com/iago-leal/MDCU/issues/2)), o registry npm retornou:

```
E403 - PUT https://registry.npmjs.org/mdcu - Package name too similar to existing package md5;
try renaming your package to '@iago-leal/mdcu' and publishing with 'npm publish --access=public' instead
```

O bloqueio é resultado do filtro **anti-typosquatting** do registry: nomes muito próximos de pacotes populares (no caso, `md5`, com ~14M downloads/semana) são rejeitados permanentemente para nomes unscoped. Não há flag, OTP ou config local que contorne — a regra existe para impedir ataques de substituição em que um usuário digita errado e instala código adversarial.

A análise prévia de `npm view <nome>` para 7 alternativas unscoped (`mdcu-cli`, `mdcu-framework`, `mdcu-method`, `mdcu-kit`, `mdcuf`, `clinical-mdcu`, `mdcu-clinical`) confirmou que todos estavam livres no registry, **mas o status "livre" não garante que passem pelo mesmo filtro** — o `mdcu` também aparecia livre antes da tentativa. A única forma de validar é tentar publicar.

A skill `mdcu` tratou o evento como reenquadramento técnico (1/2 no disjuntor) e escalou três alternativas ao usuário:

- **N1** — adotar `@iago-leal/mdcu` (sugerido pelo próprio registry).
- **N2** — tentar nome unscoped alternativo, com risco de cair no mesmo filtro 1-N vezes.
- **N3** — apelar ao npm support (dias-semanas, bloqueia entrega imediata).

O usuário decidiu por **N1**.

## Opções Consideradas

* **N1 — Scoped `@iago-leal/mdcu`:** muda apenas o `package.json:name` para o formato `@<scope>/<package>`, exige `--access=public` na primeira publicação (scoped packages são privados por default — resolvido permanentemente via campo `publishConfig.access` no `package.json`). Invocação resultante: `npx @iago-leal/mdcu install`. Padrão amplamente adotado na indústria (`@vercel/...`, `@anthropic-ai/...`, `@types/...`).

* **N2 — Nome unscoped alternativo:** preserva a UX de invocação curta (`npx <nome>`), mas todo nome novo é uma aposta — o filtro de typosquatting é opaco e pode bloquear novamente. Cada rodada gasta um crédito do disjuntor 2/2 do MDCU; uma segunda rejeição abortaria a sessão automaticamente.

* **N3 — Apelar ao npm support:** mantém `npx mdcu` puro, mas é processo lento, sem garantia de aprovação, e bloqueia toda a entrega do `1.1.0` no intervalo. Inviável para a janela atual.

## Decisão

Adotamos **N1 — `@iago-leal/mdcu`**.

Justificativa:
1. **Garantia imediata:** é a alternativa explicitamente sugerida pelo próprio registry no E403 — não vai ser bloqueada de novo.
2. **Preservação da identidade:** o nome `mdcu` permanece como núcleo do identificador, apenas namespacing por autor. O nome conceitual do framework (em README, ARCHITECTURE, slash-commands `/mdcu`) não muda.
3. **Custo de 5 caracteres extras na invocação** (`@iago-leal/`) é insignificante diante do custo de um segundo reenquadramento, que abortaria a sessão pelo disjuntor 2/2.
4. **Padrão da indústria:** scoped packages são a norma para projetos pessoais/organizacionais modernos. Não há estigma de "pacote de segunda categoria".
5. **N2 é uma aposta cega** — não há heurística pública para prever quais nomes passam no filtro de similaridade. Investir nele seria gastar o último crédito do disjuntor sem evidência de retorno.
6. **N3 é inviável temporalmente** — apelações ao npm support levam dias a semanas; a entrega do `1.1.0` ficaria parada nesse intervalo, inflando o débito da sessão MDCU.

## Consequências

* **Positivas:**
  - Publicação `1.1.0` desbloqueada imediatamente.
  - Namespace `@iago-leal/*` reservado para futuros pacotes do mesmo autor (ex: skills standalone, ferramentas auxiliares).
  - `publishConfig.access: public` codifica a permanência do `--access=public`, eliminando a chance de esquecimento em publicações futuras.
  - Disjuntor 2/2 do MDCU permanece em 1/2 — ainda há margem para um reenquadramento se surgir bloqueio adicional.

* **Negativas:**
  - Invocação ficou 11 caracteres mais longa (`npx mdcu install` → `npx @iago-leal/mdcu install`).
  - Quaisquer materiais externos (posts de blog, slides, vídeos) que mencionem `npx mdcu install` ficam desatualizados.
  - O nome `mdcu` no registry continua disponível e poderia ser registrado por terceiros no futuro (vetor de squat invertido) — risco baixo, mas existente.

* **Riscos mitigados:**
  - Tentativa-e-erro com nomes alternativos: eliminada.
  - Expiração indefinida da janela de entrega via N3: eliminada.

* **Riscos remanescentes:**
  - Se o usuário desejar futuramente reverter para nome unscoped (após apelação aprovada ou outra estratégia), será necessário publicar sob o novo nome **mantendo o scoped como deprecated** para não quebrar instalações existentes — overhead operacional pequeno mas real.
