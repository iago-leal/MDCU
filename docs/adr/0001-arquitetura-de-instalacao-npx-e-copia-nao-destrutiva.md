# 0001. Arquitetura de Instalacao NPX e Copia Nao Destrutiva

Data: 2026-05-04
Status: Proposto

## Contexto e Problema
O framework MDCU dependia de templates (`templates/`) e scripts Python (`scripts/`) que ficavam físicos no repositório root, mas o README prometia uma abordagem "Agent-Native" onde bastaria o usuário "copiar as skills". Ao tentar consolidar isso, surgiu o dilema entre embutir templates nas skills (reduzindo determinismo) vs distribuir a infraestrutura. Precisávamos empacotar o framework de uma forma portável, determinística e segura.

## Opções Consideradas
* **Opção 1 (Agent-Native Puro):** Embutir os textos dos templates nas skills e usar bash puro nos scripts. Isso deixaria o workspace do usuário impecável (sem arquivos de infra), mas sacrificaria a força determinística (o LLM "alucinaria" templates grandes) e aumentaria o acoplamento da engenharia de prompts com schemas de dados.
* **Opção 2 (Framework Distribuído NPX):** Empacotar como CLI em Node.js (`mdcu-framework`) que executa cópias físicas da pasta `.mdcu/` (contendo os scripts, templates e framework) para o workspace do usuário.

## Decisão
Optamos pela **Opção 2 (Framework Distribuído NPX)**. 
Para garantir a adoção e proteger as customizações ("ejetabilidade"), a função de cópia (`copyDirRecursiveSync`) foi blindada para ser não-destrutiva: ela nunca sobrescreve um arquivo que já existe no destino (`fs.existsSync`). O comando unificado é `npx mdcu install`.

## Consequências
* **Positivas:** Alto grau de determinismo na geração de artefatos (ADRs e SOAPs seguirão sempre o molde físico). O framework permite que equipes alterem livremente o `.mdcu/templates/` sem medo de uma atualização de NPX quebrar seu trabalho.
* **Negativas:** Adiciona o custo visual e cognitivo de manter uma pasta `.mdcu/` (com cerca de 17 arquivos estáticos) em todo novo projeto do usuário. O processo exige a execução de um script em vez de apenas "arrastar a pasta de skills".
