'use strict';

/**
 * Servidor local que replica o comportamento da Vercel:
 * arquivos estaticos na raiz + funcoes em /api/*.js.
 * Uso: npm start  (http://0.0.0.0:3000)
 */

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const PORT = Number(process.env.PORT || 3000);

// Em ambientes com proxy TLS corporativo, o Node usa apenas o CA bundle proprio.
// Reexecuta com o bundle do sistema para que fetch() consiga validar o certificado.
const CA_BUNDLE = '/etc/ssl/certs/ca-certificates.crt';
if (!process.env.ATLAS_DEV_REEXEC && process.platform !== 'win32' && fs.existsSync(CA_BUNDLE) && !process.env.NODE_EXTRA_CA_CERTS) {
  const { spawnSync } = require('node:child_process');
  const child = spawnSync(process.execPath, [__filename, ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_EXTRA_CA_CERTS: CA_BUNDLE, ATLAS_DEV_REEXEC: '1' },
  });
  process.exit(child.status == null ? 1 : child.status);
}

function loadDotEnv() {
  const file = path.join(ROOT, '.env');
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const clean = line.trim();
    if (!clean || clean.startsWith('#')) continue;
    const separator = clean.indexOf('=');
    if (separator < 0) continue;
    const key = clean.slice(0, separator).trim();
    const value = clean.slice(separator + 1).trim().replace(/^["']|["']$/g, '');
    if (key && process.env[key] === undefined) process.env[key] = value;
  }
}

loadDotEnv();

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.md': 'text/markdown; charset=utf-8',
};

const chatHandler = require('../api/chat');
const healthHandler = require('../api/health');
const askHandler = require('../api/ask');

function serveStatic(req, res, pathname) {
  const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const filePath = path.resolve(ROOT, relative);
  if (!filePath.startsWith(ROOT + path.sep) && filePath !== path.join(ROOT, 'index.html')) {
    res.statusCode = 403;
    res.end('Forbidden');
    return;
  }
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('404 - arquivo não encontrado');
    return;
  }
  const content = fs.readFileSync(filePath);
  res.statusCode = 200;
  res.setHeader('Content-Type', MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'HEAD') res.end();
  else res.end(content);
}

const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, `http://${req.headers.host || 'localhost'}`).pathname;
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'same-origin');

  if (pathname === '/api/chat') return chatHandler(req, res);
  if (pathname === '/api/ask') return askHandler(req, res);
  if (pathname === '/api/health') return healthHandler(req, res);
  return serveStatic(req, res, pathname);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Atlas Agent rodando em http://0.0.0.0:${PORT}`);
  console.log(`Modo: ${process.env.GEMINI_API_KEY || process.env.GROQ_API_KEY || process.env.OPENROUTER_API_KEY ? 'IA' : 'demo (sem chave)'}`);
});
