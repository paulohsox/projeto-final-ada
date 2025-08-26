# Projeto Final Ada – Turma 1391  
## Vitrine e-commerce  

### 📌 Requisitos
- Todos os requisitos do projeto foram implementados conforme o documento disponibilizado em **14/08/2025**.  

### 👤 Usuário Administrador
- Conforme instruções da aula, foi definido como **administrador** o usuário **`johnd`**.  
- As informações de login estão disponíveis no **console.log** ao iniciar a aplicação.  

### ⚙️ Implementação Técnica
- **Categorização de Produtos**  
  - Feita com **signals**, sem necessidade de chamadas adicionais à API.  
  - Este recurso não era requisito, mas foi implementado para otimizar a aplicação.  

- **Cart Service**  
  - Implementado apenas com **signals**, sem chamadas à API.  
  - Já a **autenticação** e os **produtos** possuem chamadas reais à API.  
  - Esta decisão foi tomada porque:  
    - Não havia especificação no documento de requisitos.  
    - Os exemplos de aula foram feitos desta forma.  

- **Comunicação entre Componentes**  
  - Foi utilizado **`@Input`** e **`@Output`** apenas no componente **Navbar**, conforme exigido.  
  - No restante da aplicação, os componentes foram mantidos **desacoplados**, com a lógica concentrada em **services**.  

- **Interceptor HTTP**  
  - Implementado para anexar o header de autenticação às seguintes rotas:  
    - **`/cart`** (não existente na API)  
    - **`/admin`** (não existente na API)  
    - **`/products`** (rota real da API)  
  - Como a API não possui rotas protegidas, as rotas inexistentes foram incluídas apenas para simulação de cenários de autenticação.  

### 🚀 Deploy
- O projeto está disponível em:  
  👉 [https://projeto-final-ada.onrender.com/](https://projeto-final-ada.onrender.com/)  




# VitrineProjetoFinal

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
