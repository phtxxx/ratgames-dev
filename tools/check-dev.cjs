#!/usr/bin/env node
'use strict';
// RAT Games DEV: verificação estática e não destrutiva da árvore local.
// Não autentica, não inicia serviços e não altera licenças.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const pkgPath = path.join(root, 'package.json');
let failures = 0;
function check(label, ok, detail='') {
  console.log((ok ? '[OK] ' : '[ERRO] ') + label + (detail ? ' — ' + detail : ''));
  if (!ok) failures++;
}
check('package.json presente', fs.existsSync(pkgPath));
if (!fs.existsSync(pkgPath)) process.exitCode = 1;
else {
  let pkg;
  try { pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8')); }
  catch (e) { console.error('[ERRO] JSON inválido:', e.message); process.exit(1); }
  const main = pkg.main || 'index.js';
  check('Entrada Electron', fs.existsSync(path.join(root, main)), main);
  for (const f of ['.build-src/api.js', '.build-src/sessao.js', '.build-src/preload.js']) {
    check('Módulo ' + f, fs.existsSync(path.join(root, f)));
  }
  for (const dep of ['electron-updater', 'tiktok-live-connector', 'ws']) {
    check('Dependência declarada ' + dep, Boolean(pkg.dependencies && pkg.dependencies[dep]));
  }
  console.log('[INFO] node_modules local: ' + (fs.existsSync(path.join(root, 'node_modules')) ? 'presente' : 'ausente (normal no GitHub; instale dependências no computador)'));
  const media = path.join(root, 'resources', 'jogos');
  check('Recursos de jogos', fs.existsSync(media), 'verificar também arquivos de cada jogo');
  if (fs.existsSync(path.join(root, main))) {
    try { new (require('node:vm').Script)(fs.readFileSync(path.join(root, main), 'utf8'), {filename: main}); check('Sintaxe JS da entrada', true); }
    catch (e) { check('Sintaxe JS da entrada', false, e.message); }
  }
}
console.log('\nDiagnóstico estático: ' + (failures ? failures + ' verificação(ões) pendente(s).' : 'sem falhas detectadas.') + '\nIsso NÃO comprova que login, jogos, Studio, Roblox ou TikTok LIVE funcionam.');
if (failures) process.exitCode = 1;
