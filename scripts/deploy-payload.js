'use strict';

/**
 * Gera .deploy-payload.json com o array "files" usado pela API de deployments
 * da Vercel (fallback para quando o deploy via Git nao esta disponivel).
 * Uso: npm run deploy:payload
 */

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const FILES = [
  'package.json',
  'index.html',
  'styles.css',
  'app.js',
  'api/chat.js',
  'api/health.js',
  'lib/agent.js',
  'lib/calculator.js',
  'lib/http.js',
  'lib/providers.js',
  'lib/tools.js',
];

const files = FILES.filter((file) => fs.existsSync(path.join(ROOT, file))).map((file) => ({
  file,
  data: fs.readFileSync(path.join(ROOT, file), 'utf8'),
}));

const output = path.join(ROOT, '.deploy-payload.json');
fs.writeFileSync(output, JSON.stringify({ name: 'agente-ia-atlas', target: 'production', files }, null, 2));
const bytes = files.reduce((sum, item) => sum + Buffer.byteLength(item.data), 0);
console.log(`${files.length} arquivos, ${(bytes / 1024).toFixed(1)} KB -> ${output}`);
