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
