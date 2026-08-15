$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

. (Join-Path (Split-Path $PSScriptRoot -Parent) 'Assistente.Core.ps1')

$testCases = @(
    [PSCustomObject]@{
        Command   = 'abra o YouTube'
        Action    = 'OpenUrl'
        Target    = 'https://www.youtube.com/'
        Parameter = ''
    },
    [PSCustomObject]@{
        Command   = 'VÁ PARA O YOUTUBE'
        Action    = 'OpenUrl'
        Target    = 'https://www.youtube.com/'
        Parameter = ''
    },
    [PSCustomObject]@{
        Command   = 'pesquise no YouTube por música brasileira'
        Action    = 'SearchYouTube'
        Target    = ''
        Parameter = 'música brasileira'
    },
    [PSCustomObject]@{
        Command   = 'procure no Google por receita de pão'
        Action    = 'SearchWeb'
        Target    = ''
        Parameter = 'receita de pão'
    },
    [PSCustomObject]@{
        Command   = 'abra a calculadora'
        Action    = 'OpenApplication'
        Target    = 'calc.exe'
        Parameter = ''
    },
    [PSCustomObject]@{
        Command   = 'pare de ouvir'
        Action    = 'StopListening'
        Target    = ''
        Parameter = ''
    },
    [PSCustomObject]@{
        Command   = 'abra example.com'
        Action    = 'Unknown'
        Target    = ''
        Parameter = ''
    },
    [PSCustomObject]@{
        Command   = 'execute format c:'
        Action    = 'Unknown'
        Target    = ''
        Parameter = ''
    }
)

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

Write-Host "`nTodos os $($testCases.Count) testes passaram." -ForegroundColor Green
