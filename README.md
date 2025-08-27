# 🛍️ Projeto final Ada - Turma 1391 - Vitrine e-commerce

- ✅ Todos os requisitos do projeto foram implementados conforme documento disponibilizado em **14/08/2025**

- 👤 Conforme instruções da aula, foi deixado como **"administrador"** o usuário **"johnd"**  
  *(informações de login disponíveis no console.log na abertura da aplicação)*

- 🪄 A categorização dos produtos em tela é feita com **signals**, sem necessidade de efetuar uma chamada adicional à API *(não era requisito)*.

- 🛒 O **cart-service** foi implementado somente com **signals**, sem chamadas à API  
  (ao contrário da autenticação e dos produtos, para os quais há chamadas feitas para a API).  
  O motivo é que não havia esta especificação no projeto (os três requisitos que havia quanto a este service foram implementados) e os exemplos de aula foram feitos desta forma.

- 🔄 Foi usado **@Input** e **@Output** somente no componente **Navbar** *(já que havia este requisito)*;  
  no restante do projeto, procurei deixar componentes **desacoplados**, concentrando a lógica nos **services**.

- 🛡️ O **interceptor** foi implementado de forma a ser anexado às rotas **"/cart"** e **"/admin"** (ambas inexistentes) e **"/products"** (real) da API.  
  Como a API não tem "rotas protegidas" por definição, coloquei duas rotas que existiriam em uma API real e uma rota real que, teoricamente, não precisaria do header de autorização, para verificação da implementação.

- 🌐 Foi feito **deploy** do projeto no endereço:  
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
