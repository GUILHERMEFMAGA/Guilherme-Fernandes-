# Guilherme-Fernandes-

## Clone: Grand Theft Auto VI — Rockstar Games

Recreação estática local da página **https://www.rockstargames.com/VI** (versão pt-BR),
construída do zero como um site auto-contido (HTML + CSS + JS), sem dependência
externa de rede em tempo de execução.

> ⚠️ Nota: o sandbox não tem acesso direto à internet, então não foi possível fazer
> um *mirror* byte-a-byte dos assets originais da Rockstar. A estrutura, seções,
> textos, datas e interações reproduzem fielmente a página real; a arte usa
> material oficial de divulgação (key art, screenshots e thumbnails oficiais do
> jogo) obtido via busca de imagens e recondicionado localmente. Todos os textos,
> marcas e imagens pertencem aos seus respectivos titulares (Rockstar Games,
> Netflix, Sony, Microsoft); este projeto é apenas um exercício de clonagem de
> página para fins de estudo.

### Conteúdo replicado
- Nav fixa com logo da Rockstar, botão **Reserve agora** e menu mobile
- Banner de anúncio: *Um Olhar Estendido, em 27 de agosto*
- Hero com a **cover art oficial do jogo** (colagem de personagens e veículos com o
  logo GTA VI), data de lançamento (**19 de novembro de 2026**), botão **Reserve agora**,
  logos oficiais PS5 e Xbox Series X|S (SVG) e selo "A melhor experiência é no PS5"
- Seção **Um Olhar Estendido** (parceria Netflix) com wordmark GTA VI oficial em SVG,
  data **27 de agosto** e **3PM ET**, botão "Lembre-me"
- Seção de **Trailers** (1º e 2º trailer) com player simulado em modal
- Promo **Ultimate Edition** com modal detalhado dos benefícios
- Promo **Pacote Vintage Vice City** (bônus de reserva) com modal detalhado
- Cards **Só em Leonida** e **Mídia e ilustrações**
- Sinopse *"Vice City, EUA."* (back-of-box)
- **Novidades em destaque** (boletim/newswire com links reais)
- Rodapé completo: badge oficial PS5, newsletter (simulada), redes sociais,
  links legais e selo OLA BR

### Como rodar
Basta servir a pasta raiz com qualquer servidor estático:

```bash
python3 -m http.server 8000 --bind 0.0.0.0
```

ou abrir `index.html` diretamente no navegador.

### Animações e efeitos
- **Loader de entrada** com wordmark VI e barra de progresso animada
- **Ken Burns** (zoom lento) + parallax no hero, com entrada escalonada dos elementos
- **Marquee neon** ("Vice City ✦ Leonida ✦ 19 de novembro de 2026") entre seções
- **Countdown ao vivo** para 19/11/2026 (dias/horas/min/seg)
- **Tilt 3D** nos cards (trailers, promos e notícias) + zoom nas imagens
- **Scroll progress bar** no topo, **nav sólida ao rolar**, **botão voltar ao topo**
- Brilho pulsante nos CTAs, sweep de luz nos botões, anel pulsante no play dos trailers
- **Film grain** sutil, gradientes animados, reveal com stagger e modais com entrada animada
- Tudo respeita `prefers-reduced-motion` (animações desativadas p/ acessibilidade)

### Estrutura
```
index.html      → página (pt-BR)
styles.css      → tema (dark + neon Vice City), responsivo
app.js          → modais, player de trailer, menu, reveal, newsletter
favicon.svg     → ícone "VI"
assets/         → arte oficial de divulgação recondicionada (hero, trailers, cards, notícias)
```
