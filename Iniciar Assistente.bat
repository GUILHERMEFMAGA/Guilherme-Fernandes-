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

if not exist "%~dp0Assistente.ps1" goto :missing
if not exist "%~dp0Assistente.Core.ps1" goto :missing
if not exist "%~dp0Assistente.Services.ps1" goto :missing
if not exist "%~dp0config.json" goto :missing

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
exit /b 0

:missing
echo Um ou mais arquivos do Assistente estao faltando.
echo Extraia novamente a pasta inteira antes de iniciar.
pause
endlocal
exit /b 1
