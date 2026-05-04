#!/usr/bin/env bash
# MDCU Framework Installer

set -e

echo "================================================"
echo "    Instalador do Framework MDCU (Agent-Native) "
echo "================================================"
echo ""

echo "Para qual agente você deseja instalar as skills do MDCU?"
echo "1) Gemini Antigravity (~/.gemini/antigravity/skills)"
echo "2) Claude Desktop (~/.claude/skills)"
echo "3) Cursor / Outro (Caminho customizado)"
echo "4) Sair"
read -p "Escolha (1-4): " choice

case $choice in
    1)
        TARGET_DIR="$HOME/.gemini/antigravity/skills"
        ;;
    2)
        TARGET_DIR="$HOME/.claude/skills"
        ;;
    3)
        read -p "Digite o caminho absoluto para a pasta de skills do seu agente: " TARGET_DIR
        ;;
    4)
        echo "Instalação cancelada."
        exit 0
        ;;
    *)
        echo "Opção inválida."
        exit 1
        ;;
esac

# Resolve o caminho real expandindo ~
TARGET_DIR="${TARGET_DIR/#\~/$HOME}"

echo ""
echo "O MDCU será instalado em: $TARGET_DIR"

if [ ! -d "$TARGET_DIR" ]; then
    echo "Criando diretório $TARGET_DIR..."
    mkdir -p "$TARGET_DIR"
fi

echo "Copiando skills..."
# Assumindo que o script é rodado a partir da raiz do repositório
if [ ! -d "skills" ]; then
    echo "Erro: Pasta 'skills' não encontrada. Execute este script a partir da raiz do repositório MDCU."
    exit 1
fi

cp -r skills/* "$TARGET_DIR/"

echo ""
echo "✅ MDCU Framework instalado com sucesso!"
echo "As skills a seguir agora estão disponíveis no seu agente:"
ls -1 skills/
echo ""
echo "Para iniciar o uso em qualquer projeto, abra o seu agente e digite:"
echo "  /project-init"
echo "================================================"
