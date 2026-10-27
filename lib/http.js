'use strict';

/**
 * Camada de HTTP seguro.
 * - So HTTPS, sem credenciais na URL, sem hosts privados, sem redirects.
 * - Timeout e limite de tamanho de resposta.
 * - fetch injetavel para testes e para o provedor de IA.
 */

const DEFAULT_TIMEOUT_MS = 9000;
const MAX_RESPONSE_CHARS = 200000;
const USER_AGENT = 'AtlasAgent/1.0 (serverless-agent; contact: owner)';

function truncate(value, max = 4000) {
  const str = typeof value === 'string' ? value : JSON.stringify(value);
  if (str == null) return '';
  return str.length > max ? str.slice(0, max) + ' …(truncado)' : str;
}

function isForbiddenHost(hostname) {
  const h = String(hostname).toLowerCase().replace(/^\[|\]$/g, '');
  if (!h) return true;
  if (h === 'localhost' || h.endsWith('.localhost') || h.endsWith('.local')) return true;
  if (h === '0.0.0.0' || h === '::1' || h === '::') return true;
  if (/^127\./.test(h) || /^10\./.test(h) || /^192\.168\./.test(h)) return true;
  if (/^169\.254\./.test(h) || /^100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\./.test(h)) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(h)) return true;
  if (/^(fc|fd|fe80)/i.test(h) && h.includes(':')) return true;
  if (h.endsWith('.internal') || h.endsWith('.localdomain')) return true;
  return false;
}

function assertSafeUrl(rawUrl, options = {}) {
  const { allowedHosts } = options;
  let url;
  try {
    url = new URL(String(rawUrl));
  } catch {
    throw new Error('URL inválida.');
  }
  if (url.protocol !== 'https:') throw new Error('Apenas URLs HTTPS são permitidas.');
  if (url.username || url.password) throw new Error('URLs com credenciais embutidas não são permitidas.');
  const hostname = url.hostname.toLowerCase().replace(/^\[|\]$/g, '');
  if (isForbiddenHost(hostname)) throw new Error('Host privado/local bloqueado por segurança.');
  if (Array.isArray(allowedHosts) && allowedHosts.length > 0) {
    const authorized = allowedHosts.some((entry) => {
      const host = String(entry).trim().toLowerCase();
      return host && (hostname === host || hostname.endsWith('.' + host));
    });
    if (!authorized) throw new Error('Host não autorizado. Adicione-o em ALLOWED_API_HOSTS.');
  }
  return url;
}

async function request(url, options = {}) {
  const {
    fetchImpl = globalThis.fetch,
    timeout = DEFAULT_TIMEOUT_MS,
    maxChars = MAX_RESPONSE_CHARS,
    allowedHosts,
    method = 'GET',
    headers = {},
    body,
  } = options;

  assertSafeUrl(url, { allowedHosts });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetchImpl(url, {
      method,
      headers: { 'User-Agent': USER_AGENT, ...headers },
      body,
      signal: controller.signal,
      redirect: 'manual',
    });
    if (response.status >= 300 && response.status < 400) {
      throw new Error('Redirecionamento bloqueado por segurança.');
    }
    const text = truncate(await response.text(), maxChars);
    return { ok: response.ok, status: response.status, text };
  } catch (error) {
    if (error && error.name === 'AbortError') {
      throw new Error(`Tempo limite excedido (${timeout} ms) ao chamar ${new URL(url).hostname}.`);
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchJson(url, options = {}) {
  const response = await request(url, options);
  if (!response.ok) {
    throw Object.assign(
      new Error(`HTTP ${response.status} em ${new URL(url).hostname}: ${truncate(response.text, 250)}`),
      { status: response.status, body: response.text }
    );
  }
  try {
    return JSON.parse(response.text);
  } catch {
    throw new Error(`Resposta não é um JSON válido: ${truncate(response.text, 200)}`);
  }
}

async function postJson(url, payload, options = {}) {
  const response = await request(url, {
    ...options,
    method: options.method || 'POST',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    body: JSON.stringify(payload),
  });
  let data;
  try {
    data = JSON.parse(response.text);
  } catch {
    data = { raw: truncate(response.text, 500) };
  }
  if (!response.ok) {
    throw Object.assign(
      new Error(`HTTP ${response.status}: ${truncate(JSON.stringify(data), 400)}`),
      { status: response.status, body: data }
    );
  }
  return data;
}

function parseHosts(value) {
  if (!value) return [];
  return String(value)
    .split(',')
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);
}

/** Contexto compartilhado por todas as ferramentas e provedores. */
function createContext(env = process.env, overrides = {}) {
  const ctx = {
    env,
    now: overrides.now ? new Date(overrides.now) : new Date(),
    fetchImpl: overrides.fetchImpl || globalThis.fetch,
    allowedHosts: overrides.allowedHosts || parseHosts(env.ALLOWED_API_HOSTS),
  };
  ctx.request = (url, opts = {}) => request(url, { fetchImpl: ctx.fetchImpl, ...opts });
  ctx.fetchJson = (url, opts = {}) => fetchJson(url, { fetchImpl: ctx.fetchImpl, ...opts });
  ctx.postJson = (url, payload, opts = {}) => postJson(url, payload, { fetchImpl: ctx.fetchImpl, ...opts });
  return ctx;
}

module.exports = {
  USER_AGENT,
  DEFAULT_TIMEOUT_MS,
  truncate,
  isForbiddenHost,
  assertSafeUrl,
  parseHosts,
  request,
  fetchJson,
  postJson,
  createContext,
};
