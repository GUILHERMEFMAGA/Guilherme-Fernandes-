# Guia de comandos — Assistente Guilherme V2

Você pode digitar estes comandos ou clicar em **Ouvir** e falá-los. A palavra de chamada é opcional: tanto `abra o WhatsApp` quanto `Ei Guilherme, abra o WhatsApp` funcionam.

## Sites e pesquisas

- `abra o YouTube`
- `abra o WhatsApp`
- `abra o Google`
- `abra o Gmail`
- `abra o Maps`
- `abra o Spotify`
- `abra a Netflix`
- `abra o Instagram`
- `abra o Outlook`
- `pesquise por previsão do tempo`
- `pesquise no YouTube por música brasileira`

Sites disponíveis: YouTube, Google, Gmail, Maps, WhatsApp Web, ChatGPT, GitHub, Spotify, Netflix, Instagram, Facebook, LinkedIn, Outlook e OneDrive.

## Programas e pastas

- `abra a calculadora`
- `abra o Bloco de Notas`
- `abra o Explorador de Arquivos`
- `abra o Paint`
- `abra o Visual Studio Code`
- `abra o Terminal`
- `abra as Configurações`
- `abra a câmera`
- `abra a captura de tela`
- `abra Downloads`
- `abra Documentos`
- `abra a Área de Trabalho`
- `abra Imagens`

## Notas

- `anote comprar pão`
- `crie uma nota dizendo ligar para João`
- `mostre as notas`
- `apague as notas` — exige confirmação visual antes de apagar

As notas ficam em `%LOCALAPPDATA%\AssistenteGuilherme\notas.txt`.

## Lembretes e temporizadores

- `temporizador de 30 segundos`
- `temporizador de dez minutos`
- `me avise em uma hora`
- `me lembre de beber água em vinte minutos`

Os números de 1 a 69 podem ser falados por extenso. Cada lembrete pode durar entre 1 segundo e 7 dias. Os lembretes existem enquanto o assistente estiver aberto.

## Ferramentas rápidas

- `copie este texto`
- `leia a área de transferência`
- `que horas são`
- `que dia é hoje`
- `bateria`
- `informações do computador`
- `como está o tempo`
- `pare de ouvir`
- `ajuda`

## Perguntas com IA local

Quando o Ollama estiver configurado, você pode conversar naturalmente:

- `explique inteligência artificial de um jeito simples`
- `me ajude a estudar matemática`
- `faça uma lista de ideias para meu projeto`
- `qual é a diferença entre HTML e CSS?`
- `eu queria assistir alguns vídeos` — a IA pode transformar isso em um comando seguro

A IA funciona **localmente**, sem chave de API. O programa só aceita ações que, depois de classificadas, também sejam aprovadas pelo interpretador seguro. A IA não recebe permissão para executar shell, excluir arquivos, fazer compras, enviar mensagens, preencher senhas, desligar o computador ou alterar configurações de segurança.

## Personalização no Visual Studio Code

Abra `config.json` para alterar:

- `assistantName`: nome exibido pelo assistente;
- `voice.autoListen`: inicia o microfone automaticamente;
- `voice.minimumConfidence`: confiança mínima entre `0.2` e `0.95`;
- `voice.speakReplies`: lê respostas em voz alta ao iniciar;
- `ai.enabled`: ativa ou desativa a integração com Ollama;
- `ai.preferredModel`: modelo local preferido;
- `customSites`: atalhos HTTPS personalizados.

Exemplo de site personalizado:

```json
{
  "name": "Meu site",
  "aliases": ["meu site", "página pessoal"],
  "url": "https://exemplo.com/"
}
```

Feche e reabra o aplicativo depois de editar o arquivo.
