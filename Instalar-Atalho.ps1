$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

Add-Type -AssemblyName PresentationFramework

try {
    $specialFolderType = [System.Environment].GetNestedType('SpecialFolder')
    $desktopFolder = [System.Enum]::Parse($specialFolderType, 'DesktopDirectory')
    $desktopPath = [System.Environment]::GetFolderPath($desktopFolder)
    $shortcutPath = Join-Path $desktopPath 'Assistente Guilherme.lnk'
    $powerShellPath = Join-Path $env:SystemRoot 'System32\WindowsPowerShell\v1.0\powershell.exe'
    $assistantPath = Join-Path $PSScriptRoot 'Assistente.ps1'

    if (-not (Test-Path $assistantPath)) {
        throw "O arquivo Assistente.ps1 não foi encontrado em $PSScriptRoot."
    }

    $shell = New-Object -ComObject WScript.Shell
    $shortcut = $shell.CreateShortcut($shortcutPath)
    $shortcut.TargetPath = $powerShellPath
    $shortcut.Arguments = "-NoLogo -NoProfile -ExecutionPolicy Bypass -STA -File `"$assistantPath`""
    $shortcut.WorkingDirectory = $PSScriptRoot
    $shortcut.Description = 'Assistente por voz para abrir sites e aplicativos seguros'
    $shortcut.IconLocation = "$env:SystemRoot\System32\SHELL32.dll,220"
    $shortcut.Save()

    [System.Windows.MessageBox]::Show(
        "O atalho foi criado na Área de Trabalho.`n`nMantenha esta pasta no mesmo lugar para o atalho continuar funcionando.",
        'Assistente Guilherme',
        [System.Windows.MessageBoxButton]::OK,
        [System.Windows.MessageBoxImage]::Information
    ) | Out-Null
}
catch {
    [System.Windows.MessageBox]::Show(
        "Não foi possível criar o atalho.`n`n$($_.Exception.Message)",
        'Assistente Guilherme',
        [System.Windows.MessageBoxButton]::OK,
        [System.Windows.MessageBoxImage]::Error
    ) | Out-Null
    exit 1
}
