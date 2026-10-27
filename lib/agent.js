'use strict';

/**
 * Loop do agente (ReAct simplificado):
 *   modelo -> ferramentas -> observacoes -> modelo -> resposta final
 * Sem chave de IA, entra em MODO DEMO: as mesmas ferramentas reais sao
 * acionadas por reconhecimento de intencao, sem custo e sem cadastro.
 */

const { createContext, truncate } = require('./http');
const { getAvailableTools, toProviderTools, findTool, runTool, summarize } = require('./tools');
const { createProvider } = require('./providers');

const MAX_STEPS = 6;
const MAX_HISTORY = 20;
const MAX_MESSAGE = 4000;

function systemPrompt(now) {
  let today;
  try {
    today = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeZone: 'America/Sao_Paulo' }).format(now);
  } catch {
    today = now.toISOString();
  }
  return [
    'Você é o ATLAS, um agente de IA autônomo que automatiza tarefas usando ferramentas externas.',
    `Data de hoje: ${today} (fuso America/Sao_Paulo).`,
    '',
    'REGRAS:',
    '1. Responda sempre em português do Brasil, em Markdown, de forma clara e objetiva.',
    '2. Para dados em tempo real (clima, câmbio, data, perfis, pesquisas) e para qualquer conta, USE as ferramentas. Nunca invente valores.',
    '3. Se uma ferramenta falhar, explique o motivo e sugira uma alternativa. Não finja que executou.',
    '4. Para ações externas (criar página no Notion, disparar webhook), só execute quando o pedido do usuário for explícito; se faltar informação, pergunte antes.',
    '5. Você pode usar várias ferramentas em sequência. Depois de receber os resultados, produza a resposta final com os dados reais.',
    '6. Não inclua chaves de API, tokens ou detalhes internos na resposta.',
    '7. Seja breve: no máximo ~250 palavras, salvo quando o usuário pedir detalhamento.',
  ].join('\n');
}

function helpText(tools) {
  const examples = [
    '🌤️ "Qual é o clima em Ribeirão Preto?"',
    '💱 "Quanto está 100 dólares em reais hoje?"',
    '🧮 "Calcule (1200 * 1.15) / 3"',
    '📚 "Pesquise na Wikipédia sobre inteligência artificial"',
    '🐙 "Mostre o perfil do GitHub de torvalds"',
    '🗂️ "Crie um plano de tarefas para automatizar meu relatório semanal"',
  ];
  const optional = tools.filter((tool) => ['notion_create_page', 'trigger_webhook', 'http_get_json'].includes(tool.name));
  return [
    'Olá! Eu sou o **ATLAS**, um agente que usa ferramentas externas reais para automatizar tarefas.',
    '',
    '**O que posso fazer agora:**',
    ...examples,
    '',
    optional.length
      ? `**Integrações extras ativas:** ${optional.map((t) => t.label).join(', ')}.`
      : '**Integrações extras:** configure `NOTION_TOKEN`, `AGENT_WEBHOOK_URL` ou `ALLOWED_API_HOSTS` para liberar Notion, webhooks e APIs genéricas.',
    '',
    '> 🔧 **Modo demo** (sem chave de IA): eu reconheço a intenção e chamo as ferramentas reais. Para respostas com linguagem natural completa, adicione uma chave gratuita do Gemini, Groq ou OpenRouter no painel da Vercel.',
  ].join('\n');
}

function truncateJson(value, max = 12000) {
  try {
    return JSON.parse(truncate(JSON.stringify(value), max).replace(/ …\(truncado\)$/u, ''));
  } catch {
    return { note: 'Resultado muito grande para exibir.', preview: truncate(JSON.stringify(value), max) };
  }
}

// ---------------------------------------------------------------------------
// Demo: reconhecimento de intencao
// ---------------------------------------------------------------------------

function extractCity(message) {
  const patterns = [
    /(?:clima|tempo|temperatura|previs[aã]o)\s+(?:em|para|de|do|da|na|no)\s+([^?.!,]+)/i,
    /(?:em|para)\s+([A-ZÀ-Ú][^?.!,]+)/,
  ];
  for (const pattern of patterns) {
    const match = message.match(pattern);
    if (match && match[1]) return match[1].trim().replace(/\s+(hoje|agora|amanh[aã]|aqui)$/i, '').slice(0, 80);
  }
  return 'Ribeirão Preto';
}

function extractExpression(message) {
  let text = message
    .replace(/^(?:calcule|calcula|quanto é|quanto e|resolve|qual o resultado de|faça|faca)\s*/i, '')
    .replace(/[?!=]/g, ' ')
    .replace(/,/g, '.')
    .replace(/\b(?:de|do|da|em|para|por)\b/gi, ' ')
    .replace(/[^0-9+\-*/%^().a-zA-Z\s]/g, ' ')
    .trim();
  text = text.replace(/\s+/g, '');
  if (!/\d/.test(text) || !/[+\-*/%^]/.test(text)) return null;
  return text.slice(0, 200);
}

function extractQuery(message) {
  return message
    .replace(/^(?:pesquise|pesquisa|busque|procure|o que [ée]|quem [ée]|quem foi|me fale sobre|fale sobre|sobre)\s*/gi, '')
    .replace(/\b(?:na|no|da|do|em)\s+wikip[eé]dia\b/gi, '')
    .replace(/\bwikip[eé]dia\b/gi, '')
    .replace(/^(?:sobre|a respeito de|de|do|da|no|na|em|o|a|os|as)\s+/gi, '')
    .replace(/[?.!]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120) || message.slice(0, 120);
}

function extractUsername(message) {
  const at = message.match(/@([a-zA-Z0-9-]{2,40})/);
  if (at) return at[1];
  const ignore = new Set(['github', 'perfil', 'usuario', 'usuário', 'repositorio', 'repositório', 'conta', 'pagina', 'página', 'usuarios']);
  const candidates = [...message.matchAll(/\b(?:de|do|da|para|perfil|usu[aá]rio)\s+([a-zA-Z0-9-]{2,40})/gi)]
    .map((match) => match[1])
    .filter((value) => !ignore.has(value.toLowerCase()));
  return candidates.length ? candidates[candidates.length - 1] : 'torvalds';
}

function buildDemoPlan(message) {
  const text = message.toLowerCase();
  const plan = [];
  const push = (name, args) => plan.push({ name, args });

  if (/que horas|data de hoje|dia da semana|que dia é/i.test(text)) push('get_datetime', { timezone: 'America/Sao_Paulo' });
  if (/clima|temperatura|previs[aã]o|tempo em|weather/i.test(text)) push('get_weather', { city: extractCity(message) });
  if (/d[oó]lar|dolar|c[aâ]mbio|euro|libra|converter moeda/i.test(text)) {
    const from = /euro/i.test(text) ? 'EUR' : /libra/i.test(text) ? 'GBP' : 'USD';
    const amountMatch = message.match(/(\d+(?:[.,]\d+)?)/);
    push('get_exchange_rate', { from, to: 'BRL', amount: amountMatch ? Number(amountMatch[1].replace(',', '.')) : 1 });
  }
  if (/wikip[eé]dia|pesquise|o que é|quem [ée]|quem foi/i.test(text)) push('search_wikipedia', { query: extractQuery(message), language: 'pt' });
  if (/github/i.test(text)) {
    if (/reposit[oó]rio|repo|biblioteca|buscar/i.test(text)) push('search_github_repos', { query: extractQuery(message).replace(/github/gi, '').trim() || 'ai agent' });
    else push('get_github_profile', { username: extractUsername(message) });
  }
  if (/plano|planejar|tarefas|checklist|cronograma|automatizar|passo a passo/i.test(text)) push('create_task_plan', { goal: message });
  if (!plan.length) {
    const expression = extractExpression(message);
    if (expression) push('calculate', { expression });
  }
  if (plan.length && /calcule|quanto é|conta/i.test(text)) {
    const expression = extractExpression(message);
    if (expression && !plan.some((item) => item.name === 'calculate')) push('calculate', { expression });
  }
  return plan.slice(0, 4);
}

async function runDemo({ message, context, tools, emit, started }) {
  const plan = buildDemoPlan(message);
  if (!plan.length) {
    emit({ type: 'answer', text: helpText(tools) });
    emit({ type: 'done', usage: { steps: 0, toolCalls: 0, durationMs: Date.now() - started, mode: 'demo' } });
    return;
  }

  const summaries = [];
  for (const item of plan) {
    const tool = findTool(item.name);
    if (!tool || !tools.some((candidate) => candidate.name === item.name)) continue;
    const id = `demo_${Math.random().toString(36).slice(2, 9)}`;
    emit({ type: 'tool_start', id, name: item.name, label: tool.label, args: item.args });
    const result = await runTool(item.name, item.args, context);
    emit({ type: 'tool_end', id, name: item.name, ok: result.ok, result: truncateJson(result, 4000), durationMs: result.duration_ms || 0 });
    summaries.push(summarize(item.name, result));
  }

  const header = `**Modo demo** — executei ${summaries.length} ferramenta(s) real(is) para responder. A interpretação é por palavras‑chave; com uma chave gratuita de IA o raciocínio fica completo.`;
  const footer = '> 💡 Para habilitar IA real: adicione `GEMINI_API_KEY`, `GROQ_API_KEY` ou `OPENROUTER_API_KEY` nas variáveis de ambiente do projeto na Vercel.';
  emit({ type: 'answer', text: [header, '', ...summaries, '', footer].join('\n') });
  emit({ type: 'done', usage: { steps: 1, toolCalls: summaries.length, durationMs: Date.now() - started, mode: 'demo' } });
}

// ---------------------------------------------------------------------------
// Loop principal
// ---------------------------------------------------------------------------

async function runAgent(options = {}) {
  const {
    message = '',
    history = [],
    env = process.env,
    emit = () => {},
    ctx: providedContext,
  } = options;

  const started = Date.now();
  const context = providedContext || createContext(env);
  const tools = getAvailableTools(env);
  const provider = createProvider(env, context);
  const mode = provider ? 'ai' : 'demo';

  emit({
    type: 'meta',
    mode,
    provider: provider ? provider.describe() : { name: 'Modo demo (sem chave)', model: null, mode: 'demo' },
    tools: tools.map((tool) => ({ name: tool.name, label: tool.label })),
    maxSteps: MAX_STEPS,
  });

  const cleanMessage = String(message == null ? '' : message).trim().slice(0, MAX_MESSAGE);
  if (!cleanMessage) {
    emit({ type: 'error', message: 'Envie uma mensagem para o agente.' });
    emit({ type: 'done', usage: { steps: 0, toolCalls: 0, durationMs: Date.now() - started, mode } });
    return;
  }

  const cleanHistory = (Array.isArray(history) ? history : [])
    .slice(-MAX_HISTORY)
    .filter((item) => item && (item.role === 'user' || item.role === 'assistant') && typeof item.content === 'string')
    .map((item) => ({ role: item.role, content: item.content.slice(0, MAX_MESSAGE) }));

  if (!provider) {
    await runDemo({ message: cleanMessage, context, tools, emit, started });
    return;
  }

  const transcript = [
    { role: 'system', content: systemPrompt(context.now) },
    ...cleanHistory,
    { role: 'user', content: cleanMessage },
  ];

  let steps = 0;
  let toolCalls = 0;
  let lastContent = '';
  const providerTools = toProviderTools(tools);

  try {
    for (let index = 0; index < MAX_STEPS; index += 1) {
      steps += 1;
      emit({ type: 'status', text: `Passo ${steps}: consultando ${provider.name}…` });
      const response = await provider.chat(transcript, providerTools);

      if (response.content) {
        lastContent = response.content;
        emit({ type: 'note', text: response.content });
      }
      if (!response.toolCalls.length) {
        emit({ type: 'answer', text: response.content || 'Não consegui gerar uma resposta. Tente reformular o pedido.' });
        emit({ type: 'done', usage: { steps, toolCalls, durationMs: Date.now() - started, mode, model: response.model } });
        return;
      }

      transcript.push({ role: 'assistant', content: response.content || '', toolCalls: response.toolCalls });
      emit({ type: 'status', text: `Executando ${response.toolCalls.length} ferramenta(s) externa(s)…` });

      for (const call of response.toolCalls) {
        const id = call.id || `call_${Math.random().toString(36).slice(2, 9)}`;
        const tool = findTool(call.name);
        emit({ type: 'tool_start', id, name: call.name, label: tool ? tool.label : call.name, args: call.args });
        const result = await runTool(call.name, call.args, context);
        emit({
          type: 'tool_end', id, name: call.name, ok: result.ok,
          result: truncateJson(result, 4000), durationMs: result.duration_ms || 0,
        });
        transcript.push({ role: 'tool', callId: id, name: call.name, content: JSON.stringify(truncateJson(result, 12000)) });
        toolCalls += 1;
      }
    }

    const fallback = lastContent
      ? `${lastContent}\n\n> ⚠️ Atingi o limite de ${MAX_STEPS} etapas. Se precisar, divida a tarefa em pedidos menores.`
      : `Atingi o limite de ${MAX_STEPS} etapas sem concluir. Tente dividir a tarefa em pedidos menores.`;
    emit({ type: 'answer', text: fallback });
    emit({ type: 'done', usage: { steps, toolCalls, durationMs: Date.now() - started, mode, truncated: true } });
  } catch (error) {
    const errorMessage = truncate(error && error.message ? error.message : String(error), 600);
    emit({ type: 'error', message: errorMessage, fallback: true });
    emit({ type: 'status', text: 'Modelo indisponível — tentando resolver com as ferramentas no modo demo…' });
    await runDemo({ message: cleanMessage, context, tools, emit, started });
  }
}

module.exports = {
  MAX_STEPS,
  MAX_HISTORY,
  MAX_MESSAGE,
  systemPrompt,
  helpText,
  buildDemoPlan,
  extractExpression,
  truncateJson,
  runAgent,
};
