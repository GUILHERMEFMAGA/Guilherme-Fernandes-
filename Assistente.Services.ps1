Set-StrictMode -Version Latest

function Get-AssistantSpecialFolderPath {
    param([Parameter(Mandatory = $true)][string]$Name)

    $specialFolderType = [System.Environment].GetNestedType('SpecialFolder')
    $specialFolder = [System.Enum]::Parse($specialFolderType, $Name)
    return [System.Environment]::GetFolderPath($specialFolder)
}

function Get-AssistantDefaultConfig {
    return [PSCustomObject]@{
        assistantName = 'Guilherme'
        voice = [PSCustomObject]@{
            autoListen        = $false
            minimumConfidence = 0.45
            speakReplies      = $false
        }
        ai = [PSCustomObject]@{
            enabled        = $true
            preferredModel = 'qwen3:4b'
            timeoutSeconds = 90
        }
        customSites = @()
    }
}

function Get-AssistantConfig {
    param([Parameter(Mandatory = $true)][string]$Path)

    $default = Get-AssistantDefaultConfig
    if (-not (Test-Path -LiteralPath $Path)) {
        return $default
    }

    try {
        $loaded = Get-Content -LiteralPath $Path -Raw -Encoding UTF8 | ConvertFrom-Json

        if ($null -ne $loaded.PSObject.Properties['assistantName']) {
            $name = [string]$loaded.assistantName
            if (-not [string]::IsNullOrWhiteSpace($name)) {
                $default.assistantName = $name.Trim()
            }
        }

        if ($null -ne $loaded.PSObject.Properties['voice'] -and $null -ne $loaded.voice) {
            if ($null -ne $loaded.voice.PSObject.Properties['autoListen']) {
                $default.voice.autoListen = [bool]$loaded.voice.autoListen
            }
            if ($null -ne $loaded.voice.PSObject.Properties['speakReplies']) {
                $default.voice.speakReplies = [bool]$loaded.voice.speakReplies
            }
            if ($null -ne $loaded.voice.PSObject.Properties['minimumConfidence']) {
                $confidence = [double]$loaded.voice.minimumConfidence
                if ($confidence -ge 0.2 -and $confidence -le 0.95) {
                    $default.voice.minimumConfidence = $confidence
                }
            }
        }

        if ($null -ne $loaded.PSObject.Properties['ai'] -and $null -ne $loaded.ai) {
            if ($null -ne $loaded.ai.PSObject.Properties['enabled']) {
                $default.ai.enabled = [bool]$loaded.ai.enabled
            }
            if ($null -ne $loaded.ai.PSObject.Properties['preferredModel']) {
                $model = [string]$loaded.ai.preferredModel
                if (-not [string]::IsNullOrWhiteSpace($model)) {
                    $default.ai.preferredModel = $model.Trim()
                }
            }
            if ($null -ne $loaded.ai.PSObject.Properties['timeoutSeconds']) {
                $timeout = [int]$loaded.ai.timeoutSeconds
                if ($timeout -ge 10 -and $timeout -le 300) {
                    $default.ai.timeoutSeconds = $timeout
                }
            }
        }

        if ($null -ne $loaded.PSObject.Properties['customSites']) {
            $validSites = @()
            foreach ($site in @($loaded.customSites)) {
                if ($null -eq $site) {
                    continue
                }
                if (
                    $null -eq $site.PSObject.Properties['name'] -or
                    $null -eq $site.PSObject.Properties['url'] -or
                    $null -eq $site.PSObject.Properties['aliases']
                ) {
                    continue
                }

                $uri = $null
                if (
                    [System.Uri]::TryCreate([string]$site.url, [System.UriKind]::Absolute, [ref]$uri) -and
                    $uri.Scheme -eq 'https' -and
                    @($site.aliases).Count -gt 0
                ) {
                    $validSites += [PSCustomObject]@{
                        name    = [string]$site.name
                        aliases = @($site.aliases | ForEach-Object { [string]$_ })
                        url     = $uri.AbsoluteUri
                    }
                }
            }
            $default.customSites = $validSites
        }

        return $default
    }
    catch {
        $default | Add-Member -NotePropertyName configWarning -NotePropertyValue $_.Exception.Message
        return $default
    }
}

function Get-AssistantDataDirectory {
    $basePath = Get-AssistantSpecialFolderPath -Name 'LocalApplicationData'
    $dataPath = Join-Path $basePath 'AssistenteGuilherme'
    if (-not (Test-Path -LiteralPath $dataPath)) {
        [void](New-Item -Path $dataPath -ItemType Directory -Force)
    }
    return $dataPath
}

function Add-AssistantNote {
    param([Parameter(Mandatory = $true)][string]$Text)

    $dataPath = Get-AssistantDataDirectory
    $notesPath = Join-Path $dataPath 'notas.txt'
    $line = "[$(Get-Date -Format 'dd/MM/yyyy HH:mm')] $($Text.Trim())`r`n"
    $encoding = New-Object System.Text.UTF8Encoding($true)
    [System.IO.File]::AppendAllText($notesPath, $line, $encoding)
    return $notesPath
}

function Get-AssistantNotesPath {
    $dataPath = Get-AssistantDataDirectory
    $notesPath = Join-Path $dataPath 'notas.txt'
    if (-not (Test-Path -LiteralPath $notesPath)) {
        $encoding = New-Object System.Text.UTF8Encoding($true)
        [System.IO.File]::WriteAllText(
            $notesPath,
            "Notas do Assistente Guilherme`r`n==============================`r`n",
            $encoding
        )
    }
    return $notesPath
}

function Clear-AssistantNotes {
    $notesPath = Get-AssistantNotesPath
    $encoding = New-Object System.Text.UTF8Encoding($true)
    [System.IO.File]::WriteAllText(
        $notesPath,
        "Notas do Assistente Guilherme`r`n==============================`r`n",
        $encoding
    )
}

function Resolve-AssistantKnownFolder {
    param([Parameter(Mandatory = $true)][string]$Folder)

    switch ($Folder) {
        'Downloads' { return Join-Path $HOME 'Downloads' }
        'Documents' { return Get-AssistantSpecialFolderPath -Name 'MyDocuments' }
        'Desktop'   { return Get-AssistantSpecialFolderPath -Name 'DesktopDirectory' }
        'Pictures'  { return Get-AssistantSpecialFolderPath -Name 'MyPictures' }
        'Music'     { return Get-AssistantSpecialFolderPath -Name 'MyMusic' }
        'Videos'    { return Get-AssistantSpecialFolderPath -Name 'MyVideos' }
        default     { return '' }
    }
}

function Get-AssistantOllamaStatus {
    param([Parameter(Mandatory = $true)]$Config)

    if (-not [bool]$Config.ai.enabled) {
        return [PSCustomObject]@{
            Available = $false
            Model     = ''
            Message   = 'IA local desativada no config.json.'
        }
    }

    try {
        $response = Invoke-RestMethod `
            -Uri 'http://127.0.0.1:11434/api/tags' `
            -Method Get `
            -TimeoutSec 2

        $modelNames = @()
        foreach ($modelEntry in @($response.models)) {
            if ($null -ne $modelEntry.PSObject.Properties['model']) {
                $modelNames += [string]$modelEntry.model
            }
            elseif ($null -ne $modelEntry.PSObject.Properties['name']) {
                $modelNames += [string]$modelEntry.name
            }
        }

        if ($modelNames.Count -eq 0) {
            return [PSCustomObject]@{
                Available = $false
                Model     = ''
                Message   = 'Ollama conectado, mas nenhum modelo está instalado.'
            }
        }

        $preferredModel = [string]$Config.ai.preferredModel
        $selectedModel = $modelNames | Where-Object { $_ -eq $preferredModel } | Select-Object -First 1
        if ($null -eq $selectedModel) {
            $selectedModel = $modelNames | Where-Object { $_ -like "$preferredModel*" } | Select-Object -First 1
        }
        if ($null -eq $selectedModel) {
            $selectedModel = $modelNames | Select-Object -First 1
        }

        return [PSCustomObject]@{
            Available = $true
            Model     = [string]$selectedModel
            Message   = "IA local pronta: $selectedModel"
        }
    }
    catch {
        return [PSCustomObject]@{
            Available = $false
            Model     = ''
            Message   = 'IA local não conectada. O assistente básico continua funcionando.'
        }
    }
}

function Start-AssistantAiJob {
    param(
        [Parameter(Mandatory = $true)][string]$Model,
        [Parameter(Mandatory = $true)][string]$UserMessage,
        [Parameter(Mandatory = $true)][int]$TimeoutSeconds,
        [AllowNull()][array]$Conversation = @()
    )

    $today = Get-Date -Format 'dd/MM/yyyy'
    $systemPrompt = @"
Você é o cérebro local e privado do Assistente Guilherme no Windows. Hoje é $today.
Responda sempre em português do Brasil, com clareza e sem inventar que executou ações.

Sua saída deve ser SOMENTE um objeto JSON válido, sem markdown, em um destes formatos:
{"kind":"command","command":"comando canônico"}
{"kind":"answer","answer":"resposta ao usuário"}

Use kind=command apenas quando o pedido corresponder com segurança a um destes comandos:
- abra o YouTube, Google, Gmail, Maps, WhatsApp, ChatGPT, GitHub, Spotify, Netflix, Instagram, Facebook, LinkedIn, Outlook ou OneDrive
- pesquise por TEXTO
- pesquise no YouTube por TEXTO
- abra a calculadora, Bloco de Notas, Explorador de Arquivos, Paint, Visual Studio Code, Terminal, Configurações, câmera ou captura de tela
- abra Downloads, Documentos, Área de Trabalho, Imagens, Músicas ou Vídeos
- anote TEXTO
- copie TEXTO
- mostre as notas
- que horas são
- que dia é hoje
- bateria
- informações do computador
- me lembre de TAREFA em N minutos
- temporizador de N minutos
- ajuda

O comando canônico deve manter o conteúdo útil informado pelo usuário. Nunca produza comandos de shell, exclusão, compra, mensagem, login, senha, desligamento, reinicialização ou alteração de segurança. Para qualquer outra solicitação, pergunta ou conversa, use kind=answer.
"@

    $safeConversation = @($Conversation | Select-Object -Last 6)
    $conversationJson = $safeConversation | ConvertTo-Json -Depth 4 -Compress
    return Start-Job -ScriptBlock {
        param($SelectedModel, $Question, $RequestTimeout, $SystemInstructions, $PreviousMessagesJson)

        try {
            $messages = @(
                [PSCustomObject]@{ role = 'system'; content = $SystemInstructions }
            )
            $previousMessages = @()
            if (-not [string]::IsNullOrWhiteSpace([string]$PreviousMessagesJson)) {
                $previousMessages = @($PreviousMessagesJson | ConvertFrom-Json)
            }
            foreach ($previousMessage in $previousMessages) {
                if (
                    $null -ne $previousMessage.PSObject.Properties['role'] -and
                    $null -ne $previousMessage.PSObject.Properties['content']
                ) {
                    $messages += [PSCustomObject]@{
                        role    = [string]$previousMessage.role
                        content = [string]$previousMessage.content
                    }
                }
            }
            $messages += [PSCustomObject]@{ role = 'user'; content = $Question }

            $body = @{
                model    = $SelectedModel
                stream   = $false
                think    = $false
                format   = 'json'
                messages = $messages
                options  = @{ temperature = 0.2 }
            } | ConvertTo-Json -Depth 8

            $response = Invoke-RestMethod `
                -Uri 'http://127.0.0.1:11434/api/chat' `
                -Method Post `
                -ContentType 'application/json; charset=utf-8' `
                -Body ([System.Text.Encoding]::UTF8.GetBytes($body)) `
                -TimeoutSec $RequestTimeout

            [PSCustomObject]@{
                Success = $true
                Content = [string]$response.message.content
                Error   = ''
            }
        }
        catch {
            [PSCustomObject]@{
                Success = $false
                Content = ''
                Error   = $_.Exception.Message
            }
        }
    } -ArgumentList $Model, $UserMessage, $TimeoutSeconds, $systemPrompt, $conversationJson
}

function ConvertFrom-AssistantAiResponse {
    param([Parameter(Mandatory = $true)][string]$Content)

    try {
        $cleanContent = $Content.Trim()
        if ($cleanContent.StartsWith('```')) {
            $cleanContent = $cleanContent -replace '^```(?:json)?\s*', ''
            $cleanContent = $cleanContent -replace '\s*```$', ''
        }
        $parsed = $cleanContent | ConvertFrom-Json

        if ($null -eq $parsed.PSObject.Properties['kind']) {
            throw 'Resposta sem tipo.'
        }

        if (
            [string]$parsed.kind -eq 'command' -and
            $null -ne $parsed.PSObject.Properties['command'] -and
            -not [string]::IsNullOrWhiteSpace([string]$parsed.command)
        ) {
            return [PSCustomObject]@{
                Kind    = 'command'
                Command = [string]$parsed.command
                Answer  = ''
            }
        }

        if (
            [string]$parsed.kind -eq 'answer' -and
            $null -ne $parsed.PSObject.Properties['answer'] -and
            -not [string]::IsNullOrWhiteSpace([string]$parsed.answer)
        ) {
            return [PSCustomObject]@{
                Kind    = 'answer'
                Command = ''
                Answer  = [string]$parsed.answer
            }
        }
    }
    catch {
        # A resposta será tratada como inválida abaixo.
    }

    return [PSCustomObject]@{
        Kind    = 'invalid'
        Command = ''
        Answer  = ''
    }
}
