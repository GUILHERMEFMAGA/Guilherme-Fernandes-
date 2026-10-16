# 🏍️ MOTO EXPRESS v2 — Simulador de Moto Realista

Jogo de **simulador de moto** com tema de motoboy de entregas, 100% no navegador
(HTML5 Canvas + JavaScript puro, zero dependências, zero assets externos).

A v2 é o "jeito real" de pilotar: motos com ficha técnica aproximada das de verdade,
câmbio manual com motor que engasga e morre, dois freios independentes que travam roda,
combustível que acaba, posto que cobra, chuva que tira aderência e radar que multa.

## ▶️ Rodar

```bash
python3 -m http.server 3000     # ou qualquer servidor estático
# → http://localhost:3000
```

## 🔧 A simulação (tudo ligável/desligável no menu)

| Sistema | Como funciona |
|---|---|
| **Motos reais** | Biz 125, CG 160 Titan, Fazer 250, CB 500F, S1000RR — potência (cv), massa (kg), marcha mais alta (rpm), tanque (L), consumo (km/L) e nº de cilindros afetam tudo: arrancada, curva de torque, som do motor e velocidade máxima |
| **Câmbio manual + motor** | `Q`/`E` troca marchas; limitador no redline; descer marcha em alta = traseira **calça**; subir em giro baixo = **engasga e morre**; parado, a embreagem segura a marcha; rolando, `W+E` dá **partida de empurrão** |
| **Física de força** | Potência no volante − arrasto (0,5·ρ·CdA·v²) − rolamento − freio-motor; tração limitada por aderência → wheelie nas brutas; curva coordenada: a moto **inclina antes de virar** |
| **Dois freios** | `S` = dianteiro (a força toda — dosar, senão trava e **lowside** na curva) e `B` = traseiro (trava, desliza, fumaça) |
| **Combustível & posto** | Gasta com giro/carga; reserva acende; parar devagar na faixa amarela do posto abastece (R$ 6,19/L gasolina) e conserta avaria (pago) |
| **Avarias** | Cada queda soma dano → motor passa a falhar e soltar fumaça; reparo no posto |
| **Clima** | Chuva dinâmica: pista molhada escurece e reflete, aderência −40%, risco de **aquaplanagem**, névoa maior, som de chuva no capacete |
| **Mão dupla** | 4 faixas: sentido contrário chega a 60+ na tua esquerda; bater de frente é fim de papo |
| **Trânsito IA** | Limitam a ~55 km/h, mantêm distância com **luz de freio**, trocam de faixa com **seta piscando**, e respeitam tua seta/buzina |
| **Radar & multas** | Limite 60 com placas e lombada eletrônica: +20% = R$ 130,16 (média); +50% = R$ 293,47 (gravíssima); +75% = R$ 880,41 + suspensão — sai do teu caixa |
| **Entregas de verdade** | Endereço com rua/número/bairro/CEP, pacote **FRÁGIL** (quebrou, cancelou), gorjeta por antecedência e por estado da mercadoria, combo por sequência limpa |
| **Painel analógico** | Velocímetro e conta-giros com ponteiro desenhados em canvas, odômetro, ponteiro de combustível, luz de reserva, LIMIT no redline, setas piscando com barulhinho de relé |

**Modo simples (arcade)** desliga tudo e volta ao pilotar casual.

## 🎮 Controles

`W`/`↑` acelerar • `S`/`↓` freio dianteiro • `B` freio traseiro • `A D`/`← →` direção
• `Q E` câmbio (E também dá a partida) • `Z X` seta • `espaço` buzina • `P` pausa • `M` som.
Em celular: botões de direção, gatilhos de freio e botões +/−/IGN.

## 📦 Modos

- **Dia de entregas** — 3 cancelamentos encerram o expediente; progressão desbloqueia
  Fazer (5 entregas), CB 500F (10) e S1000RR (16).
- **Modo livre** — passeio: qualquer moto da garagem pode ser testada.

## 🗂 Estrutura

```
index.html      # casca + HUD/menus em DOM
css/style.css   # HUD arcade/garagem
js/game.js      # engine pseudo-3D + física do motor + IA + áudio WebAudio procedural
test/smoke.js   # smoke test headless com piloto automático
```

## ✅ Teste

```bash
node --check js/game.js
node test/smoke.js   # 4 min de simulação: partida, câmbio, combustível, avarias, radar, chuva, colisões, dia/noite
```

---

<img width="800" height="450" alt="b_deixe_um_pouco_mais_-ezgif com-video-to-gif-converter" src="https://github.com/user-attachments/assets/a73e7bcd-c59c-463b-8b60-aae618b7e519" />
