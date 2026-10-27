'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { evaluate } = require('../lib/calculator');
const { assertSafeUrl, createContext, truncate } = require('../lib/http');
const { getAvailableTools, runTool, findTool } = require('../lib/tools');
const { sanitizeSchema, toGeminiContents, toOpenAIMessages, buildGeminiTools, resolveConfig } = require('../lib/providers');
const { buildDemoPlan, extractExpression, runAgent } = require('../lib/agent');

function mockFetch(handler) {
  return async (url, options = {}) => {
    const payload = await handler(String(url), options);
    return {
      ok: true,
      status: 200,
      text: async () => (typeof payload === 'string' ? payload : JSON.stringify(payload)),
    };
  };
}

function collectEvents() {
  const events = [];
  return { events, emit: (event) => events.push(event) };
}

// --------------------------------------------------------------------------
test('calculator: precedência, unários, potência e funções', () => {
  assert.equal(evaluate('2 + 2 * 10').result, 22);
  assert.equal(evaluate('(2 + 2) * 10').result, 40);
  assert.equal(evaluate('-3^2').result, -9);
  assert.equal(evaluate('2^3^2').result, 512);
  assert.equal(evaluate('sqrt(144) + abs(-8)').result, 20);
  assert.equal(evaluate('round(pi * 10)').result, 31);
  assert.equal(evaluate('max(2, 9, 4)').result, 9);
});

test('calculator: rejeita entradas inválidas sem eval', () => {
  assert.throws(() => evaluate('10 / 0'), /Divisão por zero/);
  assert.throws(() => evaluate('process.exit(1)'));
  assert.throws(() => evaluate('15% of 200'));
  assert.throws(() => evaluate('2 +'), /Expressão incompleta/);
  assert.throws(() => evaluate(''), /expressão/i);
});

test('http: bloqueia URLs inseguras', () => {
  assert.throws(() => assertSafeUrl('http://example.com'), /HTTPS/);
  assert.throws(() => assertSafeUrl('https://localhost/x'), /privado/);
  assert.throws(() => assertSafeUrl('https://127.0.0.1/x'), /privado/);
  assert.throws(() => assertSafeUrl('https://10.0.0.5/x'), /privado/);
  assert.throws(() => assertSafeUrl('https://192.168.1.1/x'), /privado/);
  assert.throws(() => assertSafeUrl('https://user:pass@api.github.com'), /credenciais/);
  assert.equal(assertSafeUrl('https://api.github.com/users/x').hostname, 'api.github.com');
  assert.throws(() => assertSafeUrl('https://evil.com', { allowedHosts: ['api.github.com'] }), /não autorizado/i);
  assert.equal(assertSafeUrl('https://api.github.com/a', { allowedHosts: ['api.github.com'] }).hostname, 'api.github.com');
});

test('http: createContext e truncate', () => {
  const ctx = createContext({ ALLOWED_API_HOSTS: 'api.github.com, example.com' });
  assert.deepEqual(ctx.allowedHosts, ['api.github.com', 'example.com']);
  assert.ok(ctx.now instanceof Date);
  assert.ok(truncate('abcdef', 3).startsWith('abc'));
});

test('providers: sanitizeSchema converte tipos para o formato Gemini', () => {
  const schema = sanitizeSchema({
    type: 'object',
    properties: { city: { type: 'string', description: 'Cidade' }, amount: { type: 'number' } },
    required: ['city'],
  });
  assert.equal(schema.type, 'OBJECT');
  assert.equal(schema.properties.city.type, 'STRING');
  assert.equal(schema.properties.amount.type, 'NUMBER');
  assert.deepEqual(schema.required, ['city']);
});

test('providers: conversão de transcript para Gemini e OpenAI', () => {
  const transcript = [
    { role: 'system', content: 'sys' },
    { role: 'user', content: 'oi' },
    { role: 'assistant', content: '', toolCalls: [{ id: 'c1', name: 'calculate', args: { expression: '2+2' } }] },
    { role: 'tool', callId: 'c1', name: 'calculate', content: '{"ok":true,"data":{"result":4}}' },
  ];
  const gemini = toGeminiContents(transcript);
  assert.equal(gemini.length, 3);
  assert.equal(gemini[1].parts[0].functionCall.name, 'calculate');
  assert.equal(gemini[2].parts[0].functionResponse.name, 'calculate');
  assert.equal(gemini[2].parts[0].functionResponse.response.ok, true);

  const openai = toOpenAIMessages(transcript);
  assert.equal(openai[0].role, 'system');
  assert.equal(openai[2].tool_calls[0].id, 'c1');
  assert.equal(openai[3].role, 'tool');
  assert.equal(openai[3].tool_call_id, 'c1');

  const tools = buildGeminiTools([{ name: 'calculate', description: 'd', parameters: { type: 'object', properties: { expression: { type: 'string' } }, required: ['expression'] } }]);
  assert.equal(tools[0].functionDeclarations[0].parameters.type, 'OBJECT');
});

test('providers: resolveConfig escolhe provedor ou modo demo', () => {
  assert.equal(resolveConfig({}), null);
  assert.equal(resolveConfig({ GEMINI_API_KEY: 'x', LLM_PROVIDER: 'demo' }), null);
  assert.equal(resolveConfig({ GEMINI_API_KEY: 'x' }).kind, 'gemini');
  assert.equal(resolveConfig({ GROQ_API_KEY: 'x' }).name, 'Groq');
  assert.equal(resolveConfig({ OPENROUTER_API_KEY: 'x' }).model, 'openrouter/free');
});

test('tools: apenas 8 ferramentas gratuitas sem configuração extra', () => {
  const tools = getAvailableTools({});
  assert.equal(tools.length, 8);
  assert.ok(tools.some((tool) => tool.name === 'get_weather'));
  assert.ok(!tools.some((tool) => tool.name === 'notion_create_page'));
  assert.equal(getAvailableTools({ NOTION_TOKEN: 't', NOTION_PARENT_PAGE_ID: 'p', AGENT_WEBHOOK_URL: 'https://hook.example.com/x', ALLOWED_API_HOSTS: 'api.github.com' }).length, 11);
});

test('tools: runTool valida parâmetros e executa', async () => {
  const ctx = createContext({});
  const ok = await runTool('calculate', { expression: '6 * 7' }, ctx);
  assert.equal(ok.ok, true);
  assert.equal(ok.data.result, 42);
  const missing = await runTool('get_weather', {}, ctx);
  assert.equal(missing.ok, false);
  assert.match(missing.error, /obrigatório/);
  const unknown = await runTool('inexistente', {}, ctx);
  assert.equal(unknown.ok, false);
  const disabled = await runTool('trigger_webhook', { event: 'x', title: 'y' }, ctx);
  assert.equal(disabled.ok, false);
  assert.match(disabled.error, /desativada/);
  assert.equal(findTool('calculate').label, 'Calculadora');
});

test('agent: reconhecimento de intenção no modo demo', () => {
  assert.equal(extractExpression('Calcule (1200 * 1.15) / 3'), '(1200*1.15)/3');
  assert.equal(extractExpression('qual o clima em Ribeirão Preto'), null);
  const weather = buildDemoPlan('Qual é o clima em Ribeirão Preto?');
  assert.equal(weather[0].name, 'get_weather');
  assert.match(weather[0].args.city, /Ribeirão Preto/);
  const exchange = buildDemoPlan('Quanto está 100 dólares em reais?');
  assert.equal(exchange[0].name, 'get_exchange_rate');
  assert.equal(exchange[0].args.amount, 100);
  const plan = buildDemoPlan('Crie um plano de tarefas para automatizar relatórios');
  assert.equal(plan[0].name, 'create_task_plan');
});

test('agent: modo demo chama API externa real (mock) e responde', async () => {
  const fetchImpl = mockFetch((url) => {
    if (url.includes('geocoding-api.open-meteo.com')) {
      return { results: [{ name: 'Ribeirão Preto', country: 'Brazil', latitude: -21.17, longitude: -47.81 }] };
    }
    if (url.includes('api.open-meteo.com')) {
      return {
        current: { temperature_2m: 28.4, apparent_temperature: 30, relative_humidity_2m: 45, wind_speed_10m: 12, weather_code: 1, precipitation: 0 },
        daily: { temperature_2m_max: [32], temperature_2m_min: [20] },
      };
    }
    return {};
  });
  const ctx = createContext({}, { fetchImpl });
  const { events, emit } = collectEvents();
  await runAgent({ message: 'Qual é o clima em Ribeirão Preto?', env: {}, ctx, emit });

  assert.equal(events[0].type, 'meta');
  assert.equal(events[0].mode, 'demo');
  assert.ok(events.some((event) => event.type === 'tool_start' && event.name === 'get_weather'));
  const toolEnd = events.find((event) => event.type === 'tool_end');
  assert.equal(toolEnd.ok, true);
  assert.equal(toolEnd.result.data.temperature_c, 28.4);
  const answer = events.find((event) => event.type === 'answer');
  assert.match(answer.text, /28\.4°C/);
  assert.match(answer.text, /Modo demo/);
});

test('agent: modo demo sem intenção mostra ajuda', async () => {
  const { events, emit } = collectEvents();
  await runAgent({ message: 'Olá, tudo bem?', env: {}, ctx: createContext({}), emit });
  const answer = events.find((event) => event.type === 'answer');
  assert.match(answer.text, /ATLAS/);
  assert.ok(!events.some((event) => event.type === 'tool_start'));
});

test('agent: loop com provedor Gemini (mock) executa ferramenta e responde', async () => {
  let generateCalls = 0;
  const fetchImpl = mockFetch((url, options) => {
    if (url.includes('/models?')) return { models: [] }; // descoberta de modelos
    if (url.includes(':generateContent')) {
      generateCalls += 1;
      if (generateCalls === 1) {
        return { candidates: [{ content: { parts: [{ text: 'Vou calcular.' }, { functionCall: { name: 'calculate', args: { expression: '7*6' } } }] }, finishReason: 'STOP' }] };
      }
      return { candidates: [{ content: { parts: [{ text: 'O resultado é 42.' }] }, finishReason: 'STOP' }] };
    }
    throw new Error(`URL inesperada: ${url}`);
  });
  const env = { GEMINI_API_KEY: 'fake-key', GEMINI_MODEL: 'gemini-2.5-flash' };
  const ctx = createContext(env, { fetchImpl });
  const { events, emit } = collectEvents();
  await runAgent({ message: 'Quanto é 7 vezes 6?', env, ctx, emit });

  assert.equal(events[0].mode, 'ai');
  assert.ok(events.some((event) => event.type === 'tool_end' && event.result.data.result === 42));
  const answer = events.find((event) => event.type === 'answer');
  assert.equal(answer.text, 'O resultado é 42.');
  assert.equal(generateCalls, 2);
});
