@echo off
setlocal
cd /d "%~dp0"
title Configurar IA Local - Assistente Guilherme

echo =====================================================
echo     CONFIGURAR IA LOCAL - ASSISTENTE GUILHERME
echo =====================================================
echo.
echo A IA usa o Ollama no seu proprio computador.
echo Nenhuma chave de API e necessaria.
echo.

where ollama >nul 2>nul
if errorlevel 1 (
    echo O Ollama ainda nao esta instalado.
    echo A pagina oficial sera aberta para voce baixar a versao Windows.
    echo Depois de instalar, execute este arquivo novamente.
    echo.
    pause
    start "" "https://ollama.com/download/windows"
    exit /b 0
)

echo Ollama encontrado:
ollama --version
echo.
echo O modelo recomendado e qwen3:4b.
echo O download pode usar alguns gigabytes de internet e de disco.
echo Computadores com pouca memoria podem preferir um modelo menor.
echo.
choice /C SN /M "Deseja baixar ou atualizar qwen3:4b agora"
if errorlevel 2 (
    echo Operacao cancelada. Nenhuma alteracao foi feita.
    pause
    exit /b 0
)

echo.
echo Baixando o modelo. Nao feche esta janela...
ollama pull qwen3:4b
if errorlevel 1 (
    echo.
    echo Nao foi possivel baixar o modelo.
    echo Abra o aplicativo Ollama pelo menu Iniciar e tente novamente.
    pause
    exit /b 1
)

echo.
echo IA local configurada com sucesso.
echo Abra o Assistente e clique em "Verificar IA".
pause
endlocal
