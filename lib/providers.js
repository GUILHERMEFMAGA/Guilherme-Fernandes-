'use strict';

/**
 * Adaptadores de provedores de IA.
 * Dois formatos de function calling:
 *   - Gemini (generateContent + functionDeclarations/functionResponse)
 *   - OpenAI-compatible (Groq, OpenRouter, Ollama, LM Studio, ...)
 * O transcript interno e neutro e convertido para cada formato.
 */

const { truncate } = require('./http');

const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta';
const GEMINI_FALLBACKS = ['gemini-2.5-flash', 'gemini-2.5-flash-lite', 'gemini-2.0-flash', 'gemini-flash-latest'];
const OPENAI_FALLBACKS = ['llama-3.3-70b-versatile', 'openai/gpt-oss-120b', 'openai/gpt-oss-20b', 'llama-3.1-8b-instant', 'openrouter/free'];

const discoveredModels = new Map();

function has(env, key) {
  return Boolean(env[key] && String(env[key]).trim());
}

function resolveConfig(env) {
  const explicit = String(env.LLM_PROVIDER || '').trim().toLowerCase();
  if (explicit === 'demo') return null;

  if (has(env, 'GEMINI_API_KEY') && (!explicit || explicit === 'gemini')) {
    return {
      kind: 'gemini', name: 'Google Gemini', key: env.GEMINI_API_KEY.trim(),
      model: String(env.GEMINI_MODEL || 'gemini-2.5-flash').trim(), base: GEMINI_BASE,
    };
  }
  if (has(env, 'GROQ_API_KEY') && (!explicit || explicit === 'groq')) {
    return {
      kind: 'openai', name: 'Groq', key: env.GROQ_API_KEY.trim(),
      base: 'https://api.groq.com/openai/v1',
      model: String(env.LLM_MODEL || 'llama-3.3-70b-versatile').trim(),
    };
  }
  if (has(env, 'OPENROUTER_API_KEY') && (!explicit || explicit === 'openrouter')) {
    return {
      kind: 'openai', name: 'OpenRouter', key: env.OPENROUTER_API_KEY.trim(),
      base: 'https://openrouter.ai/api/v1',
      model: String(env.LLM_MODEL || 'openrouter/free').trim(),
    };
  }
  if (has(env, 'LLM_API_KEY') && has(env, 'LLM_BASE_URL')) {
    return {
      kind: 'openai', name: 'Endpoint compatível com OpenAI', key: env.LLM_API_KEY.trim(),
      base: String(env.LLM_BASE_URL).trim().replace(/\/$/, ''),
      model: String(env.LLM_MODEL || 'default').trim(),
    };
  }
  return null;
}

/** Converte JSON Schema (minusculo) para o Schema do Gemini (maiusculo, sem extras). */
function sanitizeSchema(node) {
  if (!node || typeof node !== 'object') return { type: 'STRING' };
  const out = {};
  if (node.type) out.type = String(node.type).toUpperCase();
  if (node.description) out.description = String(node.description).slice(0, 400);
  if (Array.isArray(node.enum)) out.enum = node.enum;
  if (node.properties && typeof node.properties === 'object') {
    out.properties = {};
    for (const [key, value] of Object.entries(node.properties)) {
      out.properties[key] = sanitizeSchema(value);
    }
  }
  if (Array.isArray(node.required)) out.required = node.required;
  if (node.items) out.items = sanitizeSchema(node.items);
  if (!out.type) out.type = 'OBJECT';
  return out;
}

function unique(list) {
  return [...new Set(list.filter(Boolean))];
}

function newCallId() {
  return `call_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function parseJsonLoose(value) {
  if (value && typeof value === 'object') return value;
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

// ---------------------------------------------------------------------------
// Conversao do transcript neutro
// ---------------------------------------------------------------------------

function toGeminiContents(transcript) {
  const contents = [];
  for (const message of transcript) {
    if (message.role === 'system') continue;
    if (message.role === 'user') {
      contents.push({ role: 'user', parts: [{ text: String(message.content || '') }], grouped: false });
      continue;
    }
    if (message.role === 'assistant') {
      const parts = [];
      if (message.content) parts.push({ text: String(message.content) });
      for (const call of message.toolCalls || []) {
        parts.push({ functionCall: { name: call.name, args: call.args || {} } });
      }
      if (parts.length) contents.push({ role: 'model', parts, grouped: false });
      continue;
    }
    if (message.role === 'tool') {
      const parsed = parseJsonLoose(message.content);
      const part = { functionResponse: { name: message.name, response: parsed } };
      const last = contents[contents.length - 1];
      if (last && last.role === 'user' && last.grouped) last.parts.push(part);
      else contents.push({ role: 'user', parts: [part], grouped: true });
    }
  }
  return contents.map(({ role, parts }) => ({ role, parts }));
}

function toOpenAIMessages(transcript) {
  const messages = [];
  for (const message of transcript) {
    if (message.role === 'system') {
      messages.push({ role: 'system', content: String(message.content || '') });
    } else if (message.role === 'user') {
      messages.push({ role: 'user', content: String(message.content || '') });
    } else if (message.role === 'assistant') {
      const entry = { role: 'assistant', content: message.content || '' };
      if (message.toolCalls && message.toolCalls.length) {
        entry.tool_calls = message.toolCalls.map((call) => ({
          id: call.id || newCallId(), type: 'function',
          function: { name: call.name, arguments: JSON.stringify(call.args || {}) },
        }));
      }
      messages.push(entry);
    } else if (message.role === 'tool') {
      messages.push({ role: 'tool', tool_call_id: message.callId, content: String(message.content || '{}') });
    }
  }
  return messages;
}

function buildGeminiTools(tools) {
  return [{
    functionDeclarations: tools.map((tool) => ({
      name: tool.name,
      description: tool.description,
      parameters: sanitizeSchema(tool.parameters),
    })),
  }];
}

function buildOpenAITools(tools) {
  return tools.map((tool) => ({
    type: 'function',
    function: { name: tool.name, description: tool.description, parameters: tool.parameters },
  }));
}

// ---------------------------------------------------------------------------
// Erros amigaveis
// ---------------------------------------------------------------------------

function friendlyError(error, config) {
  const status = error && error.status;
  const raw = truncate(error && error.message ? error.message : String(error), 300);
  if (status === 401 || status === 403 || /api key|unauthor|forbidden|permission/i.test(raw)) {
    return `A chave de API do ${config.name} foi recusada (${status || 'autenticação'}). Verifique se a chave está correta e se a API está habilitada.`;
  }
  if (status === 429 || /rate.?limit|quota|resource.?exhaust/i.test(raw)) {
    return `Cota gratuita do ${config.name} esgotada no momento (rate limit). Aguarde alguns minutos, troque o modelo ou configure outro provedor em .env.`;
  }
  if (status >= 500) return `O ${config.name} está indisponível agora (HTTP ${status}). Tente novamente em instantes.`;
  if (/fetch failed|network|ENOTFOUND|ECONNREFUSED/i.test(raw)) return `Não foi possível conectar ao ${config.name}: ${raw}`;
  return `Falha no ${config.name}: ${raw}`;
}

function isModelError(error) {
  const status = error && error.status;
  const message = String(error && error.message ? error.message : '');
  return status === 404 || /not found|not supported|unknown model|does not exist|model.*invalid|invalid.*model/i.test(message);
}

// ---------------------------------------------------------------------------
// Gemini
// ---------------------------------------------------------------------------

async function discoverGeminiModels(config, ctx) {
  const cacheKey = `gemini:${config.key.slice(-6)}`;
  if (discoveredModels.has(cacheKey)) return discoveredModels.get(cacheKey);
  try {
    const data = await ctx.fetchJson(`${config.base}/models?key=${encodeURIComponent(config.key)}&pageSize=100`, { timeout: 9000 });
    const models = (Array.isArray(data.models) ? data.models : [])
      .filter((model) => Array.isArray(model.supportedGenerationMethods) && model.supportedGenerationMethods.includes('generateContent'))
      .map((model) => String(model.name || '').replace(/^models\//, ''))
      .filter((name) => /flash/i.test(name))
      .slice(0, 8);
    discoveredModels.set(cacheKey, models);
    return models;
  } catch {
    return [];
  }
}

async function geminiOnce(config, ctx, transcript, tools, model) {
  const system = transcript.find((message) => message.role === 'system');
  const body = {
    systemInstruction: system ? { parts: [{ text: system.content }] } : undefined,
    contents: toGeminiContents(transcript),
    generationConfig: { temperature: 0.25, maxOutputTokens: 2048, topP: 0.9 },
  };
  if (tools.length) {
    body.tools = buildGeminiTools(tools);
    body.toolConfig = { functionCallingConfig: { mode: 'AUTO' } };
  }
  const data = await ctx.postJson(
    `${config.base}/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(config.key)}`,
    body,
    { timeout: 60000 }
  );
  const candidate = data && Array.isArray(data.candidates) ? data.candidates[0] : null;
  if (data && data.promptFeedback && data.promptFeedback.blockReason) {
    throw new Error(`Pedido bloqueado pelo provedor: ${data.promptFeedback.blockReason}`);
  }
  const parts = candidate && candidate.content && Array.isArray(candidate.content.parts) ? candidate.content.parts : [];
  const content = parts.filter((part) => typeof part.text === 'string').map((part) => part.text).join('\n').trim();
  const toolCalls = parts.filter((part) => part.functionCall).map((part) => ({
    id: newCallId(),
    name: part.functionCall.name,
    args: parseJsonLoose(part.functionCall.args),
  }));
  if (!content && !toolCalls.length) {
    throw new Error(`O modelo ${model} retornou uma resposta vazia (finishReason: ${candidate && candidate.finishReason}).`);
  }
  return { content, toolCalls, model };
}

async function geminiChat(config, ctx, transcript, tools) {
  let lastError;
  const models = unique([config.model, ...GEMINI_FALLBACKS, ...(await discoverGeminiModels(config, ctx))]);
  for (const model of models) {
    try {
      return await geminiOnce(config, ctx, transcript, tools, model);
    } catch (error) {
      lastError = error;
      if (isModelError(error)) continue;
      throw new Error(friendlyError(error, config));
    }
  }
  throw new Error(`Nenhum modelo Gemini disponível nesta conta. Defina GEMINI_MODEL com um modelo válido. Último erro: ${truncate(lastError && lastError.message, 200)}`);
}

// ---------------------------------------------------------------------------
// OpenAI-compatible
// ---------------------------------------------------------------------------

async function discoverOpenAIModels(config, ctx) {
  const cacheKey = `openai:${config.base}:${config.key.slice(-6)}`;
  if (discoveredModels.has(cacheKey)) return discoveredModels.get(cacheKey);
  try {
    const data = await ctx.fetchJson(`${config.base}/models`, {
      timeout: 9000,
      headers: { Authorization: `Bearer ${config.key}` },
    });
    const models = (Array.isArray(data.data) ? data.data : [])
      .map((model) => String(model.id || ''))
      .filter(Boolean)
      .filter((id) => /llama|gpt|qwen|mistral|gemma|free|instruct/i.test(id))
      .slice(0, 10);
    discoveredModels.set(cacheKey, models);
    return models;
  } catch {
    return [];
  }
}

async function openaiOnce(config, ctx, transcript, tools, model) {
  const body = {
    model,
    messages: toOpenAIMessages(transcript),
    temperature: 0.25,
    max_tokens: 2048,
  };
  if (tools.length) {
    body.tools = buildOpenAITools(tools);
    body.tool_choice = 'auto';
  }
  const data = await ctx.postJson(`${config.base}/chat/completions`, body, {
    timeout: 60000,
    headers: { Authorization: `Bearer ${config.key}` },
  });
  const choice = data && Array.isArray(data.choices) ? data.choices[0] : null;
  const message = choice && choice.message ? choice.message : {};
  const content = typeof message.content === 'string' ? message.content.trim() : '';
  const toolCalls = (Array.isArray(message.tool_calls) ? message.tool_calls : []).map((call) => ({
    id: call.id || newCallId(),
    name: (call.function && call.function.name) || '',
    args: parseJsonLoose(call.function && call.function.arguments),
  })).filter((call) => call.name);
  if (!content && !toolCalls.length) {
    throw new Error(`O modelo ${model} retornou uma resposta vazia (finish_reason: ${choice && choice.finish_reason}).`);
  }
  return { content, toolCalls, model };
}

async function openaiChat(config, ctx, transcript, tools) {
  let lastError;
  const models = unique([config.model, ...(await discoverOpenAIModels(config, ctx)), ...OPENAI_FALLBACKS]);
  for (const model of models) {
    try {
      return await openaiOnce(config, ctx, transcript, tools, model);
    } catch (error) {
      lastError = error;
      if (isModelError(error)) continue;
      throw new Error(friendlyError(error, config));
    }
  }
  throw new Error(`Nenhum modelo disponível em ${config.name}. Defina LLM_MODEL corretamente. Último erro: ${truncate(lastError && lastError.message, 200)}`);
}

// ---------------------------------------------------------------------------
// API publica
// ---------------------------------------------------------------------------

function createProvider(env = process.env, ctx) {
  const config = resolveConfig(env);
  if (!config) return null;
  return {
    kind: config.kind,
    name: config.name,
    model: config.model,
    mode: 'ai',
    describe: () => ({ kind: config.kind, name: config.name, model: config.model, mode: 'ai' }),
    chat: (transcript, tools) => (config.kind === 'gemini'
      ? geminiChat(config, ctx, transcript, tools)
      : openaiChat(config, ctx, transcript, tools)),
  };
}

module.exports = {
  resolveConfig,
  createProvider,
  sanitizeSchema,
  toGeminiContents,
  toOpenAIMessages,
  buildGeminiTools,
  buildOpenAITools,
  friendlyError,
};
