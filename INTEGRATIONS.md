# Integração de catálogo em escala

A Mavvri não deve copiar nem espelhar integralmente o catálogo de marketplaces. Catálogos de Amazon e Mercado Livre são grandes, mudam continuamente e possuem regras próprias de uso de conteúdo, preço, imagem e disponibilidade.

A experiência implementada no front-end segue dois princípios:

1. Todo card possui um CTA que abre a origem em nova aba, com `noopener` e `sponsored`.
2. Uma busca por termo tenta consultar o endpoint público de busca do Mercado Livre para exibir resultados ao vivo; quando a consulta não estiver disponível, o catálogo demonstrativo continua utilizável.

## Caminho correto para produção

### Mercado Livre

- Registrar a aplicação no portal de desenvolvedores do Mercado Livre.
- Fazer a busca e a consulta de detalhes no servidor, usando OAuth quando solicitado pelo recurso.
- Persistir somente os campos e o tempo de cache permitidos pela política do parceiro.
- Retornar ao navegador uma resposta própria, por exemplo `GET /api/catalog?source=mercadolivre&q=iphone`.
- Usar o `permalink` devolvido pela API como link de saída para a página do anúncio.

### Amazon Brasil

- Participar do programa de associados e usar a API disponibilizada ao perfil aprovado (Creators/Associates, conforme a documentação vigente).
- Nunca colocar chave, segredo, tag de associado ou credencial AWS no JavaScript do navegador.
- Criar um adaptador de servidor, por exemplo `GET /api/catalog?source=amazon&q=notebook`, que assina a solicitação, normaliza o resultado e devolve apenas os dados permitidos.
- Usar a URL de detalhe/affiliate retornada pela própria API. Assim, cada clique chega à página exata do produto e a atribuição fica correta.

## Arquitetura recomendada

```text
Feeds autorizados / APIs de parceiros
            ↓
Serviço de catálogo (cache + normalização + rate limit)
            ↓
Banco de histórico de preço / fila de atualizações
            ↓
API da Mavvri
            ↓
Interface, alertas e links diretos
```

Antes de lançar, inclua identificação de links de afiliado, política de privacidade, termos de uso e mecanismo para remover itens indisponíveis. A confirmação final de preço, estoque, frete e condições deve sempre ocorrer na loja de origem.

## Serviço incluído neste repositório

O projeto agora possui `server.mjs`, que serve a interface e expõe `GET /api/catalog` no mesmo domínio do site. A interface não consulta marketplaces diretamente nem recebe qualquer segredo.

```text
/api/catalog?source=mercadolivre&q=fone+bluetooth&limit=24&offset=0
/api/catalog?source=amazon&q=notebook&limit=24&offset=0
/api/catalog?source=all&q=air+fryer&limit=24&offset=0
```

- O adaptador do Mercado Livre normaliza resultados, usa o permalink de cada anúncio e mantém um cache curto em memória.
- O adaptador da Amazon só é ativado quando `AMAZON_CREATORS_PROXY_URL` é configurada no servidor. Essa URL deve apontar para um conector privado que usa a API oficial de Creators/Associates e devolve produtos na estrutura abaixo.

```json
{
  "items": [
    {
      "id": "amazon-ASIN",
      "name": "Título devolvido pela fonte",
      "category": "Tecnologia",
      "store": "Amazon",
      "price": 999.9,
      "oldPrice": 1299.9,
      "discount": 23,
      "image": "https://imagem-da-fonte",
      "url": "https://www.amazon.com.br/...",
      "delivery": "Condição devolvida pela fonte",
      "tags": ["frete"],
      "live": true,
      "updatedAt": "2026-08-15T00:00:00.000Z"
    }
  ],
  "paging": { "offset": 0, "limit": 24, "total": 500, "nextOffset": 24 }
}
```

Copie `.env.example` para `.env` no ambiente de deploy e configure apenas variáveis de servidor. Não registre segredos, tokens, chaves ou tags de afiliado no Git ou no navegador.
