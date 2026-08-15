# Arquitetura escolhida — Mavvri MVP

## Decisões de produto

- **Marca:** Mavvri.
- **Direção visual:** curadoria editorial sofisticada.
- **Fontes previstas para o lançamento:** Amazon, Mercado Livre, Americanas, Shopee, Magazine Luiza, Shein e OLX.
- **Modelo:** portal de descoberta e curadoria; nenhuma compra é concluída na Mavvri.

## Visão de produção

```text
              ┌──────────────────────────────┐
              │ APIs e feeds afiliados        │
              │ (uma fonte por adaptador)     │
              └──────────────┬───────────────┘
                             ↓
                 Jobs agendados de ingestão
                             ↓
      normalização → deduplicação → validação de URL
                             ↓
      PostgreSQL (ofertas e histórico) + Redis (cache)
                             ↓
            API Mavvri / páginas SEO / frontend
                             ↓
              link de afiliado direto à loja
```

## Frontend

O frontend tem páginas e componentes independentes de fonte de dados:

- busca e filtros consultam apenas `/api/catalog`;
- cards recebem um modelo normalizado de oferta;
- o CTA abre `affiliate_url`/`url` da fonte em nova aba;
- páginas públicas previstas: `/ofertas`, `/categoria/[slug]`, `/lojas/[slug]`, `/oferta/[slug]`;
- skeletons e estados vazios são exibidos enquanto uma fonte não está sincronizada.

Em produção, a recomendação é migrar o front para Next.js + TypeScript com SSR/ISR. Este MVP mantém a mesma fronteira HTTP em um servidor Node leve para ser executável sem dependências adicionais.

## Backend e conectores

Cada fonte é representada por um adaptador com a mesma saída normalizada:

```ts
interface NormalizedOffer {
  id: string;
  source: "mercadolivre" | "amazon" | "americanas" | "shopee" | "magalu" | "shein" | "olx";
  source_offer_id: string;
  title: string;
  product_url: string;
  affiliate_url: string;
  image_url?: string;
  price: number;
  original_price?: number;
  discount_percent?: number;
  availability: "in_stock" | "out_of_stock" | "unknown";
  fetched_at: string;
}
```

- **Mercado Livre:** proxy privado que encapsula a API de itens/busca autorizada e a camada de afiliados.
- **Amazon:** proxy privado que encapsula a Creators API/Associates.
- **Americanas, Shopee, Magazine Luiza, Shein e OLX:** proxies de feed aprovados por programa de afiliados, rede de afiliados ou parceria direta. O browser nunca recebe credenciais.

`server.mjs` já expõe a fronteira `/api/catalog`; as variáveis `*_CATALOG_PROXY_URL` definem os conectores remotos autorizados.

## Ingestão agendada

O frontend **não** chama APIs de varejistas. Em produção, o job `workers/sync-catalog.mjs` deve ser acionado pelo agendador da hospedagem a cada 15–60 minutos, conforme a política de cada fonte:

1. consulta o adaptador;
2. normaliza a resposta;
3. valida preço, estoque e URL;
4. persiste a oferta atual e um snapshot de preço;
5. invalida cache de busca/categoria;
6. desativa ofertas que deixaram de ser devolvidas pela fonte.

Durante o desenvolvimento, o servidor usa cache curto em memória. Isso mantém o contrato da API estável até o Postgres e o worker de produção serem conectados.

## Banco de dados

O arquivo [`db/schema.sql`](db/schema.sql) é o contrato PostgreSQL para as entidades de fonte, produto, oferta, snapshot de preço, clique e alerta. O banco é a fonte de verdade em produção; Redis serve apenas resultados cacheados.

## Transparência e LGPD

- Exibir aviso de comissão de afiliado junto ao CTA e no rodapé.
- Só persistir e-mail/alerta com base legal e consentimento explícito.
- Oferecer política de privacidade, termos e canal de exclusão.
- Não armazenar segredos no Git, no cliente ou no banco de ofertas.
