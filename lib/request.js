'use strict';

/** Utilitarios HTTP compartilhados pelas funcoes serverless. */

const MAX_BODY_BYTES = 20000;
const RATE_LIMIT = { max: 40, windowMs: 10 * 60 * 1000 };
const buckets = new Map();

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
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

function checkAccess(req, env = process.env) {
  const required = env.AGENT_ACCESS_CODE && String(env.AGENT_ACCESS_CODE).trim();
  if (!required) return true;
  if (req.headers['x-access-code'] === required) return true;
  try {
    const url = new URL(req.url || '/', 'http://localhost');
    if (url.searchParams.get('code') === required) return true;
  } catch { /* URL invalida */ }
  return false;
}

async function parseMessage(req) {
  if (req.method === 'GET' || req.method === 'HEAD') {
    const url = new URL(req.url || '/', 'http://localhost');
    return String(url.searchParams.get('message') || '').trim();
  }
  const raw = await readBody(req);
  let payload;
  try {
    payload = JSON.parse(raw || '{}');
  } catch {
    throw new Error('JSON inválido no corpo da requisição.');
  }
  return String(payload.message || '').trim();
}

module.exports = { sendJson, readBody, checkRateLimit, checkAccess, parseMessage, RATE_LIMIT };
