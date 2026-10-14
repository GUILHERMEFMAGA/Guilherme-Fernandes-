# Guilherme-Fernandes-
<img width="800" height="450" alt="b_deixe_um_pouco_mais_-ezgif com-video-to-gif-converter" src="https://github.com/user-attachments/assets/a73e7bcd-c59c-463b-8b60-aae618b7e519" />
 
---

## 🎮 Arcade

Dois jogos neste repositório, cada um na sua pasta: **HTML + Canvas puro, sem nenhuma
dependência**. Sprites, fontes, texturas e áudio são gerados por código — nada de CDN, nada de
arquivo de imagem ou som.

▶️ **Como jogar:** abra [`index.html`](index.html) e escolha o jogo.

```bash
# ou sirva por HTTP
python3 -m http.server 8000
# abra http://localhost:8000/
```

---

## 🕹️ Pixel Tanks — arcade retrô

Batalha de tanques em pixel art, com sprites, fonte bitmap e chiptune gerados por código.

- **Duelo** — melhor de 5 rodadas contra a CPU ou em 2 jogadores no mesmo teclado
- **Sobrevivência** — ondas infinitas, itens e recorde salvo no navegador

📖 Detalhes, controles e mapas: [`pixel-tanks/README.md`](pixel-tanks/README.md)
🧪 Testes (rodam no Node, sem navegador): `node pixel-tanks/test/headless.js`

---

## 🎯 Fogo Cruzado — tático / simulação

Você comanda um esquadrão de quatro soldados em missões onde **visão limitada, cobertura,
balística e supressão** decidem quem volta para casa.

- **Visão** — sombra de linha real: parede, caixote e árvore bloqueiam; névoa de guerra com
  memória do que já foi visto
- **Simulação** — penetração por material, recarga com pente, sangramento, morte permanente,
  supressão que derruba a mira, granadas e fumaça
- **4 operações** — destruir 2 postos, destruir 3 paióis, segurar a praça por 75 s e arena
- **Modo solo** (com IA aliada) ou **dupla** no mesmo teclado

📖 Detalhes, controles e sistema: [`fogo-cruzado/README.md`](fogo-cruzado/README.md)
🧪 Testes (rodam no Node, sem navegador): `node fogo-cruzado/test/headless.js`
