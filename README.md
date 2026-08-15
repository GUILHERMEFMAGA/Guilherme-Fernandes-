# Assistente Guilherme para Windows

Um assistente local com **voz e texto** que abre o YouTube, outros sites permitidos e alguns aplicativos do Windows. Ele foi feito em PowerShell com recursos já presentes no Windows 10 e 11, sem bibliotecas externas.

## Como iniciar

1. Baixe ou copie **a pasta inteira** para o seu computador Windows.
2. Dê dois cliques em **`Iniciar Assistente.bat`**.
3. Na janela do assistente, clique em **Ouvir**.
4. Diga: **“abra o YouTube”**.

Você também pode digitar o comando e pressionar **Enter** ou clicar em **Executar**.

> Não separe os arquivos da pasta. O iniciador precisa encontrar `Assistente.ps1` e `Assistente.Core.ps1` no mesmo local.

## Criar um atalho na Área de Trabalho

Dê dois cliques em **`Instalar Atalho.bat`**. Um atalho chamado **Assistente Guilherme** será criado na Área de Trabalho.

Mantenha a pasta original no mesmo local depois de criar o atalho.

## Exemplos de comandos

### Sites

- “Abra o YouTube”
- “Abra o Google”
- “Abra o Gmail”
- “Abra o Maps”
- “Abra o WhatsApp”
- “Abra o ChatGPT”
- “Abra o GitHub”

### Pesquisas

- “Pesquise no YouTube por música brasileira”
- “Procure no Google por previsão do tempo”
- “Pesquise por receitas de bolo”

### Aplicativos do Windows

- “Abra a calculadora”
- “Abra o Bloco de Notas”
- “Abra o Explorador de Arquivos”

### Controle

- “Pare de ouvir”
- “Ajuda”

Os botões de atalho também funcionam sem o microfone.

## Ativar o reconhecimento de voz

O aplicativo procura primeiro o reconhecimento de fala em **Português (Brasil)**. Caso a mensagem “Voz indisponível” apareça:

1. Abra **Configurações** do Windows.
2. Entre em **Hora e idioma → Idioma e região**.
3. Nas opções de **Português (Brasil)**, instale o pacote de **Fala**.
4. Em **Privacidade e segurança → Microfone**, permita o acesso ao microfone para aplicativos da área de trabalho.
5. Feche e abra o assistente novamente.

Mesmo sem o pacote de voz, todos os comandos digitados e botões continuam funcionando.

## Segurança e privacidade

- O aplicativo **não solicita senha, login ou acesso de administrador**.
- O áudio é tratado pelo mecanismo de reconhecimento instalado no Windows e **não é gravado nem salvo pelo aplicativo**.
- Somente sites presentes na lista interna podem ser abertos por um comando de abertura.
- Termos de pesquisa são enviados apenas quando o navegador abre a busca no Google ou YouTube.
- O histórico mostrado na tela fica somente na memória e desaparece quando a janela é fechada.
- Comandos desconhecidos não são executados como comandos do sistema.

O iniciador usa uma permissão temporária (`ExecutionPolicy Bypass`) apenas para esta execução, pois o script local não possui assinatura digital. Ele não altera permanentemente a política do PowerShell ou as configurações de segurança do Windows.

## Solução de problemas

### A janela fecha ou mostra um erro

Confirme que você está usando **Windows 10 ou Windows 11** e que estes arquivos continuam juntos:

- `Assistente.ps1`
- `Assistente.Core.ps1`
- `Iniciar Assistente.bat`

Execute novamente pelo arquivo `.bat`, não abrindo o `.ps1` diretamente.

### O microfone não funciona

Confira a permissão do microfone e o pacote de Fala seguindo a seção anterior. Headsets Bluetooth também precisam estar selecionados como dispositivo de entrada padrão do Windows.

### O navegador não abre

Defina um navegador padrão em **Configurações → Aplicativos → Aplicativos padrão**.

## Testes

No Windows PowerShell, os testes do interpretador de comandos podem ser executados com:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\tests\Assistente.Core.Tests.ps1
```

A validação estática, disponível também em macOS e Linux quando Python 3 está instalado, pode ser executada com:

```bash
python3 tests/validate_repository.py
```

## Estrutura do projeto

- `Assistente.ps1`: interface gráfica, microfone e execução das ações.
- `Assistente.Core.ps1`: interpretação segura dos comandos.
- `Iniciar Assistente.bat`: inicializador para Windows.
- `Instalar-Atalho.ps1` e `Instalar Atalho.bat`: criação opcional do atalho.
- `tests/`: verificações do interpretador e da estrutura do aplicativo.
