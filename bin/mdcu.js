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
  install-skills   Interativamente copia as skills para o seu Agente de IA local
  init             Inicializa a infraestrutura do MDCU (.mdcu/) no projeto atual
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
      fs.copyFileSync(currentSource, currentTarget);
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
  console.log("✅ Skills instaladas com sucesso!");
  console.log("Agora no seu repositório de trabalho, rode 'npx mdcu init' para configurar a infra.");
}

function initProject() {
  console.log("================================================");
  console.log("    Inicializando Infraestrutura do MDCU");
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
    console.log("\nInicie sua sessão clínica com: /mdcu no seu agente!");
  } else {
    console.log("\nNenhum recurso foi copiado.");
  }
}

if (!command || command === 'help') {
  showHelp();
} else if (command === 'install-skills') {
  installSkills();
} else if (command === 'init') {
  initProject();
} else {
  console.error(`Comando desconhecido: ${command}`);
  showHelp();
  process.exit(1);
}
