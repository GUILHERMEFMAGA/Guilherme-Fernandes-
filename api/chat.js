'use strict';

/**
 * POST /api/chat
 * Corpo: { "message": "...", "history": [{ "role": "user"|"assistant", "content": "..." }] }
 * Resposta: Server-Sent Events (text/event-stream) com eventos:
 *   meta, status, note, tool_start, tool_end, answer, error, done
 */

const { runAgent } = require('../lib/agent');
const { createContext } = require('../lib/http');

const MAX_BODY_BYTES = 20000;
const RATE_LIMIT = { max: 40, windowMs: 10 * 60 * 1000 };
const buckets = new Map();

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  if (req.body !== undefined) {
    if (typeof req.body === 'string') return Promise.resolve(req.body.slice(0, MAX_BODY_BYTES));
    return Promise.resolve(JSON.stringify(req.body).slice(0, MAX_BODY_BYTES));
  }
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      if (data.length > MAX_BODY_BYTES) {
        reject(new Error('Corpo da requisição muito grande.'));
        req.destroy();
      }
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

function clientKey(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) return forwarded.split(',')[0].trim();
  return (req.socket && req.socket.remoteAddress) || 'unknown';
}

function checkRateLimit(req) {
  const key = clientKey(req);
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || now > bucket.reset) {
    buckets.set(key, { count: 1, reset: now + RATE_LIMIT.windowMs });
    if (buckets.size > 2000) {
      for (const [entry, value] of buckets) if (value.reset < now) buckets.delete(entry);
    }
    return true;
  }
  bucket.count += 1;
  return bucket.count <= RATE_LIMIT.max;
}

function startSse(res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.write(': atlas-agent stream\n\n');
}

function eventWriter(res) {
  return (event) => {
    if (res.writableEnded || res.destroyed) return;
    try {
      res.write(`data: ${JSON.stringify(event)}\n\n`);
    } catch {
      // conexao fechada pelo cliente
    }
  };
}

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }
  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Método não permitido. Use POST.' });
    return;
  }

  const env = process.env;
  const requiredCode = env.AGENT_ACCESS_CODE && String(env.AGENT_ACCESS_CODE).trim();
  if (requiredCode) {
    const given = req.headers['x-access-code'];
    if (given !== requiredCode) {
      sendJson(res, 401, { error: 'Código de acesso ausente ou inválido.', codeRequired: true });
      return;
    }
  }

  if (!checkRateLimit(req)) {
    sendJson(res, 429, { error: 'Muitas requisições. Aguarde alguns minutos e tente novamente.' });
    return;
  }

  let payload;
  try {
    const raw = await readBody(req);
    payload = JSON.parse(raw || '{}');
  } catch (error) {
    sendJson(res, 400, { error: `JSON inválido: ${error.message}` });
    return;
  }

  startSse(res);
  const emit = eventWriter(res);
  const context = createContext(env);
  const keepAlive = setInterval(() => {
    if (!res.writableEnded && !res.destroyed) res.write(': ping\n\n');
  }, 20000);

  try {
    await runAgent({
      message: payload.message,
      history: payload.history,
      env,
      ctx: context,
      emit,
    });
  } catch (error) {
    emit({ type: 'error', message: error && error.message ? error.message : 'Erro interno do agente.' });
  } finally {
    clearInterval(keepAlive);
    if (!res.writableEnded) res.end();
  }
};
