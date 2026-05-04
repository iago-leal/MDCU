# Máquinas de Estado Canônicas — mdcu-framework

Este documento descreve os fluxos de estado prescritivos sobre artefatos, contadores e protocolos do framework. A implementação de cada fluxo é forçada nas respectivas `SKILL.md` (agentes de execução).

## SM-1 — Sessão MDCU (`_mdcu.md`)
```mermaid
stateDiagram-v2
  [*] --> Created: /mdcu
  Created: _mdcu.md criado<br/>F1 ativada<br/>contador 0/2
  Created --> InterruptedF1: ARCHITECTURE.md ausente
  InterruptedF1 --> Created: /project-init concluído<br/>(retorna F1 do início)
  Created --> Active: gatilho conformidade OK<br/>F1 → F2
  Active --> Active: F2 → F3 → F4 → F5 → F6
  Active --> Suspended: /mdcu-seg incidente<br/>(F0 prioridade absoluta)
  Suspended --> Active: incidente resolvido<br/>(_mdcu.md preservado)
  Active --> Aborted: contador atinge 2/2<br/>DISJUNTOR
  Aborted --> Active: usuário decide<br/>(libera novo ciclo)<br/>OBS: contador NÃO reseta
  Active --> Closed: /mdcu fechar<br/>/rsop soap → /commit-soap
  Closed --> [*]: _mdcu.md DELETADO
```

## SM-2 — Contador do Disjuntor (F6)
```mermaid
stateDiagram-v2
  [*] --> C0: novo /mdcu
  C0: 0/2 — sem reenquadramento
  C0 --> C1: reenquadrar em F6
  C1: 1/2 — primeiro reenquadramento
  C1 --> C2: reenquadrar em F6
  C2: 2/2 — TERMINANTEMENTE PROIBIDO<br/>prosseguir sozinho
  C2 --> ExitProtocol: aciona exit protocol
  ExitProtocol: aguarda decisão do usuário<br/>5 campos obrigatórios
  ExitProtocol --> [*]: usuário decide<br/>(reset apenas com novo /mdcu)
```

## SM-3 — Ciclo de vida de um problema RSOP
```mermaid
stateDiagram-v2
  [*] --> Proposed: detectado em F4 ou STRIDE
  Proposed --> Active: /rsop revisar (ou criação imediata)<br/>entra em lista_problemas.md
  Active --> Active: evolução de descrição<br/>(sintoma → hipótese → diagnóstico)
  Active --> Reclassified: /rsop revisar<br/>muda severidade
  Reclassified --> Active
  Active --> Passive: /rsop revisar (quando resolvido)<br/>migra para passivos.md
  Passive --> Active: /rsop regressao N<br/>(reabertura)
  Passive --> [*]: arquivo morto permanente
```

## SM-4 — Protocolo F0 de Incidente (mdcu-seg)
```mermaid
stateDiagram-v2
  [*] --> Triggered: vazamento / incidente detectado
  Triggered --> Identification: 1. Identificação
  Identification --> ContainedShort: 2a. Contenção curta
  ContainedShort --> ContainedLong: 2b. Contenção média
  ContainedLong --> Eradicated: 3. Erradicação
  Eradicated --> Recovered: 4. Recuperação
  Recovered --> Postmortem: 5. Postmortem (BLAMELESS)
  Postmortem --> [*]: SOAP-incidente registrado<br/>MDCU retoma
```

## SM-5 — Estado do `ARCHITECTURE.md`
```mermaid
stateDiagram-v2
  [*] --> Absent: projeto novo
  Absent --> Initialized: /project-init
  Initialized: ARCHITECTURE.md + manifesto + lock + commit
  Initialized --> Refreshed: /project-init --refresh
  Refreshed --> Initialized
  Initialized --> Validated: /project-init --check
  Validated --> Initialized: PASS
  Validated --> Drifting: FAIL — divergência
  Drifting --> Refreshed: --refresh OU regenerar lock
```

## SM-6 — Auditoria de Segurança (`rsop/seguranca.md`)
```mermaid
stateDiagram-v2
  [*] --> Created: /mdcu-seg auditoria<br/>(primeira vez)
  Created: data revisão = hoje<br/>próxima = hoje + 90d
  Created --> Current: dentro de 90d
  Current --> Overdue: > 90d sem revisão
  Overdue --> Current: /mdcu-seg auditoria executada
  Current --> StructuralEvent: nova integração / stack
  StructuralEvent --> Current: revisão executada
```

## SM-7 — Mensagem de Commit
```mermaid
stateDiagram-v2
  [*] --> Choice: hora de commitar
  Choice --> CheckSoap: /commit-soap solicitado
  Choice --> StandardCommit: micro-commit técnico
  CheckSoap --> SoapMissing: nenhum SOAP na sessão
  CheckSoap --> SoapPresent: SOAP encontrado
  SoapMissing --> [*]: ABORTA
  SoapPresent --> Drafted: extrai A+P → formata + Refs:
  Drafted --> Reviewed: exibe ao usuário
  Reviewed --> Committed: confirma → git commit
  Reviewed --> Cancelled: rejeita
  Reviewed --> DryRun: --dry-run
  Reviewed --> Amended: --amend
  StandardCommit --> [*]: git commit padrão
  Committed --> [*]
```
