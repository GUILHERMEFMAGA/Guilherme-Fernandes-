# Atlas — Agente de IA com ferramentas externas

Um agente de IA **serverless e 100% gratuito** que raciocina, escolhe ferramentas e executa tarefas reais em APIs externas. Roda na Vercel (plano Hobby), usa modelos gratuitos e já vem com interface de chat, streaming de eventos e modo demo que funciona **sem nenhuma chave de API**.

> 🌐 **Deploy:** `https://agente-ia-atlas.vercel.app` (veja a URL real no painel da Vercel)
> 🖥️ **Preview local:** `npm start` → `http://localhost:3000`
> 🧪 **Testes:** `npm test`

---

## O que ele faz

O Atlas recebe um pedido em linguagem natural, decide quais ferramentas usar, chama APIs reais, interpreta os resultados e responde. Exemplos de pedidos:

- "Qual é o clima em Ribeirão Preto e quanto está 100 dólares em reais?" → **2 ferramentas encadeadas**
- "Calcule (1200 * 1.15) / 3" → calculadora segura (sem `eval`)
- "Pesquise na Wikipédia sobre redes neurais e depois crie um plano de estudos" → pesquisa + planejamento
- "Mostre o perfil do GitHub de torvalds" / "busque repositórios de agentes de IA"
- "Crie uma página no Notion com o resumo" / "dispare o webhook de relatório semanal" → automações externas

---

## Arquitetura

```
Navegador (index.html + app.js + styles.css)
        │  POST /api/chat  (SSE: status, tool_start, tool_end, answer, done)
        ▼
api/chat.js ──► lib/agent.js  (loop ReAct, até 6 etapas)
                     │
        ┌────────────┼─────────────────┐
        ▼            ▼                 ▼
lib/providers.js  lib/tools.js    lib/http.js
(Gemini / Groq /  (11 ferramentas, (HTTPS, timeout,
 OpenRouter /      JSON Schema     anti-SSRF, allowlist)
 OpenAI-compat)    neutro)
        │
        ▼
APIs externas gratuitas: Open-Meteo · Frankfurter/BCE · Wikipédia · GitHub ·
Notion · Webhooks (n8n/Make/Zapier) · qualquer API permitida
```

**Pontos de destaque**

- **Zero dependências npm.** Só Node.js ≥ 20 + `fetch` nativo → build instantâneo e sem risco de supply chain.
- **Dois formatos de function calling** implementados direto na REST API: Gemini (`functionDeclarations`/`functionResponse`) e OpenAI-compatible (`tools`/`tool_calls`).
- **Descoberta automática de modelo:** se o modelo configurado não existir mais, o agente consulta `/models` e tenta alternativas.
- **Modo demo:** sem chave de IA, as mesmas ferramentas reais são acionadas por reconhecimento de intenção — ótimo para testar o deploy antes de configurar qualquer conta.
- **Streaming via SSE:** você vê cada ferramenta sendo chamada, com parâmetros e resultado.

---

## Ferramentas

| Ferramenta | O que faz | Chave necessária |
|---|---|---|
| `calculate` | Expressões matemáticas, `%`, potência, funções e constantes | — |
| `get_datetime` | Data/hora/dia da semana em qualquer fuso IANA | — |
| `get_weather` | Clima atual, máx./mín., umidade e vento (Open-Meteo) | — |
| `get_exchange_rate` | Câmbio real do Banco Central Europeu (Frankfurter) | — |
| `search_wikipedia` | Busca + resumo de até 3 artigos | — |
| `get_github_profile` | Perfil público de um usuário | — |
| `search_github_repos` | Repositórios ordenados por estrelas | — |
| `create_task_plan` | Plano estruturado com etapas e checklist | — |
| `notion_create_page` | Cria página/item de database no Notion | `NOTION_TOKEN` + `NOTION_DATABASE_ID` **ou** `NOTION_PARENT_PAGE_ID` |
| `trigger_webhook` | Dispara evento JSON para n8n/Make/Zapier/IFTTT | `AGENT_WEBHOOK_URL` |
| `http_get_json` | GET genérico em APIs JSON públicas | `ALLOWED_API_HOSTS` |

---

## 100% gratuito — como é possível

| Camada | Custo | Observação |
|---|---|---|
| Vercel Hobby | US$ 0/mês | Uso pessoal/não comercial; 1 mi invocações, 100 GB de tráfego e funções até 300 s |
| Código / AI SDK caseiro | US$ 0 | Sem bibliotecas pagas |
| Modelo de IA | US$ 0 | Chave gratuita do Google AI Studio, Groq ou OpenRouter (`:free`) |
| APIs das ferramentas | US$ 0 | Open-Meteo, Frankfurter, Wikipédia, GitHub e Notion pessoal não exigem cartão |
| Domínio | US$ 0 | Use o subdomínio `*.vercel.app` |

**Limites honestos:** cotas diárias de requisições do provedor de IA, rate limits do Hobby e possibilidade de mudança nas políticas de free tier. Grátis não é ilimitado.

### Como conseguir uma chave gratuita de IA

1. **Google Gemini (recomendado):** acesse [aistudio.google.com/apikey](https://aistudio.google.com/apikey), crie uma chave (não pede cartão).
2. **Groq:** [console.groq.com/keys](https://console.groq.com/keys) — modelos abertos rápidos, plano Developer gratuito.
3. **OpenRouter:** [openrouter.ai/keys](https://openrouter.ai/keys) — use modelos com sufixo `:free`.

Depois, no painel da Vercel: **Project → Settings → Environment Variables → Add**, com o nome `GEMINI_API_KEY` (ou `GROQ_API_KEY` / `OPENROUTER_API_KEY`), marque Production + Preview + Development e faça **Redeploy**. O `/api/health` passa a mostrar `"mode": "ai"`.

> Dica: defina também `AGENT_ACCESS_CODE` para proteger o endpoint público e não gastar sua cota gratuita com visitantes anônimos. A interface pede o código no ícone de engrenagem.

---

## Rodando localmente

```bash
git clone https://github.com/GUILHERMEFMAGA/Guilherme-Fernandes-.git
cd Guilherme-Fernandes-
npm start          # http://localhost:3000
npm test           # 13 testes unitários/integração
```

Opcional: `cp .env.example .env` e preencha as variáveis. O servidor local carrega `.env` automaticamente.

> Em redes corporativas com proxy TLS, o servidor local reexecuta com o CA bundle do sistema para que `fetch` funcione. Alguns domínios podem estar bloqueados no ambiente local — na Vercel todas as APIs respondem normalmente.

---

## Variáveis de ambiente

| Variável | Obrigatória | Descrição |
|---|---|---|
| `GEMINI_API_KEY` | não | Chave do Google AI Studio |
| `GEMINI_MODEL` | não | Padrão `gemini-2.5-flash`; há fallback automático |
| `GROQ_API_KEY` | não | Alternativa gratuita (compatível com OpenAI) |
| `OPENROUTER_API_KEY` | não | Alternativa com modelos `:free` |
| `LLM_BASE_URL` + `LLM_API_KEY` + `LLM_MODEL` | não | Qualquer endpoint compatível com OpenAI |
| `LLM_PROVIDER` | não | `gemini` \| `groq` \| `openrouter` \| `demo` |
| `NOTION_TOKEN` | não | Token de integração interna do Notion |
| `NOTION_DATABASE_ID` / `NOTION_PARENT_PAGE_ID` | não | Destino das páginas criadas |
| `AGENT_WEBHOOK_URL` | não | URL HTTPS que recebe os eventos |
| `ALLOWED_API_HOSTS` | não | Lista de hosts permitidos para `http_get_json`, separados por vírgula |
| `AGENT_ACCESS_CODE` | não | Senha simples exigida no header `x-access-code` |
| `PORT` | não | Porta do servidor local (padrão 3000) |

Prioridade: `LLM_PROVIDER=demo` força o modo demo; caso contrário Gemini → Groq → OpenRouter → endpoint customizado → demo.

---

## Integrações externas

### Notion
Crie uma integração em [notion.so/profile/integrations](https://www.notion.so/profile/integrations), copie o token e compartilhe a página (ou database) com a integração. Defina `NOTION_TOKEN` e `NOTION_PARENT_PAGE_ID` (id da página) **ou** `NOTION_DATABASE_ID`. O agente passa a ter a ferramenta `notion_create_page`.

### Webhooks (n8n, Make, Zapier, IFTTT)
Crie um webhook de gatilho no seu serviço, coloque a URL em `AGENT_WEBHOOK_URL` e peça ao agente: *"dispere o webhook de relatório semanal"*. O payload enviado:

```json
{
  "source": "atlas-agent",
  "event": "report.weekly",
  "title": "...",
  "data": { },
  "created_at": "2026-10-27T23:00:00.000Z"
}
```

### API genérica
Defina `ALLOWED_API_HOSTS=api.github.com,api.open-meteo.com` e peça: *"consulte https://api.github.com/users/torvalds"*. A ferramenta `http_get_json` só aceita hosts da lista.

---

## API

### `GET /api/health`
Retorna modo (`ai`/`demo`), provedor, lista de ferramentas e configuração ativa — **sem expor segredos**.

### `POST /api/chat`
```json
{ "message": "Qual é o clima em Ribeirão Preto?", "history": [{ "role": "user", "content": "..." }] }
```
Resposta `text/event-stream`, um JSON por evento:

| Evento | Campos | Significado |
|---|---|---|
| `meta` | `mode`, `provider`, `tools`, `maxSteps` | Configuração da execução |
| `status` | `text` | Progresso do loop |
| `note` | `text` | Texto intermediário do modelo |
| `tool_start` | `id`, `name`, `label`, `args` | Ferramenta iniciada |
| `tool_end` | `id`, `ok`, `result`, `durationMs` | Resultado da ferramenta |
| `answer` | `text` | Resposta final em Markdown |
| `error` | `message`, `fallback` | Falha (com fallback para demo) |
| `done` | `usage` | Estatísticas da execução |

Header opcional: `x-access-code: <AGENT_ACCESS_CODE>`.

Exemplo:
```bash
curl -N -X POST https://agente-ia-atlas.vercel.app/api/chat \
  -H 'Content-Type: application/json' \
  -d '{"message":"Quanto é 2 + 2 * 10?"}'
```

---

## Segurança

- **Anti-SSRF:** toda saída HTTP é HTTPS, sem credenciais na URL, sem hosts privados/loopback, sem redirects e com timeout de 9 s (60 s para o provedor de IA). `http_get_json` exige allowlist explícita.
- **Sem `eval`:** a calculadora usa parser próprio (tokenizador + analisador recursivo).
- **Rate limit:** 40 requisições por IP a cada 10 minutos (memória por instância) e `AGENT_ACCESS_CODE` opcional.
- **Limites de entrada:** mensagem até 4.000 caracteres, histórico até 20 mensagens, corpo até 20 KB, no máximo 6 etapas de ferramentas por requisição, respostas de API truncadas.
- **Segredos:** nunca aparecem em `/api/health`, logs ou respostas. Use variáveis de ambiente da Vercel, nunca commite `.env`.

> O plano Hobby da Vercel é para uso pessoal/não comercial. Para uso empresarial, migre para o Pro.

---

## Estrutura do projeto

```
├── index.html            # interface de chat
├── styles.css            # tema escuro responsivo
├── app.js                # cliente SSE + renderização Markdown
├── api/
│   ├── chat.js           # POST /api/chat (SSE, rate limit, access code)
│   └── health.js         # GET /api/health
├── lib/
│   ├── agent.js          # loop do agente + modo demo
│   ├── providers.js      # adaptadores Gemini / OpenAI-compatible
│   ├── tools.js          # 11 ferramentas + schemas + resumos
│   ├── http.js           # fetch seguro e contexto compartilhado
│   └── calculator.js     # parser matemático sem eval
├── scripts/
│   ├── dev-server.js     # servidor local compatível com Vercel
│   ├── deploy-payload.js # gera payload de deploy por arquivos
│   └── smoke-test.js     # testes
├── .env.example
└── package.json
```

### Adicionando uma nova ferramenta

Edite `lib/tools.js` e inclua um objeto no array `TOOLS`:

```js
{
  name: 'minha_ferramenta',
  label: 'Minha ferramenta',
  description: 'O que ela faz e QUANDO o modelo deve usá-la.',
  parameters: {
    type: 'object',
    properties: { entrada: { type: 'string', description: '...' } },
    required: ['entrada'],
  },
  available: (env) => Boolean(env.MINHA_CHAVE), // ou () => true
  async run(args, ctx) {
    const data = await ctx.fetchJson('https://api.exemplo.com/dados');
    return { resultado: data.valor };
  },
}
```

O schema é convertido automaticamente para Gemini e para OpenAI-compatible. Se quiser que ela também responda no modo demo, adicione uma regra em `buildDemoPlan()` (`lib/agent.js`) e um caso em `summarize()` (`lib/tools.js`).

---

## Solução de problemas

| Sintoma | Causa provável | Solução |
|---|---|---|
| `"mode": "demo"` mesmo com chave | Variável não propagada | Confira a env var e faça Redeploy |
| `Falha no Google Gemini: HTTP 404` | Modelo removido | Defina `GEMINI_MODEL` com um modelo da sua conta (o agente já tenta descobrir) |
| `Cota gratuita esgotada (rate limit)` | Limite diário do provedor | Aguarde, troque o modelo ou use Groq/OpenRouter |
| `Chave de API recusada (401/403)` | Chave inválida/API desabilitada | Gere nova chave no AI Studio/Groq |
| Ferramenta retorna `fetch failed` localmente | Rede bloqueada/CA ausente | Teste na Vercel; localmente use o CA do sistema (já configurado no dev server) |
| `404` em `/api/chat` | Deploy sem as funções `api/` | Verifique se `api/chat.js` está no deploy (`/api/health` ajuda a diagnosticar) |

---

## Deploy

Projetos Vercel: **`agente-ia-atlas`** (`prj_r5P07mDAYZkghnBGUBZEXVb6ViKc`) e **`agente-ia-atlas-git`** (`prj_mMYu1oFIAkGJclKYtmuzSlfyeVtt`, conectado ao GitHub). Para publicar uma nova versão, basta dar push na branch — ou usar `npm run deploy:payload` e enviar o `.deploy-payload.json` para a API de deployments da Vercel. Com o Login Connection ativo, cada push gera um deploy automaticamente.

---

Feito com Node.js puro, APIs públicas gratuitas e zero dependências. 🚀
