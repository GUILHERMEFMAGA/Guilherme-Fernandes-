@echo off
setlocal
cd /d "%~dp0"

where code >nul 2>nul
if errorlevel 1 (
    echo O comando do Visual Studio Code nao foi encontrado.
    echo A pagina oficial de download sera aberta.
    echo Durante a instalacao, marque a opcao para adicionar o VS Code ao PATH.
    pause
    start "" "https://code.visualstudio.com/download"
    exit /b 0
)

start "" code "%~dp0"
endlocal
