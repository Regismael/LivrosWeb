# Front-End Angular - Projeto LivrosWeb

Este projeto é a parte de front-end desenvolvida em Angular para o sistema **LivrosWeb**. Ele se comunica com a API para controle de retirada e devolução de livros e oferece uma interface rica para os usuários interagirem com o sistema.

## Funcionalidades

### 1. **Paginação**
A aplicação implementa paginação para facilitar a navegação por listas de livros. Isso melhora a experiência do usuário, permitindo visualizar os livros de maneira organizada em várias páginas.

### 2. **Spinner**
Durante o carregamento dos dados (como livros e status de retirada/devolução), é exibido um **spinner** para indicar que a aplicação está processando a solicitação, proporcionando uma interface mais amigável e menos frustrante para o usuário.

### 3. **Rotas (Routing)**
A aplicação utiliza o **Angular Router** para navegar entre diferentes páginas, como a listagem de livros, cadastro de retirada e devolução, entre outras. As rotas são bem definidas para uma navegação fluida e intuitiva.

### 4. **HttpClient**
A comunicação com a API `LivrosWeb` é realizada através do **HttpClient** do Angular. Isso permite realizar requisições HTTP para obter, atualizar, remover e adicionar dados relacionados aos livros. A integração com a API é feita de forma eficiente e segura.

### 5. **Responsividade**
A aplicação foi desenvolvida com **responsividade** em mente, utilizando **CSS Flexbox** e **Grid**, além de media queries para garantir que a interface seja otimizada tanto para desktop quanto para dispositivos móveis.

### 6. **Integração com a API LivrosWeb**
O front-end está completamente integrado com a **API LivrosWeb** (desenvolvida em C# e .NET 8) para controlar a retirada e devolução de livros. Através de chamadas HTTP, a aplicação permite realizar ações como:
   - Listar livros disponíveis
   - Retirar livros (alterando seu status)
   - Devolver livros (alterando seu status)
   - Visualizar detalhes dos livros

## Tecnologias Utilizadas

- **Angular** (Versão mais recente)
- **HttpClient** para comunicação com a API
- **Angular Router** para gerenciamento de rotas
- **CSS (Flexbox e Grid)** para responsividade
- **Spinner** para melhorar a experiência do usuário durante carregamentos
- **Bootstrap** para design responsivo e componentes prontos, como botões, modais e formulários, facilitando a construção da interface
- **Bootstrap Icons** (se utilizado) para ícones prontos e facilmente integráveis

## Como Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/livrosweb-frontend.git
