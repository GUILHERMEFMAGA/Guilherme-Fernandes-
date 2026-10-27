'use strict';

/**
 * Ferramentas externas do Atlas.
 * Cada ferramenta declara um JSON Schema neutro (convertido para Gemini / OpenAI
 * em providers.js) e uma funcao run(args, ctx).
 * As 8 primeiras funcionam sem nenhuma chave. As 3 ultimas sao opcionais.
 */

const { evaluate } = require('./calculator');
const { truncate, assertSafeUrl } = require('./http');

const WMO_CODES = {
  0: 'Céu limpo', 1: 'Predominantemente limpo', 2: 'Parcialmente nublado', 3: 'Nublado',
  45: 'Neblina', 48: 'Neblina com geada', 51: 'Garoa leve', 53: 'Garoa', 55: 'Garoa intensa',
  61: 'Chuva leve', 63: 'Chuva', 65: 'Chuva forte', 71: 'Neve leve', 73: 'Neve', 75: 'Neve forte',
  80: 'Pancadas leves', 81: 'Pancadas de chuva', 82: 'Pancadas fortes', 85: 'Neve em pancadas',
  86: 'Neve forte em pancadas', 95: 'Tempestade', 96: 'Tempestade com granizo', 99: 'Tempestade forte',
};

function str(value, fallback = '', max = 500) {
  return String(value == null ? fallback : value).trim().slice(0, max);
}

function number(value, fallback = 1) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function cleanObject(value, depth = 0) {
  if (depth > 4 || value == null) return null;
  if (Array.isArray(value)) return value.slice(0, 30).map((item) => cleanObject(item, depth + 1));
  if (typeof value === 'object') {
    const out = {};
    for (const [key, item] of Object.entries(value).slice(0, 40)) {
      out[str(key, '', 60)] = cleanObject(item, depth + 1);
    }
    return out;
  }
  if (typeof value === 'string') return value.slice(0, 2000);
  if (typeof value === 'number' || typeof value === 'boolean') return value;
  return String(value).slice(0, 200);
}

const TOOLS = [
  {
    name: 'calculate',
    label: 'Calculadora',
    description: 'Avalia expressões matemáticas com precisão. Use para qualquer conta, porcentagem, raiz ou potência. Ex.: "(1200 * 1.15) / 3".',
    parameters: {
      type: 'object',
      properties: {
        expression: { type: 'string', description: 'Expressão matemática, ex.: "2 + 2 * 10" ou "sqrt(144) + 15%"' },
      },
      required: ['expression'],
    },
    available: () => true,
    async run(args) {
      return evaluate(str(args.expression, '', 200));
    },
  },

  {
    name: 'get_datetime',
    label: 'Data e hora',
    description: 'Retorna a data/hora atual em qualquer fuso horário. Use quando precisar saber o dia de hoje, a hora ou o dia da semana.',
    parameters: {
      type: 'object',
      properties: {
        timezone: { type: 'string', description: 'Fuso horário IANA, ex.: "America/Sao_Paulo" (padrão), "UTC", "Europe/Lisbon".' },
      },
      required: [],
    },
    available: () => true,
    async run(args, ctx) {
      const timezone = str(args.timezone, 'America/Sao_Paulo', 80) || 'America/Sao_Paulo';
      let dateText;
      let timeText;
      let weekday;
      try {
        dateText = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeZone: timezone }).format(ctx.now);
        timeText = new Intl.DateTimeFormat('pt-BR', { timeStyle: 'medium', timeZone: timezone }).format(ctx.now);
        weekday = new Intl.DateTimeFormat('pt-BR', { weekday: 'long', timeZone: timezone }).format(ctx.now);
      } catch {
        throw new Error(`Fuso horário inválido: ${timezone}`);
      }
      return { timezone, date: dateText, time: timeText, weekday, iso: ctx.now.toISOString(), unix_ms: ctx.now.getTime() };
    },
  },

  {
    name: 'get_weather',
    label: 'Clima (Open-Meteo)',
    description: 'Consulta a temperatura e as condições climáticas atuais de uma cidade, sem chave de API. Use para perguntas sobre clima, tempo ou previsão.',
    parameters: {
      type: 'object',
      properties: {
        city: { type: 'string', description: 'Nome da cidade, ex.: "Ribeirão Preto" ou "Lisboa".' },
      },
      required: ['city'],
    },
    available: () => true,
    async run(args, ctx) {
      const city = str(args.city, '', 100);
      if (!city) throw new Error('Informe a cidade.');
      const geo = await ctx.fetchJson(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pt&format=json`
      );
      const place = geo && Array.isArray(geo.results) ? geo.results[0] : null;
      if (!place) throw new Error(`Cidade não encontrada: "${city}". Tente o nome em inglês ou inclua o país.`);
      const forecast = await ctx.fetchJson(
        `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}` +
          '&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m' +
          '&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1'
      );
      const current = forecast.current || {};
      const daily = forecast.daily || {};
      const code = Number(current.weather_code);
      return {
        city: place.name,
        country: place.country || null,
        region: place.admin1 || null,
        latitude: place.latitude,
        longitude: place.longitude,
        temperature_c: current.temperature_2m,
        feels_like_c: current.apparent_temperature,
        humidity_percent: current.relative_humidity_2m,
        wind_kmh: current.wind_speed_10m,
        precipitation_mm: current.precipitation,
        condition: WMO_CODES[code] || `Código WMO ${code || 'desconhecido'}`,
        daily_max_c: Array.isArray(daily.temperature_2m_max) ? daily.temperature_2m_max[0] : null,
        daily_min_c: Array.isArray(daily.temperature_2m_min) ? daily.temperature_2m_min[0] : null,
        observed_at: current.time || null,
        source: 'Open-Meteo (gratuito, sem chave)',
      };
    },
  },

  {
    name: 'get_exchange_rate',
    label: 'Câmbio (Frankfurter)',
    description: 'Consulta taxas de câmbio reais publicadas pelo Banco Central Europeu e converte valores. Use para dólar, euro, libra, real etc.',
    parameters: {
      type: 'object',
      properties: {
        from: { type: 'string', description: 'Moeda de origem, código ISO de 3 letras. Padrão: USD.' },
        to: { type: 'string', description: 'Moeda de destino, código ISO de 3 letras. Padrão: BRL.' },
        amount: { type: 'number', description: 'Valor a converter. Padrão: 1.' },
      },
      required: [],
    },
    available: () => true,
    async run(args, ctx) {
      const from = str(args.from, 'USD', 6).toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3) || 'USD';
      const to = str(args.to, 'BRL', 6).toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3) || 'BRL';
      const amount = number(args.amount, 1);
      let data;
      try {
        data = await ctx.fetchJson(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`);
      } catch {
        data = await ctx.fetchJson(`https://api.frankfurter.app/latest?from=${from}&to=${to}`);
      }
      const rate = data && data.rates ? Number(data.rates[to]) : NaN;
      if (!Number.isFinite(rate)) throw new Error(`Taxa de câmbio indisponível para ${from} → ${to}.`);
      return {
        from, to, amount, rate,
        converted: Math.round(amount * rate * 10000) / 10000,
        date: data.date || null,
        source: 'Frankfurter / Banco Central Europeu',
      };
    },
  },

  {
    name: 'search_wikipedia',
    label: 'Wikipédia',
    description: 'Pesquisa artigos na Wikipédia e retorna títulos, resumos e links. Use para informações gerais, históricas ou enciclopédicas.',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Termo de pesquisa.' },
        language: { type: 'string', description: 'Idioma da Wikipédia: "pt" (padrão), "en", "es"...' },
      },
      required: ['query'],
    },
    available: () => true,
    async run(args, ctx) {
      const query = str(args.query, '', 120);
      if (!query) throw new Error('Informe o termo de pesquisa.');
      const language = /^[a-z]{2,3}$/i.test(str(args.language, 'pt', 10)) ? str(args.language, 'pt', 10).toLowerCase() : 'pt';
      const search = await ctx.fetchJson(
        `https://${language}.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&utf8=1&srlimit=3`
      );
      const hits = (search && search.query && Array.isArray(search.query.search) ? search.query.search : []).slice(0, 3);
      if (!hits.length) return { query, language, results: [], note: 'Nenhum artigo encontrado.' };
      const results = [];
      for (const hit of hits) {
        const fallbackUrl = `https://${language}.wikipedia.org/wiki/${encodeURIComponent(hit.title.replace(/ /g, '_'))}`;
        try {
          const summary = await ctx.fetchJson(
            `https://${language}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(hit.title)}`
          );
          results.push({
            title: summary.title || hit.title,
            summary: truncate(summary.extract || '', 700),
            url: (summary.content_urls && summary.content_urls.desktop && summary.content_urls.desktop.page) || fallbackUrl,
          });
        } catch {
          results.push({ title: hit.title, summary: '', url: fallbackUrl });
        }
      }
      return { query, language, results, source: `Wikipédia (${language})` };
    },
  },

  {
    name: 'get_github_profile',
    label: 'Perfil GitHub',
    description: 'Consulta o perfil público de um usuário do GitHub (bio, repositórios, seguidores, localização).',
    parameters: {
      type: 'object',
      properties: {
        username: { type: 'string', description: 'Nome de usuário do GitHub, ex.: "torvalds".' },
      },
      required: ['username'],
    },
    available: () => true,
    async run(args, ctx) {
      const username = str(args.username, '', 60).replace(/[^a-zA-Z0-9-]/g, '');
      if (!username) throw new Error('Informe o usuário do GitHub.');
      const data = await ctx.fetchJson(`https://api.github.com/users/${encodeURIComponent(username)}`, {
        headers: { Accept: 'application/vnd.github+json' },
      });
      return {
        username: data.login, name: data.name, bio: data.bio, company: data.company,
        location: data.location, blog: data.blog, followers: data.followers,
        following: data.following, public_repos: data.public_repos, public_gists: data.public_gists,
        created_at: data.created_at, url: data.html_url, source: 'GitHub REST API (pública)',
      };
    },
  },

  {
    name: 'search_github_repos',
    label: 'Buscar repositórios',
    description: 'Busca repositórios públicos no GitHub ordenados por estrelas. Útil para encontrar bibliotecas e exemplos de código.',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Termo de busca, ex.: "agent ai typescript" ou "language:python stars:>1000".' },
      },
      required: ['query'],
    },
    available: () => true,
    async run(args, ctx) {
      const query = str(args.query, '', 120);
      if (!query) throw new Error('Informe o termo de busca.');
      const data = await ctx.fetchJson(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=5`,
        { headers: { Accept: 'application/vnd.github+json' } }
      );
      return {
        query,
        total_count: data.total_count || 0,
        repos: (Array.isArray(data.items) ? data.items : []).map((repo) => ({
          name: repo.name, full_name: repo.full_name, stars: repo.stargazers_count,
          language: repo.language, description: truncate(repo.description || '', 220), url: repo.html_url,
        })),
        source: 'GitHub Search API (pública)',
      };
    },
  },

  {
    name: 'create_task_plan',
    label: 'Plano de tarefas',
    description: 'Transforma um objetivo em um plano de execução estruturado, com etapas numeradas, checklist e pontos de automação. Use quando o usuário pedir para planejar, organizar ou automatizar algo.',
    parameters: {
      type: 'object',
      properties: {
        goal: { type: 'string', description: 'Objetivo a ser decomposto em tarefas.' },
      },
      required: ['goal'],
    },
    available: () => true,
    async run(args, ctx) {
      const goal = str(args.goal, '', 600);
      if (!goal) throw new Error('Informe o objetivo do plano.');
      const steps = [
        { title: 'Definir o objetivo', detail: `Escrever em uma frase o resultado esperado e o critério de sucesso para: ${goal}.` },
        { title: 'Levantar informações', detail: 'Coletar dados confiáveis com as ferramentas de pesquisa (Wikipédia, GitHub, APIs públicas) antes de agir.' },
        { title: 'Mapear recursos e acessos', detail: 'Listar pessoas, contas, chaves e ferramentas necessárias; verificar o que já está configurado no agente.' },
        { title: 'Executar em ciclos curtos', detail: 'Quebrar o trabalho em tarefas de 30–60 minutos, com responsável e prazo para cada uma.' },
        { title: 'Automatizar gatilhos', detail: 'Configurar webhook, Notion ou integrações para disparar tarefas repetitivas automaticamente.' },
        { title: 'Validar e documentar', detail: 'Testar cada etapa, medir o resultado, registrar decisões e agendar revisão periódica.' },
      ].map((step, index) => ({ order: index + 1, ...step, status: 'pendente' }));
      return {
        goal,
        steps,
        checklist: steps.map((step) => `[ ] ${step.order}. ${step.title}`),
        estimated_steps: steps.length,
        generated_at: ctx.now.toISOString(),
        note: 'Plano gerado localmente pelo agente — edite conforme a sua realidade.',
      };
    },
  },

  {
    name: 'notion_create_page',
    label: 'Criar página no Notion',
    description: 'Cria uma página (ou item de banco de dados) no Notion com um título e conteúdo. Use para registrar tarefas, anotações e relatórios. Requer NOTION_TOKEN.',
    parameters: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Título da página.' },
        content: { type: 'string', description: 'Conteúdo em texto simples (será dividido em parágrafos).' },
      },
      required: ['title'],
    },
    available: (env) => Boolean(env.NOTION_TOKEN && (env.NOTION_DATABASE_ID || env.NOTION_PARENT_PAGE_ID)),
    async run(args, ctx) {
      const env = ctx.env;
      const title = str(args.title, 'Tarefa do Atlas', 200);
      const content = str(args.content, '', 4000);
      const headers = { Authorization: `Bearer ${env.NOTION_TOKEN}`, 'Notion-Version': '2022-06-28' };
      let parent;
      let properties;
      if (env.NOTION_DATABASE_ID) {
        parent = { type: 'database_id', database_id: env.NOTION_DATABASE_ID };
        properties = { Name: { title: [{ text: { content: title } }] } };
      } else {
        parent = { type: 'page_id', page_id: env.NOTION_PARENT_PAGE_ID };
        properties = { title: { title: [{ text: { content: title } }] } };
      }
      const payload = { parent, properties };
      if (content && !env.NOTION_DATABASE_ID) {
        payload.children = (content.match(/[\s\S]{1,1800}/g) || []).slice(0, 5).map((chunk) => ({
          object: 'block', type: 'paragraph',
          paragraph: { rich_text: [{ type: 'text', text: { content: chunk } }] },
        }));
      }
      const data = await ctx.postJson('https://api.notion.com/v1/pages', payload, { headers });
      return { id: data.id, url: data.url, title, source: 'Notion API' };
    },
  },

  {
    name: 'trigger_webhook',
    label: 'Disparar webhook',
    description: 'Envia um evento JSON para o webhook configurado em AGENT_WEBHOOK_URL. Use para iniciar automações em n8n, Make, Zapier, IFTTT ou qualquer serviço externo.',
    parameters: {
      type: 'object',
      properties: {
        event: { type: 'string', description: 'Nome do evento, ex.: "task.created" ou "report.ready".' },
        title: { type: 'string', description: 'Título/resumo do que deve ser automatizado.' },
        payload: { type: 'object', description: 'Dados adicionais em formato de objeto (opcional).' },
      },
      required: ['event', 'title'],
    },
    available: (env) => Boolean(env.AGENT_WEBHOOK_URL),
    async run(args, ctx) {
      const url = str(ctx.env.AGENT_WEBHOOK_URL, '', 500);
      assertSafeUrl(url);
      const body = {
        source: 'atlas-agent',
        event: str(args.event, 'task.created', 80),
        title: str(args.title, '', 300),
        data: cleanObject(args.payload || {}),
        created_at: ctx.now.toISOString(),
      };
      const response = await ctx.postJson(url, body);
      return { ok: true, event: body.event, title: body.title, response: truncate(JSON.stringify(response), 500), source: 'Webhook configurado' };
    },
  },

  {
    name: 'http_get_json',
    label: 'API externa (GET)',
    description: 'Faz uma requisição GET para uma API JSON pública e retorna os dados. Só funciona para hosts listados em ALLOWED_API_HOSTS. Use para consultar qualquer API REST sem chave.',
    parameters: {
      type: 'object',
      properties: {
        url: { type: 'string', description: 'URL HTTPS completa de uma API pública permitida.' },
      },
      required: ['url'],
    },
    available: (env) => Boolean(env.ALLOWED_API_HOSTS),
    async run(args, ctx) {
      const url = str(args.url, '', 600);
      const data = await ctx.fetchJson(url, { allowedHosts: ctx.allowedHosts, maxChars: 40000, timeout: 9000 });
      const serialized = JSON.stringify(data);
      return {
        url,
        data: serialized.length > 12000 ? { note: 'Resposta muito grande; exibindo apenas uma prévia.', preview: serialized.slice(0, 8000) } : data,
      };
    },
  },
];

function getAvailableTools(env = process.env) {
  return TOOLS.filter((tool) => {
    try {
      return Boolean(tool.available(env));
    } catch {
      return false;
    }
  });
}

function toProviderTools(tools) {
  return tools.map((tool) => ({ name: tool.name, description: tool.description, parameters: tool.parameters }));
}

function findTool(name) {
  return TOOLS.find((tool) => tool.name === name);
}

async function runTool(name, args, ctx) {
  const tool = findTool(name);
  if (!tool) return { ok: false, tool: name, error: `Ferramenta desconhecida: ${name}` };
  if (!tool.available(ctx.env)) return { ok: false, tool: name, error: `Ferramenta "${name}" desativada (configure as variáveis de ambiente necessárias).` };

  const input = args && typeof args === 'object' && !Array.isArray(args) ? args : {};
  const required = tool.parameters.required || [];
  for (const field of required) {
    if (input[field] === undefined || input[field] === null || input[field] === '') {
      return { ok: false, tool: name, error: `Parâmetro obrigatório ausente: ${field}` };
    }
  }

  const started = Date.now();
  try {
    const data = await tool.run(input, ctx);
    return { ok: true, tool: name, data, duration_ms: Date.now() - started };
  } catch (error) {
    const raw = str(error && error.message ? error.message : error, 'Erro desconhecido', 400);
    const networkIssue = /fetch failed|network|ENOTFOUND|ECONNREFUSED|EAI_AGAIN|Tempo limite|timed out|UNABLE_TO/i.test(raw);
    const message = networkIssue
      ? `${raw} — falha de rede do servidor. Em execução local alguns domínios podem estar bloqueados; na Vercel as APIs externas respondem normalmente.`
      : raw;
    return { ok: false, tool: name, error: message, duration_ms: Date.now() - started };
  }
}

/** Resumo em linguagem natural usado pelo modo demo. */
function summarize(name, result) {
  if (!result.ok) return `⚠️ **${name}**: ${result.error}`;
  const data = result.data || {};
  switch (name) {
    case 'calculate':
      return `🧮 **Cálculo**: \`${data.expression}\` = **${data.result}**`;
    case 'get_datetime':
      return `🕒 **Data/hora** (${data.timezone}): ${data.weekday}, ${data.date}, ${data.time}.`;
    case 'get_weather':
      return `🌤️ **Clima em ${data.city}${data.country ? '/' + data.country : ''}**: ${data.temperature_c}°C (sensação ${data.feels_like_c}°C), ${data.condition}. Umidade ${data.humidity_percent}%, vento ${data.wind_kmh} km/h. Máx./mín.: ${data.daily_max_c}°C / ${data.daily_min_c}°C. Fonte: ${data.source}.`;
    case 'get_exchange_rate':
      return `💱 **Câmbio**: ${data.amount} ${data.from} = **${data.converted} ${data.to}** (taxa ${data.rate}, em ${data.date || 'data mais recente'}). Fonte: ${data.source}.`;
    case 'search_wikipedia':
      return `📚 **Wikipédia — "${data.query}"**:\n${(data.results || []).map((r) => `• **${r.title}** — ${r.summary || 'sem resumo'} ${r.url}`).join('\n') || 'Nenhum resultado.'}`;
    case 'get_github_profile':
      return `🐙 **GitHub @${data.username}**: ${data.name || 'sem nome'} — ${data.bio || 'sem bio'}. ${data.public_repos} repositórios, ${data.followers} seguidores. ${data.url}`;
    case 'search_github_repos':
      return `🔎 **Repositórios para "${data.query}"** (${data.total_count} no total):\n${(data.repos || []).map((r) => `• ${r.full_name} — ⭐ ${r.stars} — ${r.description || ''}`).join('\n') || 'Nenhum resultado.'}`;
    case 'create_task_plan':
      return `🗂️ **Plano para "${data.goal}"**:\n${(data.steps || []).map((s) => `${s.order}. **${s.title}** — ${s.detail}`).join('\n')}\n\nChecklist:\n${(data.checklist || []).join('\n')}`;
    case 'notion_create_page':
      return `📝 **Página criada no Notion**: [${data.title}](${data.url})`;
    case 'trigger_webhook':
      return `⚡ **Webhook disparado**: \`${data.event}\` — ${data.title}.`;
    case 'http_get_json':
      return `🌐 **API consultada**: \`${data.url}\`\n\`\`\`json\n${truncate(JSON.stringify(data.data, null, 2), 1200)}\n\`\`\``;
    default:
      return `✅ **${name}**: \`\`\`json\n${truncate(JSON.stringify(data, null, 2), 1200)}\n\`\`\``;
  }
}

module.exports = { TOOLS, WMO_CODES, getAvailableTools, toProviderTools, findTool, runTool, summarize, cleanObject };
