# Mavvri

Uma experiência responsiva de hub de ofertas, com um painel pessoal elegante, para pesquisar, comparar e salvar produtos de diferentes lojas em um só lugar.

## O que está incluído

- Busca rápida por produtos e atalhos para termos em alta.
- Navegação por categorias e catálogo de ofertas com ordenação.
- Filtros por faixa de preço, loja e tipo de benefício (cupom, frete e mínima histórica).
- Ofertas salvas durante a sessão e feedbacks de interação.
- Fluxo de criação de alerta de preço e cadastro para alertas inteligentes.
- CTA em cada produto para abrir a loja de origem em nova aba.
- Busca com tentativa de resultados ao vivo do Mercado Livre e links de destino do anúncio quando o endpoint estiver disponível.
- Tela de carregamento e estados de feedback para uma experiência mais fluida.
- Layout responsivo para desktop e celular.

> Os produtos, preços e lojas estáticos são dados demonstrativos. A confirmação de preço, frete, disponibilidade e condições acontece na loja de origem.

## Catálogo de parceiros

Para operar com catálogos completos de Amazon e Mercado Livre, utilize APIs e feeds autorizados — não scraping ou cópia integral de conteúdo. Consulte [INTEGRATIONS.md](INTEGRATIONS.md) para a arquitetura de produção, links diretos e cuidados com credenciais.

## Como visualizar

Não há dependências para instalar. No diretório do projeto, execute:

```bash
python3 -m http.server 4173 --bind 0.0.0.0
```

Então abra `http://localhost:4173`.
