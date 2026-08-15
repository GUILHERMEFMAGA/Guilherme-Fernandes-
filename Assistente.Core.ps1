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
        [string]$Message = ''
    )

    return [PSCustomObject]@{
        Action    = $Action
        Target    = $Target
        Parameter = $Parameter
        Message   = $Message
    }
}

function Resolve-AssistantCommand {
    param(
        [AllowEmptyString()]
        [string]$Command
    )

    $rawCommand = if ($null -eq $Command) { '' } else { $Command.Trim() }
    $normalized = ConvertTo-AssistantNormalizedText -Text $rawCommand

    if ([string]::IsNullOrWhiteSpace($normalized)) {
        return New-AssistantCommandResult `
            -Action 'Unknown' `
            -Message 'Digite ou diga um comando para eu executar.'
    }

    # A busca no YouTube precisa vir antes da regra que simplesmente abre o site.
    $youtubeSearchPattern = '^\s*(?:pesquise|pesquisar|procure|procurar|busque|buscar)\s+(?:no|na|em)\s+(?:o\s+)?youtube\s+(?:por\s+)?(.+?)\s*$'
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
            -Message 'Posso abrir sites seguros, pesquisar no Google ou YouTube e abrir alguns aplicativos do Windows. Veja os exemplos na tela.'
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

    $openPrefix = '(?:(?:abra|abrir|abre|acesse|acessar|entre|entrar|va para|ir para)\s+)?'
    $article = '(?:(?:o|a|no|na)\s+)?'

    $sites = @(
        [PSCustomObject]@{
            Pattern = 'youtube'
            Url     = 'https://www.youtube.com/'
            Name    = 'YouTube'
        },
        [PSCustomObject]@{
            Pattern = 'google'
            Url     = 'https://www.google.com/'
            Name    = 'Google'
        },
        [PSCustomObject]@{
            Pattern = '(?:gmail|meu email|email)'
            Url     = 'https://mail.google.com/'
            Name    = 'Gmail'
        },
        [PSCustomObject]@{
            Pattern = '(?:google maps|maps|mapas)'
            Url     = 'https://maps.google.com/'
            Name    = 'Google Maps'
        },
        [PSCustomObject]@{
            Pattern = '(?:whatsapp|whatsapp web)'
            Url     = 'https://web.whatsapp.com/'
            Name    = 'WhatsApp Web'
        },
        [PSCustomObject]@{
            Pattern = '(?:chatgpt|chat gpt)'
            Url     = 'https://chatgpt.com/'
            Name    = 'ChatGPT'
        },
        [PSCustomObject]@{
            Pattern = 'github'
            Url     = 'https://github.com/'
            Name    = 'GitHub'
        }
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

    $applications = @(
        [PSCustomObject]@{
            Pattern = 'calculadora'
            Target  = 'calc.exe'
            Name    = 'a calculadora'
        },
        [PSCustomObject]@{
            Pattern = '(?:bloco de notas|notepad)'
            Target  = 'notepad.exe'
            Name    = 'o Bloco de Notas'
        },
        [PSCustomObject]@{
            Pattern = '(?:explorador de arquivos|explorador|meus arquivos)'
            Target  = 'explorer.exe'
            Name    = 'o Explorador de Arquivos'
        }
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

    return New-AssistantCommandResult `
        -Action 'Unknown' `
        -Message 'Não reconheci esse comando. Tente “abra o YouTube”, “pesquise no YouTube por música” ou “ajuda”.'
}
