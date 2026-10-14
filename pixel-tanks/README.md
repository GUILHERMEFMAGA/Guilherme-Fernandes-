# 🕹️ Pixel Tanks

Arcade de tanques em **pixel art**, feito com HTML + Canvas puro (zero dependências).
Duas famílias se enfrentam numa arena 20×12: proteja sua base e destrua todo mundo.

![estilo](https://img.shields.io/badge/pixel%20art-8--bits-ffd24a?style=flat-square)
![tech](https://img.shields.io/badge/HTML%20Canvas-vanilla-3fc04a?style=flat-square)
![sem deps](https://img.shields.io/badge/depend%C3%AAncias-0-2fa8ff?style=flat-square)

---

## ▶️ Como jogar

Abra `index.html` no navegador — é só isso. Funciona direto do disco (`file://`),
sem servidor, sem build, sem instalar nada.

Se quiser servir por HTTP:

```bash
python3 -m http.server 8000 --directory pixel-tanks
# abra http://localhost:8000
```

## 🎮 Modos

| Modo | O que é |
| --- | --- |
| **Duelo** | Melhor de 5 rodadas. Vence quem destruir o tanque inimigo — ou a base dele. Contra a CPU ou em 2 jogadores. |
| **Sobrevivência** | Ondas infinitas de tanques. Cada onda fica mais rápida e mais agressiva. Ataque a sua base e a partida acaba. |

### Inimigos

| Tanque | Comportamento | Pontos |
| --- | --- | --- |
| 🟡 Grunhido | Lento, erra bastante, atira de longe | 100 |
| 🟠 Veloz | Corre atrás de você e atira colado | 200 |
| 🟣 Atirador | Devagar, mas mira e atira com precisão | 300 |

### Itens

Caem na arena de tempo em tempo e duram ~16 segundos:

- 🛡️ **Escudo** — imune a tiros (e seu tiro atravessa tijolos)
- ⚡ **Turbo** — 50% mais rápido
- 🟩 **Ricochete** — os tiros quicam nas paredes
- 🟨 **Tiro rápido** — recarga quase instantânea e até 3 tiros na tela

## ⌨️ Controles

| | Mover | Atirar |
| --- | --- | --- |
| **Jogador 1** | `←` `↑` `↓` `→` (ou `WASD` no 1 jogador) | `Espaço` / `X` / `Enter` |
| **Jogador 2** | `W` `A` `S` `D` | `Enter` / `Shift` direito |

- `Enter` — confirmar no menu
- `P` ou `Esc` — pausar
- `Esc` — voltar no menu
- `M` — ligar/desligar som
- `F` — tela cheia

## ✨ Detalhes técnicos

Tudo é gerado por código — não existe nenhum arquivo de imagem nem de áudio:

- **Sprites** desenhados em pixel art 1:1 dentro do próprio código (o tanque é
  14×14, cada direção é um giro da matriz de pixels).
- **Fonte bitmap 5×7** desenhada à mão, com acentos (Á, Ã, Ç, Ó…) compostos por
  marcas posicionadas acima/abaixo do glifo.
- **Áudio chiptune** em WebAudio: ondas quadradas/triangulares para o tema,
  ruído filtrado para explosões e tijolos. A música é um sequenciador de 16 passos.
- **Resolução virtual** 320×224 escalada por CSS com `image-rendering: pixelated`.
- **RequestAnimationFrame** com passo fixo de 60 Hz (lógica independente da taxa
  de quadros do monitor).
- **Tijolos de dois toques**: o primeiro tiro racha, o segundo abre passagem.
- **60 segundos de rodada** e as paredes de tijolo começam a desmoronar, para
  nenhuma partida ficar travada.

## 🧪 Testes

O jogo roda fora do navegador com um canvas de mentira, simulando teclado e
milhares de frames de partida real:

```bash
node test/headless.js
```

Cobre: sprites, mapas, menu, partida completa de duelo, sobrevivência com ondas,
co-op 2 jogadores, respawn, base destruída, tijolo de dois toques, pausa/som,
ligação do HTML com os IDs usados no JS e ausência de módulos ES6.

## 📁 Estrutura

```
pixel-tanks/
├── index.html        página + canvas + placar
├── style.css         visual do gabinete (fora do canvas)
├── js/
│   ├── const.js      resolução, tempos, paletas
│   ├── font.js       fonte bitmap 5x7 com acentos
│   ├── sprites.js    pixel art dos tanques, itens e paredes
│   ├── audio.js      efeitos e música chiptune
│   ├── maps.js       arenas em ASCII
│   ├── game.js       motor: física, colisão, IA, render
│   └── main.js       loop de 60 fps, teclado e placar
└── test/
    └── headless.js   suite de testes sem navegador
```

## 🗺️ Mapas

As arenas são escritas em ASCII e viram colisão de verdade:

```js
'..####........####..',
'..#..==......==..#..',
'.....##......##.....',
'..1.....####.....2..',   // 1 = spawn do jogador 1, 2 = do jogador 2
'........#BB#........'    // B = base, # tijolo, = aço
```
