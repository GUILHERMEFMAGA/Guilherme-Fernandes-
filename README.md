# Assistente Guilherme V2 para Windows

Assistente local com **voz, texto, comandos seguros, notas, lembretes e IA opcional**. Ele abre sites e aplicativos permitidos, pesquisa, responde perguntas e pode ser personalizado no Visual Studio Code.

A parte básica usa recursos do próprio Windows e funciona sem instalar bibliotecas. Para conversas e perguntas livres, a integração opcional usa [Ollama](https://ollama.com/) e um modelo executado no próprio computador — sem chave de API.

## Começar em 1 minuto

1. Baixe e extraia a pasta inteira no Windows.
2. Dê dois cliques em **`Iniciar Assistente.bat`**.
3. Clique em **Ouvir**.
4. Diga **“abra o WhatsApp”** ou **“abra o YouTube”**.

Você também pode digitar e pressionar **Enter**. Não execute o programa de dentro do ZIP e não separe os arquivos da pasta.

### Criar atalhos

- **`Instalar Atalho.bat`** cria um atalho na Área de Trabalho.
- **`Abrir no VS Code.bat`** abre todo o projeto no Visual Studio Code.

## O que a V2 faz

### Navegação e pesquisa

- Abre YouTube, Google, Gmail, Maps, WhatsApp, ChatGPT, GitHub, Spotify, Netflix, Instagram, Facebook, LinkedIn, Outlook e OneDrive.
- Pesquisa no Google e YouTube.
- Abre a previsão do tempo da região no navegador.
- Permite cadastrar sites HTTPS adicionais no `config.json`.

### Windows

- Abre Calculadora, Bloco de Notas, Explorador, Paint, Visual Studio Code, Terminal, Configurações, câmera e captura de tela.
- Abre Downloads, Documentos, Área de Trabalho, Imagens, Músicas e Vídeos.
- Informa data, hora, bateria e dados básicos do computador.
- Copia e lê textos da área de transferência.

### Organização

- Salva notas locais e abre todas elas no Bloco de Notas.
- Cria temporizadores e lembretes de até 7 dias.
- Exige confirmação visual antes de apagar todas as notas.

### Inteligência local opcional

- Responde perguntas e mantém um pequeno contexto da conversa enquanto a janela está aberta.
- Interpreta pedidos escritos de maneira mais natural.
- Roda no computador por meio do Ollama.
- Nunca transforma a resposta da IA diretamente em shell: comandos ainda precisam passar pela lista segura do aplicativo.

Consulte **`GUIA-COMANDOS.md`** para ver todos os exemplos.

## Configurar a IA local

A IA é opcional; todos os comandos diretos continuam funcionando sem ela.

1. Dê dois cliques em **`Configurar IA Local.bat`**.
2. Se o Ollama não estiver instalado, o arquivo abrirá a página oficial de download.
3. Instale e abra o Ollama pelo menu Iniciar.
4. Execute **`Configurar IA Local.bat`** novamente.
5. Confirme o download do modelo `qwen3:4b`.
6. Abra o assistente e clique em **Verificar IA**.

O modelo ocupa alguns gigabytes. Em um computador com poucos recursos, instale outro modelo no Ollama e altere `ai.preferredModel` no `config.json`. Se o modelo preferido não existir, o aplicativo usa o primeiro modelo local disponível.

> Modelos de IA podem cometer erros. Não use as respostas como única fonte para decisões médicas, jurídicas, financeiras ou de segurança.

## Ativar reconhecimento de voz

O aplicativo procura primeiro o reconhecimento de fala em **Português (Brasil)**. Caso apareça “Voz indisponível”:

1. Abra **Configurações** do Windows.
2. Entre em **Hora e idioma → Idioma e região**.
3. Nas opções de **Português (Brasil)**, instale o pacote de **Fala**.
4. Em **Privacidade e segurança → Microfone**, permita acesso para aplicativos da área de trabalho.
5. Feche e abra o assistente novamente.

Sem o pacote de voz, comandos digitados e botões continuam funcionando.

## Personalizar no Visual Studio Code

Dê dois cliques em **`Abrir no VS Code.bat`** ou use o botão **VS Code** dentro do assistente.

O arquivo `config.json` permite configurar:

```json
{
  "assistantName": "Guilherme",
  "voice": {
    "autoListen": false,
    "minimumConfidence": 0.45,
    "speakReplies": false
  },
  "ai": {
    "enabled": true,
    "preferredModel": "qwen3:4b",
    "timeoutSeconds": 90
  },
  "customSites": [
    {
      "name": "Arena",
      "aliases": ["arena", "arena ai"],
      "url": "https://arena.ai/"
    }
  ]
}
```

Somente sites com endereço `https://` são aceitos. Reinicie o assistente depois de salvar mudanças no arquivo.

## Segurança e privacidade

- Não solicita senha, login, chave de API ou acesso de administrador.
- O áudio é tratado pelo mecanismo de fala instalado no Windows e não é salvo pelo aplicativo.
- Notas ficam em `%LOCALAPPDATA%\AssistenteGuilherme\notas.txt`.
- O contexto da conversa existe apenas na memória e desaparece ao fechar a janela.
- A integração de IA só se comunica com `127.0.0.1`, isto é, com o Ollama no próprio computador.
- Sites personalizados precisam usar HTTPS.
- Comandos desconhecidos nunca são executados como PowerShell ou Prompt de Comando.
- Exclusão de notas exige confirmação; desligamento, compras, mensagens e manipulação de senhas não são implementados.

O inicializador usa `ExecutionPolicy Bypass` apenas no processo atual porque o script não possui assinatura digital. Ele não muda permanentemente a política do PowerShell ou a segurança do Windows.

## Solução de problemas

### A janela não abre

Use Windows 10 ou 11 e confirme que todos estes arquivos estão juntos:

- `Assistente.ps1`
- `Assistente.Core.ps1`
- `Assistente.Services.ps1`
- `config.json`
- `Iniciar Assistente.bat`

Execute pelo `.bat`, não abrindo o `.ps1` diretamente.

### “IA local não conectada”

Abra o Ollama no menu Iniciar, execute `Configurar IA Local.bat` e depois clique em **Verificar IA**. Os comandos básicos continuam disponíveis mesmo quando a IA está desligada.

### O microfone não funciona

Confira o pacote de Fala, a permissão de microfone e o dispositivo de entrada padrão do Windows.

### O navegador não abre

Defina um navegador padrão em **Configurações → Aplicativos → Aplicativos padrão**.

## Testes

No Windows PowerShell:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\tests\Assistente.Core.Tests.ps1
```

Validação estática em qualquer sistema com Python 3:

```bash
python3 tests/validate_repository.py
```

## Estrutura

- `Assistente.ps1`: interface, voz, lembretes e execução controlada.
- `Assistente.Core.ps1`: interpretação determinística e lista segura.
- `Assistente.Services.ps1`: configuração, notas e integração local com Ollama.
- `config.json`: preferências editáveis.
- `GUIA-COMANDOS.md`: catálogo de comandos.
- Arquivos `.bat`: inicialização, atalhos, IA e VS Code.
- `tests/`: testes e validações do projeto.
