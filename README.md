# Guilherme-Fernandes-

<img width="800" height="450" alt="b_deixe_um_pouco_mais_-ezgif com-video-to-gif-converter" src="https://github.com/user-attachments/assets/a73e7bcd-c59c-463b-8b60-aae618b7e519" />

## PIXEL CRIME CITY — jogo estilo GTA 1

Jogo de cidade aberta em **pixel art com visão top-down**, feito em HTML5 + Canvas puro
(sem dependências, sem imagem de fundo: todos os tiles, prédios, carros e pedestres são
desenhados proceduralmente em pixel).

A cena de referência usada como base está em [`assets/gta1_city.png`](assets/gta1_city.png)
e aparece na tela inicial.

### Como jogar

```bash
python3 -m http.server 8080
# abra http://localhost:8080
```

| Tecla | Ação |
| --- | --- |
| `W A S D` / setas | andar a pé / dirigir |
| `E` ou `ENTER` | entrar e sair do carro (inclusive roubando o do motorista) |
| `F` ou clique do mouse | atirar |
| `ESPAÇO` | freio de mão (derrapa e deixa marcas de pneu) |
| `P` | pausa |
| `M` | liga/desliga o som |
| `R` | recomeçar |

No celular há joystick virtual + botões `E` (entrar/sair) e `F` (atirar / freio de mão).

### O que tem no jogo

* Cidade de 104×104 tiles gerada proceduralmente: ruas de mão dupla com faixa dupla
  amarela, faixas de pedestre, calçadas com guia, quarteirões com prédios em
  pseudo-3D (sombra projetada, ar-condicionado, claraboias, piscinas e helipontos),
  parques com fonte, estacionamentos, praças e canteiros de obra.
* 17 modelos de carro (sedã, esportivo, van, picape, caminhão, táxi, viatura) com
  32 ângulos de rotação cada, faróis, luzes de freio e giroflex na polícia.
* Tráfego com IA de waypoints: anda na faixa da direita, freia para o carro da frente,
  dobra nos cruzamentos, buzina, desatola dando ré e volta para o asfalto se sair da pista.
* Pedestres com sprites próprios (4 direções × 3 quadros) que caminham pelas calçadas,
  fogem de tiros e de carros em alta velocidade.
* Sistema de procurado de 1 a 5 estrelas: viaturas perseguem, e se você estiver a pé
  e encostarem em você → **BUSTED** (perde $300).
* Atropelar, atirar e explodir carros dá dinheiro (e aumenta o procurado).
* Carros pegam fogo, explodem e viram sucata; há marcas de pneu, sangue, fumaça e fagulhas.
* HUD retrô: dinheiro, barra de vida, estrelas de procurado, radar (minimapa),
  velocímetro em km/h e nome do carro.
* Áudio sintetizado com WebAudio: motor (som que acompanha a rotação), tiros,
  explosões, batidas, sirene e freada.

### Código

```
index.html          tela, estilo, menu e controles de toque
js/pixel.js         utilitários + texturas de tile + fábrica de sprites (carros, pedestres, props)
js/world.js         geração da cidade, malha viária (faixas e cruzamentos), bake do chão, minimapa
js/entities.js      carros, pedestres, balas, partículas e colisões
js/game.js          loop, input, câmera, HUD, áudio e regras (procurado, wasted/busted)
tools/smoke.js      teste de fumaça: roda a lógica em Node com canvas falso
```

`node tools/smoke.js 3000` roda 50 s de simulação com input aleatório e imprime
estatísticas (tráfego, engarrafamentos, mortes, explosões). Modos extras:
`node tools/smoke.js 10 geo` valida a malha viária e `node tools/smoke.js 100 drive`
mede a distância percorrida dirigindo em linha reta.
