# Guilherme-Fernandes-

## Clone: Grand Theft Auto VI — Rockstar Games

Recreação estática local da página **https://www.rockstargames.com/VI** (versão pt-BR),
construída do zero como um site auto-contido (HTML + CSS + JS), sem dependência
externa de rede.

> ⚠️ Nota: o sandbox não tem acesso à internet, então não foi possível fazer um
> *mirror* byte-a-byte (baixando os assets originais da Rockstar). Esta é uma
> recriação fiel da estrutura, seções e textos da página, com arte original
> gerada no mesmo estilo visual (Vice City / neon). Todos os textos, marcas e
> referências pertencem aos seus respectivos titulares; este projeto é apenas
> um exercício de clonagem de página.

### Conteúdo replicado
- Nav fixa com logo da Rockstar, botão **Reserve agora** e menu mobile
- Banner de anúncio: *Um Olhar Estendido, em 27 de agosto*
- Hero com data de lançamento (**19 de novembro de 2026**), logo VI e CTAs
- Seção **Um Olhar Estendido** (parceria Netflix)
- Seção de **Trailers** (1º e 2º trailer) com player simulado em modal
- Promo **Ultimate Edition** com modal detalhado dos benefícios
- Promo **Pacote Vintage Vice City** (bônus de reserva) com modal detalhado
- Cards **Só em Leonida** e **Mídia e ilustrações**
- Sinopse *"Vice City, EUA."* (back-of-box)
- **Novidades em destaque** (boletim/newswire)
- Rodapé completo: newsletter, redes sociais, links legais e selo OLA BR

### Como rodar
Basta servir a pasta raiz com qualquer servidor estático:

```bash
python3 -m http.server 8000 --bind 0.0.0.0
```

ou abrir `index.html` diretamente no navegador.

### Estrutura
```
index.html      → página (pt-BR)
styles.css      → tema (dark + neon Vice City), responsivo
app.js          → modais, player de trailer, menu, reveal, newsletter
favicon.svg     → ícone "VI"
assets/         → arte original gerada (hero, trailers, cards, notícias)
```
