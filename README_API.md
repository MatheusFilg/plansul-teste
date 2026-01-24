---
# yaml-language-server: $schema=schemas/page.schema.json
Object type:
    - Page
Creation date: "2026-01-24T22:57:40Z"
Created by:
    - Matheus
id: bafyreidowosbxlhfzfhn4b3jew77c7xdkam4yezrkpjo7jdvfp5hyaquoi
---
# Plansul - Readme\_api.md   
# Documentação da API   
Este documento detalha os endpoints da API RESTful disponíveis neste projeto, incluindo suas funcionalidades, métodos HTTP, parâmetros esperados e exemplos de requisição e resposta.   
As APIs foram construídas com Next.js API Routes e seguem um padrão de service e repository para interação com o banco de dados (Prisma).   
## Coleções para Teste   
Para facilitar o teste e a interação com a API, coleções para **Postman** e **Bruno** estarão disponíveis no projeto. Elas contêm exemplos de todas as requisições listadas abaixo.   
 --- 
## Estrutura dos Endpoints   
### Categorias   
Gerenciamento de categorias de produtos.   
### 1. Listar todas as Categorias   
- **Endpoint:** `/api/categorias`   
- **Método:** `GET`   
- **Descrição:** Retorna uma lista de todas as categorias cadastradas no sistema   
   
   
### 2. Criar nova Categoria   
- **Endpoint:** `/api/categorias`   
- **Método:** `POST`   
- **Descrição:** Adiciona uma nova categoria ao sistema.   
   
   
### 3. Obter Categoria por ID   
- **Endpoint:** `/api/categorias/{id}`   
- **Método:** `GET`   
- **Descrição:** Retorna os detalhes de uma categoria específica.   
- **Parâmetros de Path:**   
    - `id` (BigInt): O ID único da categoria.   
   
       
   
### 4. Atualizar Categoria por ID   
- **Endpoint:** `/api/categorias/{id}`   
- **Método:** `PUT`   
- **Descrição:** Atualiza os dados de uma categoria existente.   
- **Parâmetros de Path:**   
    - `id` (BigInt): O ID único da categoria a ser atualizada.   
   
       
   
### 5. Excluir Categoria por ID   
- **Endpoint:** `/api/categorias/{id}`   
- **Método:** `DELETE`   
- **Descrição:** Remove uma categoria do sistema.   
- **Parâmetros de Path:**   
    - `id` (BigInt): O ID único da categoria a ser excluída.   
 --- 
   
### Produtos   
Gerenciamento de produtos.   
### 1. Listar todos os Produtos   
- **Endpoint:** `/api/produtos`   
- **Método:** `GET`   
- **Descrição:** Retorna uma lista de todos os produtos cadastrados.   
   
   
### 2. Criar novo Produto   
- **Endpoint:** `/api/produtos`   
- **Método:** `POST`   
- **Descrição:** Adiciona um novo produto ao sistema.   
   
   
### 3. Obter Produto por ID   
- **Endpoint:** `/api/produtos/{id}`   
- **Método:** `GET`   
- **Descrição:** Retorna os detalhes de um produto específico.   
- **Parâmetros de Path:**   
    - `id` (BigInt): O ID único do produto.   
   
       
   
### 4. Atualizar Produto por ID   
- **Endpoint:** `/api/produtos/{id}`   
- **Método:** `PUT`   
- **Descrição:** Atualiza os dados de um produto existente.   
- **Parâmetros de Path:**   
    - `id` (BigInt): O ID único do produto a ser atualizado.   
   
       
   
### 5. Excluir Produto por ID   
- **Endpoint:** `/api/produtos/{id}`   
- **Método:** `DELETE`   
- **Descrição:** Remove um produto do sistema.   
- **Parâmetros de Path:**   
    - `id` (BigInt): O ID único do produto a ser excluído.   
 --- 
   
### Estoque (a ser implementado)   
Gerenciamento do estado atual do estoque de produtos.   
### 1. Listar Estado do Estoque (Todos os Produtos)   
- **Endpoint:** `/api/estoque`   
- **Método:** `GET`   
- **Descrição:** Retorna o estado atual do estoque para todos os produtos.   
   
### 2. Obter Estado do Estoque por ID do Produto   
- **Endpoint:** `/api/estoque/{produtoId}`   
- **Método:** `GET`   
- **Descrição:** Retorna o estado atual do estoque para um produto específico.   
- **Parâmetros de Path:**   
    - `produtoId` (BigInt): O ID do produto.   
 --- 
   
### Movimentações de Estoque (a ser implementado)   
Gerenciamento do histórico de entrada e saída de produtos no estoque.   
### 1. Listar Histórico de Movimentações   
- **Endpoint:** `/api/estoque\_movimentacoes`   
- **Método:** `GET`   
- **Descrição:** Retorna o histórico de todas as movimentações de estoque.   
   
   
### 2. Registrar Nova Movimentação   
- **Endpoint:** `/api/estoque\_movimentacoes`   
- **Método:** `POST`   
- **Descrição:** Registra uma nova movimentação de estoque (entrada ou saída) e atualiza a quantidade total no estoque do produto.   
