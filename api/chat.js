'use strict';

/**
 * POST /api/chat
 * Corpo: { "message": "...", "history": [{ "role": "user"|"assistant", "content": "..." }] }
 * Resposta: Server-Sent Events (text/event-stream) com eventos:
 *   meta, status, note, tool_start, tool_end, answer, error, done
 */

const { runAgent } = require('../lib/agent');
const { createContext } = require('../lib/http');
const { sendJson, readBody, checkRateLimit, checkAccess } = require('../lib/request');

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
  if (!checkAccess(req, env)) {
    sendJson(res, 401, { error: 'Código de acesso ausente ou inválido.', codeRequired: true });
    return;
  }
  if (!checkRateLimit(req)) {
    sendJson(res, 429, { error: 'Muitas requisições. Aguarde alguns minutos e tente novamente.' });
    return;
  }

  let payload;
  try {
    payload = JSON.parse((await readBody(req)) || '{}');
  } catch (error) {
    sendJson(res, 400, { error: `JSON inválido: ${error.message}` });
    return;
  }

  startSse(res);
  const emit = eventWriter(res);
  const keepAlive = setInterval(() => {
    if (!res.writableEnded && !res.destroyed) res.write(': ping\n\n');
  }, 20000);

  try {
    await runAgent({
      message: payload.message,
      history: payload.history,
      env,
      ctx: createContext(env),
      emit,
    });
  } catch (error) {
    emit({ type: 'error', message: error && error.message ? error.message : 'Erro interno do agente.' });
  } finally {
    clearInterval(keepAlive);
    if (!res.writableEnded) res.end();
  }
};
