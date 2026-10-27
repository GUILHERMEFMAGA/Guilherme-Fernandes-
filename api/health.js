'use strict';

/** GET /api/health — diagnostico sem expor segredos. */

const { getAvailableTools, TOOLS } = require('../lib/tools');
const { resolveConfig } = require('../lib/providers');
const { createContext } = require('../lib/http');

module.exports = function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ error: 'Método não permitido. Use GET.' }));
    return;
  }

  const env = process.env;
  const context = createContext(env);
  const config = resolveConfig(env);
  const available = getAvailableTools(env);

  const body = {
    ok: true,
    name: 'Atlas Agent',
    version: '1.0.0',
    mode: config ? 'ai' : 'demo',
    provider: config ? { name: config.name, model: config.model, kind: config.kind } : { name: 'Modo demo', model: null },
    serverTime: context.now.toISOString(),
    tools: TOOLS.map((tool) => ({
      name: tool.name,
      label: tool.label,
      available: available.some((item) => item.name === tool.name),
    })),
    configuration: {
      accessCodeRequired: Boolean(env.AGENT_ACCESS_CODE),
      webhook: Boolean(env.AGENT_WEBHOOK_URL),
      notion: Boolean(env.NOTION_TOKEN && (env.NOTION_DATABASE_ID || env.NOTION_PARENT_PAGE_ID)),
      allowedApiHosts: context.allowedHosts,
    },
    limits: { maxSteps: 6, maxMessageChars: 4000, maxHistoryMessages: 20, rateLimitPer10Min: 40 },
  };

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body, null, 2));
};
