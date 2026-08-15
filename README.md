# Mavvri

Uma plataforma brasileira de descoberta de ofertas inspirada na clareza de serviços de cupons e benefícios — construída com identidade própria. A Mavvri ajuda a pesquisar produtos, organizar alertas e abrir a oferta diretamente na loja de origem.

## Experiência incluída

- Página inicial responsiva com busca, categorias, lojas e alerta de preço.
- Catálogo que consome produtos reais de fontes autorizadas por meio da rota interna `/api/catalog`.
- Busca, categorias, ordenação, paginação e produtos salvos durante a sessão.
- CTA em cada produto para abrir a página de origem em uma nova aba.
- Estados honestos para fonte indisponível ou integração Amazon ainda não configurada.
- Tela de carregamento, animações sutis e layout otimizado para celular.

## Fontes de catálogo

- **Mercado Livre:** `server.mjs` consulta e normaliza resultados do endpoint de catálogo para o site `MLB`, com cache curto e links de anúncio retornados pela fonte.
- **Amazon Brasil:** o front-end e a rota `/api/catalog?source=amazon` estão prontos, mas só exibem produtos depois que um conector oficial de Creators/Associates for configurado no servidor. Chaves, tags e tokens nunca devem ir para o navegador.

Leia [INTEGRATIONS.md](INTEGRATIONS.md) para os detalhes de integração, formato do conector Amazon e cuidados de produção.

## Executar localmente

O projeto não possui dependências de terceiros. Requer Node.js 18 ou superior:

```bash
npm start
```

Acesse `http://localhost:4173`.

### Variáveis de ambiente opcionais

Copie `.env.example` para `.env` no ambiente de deploy e configure apenas valores de servidor. O arquivo `.env` já está ignorado pelo Git.

```bash
PORT=4173
CATALOG_CACHE_TTL_MS=300000
AMAZON_CREATORS_PROXY_URL=
AMAZON_CREATORS_PROXY_TOKEN=
```
