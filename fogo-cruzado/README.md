# FOGO CRUZADO

Jogo de **esquadrão tático** com foco em simulação: você comanda um grupo de quatro soldados em
missões onde visão limitada, cobertura, balística e supressão decidem quem volta para casa.

HTML + Canvas puro, **sem nenhuma dependência externa** — sprites, texturas, mapas, efeitos e
áudio são gerados por código. Sem build, sem instalar nada.

▶️ **Como jogar:** abra [`index.html`](index.html) no navegador (funciona direto do disco).

```bash
# ou sirva por HTTP
python3 -m http.server 8000
# abra http://localhost:8000/fogo-cruzado/
```

---

## Modos de jogo

| Modo | O que é |
| --- | --- |
| **OPERAÇÃO SOLO** | Você comanda o esquadrão contra a IA. Um soldado é seu, os outros três agem sozinhos (e continuam agindo quando você troca de personagem). |
| **DUPLA (2 JOGADORES)** | Dois soldados controláveis ao mesmo tempo no mesmo teclado: WASD + mouse na metade esquerda, setas + Enter para o segundo jogador. |

Escolhido o modo, o menu seguinte lista as **4 operações**:

| Missão | Mapa | Objetivo |
| --- | --- | --- |
| **CERCO NA ESTRADA** | estrada de terra com galpões | destruir 2 postos de comunicação |
| **DEPOSITO DE MUNICAO** | depósito com caixotes e salas | destruir 3 paióis |
| **PRACA CENTRAL** | praça murada de concreto e metal | segurar a área até o relógio zerar (75 s), com reforços inimigos chegando a cada 18 s |
| **ARENA DE TRAINING** | arena aberta | eliminar a patrulha (mapa do duelo em 2 jogadores) |

Toda missão tem **limite de tempo de 420 s** (o relógio aparece no painel da direita).

---

## Controles

### Jogador 1 (e modo solo)
| Tecla | Ação |
| --- | --- |
| `W` `A` `S` `D` | mover |
| **Mouse** | mirar (a mira acompanha o cursor) |
| **Clique esquerdo** | atirar (tiro automático nas armas automáticas) |
| **Shift** | correr |
| `Z` | deitar (mais cobertura, visão reduzida) |
| `R` | recarregar |
| `Espaço` / **clique do meio** | granada de fragmentação |
| `X` | granada de fumaça |
| **Clique direito** | ordenar: o esquadrão avança para o ponto clicado |
| `E` / `Q` | seguir você / segurar a posição |
| `1` `2` `3` `4` | assumir o controle de outro soldado |
| `P` / `Esc` | pausar |
| `M` | som | `F` tela cheia |

### Jogador 2 (modo dupla)
| Tecla | Ação |
| --- | --- |
| `←` `↑` `↓` `→` | mover (mira automática no inimigo visível mais perto) |
| `Enter` | atirar |
| **Ctrl direito** | granada |

---

## O que é simulado

**Visão e nevoa** — o esquadrão enxerga 270 px (até 420 px para o atirador de precisão) com
oclusão real por sombra de linha: parede, caixote, contêiner e árvore bloqueiam. O que já foi
visto continua no minimapa como memória cinza; o que nunca foi visto é preto.

**Balística** — cada bala é um projétil com velocidade, alcance e **penetração** próprios.
Material bloqueando o tiro reduz o dano de acordo com o material:

| Material | Redução |
| --- | --- |
| saco de areia | 85% |
| concreto | 95% |
| árvore | 65% |
| metal blindado | 65% (e pode ricochetear) |

**Munição, recarga e dispersão** — carregador por arma (fuzil 30, SMG 32, precisão 12), reserva
limitada e recarga cronometrada. A precisão piora correndo, andando, deitado no lugar errado e
**sob supressão**.

**Supressão** — tiros passando perto (44 px) rebaixam a moral: dispersão aumenta, a IA recua,
busca cobertura e às vezes joga fumaça. Supressão decai sozinha em ~0,45/s, e um soldado
suprimido aparece marcado como `!` no mapa e `SUPRIMIDO` na lista do esquadrão.

**Granadas** — fragmentação com quique e explosão de raio variável (a cobertura reduz o
estilhaço); fumaça cria uma nuvem que corta a linha de visão por ~18 s, mas não impede os tiros.

**Ferimentos** — partes do corpo mudam o dano (cabeça mata na hora) e o **sangramento** faz o
soldado caído perder vida até morrer: um companheiro a menos de 32 px interrompe o sangramento e
reanima em 3,5 s (volta com 55% da vida). Morte é permanente dentro da missão. Fogo amigo existe.

**IA** — os inimigos têm estado de patrulha, alerta e combate, com papéis diferentes
(recruta/SMG, soldado/fuzil, atirador/precisão, oficial), tempo de reação, memória do último
contato, busca por cobertura, avanço agressivo e uso de granadas. Os aliados fazem o mesmo do
lado amigo: seguem, cobrem, socorrem caídos e gritam avisos.

**Equipamento** — 2 granadas e 1 fumaça por soldado, mesa de madeira e caixotes destruíveis,
paióis de comunicação (alvo de missão) com 150 de vida.

---

## Arquivos

```
fogo-cruzado/
├── index.html        página do jogo (HUD em DOM + canvas)
├── style.css         tema tático (verde-oliva, âmbar, monoespaçado)
├── js/
│   ├── core.js       constantes, tabela de terrenos, armas, papéis, nomes
│   ├── audio.js      efeitos e ambiência gerados por síntese (WebAudio)
│   ├── maps.js       os 4 mapas em ASCII + análise (spawns, inimigos, objetivos)
│   ├── tex.js        texturas e sprites procedurais (chão, paredes, soldados)
│   ├── vision.js     sombra de linha, visão por time e nevoa de guerra
│   ├── game.js       simulação, IA, balística, missões, HUD e render
│   └── main.js       entrada (teclado/mouse), laço de 60 Hz e ligação com o HUD
└── test/
    ├── env.js        ambiente headless reutilizável (canvas falso + DOM mínimo)
    └── headless.js   24 testes do jogo rodando no Node
```

## Testes

```bash
node fogo-cruzado/test/headless.js
```

O `test/env.js` monta um canvas e um DOM falsos, carrega os módulos do jogo e permite rodar a
simulação sem navegador — inclusive com um canvas de verdade (`@napi-rs/canvas`) para gerar
imagens. Os testes cobrem mapas, visão, LOS, pathfinding, cobertura, tiro, supressão, granadas,
fumaça, morte/reanimação, as 4 missões rodando milhares de quadros, o render completo, o menu, o
modo dupla, a troca de soldado, o contrato do HUD e a integridade do `index.html`.
