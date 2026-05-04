#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const pc = require('picocolors');
const prompts = require('prompts');

const PKG_ROOT = path.join(__dirname, '..');
const CWD = process.cwd();
const HOME = process.env.HOME || process.env.USERPROFILE || '';
const PKG = require(path.join(PKG_ROOT, 'package.json'));

const ICON = {
  ok: pc.green('✓'),
  step: pc.cyan('→'),
  skip: pc.yellow('↺'),
  warn: pc.yellow('!'),
  err: pc.red('✗'),
};

function banner() {
  const title = `MDCU Framework Installer  v${PKG.version}`;
  const inner = ` ${title} `;
  const line = '─'.repeat(inner.length);
  console.log('');
  console.log(pc.cyan(`┌${line}┐`));
  console.log(pc.cyan('│') + pc.bold(pc.cyan(inner)) + pc.cyan('│'));
  console.log(pc.cyan(`└${line}┘`));
  console.log('');
}

function section(n, total, label) {
  console.log('');
  console.log(pc.dim(`[${n}/${total}]`) + ' ' + pc.bold(pc.magenta(label)));
}

function info(msg) {
  console.log(`  ${ICON.step} ${msg}`);
}

function ok(msg) {
  console.log(`  ${ICON.ok} ${pc.green(msg)}`);
}

function warn(msg) {
  console.log(`  ${ICON.warn} ${pc.yellow(msg)}`);
}

function fail(msg) {
  console.error(`  ${ICON.err} ${pc.red(msg)}`);
}

function copyDirRecursiveSync(source, target, stats = { copied: 0, reused: 0 }) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }
  for (const entry of fs.readdirSync(source)) {
    const src = path.join(source, entry);
    const dst = path.join(target, entry);
    if (fs.statSync(src).isDirectory()) {
      copyDirRecursiveSync(src, dst, stats);
    } else if (!fs.existsSync(dst)) {
      fs.copyFileSync(src, dst);
      stats.copied += 1;
    } else {
      stats.reused += 1;
    }
  }
  return stats;
}

function installInfrastructure() {
  section(1, 3, 'Infraestrutura .mdcu/');
  const targetMdcuDir = path.join(CWD, '.mdcu');
  info(`destino: ${pc.dim(targetMdcuDir)}`);

  const dirsToCopy = ['scripts', 'templates', 'framework'];
  const totals = { copied: 0, reused: 0, missing: [] };

  for (const dir of dirsToCopy) {
    const sourceDir = path.join(PKG_ROOT, dir);
    const targetDir = path.join(targetMdcuDir, dir);
    if (!fs.existsSync(sourceDir)) {
      totals.missing.push(dir);
      warn(`${dir}/ ausente no pacote — pulado`);
      continue;
    }
    const stats = copyDirRecursiveSync(sourceDir, targetDir);
    totals.copied += stats.copied;
    totals.reused += stats.reused;
    ok(`${dir}/ ${pc.dim(`(${stats.copied} novos, ${stats.reused} preservados)`)}`);
  }
  return totals;
}

const ENGINES = [
  {
    id: 'antigravity',
    label: 'Antigravity (Gemini)',
    hint: '.agents/skills no workspace',
    resolve: () => path.join(CWD, '.agents/skills'),
  },
  {
    id: 'claude',
    label: 'Claude Desktop',
    hint: '~/.claude/skills',
    resolve: () => path.join(HOME, '.claude/skills'),
  },
  {
    id: 'custom',
    label: 'Custom',
    hint: 'digitar path manualmente',
    resolve: null,
  },
];

async function selectEngines() {
  const response = await prompts({
    type: 'multiselect',
    name: 'engines',
    message: 'Selecione uma ou mais engines',
    instructions: false,
    hint: 'use ↑↓, espaço para marcar, enter para confirmar',
    choices: ENGINES.map((e) => ({
      title: e.label,
      description: e.hint,
      value: e.id,
    })),
    min: 0,
  });
  return response.engines || [];
}

async function resolveTargets(selectedIds) {
  const targets = [];
  for (const id of selectedIds) {
    const engine = ENGINES.find((e) => e.id === id);
    if (!engine) continue;
    if (engine.resolve) {
      targets.push({ engine, target: engine.resolve() });
    } else {
      const { customPath } = await prompts({
        type: 'text',
        name: 'customPath',
        message: 'Path absoluto para a engine custom',
        validate: (v) => (v && v.trim().length > 0 ? true : 'Path obrigatório'),
      });
      if (!customPath) continue;
      const resolved = customPath.replace(/^~/, HOME);
      targets.push({ engine, target: resolved });
    }
  }
  return targets;
}

function installSkillsToTargets(targets) {
  const sourceSkillsDir = path.join(PKG_ROOT, 'skills');
  if (!fs.existsSync(sourceSkillsDir)) {
    fail(`Pasta skills/ não encontrada no pacote (${sourceSkillsDir})`);
    return [];
  }
  const results = [];
  for (const { engine, target } of targets) {
    info(`${engine.label} ${pc.dim('→')} ${pc.dim(target)}`);
    const stats = copyDirRecursiveSync(sourceSkillsDir, target);
    ok(`${stats.copied} novos, ${stats.reused} preservados`);
    results.push({ engine, target, ...stats });
  }
  return results;
}

function summary(infraStats, skillResults) {
  section(3, 3, 'Resumo');
  const rows = [];
  rows.push({
    label: 'Infraestrutura .mdcu/',
    target: path.join(CWD, '.mdcu'),
    copied: infraStats.copied,
    reused: infraStats.reused,
  });
  for (const r of skillResults) {
    rows.push({
      label: r.engine.label,
      target: r.target,
      copied: r.copied,
      reused: r.reused,
    });
  }

  const labelWidth = Math.max(...rows.map((r) => r.label.length));
  for (const r of rows) {
    const pad = ' '.repeat(labelWidth - r.label.length);
    const stat = `${ICON.ok} ${pc.green(String(r.copied))} novos  ${ICON.skip} ${pc.yellow(String(r.reused))} preservados`;
    console.log(`  ${pc.bold(r.label)}${pad}  ${stat}`);
    console.log(`  ${pc.dim(' '.repeat(labelWidth) + '  ' + r.target)}`);
  }

  if (infraStats.missing && infraStats.missing.length) {
    console.log('');
    warn(`pastas ausentes no pacote: ${infraStats.missing.join(', ')}`);
  }

  console.log('');
  console.log(pc.green('  Pronto.') + ' Inicie sua sessão clínica com ' + pc.bold(pc.cyan('/mdcu')) + ' no seu agente.');
  console.log('');
}

async function runInstall() {
  banner();
  const infraStats = installInfrastructure();

  section(2, 3, 'Skills');
  const selectedIds = await selectEngines();
  if (!selectedIds.length) {
    warn('nenhuma engine selecionada — etapa de skills pulada');
    summary(infraStats, []);
    return;
  }
  const targets = await resolveTargets(selectedIds);
  const skillResults = installSkillsToTargets(targets);
  summary(infraStats, skillResults);
}

function showHelp() {
  console.log(`
${pc.bold(pc.cyan('MDCU Framework CLI'))}  ${pc.dim(`v${PKG.version}`)}

${pc.bold('Uso:')}
  ${pc.cyan('npx mdcu')} <comando>

${pc.bold('Comandos:')}
  ${pc.green('install')}   Instala a infraestrutura .mdcu/ e as skills nas engines escolhidas
  ${pc.green('help')}      Exibe esta mensagem
`);
}

async function main() {
  const command = process.argv[2];
  if (!command || command === 'help' || command === '--help' || command === '-h') {
    showHelp();
    return;
  }
  if (command === 'install') {
    try {
      await runInstall();
    } catch (e) {
      fail(`Falha durante install: ${e.message}`);
      process.exit(1);
    }
    return;
  }
  fail(`Comando desconhecido: ${command}`);
  showHelp();
  process.exit(1);
}

main();
