---
# yaml-language-server: $schema=schemas/page.schema.json
Object type:
    - Page
Creation date: "2026-01-24T21:06:10Z"
Created by:
    - Matheus
id: bafyreic7xdm2xgdyerthqsv2dgci2ofsivchj3f6piiipagartegjz2j3e
---
# Plansul- Readme\_uso.md   
# Documentação de Uso do Projeto   
Este documento serve como um guia para configurar, executar e interagir com a aplicação de controle de categorias, produtos e estoque. Siga os passos abaixo para colocar o projeto em funcionamento no seu ambiente de desenvolvimento.   
 --- 
## Pré-requisitos   
Antes de iniciar, certifique-se de que você possui os seguintes softwares instalados em sua máquina:   
- **Node.js**: [Download e Instalação](https://nodejs.org/)   
- **npm**: Vem junto com a instalação do Node.js.   
- **Docker**: [Download e Instalação](https://www.docker.com/get-started)   
- **Docker Compose**: Geralmente incluído com o Docker Desktop, ou [Instalação Standalone](https://docs.docker.com/compose/install/)   
 --- 
   
## Começando   
Siga estes passos para configurar e executar o projeto em seu ambiente de desenvolvimento local:   
1. **Clone o Repositório:**
Abra seu terminal ou prompt de comando e clone o repositório do projeto:   
    ```
    git clone https://github.com/MatheusFilg/plansul-teste.git 
    cd junior-technical-assessment
    
    ```
2. **Instale as Dependências:**
Navegue até o diretório do projeto clonado e instale todas as dependências listadas no `package.json`:   
    ```
    npm install
    
    ```
3. **Inicie o Banco de Dados:**
Este projeto utiliza PostgreSQL, que é executado através de um container Docker. Inicie o banco de dados com o Docker Compose:   
    ```
    docker-compose up -d
    
    ```
    Este comando iniciará o container do PostgreSQL em segundo plano.   
4. **Gere o Cliente Prisma:**
O projeto utiliza Prisma para interagir com o banco de dados. Após o banco de dados estar no ar e com o schema atualizado, é crucial gerar o cliente Prisma para que todos os tipos de dados sejam reconhecidos pelo TypeScript.   
    ```
    npx prisma generate
    
    ```
5. Crie um Arquivo **`.env`:**
Crie um arquivo chamado `.env` na raiz do projeto e adicione a seguinte linha para configurar a conexão com o banco de dados:   
    ```
    DATABASE_URL="postgresql://postgres:postgres@localhost:5433/postgres"
    
    ```
6. **Execute a Aplicação:**
Finalmente, inicie o servidor de desenvolvimento do Next.js:   
    ```
    npm run dev
    
    ```
    A aplicação estará acessível em seu navegador no endereço: [http://localhost:3000](http://localhost:3000)   
 --- 
   
## Informações do Banco de Dados   
O banco de dados PostgreSQL é executado em um container Docker e suas configurações de conexão são as seguintes:   
- **Host:** `localhost`   
- **Porta:** `5433`   
- **Usuário:** `postgres`   
- **Senha:** `postgres`   
- **Nome do Banco:** `postgres`   
 --- 
   
## Scripts Disponíveis   
Você pode usar os seguintes scripts `npm` no seu terminal na raiz do projeto:   
- `npm run dev`: Inicia a aplicação em modo de desenvolvimento com hot-reloading.   
- `npm run build`: Compila a aplicação para um ambiente de produção.   
- `npm run start`: Inicia o servidor de produção após a compilação (`npm run build`).   
- `npm run lint`: Executa o linter para verificar e reportar problemas de estilo e erros no código.   
- `npm run generate`: Executa o cliente prisma para gerar o código que o aplicativo usa para comunicar com o banco de dados.   
- `npm run migrate`: Altera a estrutura do banco de dados para que ela corresponda ao que está definido no arquivo `schema.prisma`.   
 --- 
   
## Uso da Aplicação   
Após seguir os passos de instalação e execução, você poderá navegar pela interface da aplicação para:   
- **Gerenciar Categorias**: Adicionar, editar, visualizar e remover categorias de produtos.   
- **Gerenciar Produtos**: Adicionar, editar, visualizar e remover produtos, associando-os a categorias.   
- **Gerenciar Estoque**: Acompanhar o estado atual do estoque de cada produto.   
- **Gerenciar Movimentações de Estoque**: Registrar entradas e saídas de produtos no estoque e visualizar o histórico.   
   
Lembre-se de consultar o `README\_API.md` e os arquivos .JSON para detalhes sobre os endpoints da API, caso precise interagir diretamente com o backend.   
