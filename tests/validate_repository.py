#!/usr/bin/env python3
"""Validações estáticas que podem rodar fora do Windows."""

from __future__ import annotations

import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REQUIRED_FILES = (
    "Assistente.ps1",
    "Assistente.Core.ps1",
    "Iniciar Assistente.bat",
    "Instalar Atalho.bat",
    "Instalar-Atalho.ps1",
    "README.md",
)
REQUIRED_CONTROLS = {
    "MainWindow",
    "CommandInput",
    "SendButton",
    "ListenButton",
    "VoiceStatusText",
    "StatusDot",
    "HistoryTextBox",
    "YouTubeButton",
}


def fail(message: str) -> None:
    print(f"ERRO: {message}", file=sys.stderr)
    raise SystemExit(1)


def main() -> None:
    missing = [name for name in REQUIRED_FILES if not (ROOT / name).is_file()]
    if missing:
        fail(f"arquivos obrigatórios ausentes: {', '.join(missing)}")

    app_source = (ROOT / "Assistente.ps1").read_text(encoding="utf-8")
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

    core_source = (ROOT / "Assistente.Core.ps1").read_text(encoding="utf-8")
    if "Invoke-Expression" in app_source or "Invoke-Expression" in core_source:
        fail("Invoke-Expression não deve ser usado pelo assistente")
    if "https://www.youtube.com/" not in core_source:
        fail("o destino seguro do YouTube não está configurado")

    print(f"OK: {len(REQUIRED_FILES)} arquivos obrigatórios encontrados.")
    print(f"OK: XAML válido, com {len(names)} controles nomeados e sem nomes duplicados.")
    print("OK: verificações básicas de segurança concluídas.")


if __name__ == "__main__":
    main()
