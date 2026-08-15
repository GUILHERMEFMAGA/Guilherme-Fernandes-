Set-StrictMode -Version Latest

function ConvertTo-AssistantNormalizedText {
    param(
        [AllowEmptyString()]
        [string]$Text
    )

    if ([string]::IsNullOrWhiteSpace($Text)) {
        return ''
    }

    $decomposed = $Text.Normalize([System.Text.NormalizationForm]::FormD)
    $characters = foreach ($character in $decomposed.ToCharArray()) {
        $category = [System.Globalization.CharUnicodeInfo]::GetUnicodeCategory($character)
        if ($category -ne [System.Globalization.UnicodeCategory]::NonSpacingMark) {
            $character
        }
    }

    $normalized = (-join $characters).Normalize([System.Text.NormalizationForm]::FormC)
    $normalized = $normalized.ToLowerInvariant()
    $normalized = [System.Text.RegularExpressions.Regex]::Replace(
        $normalized,
        '[^\p{L}\p{Nd}\.\s-]',
        ' '
    )
    return [System.Text.RegularExpressions.Regex]::Replace($normalized, '\s+', ' ').Trim()
}

function New-AssistantCommandResult {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Action,

        [string]$Target = '',
        [string]$Parameter = '',
        [string]$Message = '',
        [bool]$NeedsConfirmation = $false
    )

    return [PSCustomObject]@{
        Action            = $Action
        Target            = $Target
        Parameter         = $Parameter
        Message           = $Message
        NeedsConfirmation = $NeedsConfirmation
    }
}

function ConvertTo-AssistantNumber {
    param([Parameter(Mandatory = $true)][string]$NumberText)

    $normalized = ConvertTo-AssistantNormalizedText -Text $NumberText
    $numericValue = 0
    if ([int]::TryParse($normalized, [ref]$numericValue)) {
        return $numericValue
    }

    $values = @{
        'zero'      = 0
        'um'        = 1
        'uma'       = 1
        'dois'      = 2
        'duas'      = 2
        'tres'      = 3
        'quatro'    = 4
        'cinco'     = 5
        'seis'      = 6
        'sete'      = 7
        'oito'      = 8
        'nove'      = 9
        'dez'       = 10
        'onze'      = 11
        'doze'      = 12
        'treze'     = 13
        'quatorze'  = 14
        'catorze'   = 14
        'quinze'    = 15
        'dezesseis' = 16
        'dezessete' = 17
        'dezoito'   = 18
        'dezenove'  = 19
        'vinte'     = 20
        'trinta'    = 30
        'quarenta'  = 40
        'cinquenta' = 50
        'sessenta'  = 60
    }

    if ($values.ContainsKey($normalized)) {
        return [int]$values[$normalized]
    }

    if ($normalized -match '^(vinte|trinta|quarenta|cinquenta|sessenta) e (um|uma|dois|duas|tres|quatro|cinco|seis|sete|oito|nove)$') {
        return [int]$values[$Matches[1]] + [int]$values[$Matches[2]]
    }

    return -1
}

function ConvertTo-AssistantDurationSeconds {
    param(
        [Parameter(Mandatory = $true)][string]$Amount,
        [Parameter(Mandatory = $true)][string]$Unit
    )

    $number = ConvertTo-AssistantNumber -NumberText $Amount
    if ($number -le 0) {
        return -1
    }

    $normalizedUnit = ConvertTo-AssistantNormalizedText -Text $Unit
    if ($normalizedUnit -match '^segundo') {
        return $number
    }
    if ($normalizedUnit -match '^minuto') {
        return $number * 60
    }
    if ($normalizedUnit -match '^hora') {
        return $number * 3600
    }

    return -1
}

function Resolve-AssistantCommand {
    param(
        [AllowEmptyString()]
        [string]$Command,

        [AllowNull()]
        [array]$CustomSites = @()
    )

    $rawCommand = if ($null -eq $Command) { '' } else { $Command.Trim() }
    $rawCommand = [System.Text.RegularExpressions.Regex]::Replace(
        $rawCommand,
        '^\s*(?:ei\s+)?(?:guilherme|assistente)\s*[,;:\-]?\s+',
        '',
        [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
    )
    $rawCommand = [System.Text.RegularExpressions.Regex]::Replace(
        $rawCommand,
        '^\s*por\s+favor\s*[,;:\-]?\s*',
        '',
        [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
    )
    $normalized = ConvertTo-AssistantNormalizedText -Text $rawCommand

    if ([string]::IsNullOrWhiteSpace($normalized)) {
        return New-AssistantCommandResult `
            -Action 'Unknown' `
            -Message 'Digite ou diga um comando para eu executar.'
    }

    # Buscas precisam vir antes das regras que simplesmente abrem os sites.
    $youtubeSearchPattern = '^\s*(?:pesquise|pesquisar|procure|procurar|busque|buscar)\s+(?:no|na|em)\s+(?:o\s+)?(?:youtube|you tube)\s+(?:por\s+)?(.+?)\s*$'
    if ($rawCommand -match $youtubeSearchPattern) {
        $query = $Matches[1].Trim()
        if (-not [string]::IsNullOrWhiteSpace($query)) {
            return New-AssistantCommandResult `
                -Action 'SearchYouTube' `
                -Parameter $query `
                -Message "Pesquisando por $query no YouTube."
        }
    }

    $webSearchPattern = '^\s*(?:pesquise|pesquisar|procure|procurar|busque|buscar)(?:\s+(?:no|na|em)\s+(?:o\s+)?google)?(?:\s+por)?\s+(.+?)\s*$'
    if ($rawCommand -match $webSearchPattern) {
        $query = $Matches[1].Trim()
        if (-not [string]::IsNullOrWhiteSpace($query)) {
            return New-AssistantCommandResult `
                -Action 'SearchWeb' `
                -Parameter $query `
                -Message "Pesquisando por $query."
        }
    }

    if ($normalized -match '^(?:como esta o tempo|previsao do tempo|vai chover|qual e a previsao)(?: hoje)?$') {
        return New-AssistantCommandResult `
            -Action 'SearchWeb' `
            -Parameter 'previsão do tempo hoje' `
            -Message 'Abrindo a previsão do tempo da sua região.'
    }

    # Lembretes e temporizadores. Números de 1 a 69 podem ser falados por extenso.
    $spokenNumber = '(?:\d+|um|uma|dois|duas|tres|quatro|cinco|seis|sete|oito|nove|dez|onze|doze|treze|quatorze|catorze|quinze|dezesseis|dezessete|dezoito|dezenove|vinte|trinta|quarenta|cinquenta|sessenta|(?:vinte|trinta|quarenta|cinquenta|sessenta) e (?:um|uma|dois|duas|tres|quatro|cinco|seis|sete|oito|nove))'
    $reminderPattern = '^me lembre de (?<task>.+?) (?:daqui a|em) (?<amount>' + $spokenNumber + ') (?<unit>segundos?|minutos?|horas?)$'
    if ($normalized -match $reminderPattern) {
        $seconds = ConvertTo-AssistantDurationSeconds -Amount $Matches['amount'] -Unit $Matches['unit']
        if ($seconds -gt 0) {
            $task = $Matches['task'].Trim()
            return New-AssistantCommandResult `
                -Action 'SetTimer' `
                -Target ([string]$seconds) `
                -Parameter $task `
                -Message "Certo. Vou lembrar você de $task."
        }
    }

    $timerPattern = '^(?:(?:crie|inicie|coloque|defina)\s+)?(?:um\s+)?(?:temporizador|timer|alarme)(?:\s+de|\s+para|\s+daqui a)?\s+(?<amount>' + $spokenNumber + ')\s+(?<unit>segundos?|minutos?|horas?)$'
    $notifyPattern = '^(?:me avise|avise|lembre me)(?:\s+daqui a|\s+em)\s+(?<amount>' + $spokenNumber + ')\s+(?<unit>segundos?|minutos?|horas?)$'
    if ($normalized -match $timerPattern -or $normalized -match $notifyPattern) {
        $seconds = ConvertTo-AssistantDurationSeconds -Amount $Matches['amount'] -Unit $Matches['unit']
        if ($seconds -gt 0) {
            return New-AssistantCommandResult `
                -Action 'SetTimer' `
                -Target ([string]$seconds) `
                -Parameter 'Temporizador concluído' `
                -Message 'Temporizador configurado.'
        }
    }

    # Notas locais. O texto original é preservado para não perder acentos.
    if ($rawCommand -match '^\s*(?:anote|anotar|crie uma nota(?: dizendo)?|adicione uma nota(?: dizendo)?)\s+(.+?)\s*$') {
        $note = $Matches[1].Trim()
        return New-AssistantCommandResult `
            -Action 'CreateNote' `
            -Parameter $note `
            -Message 'Nota salva no computador.'
    }
    if ($normalized -match '^(?:mostre|mostrar|abra|abrir|leia|ler)(?:\s+as|\s+minhas)?\s+notas$') {
        return New-AssistantCommandResult `
            -Action 'ShowNotes' `
            -Message 'Abrindo suas notas.'
    }
    if ($normalized -match '^(?:limpe|limpar|apague|apagar)(?:\s+as|\s+minhas)?\s+notas$') {
        return New-AssistantCommandResult `
            -Action 'ClearNotes' `
            -Message 'Isso apagará todas as notas salvas.' `
            -NeedsConfirmation $true
    }

    # Área de transferência.
    if ($rawCommand -match '^\s*(?:copie|copiar)(?:\s+para\s+a\s+(?:área|area)\s+de\s+(?:transferência|transferencia))?\s+(.+?)\s*$') {
        $textToCopy = $Matches[1].Trim()
        return New-AssistantCommandResult `
            -Action 'CopyToClipboard' `
            -Parameter $textToCopy `
            -Message 'Texto copiado para a área de transferência.'
    }
    if ($normalized -match '^(?:leia|ler|mostre|mostrar)(?:\s+o\s+que\s+esta\s+na|\s+a)?\s+area de transferencia$') {
        return New-AssistantCommandResult `
            -Action 'ReadClipboard' `
            -Message 'Lendo a área de transferência.'
    }

    # Respostas locais rápidas, sem internet ou IA.
    if ($normalized -match '^(?:que horas sao|qual e a hora|me diga as horas|horas)$') {
        return New-AssistantCommandResult -Action 'ShowTime' -Message 'Consultando a hora.'
    }
    if ($normalized -match '^(?:que dia e hoje|qual e a data|data de hoje|qual a data de hoje)$') {
        return New-AssistantCommandResult -Action 'ShowDate' -Message 'Consultando a data.'
    }
    if ($normalized -match '^(?:como esta a bateria|nivel da bateria|quanto de bateria|bateria)$') {
        return New-AssistantCommandResult -Action 'ShowBattery' -Message 'Consultando a bateria.'
    }
    if ($normalized -match '^(?:informacoes do computador|informacoes do sistema|meu computador|status do computador)$') {
        return New-AssistantCommandResult -Action 'ShowSystemInfo' -Message 'Consultando as informações do computador.'
    }

    $helpCommands = @(
        'ajuda',
        'comandos',
        'mostrar comandos',
        'o que voce faz',
        'o que voce pode fazer'
    )
    if ($helpCommands -contains $normalized) {
        return New-AssistantCommandResult `
            -Action 'Help' `
            -Message 'Posso abrir sites e aplicativos, pesquisar, responder com IA local, criar notas, copiar textos, informar data e hora, consultar a bateria e configurar lembretes. Veja mais exemplos no guia.'
    }

    $stopCommands = @(
        'pare de ouvir',
        'parar de ouvir',
        'desative o microfone',
        'desativar o microfone',
        'parar microfone'
    )
    if ($stopCommands -contains $normalized) {
        return New-AssistantCommandResult `
            -Action 'StopListening' `
            -Message 'Microfone pausado.'
    }

    $openPrefix = '(?:(?:abra|abrir|abre|acesse|acessar|entre|entrar|va para|ir para|inicie|iniciar)\s+)?'
    $article = '(?:(?:o|a|no|na|meu|minha)\s+)?'

    $sites = @(
        [PSCustomObject]@{ Pattern = '(?:youtube|you tube)'; Url = 'https://www.youtube.com/'; Name = 'YouTube' },
        [PSCustomObject]@{ Pattern = 'google'; Url = 'https://www.google.com/'; Name = 'Google' },
        [PSCustomObject]@{ Pattern = '(?:gmail|meu email|email)'; Url = 'https://mail.google.com/'; Name = 'Gmail' },
        [PSCustomObject]@{ Pattern = '(?:google maps|maps|mapas)'; Url = 'https://maps.google.com/'; Name = 'Google Maps' },
        [PSCustomObject]@{ Pattern = '(?:whatsapp|whatsapp web|whats app)'; Url = 'https://web.whatsapp.com/'; Name = 'WhatsApp Web' },
        [PSCustomObject]@{ Pattern = '(?:chatgpt|chat gpt)'; Url = 'https://chatgpt.com/'; Name = 'ChatGPT' },
        [PSCustomObject]@{ Pattern = 'github'; Url = 'https://github.com/'; Name = 'GitHub' },
        [PSCustomObject]@{ Pattern = 'spotify'; Url = 'https://open.spotify.com/'; Name = 'Spotify' },
        [PSCustomObject]@{ Pattern = 'netflix'; Url = 'https://www.netflix.com/'; Name = 'Netflix' },
        [PSCustomObject]@{ Pattern = 'instagram'; Url = 'https://www.instagram.com/'; Name = 'Instagram' },
        [PSCustomObject]@{ Pattern = 'facebook'; Url = 'https://www.facebook.com/'; Name = 'Facebook' },
        [PSCustomObject]@{ Pattern = 'linkedin'; Url = 'https://www.linkedin.com/'; Name = 'LinkedIn' },
        [PSCustomObject]@{ Pattern = '(?:outlook|hotmail)'; Url = 'https://outlook.live.com/'; Name = 'Outlook' },
        [PSCustomObject]@{ Pattern = '(?:onedrive|one drive)'; Url = 'https://onedrive.live.com/'; Name = 'OneDrive' }
    )

    foreach ($site in $sites) {
        $pattern = '^' + $openPrefix + $article + '(?:' + $site.Pattern + ')$'
        if ($normalized -match $pattern) {
            return New-AssistantCommandResult `
                -Action 'OpenUrl' `
                -Target $site.Url `
                -Message "Abrindo $($site.Name)."
        }
    }

    # Sites adicionais podem ser cadastrados no config.json, mas apenas HTTPS é aceito.
    foreach ($customSite in @($CustomSites)) {
        if ($null -eq $customSite -or [string]::IsNullOrWhiteSpace([string]$customSite.url)) {
            continue
        }

        $customUri = $null
        if (
            -not [System.Uri]::TryCreate([string]$customSite.url, [System.UriKind]::Absolute, [ref]$customUri) -or
            $customUri.Scheme -ne 'https'
        ) {
            continue
        }

        foreach ($alias in @($customSite.aliases)) {
            $normalizedAlias = ConvertTo-AssistantNormalizedText -Text ([string]$alias)
            if ([string]::IsNullOrWhiteSpace($normalizedAlias)) {
                continue
            }
            $escapedAlias = [System.Text.RegularExpressions.Regex]::Escape($normalizedAlias)
            $pattern = '^' + $openPrefix + $article + $escapedAlias + '$'
            if ($normalized -match $pattern) {
                $customName = if ([string]::IsNullOrWhiteSpace([string]$customSite.name)) {
                    $normalizedAlias
                }
                else {
                    [string]$customSite.name
                }
                return New-AssistantCommandResult `
                    -Action 'OpenUrl' `
                    -Target $customUri.AbsoluteUri `
                    -Message "Abrindo $customName."
            }
        }
    }

    $applications = @(
        [PSCustomObject]@{ Pattern = 'calculadora'; Target = 'calc.exe'; Name = 'a calculadora' },
        [PSCustomObject]@{ Pattern = '(?:bloco de notas|notepad)'; Target = 'notepad.exe'; Name = 'o Bloco de Notas' },
        [PSCustomObject]@{ Pattern = '(?:explorador de arquivos|explorador|meus arquivos)'; Target = 'explorer.exe'; Name = 'o Explorador de Arquivos' },
        [PSCustomObject]@{ Pattern = '(?:paint|pintura)'; Target = 'mspaint.exe'; Name = 'o Paint' },
        [PSCustomObject]@{ Pattern = '(?:visual studio code|vs code|vscode)'; Target = 'code'; Name = 'o Visual Studio Code' },
        [PSCustomObject]@{ Pattern = '(?:terminal|windows terminal)'; Target = 'wt.exe'; Name = 'o Terminal' },
        [PSCustomObject]@{ Pattern = '(?:configuracoes|configuracoes do windows)'; Target = 'ms-settings:'; Name = 'as Configurações' },
        [PSCustomObject]@{ Pattern = '(?:captura de tela|ferramenta de captura|recorte)'; Target = 'ms-screenclip:'; Name = 'a ferramenta de captura' },
        [PSCustomObject]@{ Pattern = 'camera'; Target = 'microsoft.windows.camera:'; Name = 'a câmera' }
    )

    foreach ($application in $applications) {
        $pattern = '^' + $openPrefix + $article + '(?:' + $application.Pattern + ')$'
        if ($normalized -match $pattern) {
            return New-AssistantCommandResult `
                -Action 'OpenApplication' `
                -Target $application.Target `
                -Message "Abrindo $($application.Name)."
        }
    }

    $folders = @(
        [PSCustomObject]@{ Pattern = '(?:pasta de )?downloads'; Target = 'Downloads'; Name = 'Downloads' },
        [PSCustomObject]@{ Pattern = '(?:pasta de |meus )?documentos'; Target = 'Documents'; Name = 'Documentos' },
        [PSCustomObject]@{ Pattern = '(?:area de trabalho|desktop)'; Target = 'Desktop'; Name = 'Área de Trabalho' },
        [PSCustomObject]@{ Pattern = '(?:pasta de )?imagens'; Target = 'Pictures'; Name = 'Imagens' },
        [PSCustomObject]@{ Pattern = '(?:pasta de )?musicas'; Target = 'Music'; Name = 'Músicas' },
        [PSCustomObject]@{ Pattern = '(?:pasta de )?videos'; Target = 'Videos'; Name = 'Vídeos' }
    )

    foreach ($folder in $folders) {
        $pattern = '^' + $openPrefix + $article + '(?:' + $folder.Pattern + ')$'
        if ($normalized -match $pattern) {
            return New-AssistantCommandResult `
                -Action 'OpenFolder' `
                -Target $folder.Target `
                -Message "Abrindo a pasta $($folder.Name)."
        }
    }

    # Nunca transforma texto desconhecido em comando de sistema. O aplicativo pode
    # encaminhá-lo para a IA local apenas para resposta ou classificação segura.
    return New-AssistantCommandResult `
        -Action 'Unknown' `
        -Parameter $rawCommand `
        -Message 'Não reconheci um comando direto. Vou verificar se a IA local consegue ajudar.'
}
