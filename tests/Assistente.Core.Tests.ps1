$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

. (Join-Path (Split-Path $PSScriptRoot -Parent) 'Assistente.Core.ps1')

$testCases = @(
    [PSCustomObject]@{
        Command = 'Ei Guilherme, abra o YouTube'; Action = 'OpenUrl'
        Target = 'https://www.youtube.com/'; Parameter = ''
    },
    [PSCustomObject]@{
        Command = 'VÁ PARA O YOU TUBE'; Action = 'OpenUrl'
        Target = 'https://www.youtube.com/'; Parameter = ''
    },
    [PSCustomObject]@{
        Command = 'abre o Whats App'; Action = 'OpenUrl'
        Target = 'https://web.whatsapp.com/'; Parameter = ''
    },
    [PSCustomObject]@{
        Command = 'pesquise no YouTube por música brasileira'; Action = 'SearchYouTube'
        Target = ''; Parameter = 'música brasileira'
    },
    [PSCustomObject]@{
        Command = 'procure no Google por receita de pão'; Action = 'SearchWeb'
        Target = ''; Parameter = 'receita de pão'
    },
    [PSCustomObject]@{
        Command = 'abra a calculadora'; Action = 'OpenApplication'
        Target = 'calc.exe'; Parameter = ''
    },
    [PSCustomObject]@{
        Command = 'abra o Visual Studio Code'; Action = 'OpenApplication'
        Target = 'code'; Parameter = ''
    },
    [PSCustomObject]@{
        Command = 'abra meus documentos'; Action = 'OpenFolder'
        Target = 'Documents'; Parameter = ''
    },
    [PSCustomObject]@{
        Command = 'anote consulta médica amanhã'; Action = 'CreateNote'
        Target = ''; Parameter = 'consulta médica amanhã'
    },
    [PSCustomObject]@{
        Command = 'temporizador de 30 segundos'; Action = 'SetTimer'
        Target = '30'; Parameter = 'Temporizador concluído'
    },
    [PSCustomObject]@{
        Command = 'me lembre de beber agua em vinte e cinco minutos'; Action = 'SetTimer'
        Target = '1500'; Parameter = 'beber agua'
    },
    [PSCustomObject]@{
        Command = 'que horas são'; Action = 'ShowTime'
        Target = ''; Parameter = ''
    },
    [PSCustomObject]@{
        Command = 'bateria'; Action = 'ShowBattery'
        Target = ''; Parameter = ''
    },
    [PSCustomObject]@{
        Command = 'pare de ouvir'; Action = 'StopListening'
        Target = ''; Parameter = ''
    },
    [PSCustomObject]@{
        Command = 'abra example.com'; Action = 'Unknown'
        Target = ''; Parameter = 'abra example.com'
    },
    [PSCustomObject]@{
        Command = 'execute format c:'; Action = 'Unknown'
        Target = ''; Parameter = 'execute format c:'
    }
)

$customSites = @(
    [PSCustomObject]@{
        name = 'Meu Painel'
        aliases = @('meu painel')
        url = 'https://example.com/dashboard'
    }
)
$customResult = Resolve-AssistantCommand -Command 'abra meu painel' -CustomSites $customSites
if ($customResult.Action -ne 'OpenUrl' -or $customResult.Target -ne 'https://example.com/dashboard') {
    throw 'O teste de site HTTPS personalizado falhou.'
}

$unsafeCustomSites = @(
    [PSCustomObject]@{
        name = 'Inseguro'
        aliases = @('site inseguro')
        url = 'http://example.com/'
    }
)
$unsafeResult = Resolve-AssistantCommand -Command 'abra site inseguro' -CustomSites $unsafeCustomSites
if ($unsafeResult.Action -ne 'Unknown') {
    throw 'Um site personalizado sem HTTPS foi aceito indevidamente.'
}

$failed = 0
foreach ($testCase in $testCases) {
    $actual = Resolve-AssistantCommand -Command $testCase.Command
    $errors = @()

    if ($actual.Action -ne $testCase.Action) {
        $errors += "Action: esperado '$($testCase.Action)', recebido '$($actual.Action)'"
    }
    if ($actual.Target -ne $testCase.Target) {
        $errors += "Target: esperado '$($testCase.Target)', recebido '$($actual.Target)'"
    }
    if ($actual.Parameter -ne $testCase.Parameter) {
        $errors += "Parameter: esperado '$($testCase.Parameter)', recebido '$($actual.Parameter)'"
    }

    if ($errors.Count -gt 0) {
        $failed += 1
        Write-Host "FALHOU: $($testCase.Command)" -ForegroundColor Red
        foreach ($errorMessage in $errors) {
            Write-Host "  - $errorMessage" -ForegroundColor Red
        }
    }
    else {
        Write-Host "PASSOU: $($testCase.Command)" -ForegroundColor Green
    }
}

if ($failed -gt 0) {
    throw "$failed teste(s) falharam."
}

Write-Host "`nTodos os $($testCases.Count) testes e as verificações de sites personalizados passaram." -ForegroundColor Green
