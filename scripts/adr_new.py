#!/usr/bin/env python3
import os
import sys
import datetime

ADR_DIR = "docs/adr"

TEMPLATE = """# {id}. {title}

Data: {date}
Status: Proposto

## Contexto e Problema
[Descreva o contexto técnico e de negócio e o problema que precisamos resolver]

## Opções Consideradas
* [Opção 1]
* [Opção 2]

## Decisão
[A decisão arquitetural tomada]

## Consequências
[O que se torna mais fácil, mais difícil, riscos adicionais ou mitigados]
"""

def main():
    if len(sys.argv) < 2:
        print("Uso: python scripts/adr_new.py \"Título do ADR\"")
        sys.exit(1)
        
    title = sys.argv[1]
    os.makedirs(ADR_DIR, exist_ok=True)
    
    existing_adrs = [f for f in os.listdir(ADR_DIR) if f.endswith(".md") and f[:4].isdigit()]
    next_id = 1
    if existing_adrs:
        next_id = max([int(f[:4]) for f in existing_adrs]) + 1
        
    id_str = f"{next_id:04d}"
    slug = "".join([c if c.isalnum() else "-" for c in title.lower()])
    while "--" in slug:
        slug = slug.replace("--", "-")
    slug = slug.strip("-")
    
    filename = f"{id_str}-{slug}.md"
    filepath = os.path.join(ADR_DIR, filename)
    
    date_str = datetime.date.today().isoformat()
    content = TEMPLATE.format(id=id_str, title=title, date=date_str)
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
        
    print(f"ADR scaffold gerado em: {filepath}")
    print(f"O Vitruvius ou o CTO deve agora preencher o conteúdo desta decisão.")

if __name__ == "__main__":
    main()
