@echo off
setlocal
cd /d "%~dp0"

title Assistente Guilherme

if not exist "%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" (
    echo Nao foi possivel encontrar o Windows PowerShell.
    echo Este aplicativo requer Windows 10 ou Windows 11.
    pause
    exit /b 1
)

"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" ^
    -NoLogo ^
    -NoProfile ^
    -ExecutionPolicy Bypass ^
    -STA ^
    -File "%~dp0Assistente.ps1"

if errorlevel 1 (
    echo.
    echo O Assistente encontrou um erro ao iniciar.
    echo Consulte a secao "Solucao de problemas" do README.md.
    pause
)

endlocal
