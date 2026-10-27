'use strict';

/* Atlas Agent — interface web (sem dependencias, sem build). */

const state = {
  history: [],
  busy: false,
  health: null,
  accessCode: localStorage.getItem('atlas.accessCode') || '',
};

const SUGGESTIONS = [
  'Qual é o clima em Ribeirão Preto?',
  'Quanto está 100 dólares em reais?',
  'Calcule (1200 * 1.15) / 3',
  'Pesquise na Wikipédia sobre inteligência artificial',
  'Mostre o perfil do GitHub de torvalds',
  'Crie um plano de tarefas para automatizar meu relatório semanal',
];

const chat = document.getElementById('chat');
const input = document.getElementById('input');
const composer = document.getElementById('composer');
const sendBtn = document.getElementById('sendBtn');
const suggestions = document.getElementById('suggestions');
const toolsList = document.getElementById('toolsList');
const providerLabel = document.getElementById('providerLabel');
const modeTitle = document.getElementById('modeTitle');
const modeDescription = document.getElementById('modeDescription');
const statusDot = document.getElementById('statusDot');
const settingsModal = document.getElementById('settingsModal');
const accessCodeInput = document.getElementById('accessCode');

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function inlineMarkdown(line) {
  return line
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}

function renderMarkdown(source) {
  const lines = escapeHtml(source || '').split('\n');
  let html = '';
  let inCode = false;
  let inList = false;
  let codeBuffer = [];

  const closeList = () => { if (inList) { html += '</ul>'; inList = false; } };

  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      if (inCode) { html += `<pre><code>${codeBuffer.join('\n')}</code></pre>`; codeBuffer = []; }
      inCode = !inCode;
      continue;
    }
    if (inCode) { codeBuffer.push(line); continue; }

    const isListItem = /^\s*(?:[-*]|\d+\.|\[ \]|\[x\])\s+/.test(line);
    if (isListItem) {
      if (!inList) { html += '<ul>'; inList = true; }
      html += `<li>${inlineMarkdown(line.replace(/^\s*(?:[-*]|\d+\.|\[ \]|\[x\])\s+/, ''))}</li>`;
      continue;
    }
    closeList();

    if (/^>\s?/.test(line)) {
      html += `<blockquote>${inlineMarkdown(line.replace(/^>\s?/, ''))}</blockquote>`;
      continue;
    }
    if (/^#{1,4}\s/.test(line)) {
      html += `<p><strong>${inlineMarkdown(line.replace(/^#{1,4}\s+/, ''))}</strong></p>`;
      continue;
    }
    if (!line.trim()) continue;
    html += `<p>${inlineMarkdown(line)}</p>`;
  }
  if (inCode && codeBuffer.length) html += `<pre><code>${codeBuffer.join('\n')}</code></pre>`;
  closeList();
  return html;
}

function scrollToBottom() {
  requestAnimationFrame(() => { chat.scrollTop = chat.scrollHeight; });
}

function addMessage(role, text) {
  const wrapper = document.createElement('div');
  wrapper.className = `message ${role}`;
  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.textContent = role === 'user' ? 'V' : 'A';
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  const content = document.createElement('div');
  content.className = 'md';
  content.innerHTML = renderMarkdown(text);
  bubble.appendChild(content);
  wrapper.append(avatar, bubble);
  chat.appendChild(wrapper);
  scrollToBottom();
  return { wrapper, bubble, content };
}

function addAssistantStream() {
  const wrapper = document.createElement('div');
  wrapper.className = 'message assistant';
  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.textContent = 'A';
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  const stream = document.createElement('div');
  stream.className = 'stream';
  const answer = document.createElement('div');
  answer.className = 'md answer';
  const status = document.createElement('div');
  status.className = 'status-line';
  status.innerHTML = '<span class="spinner"></span><span>Iniciando…</span>';
  stream.appendChild(status);
  bubble.append(stream, answer);
  wrapper.append(avatar, bubble);
  chat.appendChild(wrapper);
  scrollToBottom();
  return { status, stream, answer, cards: new Map(), answerText: '' };
}

function setStatus(view, text) {
  view.status.innerHTML = `<span class="spinner"></span><span>${escapeHtml(text)}</span>`;
  scrollToBottom();
}

function clearStatus(view) {
  if (view.status && view.status.parentNode) view.status.remove();
}

function addNote(view, text) {
  const note = document.createElement('div');
  note.className = 'note-line';
  note.textContent = text.length > 400 ? `${text.slice(0, 400)}…` : text;
  view.stream.insertBefore(note, view.status && view.status.parentNode === view.stream ? view.status : null);
  if (view.stream.children.length > 12) view.stream.removeChild(view.stream.firstChild);
  scrollToBottom();
}

function addError(view, text) {
  const line = document.createElement('div');
  line.className = 'error-line';
  line.textContent = text;
  view.stream.appendChild(line);
  scrollToBottom();
}

function addToolStart(view, event) {
  const card = document.createElement('details');
  card.className = 'tool-card';
  card.dataset.id = event.id;
  card.innerHTML = `
    <summary>
      <span class="tool-icon">⚙️</span>
      <span class="tool-name">${escapeHtml(event.label || event.name)}</span>
      <span class="tool-pill running">executando…</span>
    </summary>
    <div class="tool-body"><h4>Parâmetros</h4><pre>${escapeHtml(JSON.stringify(event.args || {}, null, 2))}</pre><h4>Resultado</h4><pre>aguardando…</pre></div>`;
  view.stream.insertBefore(card, view.status && view.status.parentNode === view.stream ? view.status : null);
  view.cards.set(event.id, card);
  scrollToBottom();
}

function addToolEnd(view, event) {
  const card = view.cards.get(event.id) || [...view.stream.querySelectorAll('.tool-card')].find((item) => item.dataset.id === event.id);
  if (!card) return;
  const pill = card.querySelector('.tool-pill');
  pill.className = `tool-pill ${event.ok ? 'ok' : 'fail'}`;
  pill.textContent = event.ok ? `concluído${event.durationMs ? ` · ${event.durationMs} ms` : ''}` : 'falhou';
  const body = card.querySelector('.tool-body');
  const result = body.querySelector('pre:last-child');
  result.textContent = JSON.stringify(event.result || {}, null, 2).slice(0, 5000);
  if (!event.ok) card.open = true;
  scrollToBottom();
}

function addUsage(view, usage) {
  const line = document.createElement('div');
  line.className = 'usage-line';
  const bits = [];
  if (usage.mode) bits.push(usage.mode === 'demo' ? 'modo demo' : 'modo IA');
  if (usage.steps) bits.push(`${usage.steps} etapa(s)`);
  if (usage.toolCalls) bits.push(`${usage.toolCalls} ferramenta(s)`);
  if (usage.durationMs) bits.push(`${(usage.durationMs / 1000).toFixed(1)} s`);
  if (usage.model) bits.push(usage.model);
  line.textContent = bits.join(' · ');
  view.stream.appendChild(line);
  scrollToBottom();
}

function finish(view) {
  clearStatus(view);
  if (!view.answer.innerHTML) view.answer.innerHTML = renderMarkdown('Não recebi uma resposta. Tente novamente.');
  if (view.answerText) state.history.push({ role: 'assistant', content: view.answerText });
  scrollToBottom();
}

function handleEvent(view, event) {
  switch (event.type) {
    case 'meta':
      if (event.provider && event.provider.model) providerLabel.textContent = `${event.provider.name} · ${event.provider.model}`;
      break;
    case 'status': setStatus(view, event.text); break;
    case 'note': addNote(view, event.text); break;
    case 'tool_start': addToolStart(view, event); break;
    case 'tool_end': addToolEnd(view, event); break;
    case 'answer':
      view.answerText = event.text;
      view.answer.innerHTML = renderMarkdown(event.text);
      clearStatus(view);
      scrollToBottom();
      break;
    case 'error': addError(view, event.message); break;
    case 'done': addUsage(view, event.usage || {}); break;
    default: break;
  }
}

async function sendMessage(message) {
  if (state.busy || !message.trim()) return;
  state.busy = true;
  sendBtn.disabled = true;
  input.value = '';
  input.style.height = 'auto';

  addMessage('user', message);
  state.history.push({ role: 'user', content: message });
  const view = addAssistantStream();
  setStatus(view, 'Conectando ao agente…');

  const headers = { 'Content-Type': 'application/json' };
  if (state.accessCode) headers['x-access-code'] = state.accessCode;

  let response;
  try {
    response = await fetch('/api/chat', {
      method: 'POST',
      headers,
      body: JSON.stringify({ message, history: state.history.slice(0, -1).slice(-20) }),
    });
  } catch (error) {
    addError(view, `Falha de conexão com o servidor: ${error.message}`);
    finish(view);
    state.busy = false;
    sendBtn.disabled = false;
    return;
  }

  if (!response.ok) {
    let detail = `HTTP ${response.status}`;
    let codeRequired = false;
    try {
      const data = await response.json();
      detail = data.error || detail;
      codeRequired = Boolean(data.codeRequired);
    } catch { /* resposta nao-JSON */ }
    addError(view, detail);
    if (codeRequired) openSettings();
    finish(view);
    state.busy = false;
    sendBtn.disabled = false;
    return;
  }

  if (!response.body) {
    addError(view, 'O navegador não suporta streaming (ReadableStream).');
    finish(view);
    state.busy = false;
    sendBtn.disabled = false;
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  const processBlock = (block) => {
    for (const line of block.split('\n')) {
      if (!line.startsWith('data:')) continue;
      const raw = line.slice(5).trim();
      if (!raw) continue;
      try { handleEvent(view, JSON.parse(raw)); } catch { /* ignora evento malformado */ }
    }
  };

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      let index;
      while ((index = buffer.indexOf('\n\n')) !== -1) {
        processBlock(buffer.slice(0, index));
        buffer = buffer.slice(index + 2);
      }
    }
    if (buffer.trim()) processBlock(buffer);
  } catch (error) {
    addError(view, `Conexão interrompida: ${error.message}`);
  }

  finish(view);
  state.busy = false;
  sendBtn.disabled = false;
  input.focus();
}

function openSettings() {
  accessCodeInput.value = state.accessCode;
  settingsModal.classList.remove('hidden');
  accessCodeInput.focus();
}

function closeSettings() { settingsModal.classList.add('hidden'); }

function renderSuggestions() {
  suggestions.innerHTML = '';
  for (const text of SUGGESTIONS) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'chip';
    button.textContent = text;
    button.addEventListener('click', () => { input.value = text; input.focus(); sendMessage(text); });
    suggestions.appendChild(button);
  }
}

function showWelcome() {
  const text = [
    'Olá! Eu sou o **ATLAS**, um agente de IA que automatiza tarefas usando ferramentas externas reais.',
    '',
    'Posso consultar o **clima**, o **câmbio**, a **Wikipédia**, o **GitHub**, fazer **cálculos**, montar **planos de tarefas** e — se você configurar — criar páginas no **Notion** e disparar **webhooks** para n8n/Make/Zapier.',
    '',
    'Escolha uma sugestão abaixo ou escreva o seu pedido.',
  ].join('\n');
  addMessage('assistant', text);
}

async function loadHealth() {
  try {
    const response = await fetch('/api/health');
    const data = await response.json();
    state.health = data;
    const aiMode = data.mode === 'ai';
    statusDot.className = `dot ${aiMode ? 'on' : 'warn'}`;
    modeTitle.textContent = aiMode ? 'IA conectada' : 'Modo demo ativo';
    modeDescription.textContent = aiMode
      ? `${data.provider.name} · ${data.provider.model}. O modelo escolhe as ferramentas automaticamente.`
      : 'Sem chave de IA: as ferramentas reais funcionam por palavras‑chave. Adicione GEMINI_API_KEY, GROQ_API_KEY ou OPENROUTER_API_KEY na Vercel para raciocínio completo.';
    providerLabel.textContent = aiMode ? `${data.provider.name} · ${data.provider.model}` : 'modo demo · sem chave de IA';

    toolsList.innerHTML = '';
    for (const tool of data.tools) {
      const item = document.createElement('li');
      item.className = `${tool.available ? 'active' : 'disabled'}`;
      item.innerHTML = `<span class="tool-dot"></span><span>${escapeHtml(tool.label)}</span>`;
      item.title = tool.available ? 'Disponível' : 'Requer configuração de variável de ambiente';
      toolsList.appendChild(item);
    }
  } catch (error) {
    statusDot.className = 'dot';
    modeTitle.textContent = 'Servidor indisponível';
    modeDescription.textContent = `Não foi possível consultar /api/health: ${error.message}`;
    providerLabel.textContent = 'offline';
    toolsList.innerHTML = '<li class="loading">Servidor indisponível</li>';
  }
}

composer.addEventListener('submit', (event) => {
  event.preventDefault();
  sendMessage(input.value.trim());
});

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage(input.value.trim());
  }
});

input.addEventListener('input', () => {
  input.style.height = 'auto';
  input.style.height = `${Math.min(input.scrollHeight, 150)}px`;
});

document.getElementById('clearBtn').addEventListener('click', () => {
  state.history = [];
  chat.innerHTML = '';
  showWelcome();
});

document.getElementById('settingsBtn').addEventListener('click', openSettings);
document.getElementById('cancelSettings').addEventListener('click', closeSettings);
document.getElementById('saveSettings').addEventListener('click', () => {
  state.accessCode = accessCodeInput.value.trim();
  if (state.accessCode) localStorage.setItem('atlas.accessCode', state.accessCode);
  else localStorage.removeItem('atlas.accessCode');
  closeSettings();
});
settingsModal.addEventListener('click', (event) => { if (event.target === settingsModal) closeSettings(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeSettings(); });

renderSuggestions();
showWelcome();
loadHealth();
input.focus();
