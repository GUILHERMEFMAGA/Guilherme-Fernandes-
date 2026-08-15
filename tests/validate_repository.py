#!/usr/bin/env python3
"""Validações estáticas que podem rodar fora do Windows."""

from __future__ import annotations

import json
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REQUIRED_FILES = (
    "Assistente.ps1",
    "Assistente.Core.ps1",
    "Assistente.Services.ps1",
    "Iniciar Assistente.bat",
    "Instalar Atalho.bat",
    "Instalar-Atalho.ps1",
    "Configurar IA Local.bat",
    "Abrir no VS Code.bat",
    "config.json",
    "GUIA-COMANDOS.md",
    "README.md",
)
REQUIRED_CONTROLS = {
    "MainWindow",
    "CommandInput",
    "SendButton",
    "ListenButton",
    "VoiceStatusText",
    "StatusDot",
    "AiStatusText",
    "AiStatusDot",
    "HistoryTextBox",
    "YouTubeButton",
    "WhatsAppButton",
    "RefreshAiButton",
    "ConfigButton",
}


def fail(message: str) -> None:
    print(f"ERRO: {message}", file=sys.stderr)
    raise SystemExit(1)


def main() -> None:
    missing = [name for name in REQUIRED_FILES if not (ROOT / name).is_file()]
    if missing:
        fail(f"arquivos obrigatórios ausentes: {', '.join(missing)}")

    app_source = (ROOT / "Assistente.ps1").read_text(encoding="utf-8-sig")
    match = re.search(r"\[xml\]\$xaml\s*=\s*@'\n(.*?)\n'@", app_source, re.DOTALL)
    if not match:
        fail("não foi possível localizar o bloco XAML em Assistente.ps1")

    try:
        root = ET.fromstring(match.group(1))
    except ET.ParseError as error:
        fail(f"XAML malformado: {error}")

    x_name = "{http://schemas.microsoft.com/winfx/2006/xaml}Name"
    names = [element.attrib[x_name] for element in root.iter() if x_name in element.attrib]
    duplicates = sorted({name for name in names if names.count(name) > 1})
    if duplicates:
        fail(f"x:Name duplicado no XAML: {', '.join(duplicates)}")

    absent_controls = sorted(REQUIRED_CONTROLS.difference(names))
    if absent_controls:
        fail(f"controles essenciais ausentes: {', '.join(absent_controls)}")

    try:
        config = json.loads((ROOT / "config.json").read_text(encoding="utf-8"))
    except (json.JSONDecodeError, UnicodeDecodeError) as error:
        fail(f"config.json inválido: {error}")

    if not isinstance(config.get("customSites"), list):
        fail("config.json deve conter uma lista customSites")
    for site in config["customSites"]:
        if not str(site.get("url", "")).startswith("https://"):
            fail("todos os sites personalizados padrão devem usar HTTPS")

    powershell_sources = "\n".join(
        (ROOT / name).read_text(encoding="utf-8-sig")
        for name in ("Assistente.ps1", "Assistente.Core.ps1", "Assistente.Services.ps1")
    )
    if "Invoke-Expression" in powershell_sources:
        fail("Invoke-Expression não deve ser usado pelo assistente")
    if "http://127.0.0.1:11434" not in powershell_sources:
        fail("a integração com Ollama deve permanecer limitada ao serviço local")
    if "https://www.youtube.com/" not in powershell_sources:
        fail("o destino seguro do YouTube não está configurado")
    if "https://web.whatsapp.com/" not in powershell_sources:
        fail("o destino seguro do WhatsApp não está configurado")

    ps1_without_bom = []
    for path in ROOT.rglob("*.ps1"):
        if not path.read_bytes().startswith(b"\xef\xbb\xbf"):
            ps1_without_bom.append(str(path.relative_to(ROOT)))
    if ps1_without_bom:
        fail(
            "scripts sem BOM UTF-8, incompatíveis com acentos no Windows PowerShell 5.1: "
            + ", ".join(ps1_without_bom)
        )

    print(f"OK: {len(REQUIRED_FILES)} arquivos obrigatórios encontrados.")
    print(f"OK: XAML válido, com {len(names)} controles nomeados e sem nomes duplicados.")
    print("OK: config.json válido e sites personalizados usam HTTPS.")
    print("OK: integração de IA limitada ao Ollama local e sem Invoke-Expression.")
    print("OK: scripts PowerShell usam codificação compatível com Windows PowerShell 5.1.")


if __name__ == "__main__":
    main()
