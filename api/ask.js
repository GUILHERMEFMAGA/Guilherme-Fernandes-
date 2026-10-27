'use strict';

/**
 * GET /api/ask?message=...   (ou POST /api/ask  { "message": "..." })
 * API JSON simples para integracoes (n8n, Make, Zapier, scripts, curl).
 * Executa o mesmo agente do /api/chat e devolve uma unica resposta JSON.
 */

const { runAgent } = require('../lib/agent');
const { createContext } = require('../lib/http');
const { sendJson, checkRateLimit, checkAccess, parseMessage } = require('../lib/request');

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }
  if (req.method !== 'GET' && req.method !== 'POST' && req.method !== 'HEAD') {
    sendJson(res, 405, { error: 'Método não permitido. Use GET ou POST.' });
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

  let message;
  try {
    message = await parseMessage(req);
  } catch (error) {
    sendJson(res, 400, { error: error.message });
    return;
  }
  if (!message) {
    sendJson(res, 400, {
      error: 'Informe a mensagem.',
      examples: ['GET /api/ask?message=Qual%20%C3%A9%20o%20clima%20em%20Ribeir%C3%A3o%20Preto%3F', 'POST /api/ask com {"message":"..."}'],
    });
    return;
  }

  const events = [];
  try {
    await runAgent({
      message,
      env,
      ctx: createContext(env),
      emit: (event) => events.push(event),
    });
  } catch (error) {
    sendJson(res, 500, { ok: false, error: error && error.message ? error.message : 'Erro interno.' });
    return;
  }

  const meta = events.find((event) => event.type === 'meta');
  const answers = events.filter((event) => event.type === 'answer');
  const done = events.find((event) => event.type === 'done');
  const toolEnds = events.filter((event) => event.type === 'tool_end');
  const errors = events.filter((event) => event.type === 'error').map((event) => event.message);

  sendJson(res, 200, {
    ok: true,
    mode: meta ? meta.mode : 'unknown',
    provider: meta ? meta.provider : null,
    answer: answers.length ? answers[answers.length - 1].text : null,
    tools: toolEnds.map((event) => ({
      name: event.name, ok: event.ok, durationMs: event.durationMs,
      result: event.result && event.result.ok ? event.result.data : event.result,
    })),
    errors,
    usage: done ? done.usage : null,
  });
};
