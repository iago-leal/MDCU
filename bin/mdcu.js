#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const args = process.argv.slice(2);
const command = args[0];

const PKG_ROOT = path.join(__dirname, '..');
const CWD = process.cwd();

function showHelp() {
  console.log(`
MDCU Framework CLI

Uso:
  npx mdcu <comando>

Comandos disponíveis:
  install   Instala a infraestrutura do projeto (.mdcu/) e as skills no agente interativamente
  help             Exibe esta mensagem de ajuda
`);
}

function copyDirRecursiveSync(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  const files = fs.readdirSync(source);
  for (const file of files) {
    const currentSource = path.join(source, file);
    const currentTarget = path.join(target, file);
    
    if (fs.statSync(currentSource).isDirectory()) {
      copyDirRecursiveSync(currentSource, currentTarget);
    } else {
      if (!fs.existsSync(currentTarget)) {
        fs.copyFileSync(currentSource, currentTarget);
      } else {
        console.log(`    -> [reaproveitado] ${file}`);
      }
    }
  }
}

async function installSkills() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log("================================================");
  console.log("    Instalação das Skills do MDCU");
  console.log("================================================\n");
  console.log("Para qual agente você deseja instalar as skills?");
  console.log("1) Gemini Antigravity (.agents/skills no projeto atual)");
  console.log("2) Claude Desktop (~/.claude/skills)");
  console.log("3) Custom (Digitar caminho manualmente)");
  console.log("4) Cancelar");
  
  rl.question("Escolha (1-4): ", (answer) => {
    let targetDir = "";
    const homeDir = process.env.HOME || process.env.USERPROFILE;

    if (answer === '1') {
      targetDir = path.join(CWD, '.agents/skills');
      doCopySkills(targetDir);
      rl.close();
    } else if (answer === '2') {
      targetDir = path.join(homeDir, '.claude/skills');
      doCopySkills(targetDir);
      rl.close();
    } else if (answer === '3') {
      rl.question("Digite o caminho absoluto: ", (customPath) => {
        targetDir = customPath.replace(/^~/, homeDir);
        doCopySkills(targetDir);
        rl.close();
      });
    } else {
      console.log("Cancelado.");
      rl.close();
    }
  });
}

function doCopySkills(targetDir) {
  console.log(`\nInstalando skills em: ${targetDir}`);
  const sourceSkillsDir = path.join(PKG_ROOT, 'skills');
  
  if (!fs.existsSync(sourceSkillsDir)) {
    console.error(`Erro: Pasta skills não encontrada no pacote (${sourceSkillsDir})`);
    return;
  }

  copyDirRecursiveSync(sourceSkillsDir, targetDir);
  console.log("✅ Skills instaladas com sucesso no agente!");
  console.log("\nInicie sua sessão clínica com: /mdcu no seu agente!");
}

function initProject() {
  console.log("================================================");
  console.log("    Instalando MDCU (Projeto + Skills)");
  console.log("================================================\n");
  
  const targetMdcuDir = path.join(CWD, '.mdcu');
  console.log(`Criando infraestrutura em: ${targetMdcuDir}`);
  
  const dirsToCopy = ['scripts', 'templates', 'framework'];
  let copiedAny = false;

  for (const dir of dirsToCopy) {
    const sourceDir = path.join(PKG_ROOT, dir);
    const targetDir = path.join(targetMdcuDir, dir);
    
    if (fs.existsSync(sourceDir)) {
      console.log(`-> Copiando ${dir}/...`);
      copyDirRecursiveSync(sourceDir, targetDir);
      copiedAny = true;
    } else {
      console.log(`-> Aviso: ${dir}/ não encontrado no pacote original.`);
    }
  }

  if (copiedAny) {
    console.log("\n✅ Infraestrutura copiada com sucesso para a pasta .mdcu/");
    console.log("\nNão se esqueça de adicionar .mdcu/ ao seu repositório, ou incluí-lo no .gitignore se preferir que cada dev rode o comando init localmente.");
  } else {
    console.log("\nNenhum recurso foi copiado para o projeto.");
  }

  console.log("\nAgora vamos instalar as skills no seu Agente...\n");
  installSkills();
}

if (!command || command === 'help') {
  showHelp();
} else if (command === 'install') {
  initProject();
} else {
  console.error(`Comando desconhecido: ${command}`);
  showHelp();
  process.exit(1);
}
