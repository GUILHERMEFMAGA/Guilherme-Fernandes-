# 🏍️ MOTO EXPRESS — Simulador de Moto

Jogo de simulador de moto com tema de **motoboy de entregas**, rodando 100% no navegador
(HTML5 Canvas + JavaScript puro, sem dependências).

Renderização pseudo-3D estilo arcade (Out Run) com trânsito com IA, ciclo dia/noite,
caixa de câmbio com rotação, força centrífuga nas curvas, som de motor sintetizado via
WebAudio e modo de missões de entrega com combo e gorjetas.

## ▶️ Como jogar

```bash
# abra com qualquer servidor estático, ex.:
python3 -m http.server 3000
# depois acesse http://localhost:3000
```

Ou simplesmente dê duplo-clique no `index.html`.

## 🎮 Controles

| Tecla | Ação |
|---|---|
| `↑` / `W` | Acelerar |
| `↓` / `S` | Frear |
| `←→` / `A D` | Direção |
| `espaço` | Buzina |
| `P` / `Esc` | Pausa |
| `M` | Liga/desliga som |

Em celular aparecem botões de toque automaticamente.

## 📦 Modos

- **Dia de entregas** — pedidos com distância, prazo e gorjeta. Bata e perde 5 s + combo.
  3 pedidos cancelados encerram o expediente. A cada 3 entregas, moto nova!
- **Modo livre** — só você, a pista e o pôr do sol.

## 🧩 Estrutura

```
index.html      # casca + HUD/menus em DOM
css/style.css   # estilo arcade do HUD e telas
js/game.js      # engine: estrada pseudo-3D, física, IA, sprites procedurais, áudio
test/smoke.js   # smoke test headless (roda o jogo com DOM/canvas stubados no Node)
```

Todos os sprites (moto, carros, prédios, palmeiras, outdoors…) são desenhados
proceduralmente em canvas — zero assets externos, zero internet.

## ✅ Testes

```bash
node --check js/game.js
node test/smoke.js
```

O smoke test roda milhares de frames do loop completo (menu → entregas → curvas →
batidas → ciclo noturno → game over) verificando estabilidade e ausência de NaN.

---

<img width="800" height="450" alt="b_deixe_um_pouco_mais_-ezgif com-video-to-gif-converter" src="https://github.com/user-attachments/assets/a73e7bcd-c59c-463b-8b60-aae618b7e519" />
