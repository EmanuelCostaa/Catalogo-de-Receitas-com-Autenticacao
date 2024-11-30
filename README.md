# GoReceitas Catálogo de Receitas

Este é um projeto full-stack desenvolvido com **Next.js** no frontend e **Nest.js** no backend. Utiliza **Tailwind CSS** para o estilo e **Prisma** para o gerenciamento de banco de dados. O sistema permite a criação, edição, visualização e exclusão de receitas, bem como a navegação do usuário e personalização de seu perfil.

O banco de dados utilizado é o **PostgreSQL**.

## Design System

- **Tailwind CSS**: Utilizado para garantir um design responsivo e flexível, permitindo a criação rápida de interfaces bonitas e consistentes.

## Estrutura de Pastas

### Backend

A pasta `backend` contém a estrutura padrão do Nest.js com algumas adições específicas para o projeto.

```
backend/
│
├── prisma/
│   └── schema.prisma            # Definição do modelo de dados
│
├── src/
│   ├── auth/                    # Autenticação (login com token)
│   ├── db/
│   │   ├── db.module.ts         # Módulo de banco de dados
│   │   └── prisma.service.ts    # Serviço do Prisma
│   ├── recipe/                  # Funcionalidade de receitas
│   │   ├── recipe.controller.ts
│   │   ├── recipe.module.ts
│   │   ├── recipe.service.ts
│   │   └── dto/
│   │       └── create-recipe.dto.ts # DTO de criação de receita
│   │       └── update-recipe.dto.ts # DTO de update de receita
│   └── user/                    # Funcionalidade de usuários
│       ├── user.controller.ts
│       ├── user.module.ts
│       ├── user.service.ts
│       └── dto/
│           └── update-user.dto.ts  # DTO de atualização de usuário
│           └── update-user.dto.ts # DTO de update de usuário
```

- **Autenticação (auth)**: Controla o fluxo de autenticação utilizando **JWT tokens** para login e verificação de sessão.
- **DB (db)**: Configuração do **Prisma** e integração com o banco de dados **PostgreSQL**.
- **Recipe (recipe)**: Lida com as funcionalidades relacionadas a receitas, como criação, edição, listagem e exclusão.
- **User (user)**: Gerencia as informações do usuário, incluindo a atualização do perfil (nome e email).

### Frontend

A pasta `frontend` contém a estrutura padrão do Next.js, com a implementação de páginas, componentes e interfaces.

```
frontend/
│
├── public/
│   └── imagens/                 # Imagens e ícones usados na aplicação
│
├── src/
│   ├── components/              # Componentes reutilizáveis
│   ├── interfaces/              # Interfaces de dados (user, recipe)
│   ├── pages/                   # Páginas principais da aplicação
│   ├── styles/                  # Arquivo principal para Tailwind CSS
│
│── next.config.ts           # Configurações de roteamento e outras personalizações

```

- **Components (components)**: Contém todos os componentes personalizados como inputs, botões, cards de receitas, etc.
- **Interfaces (interfaces)**: Define interfaces para usuários e receitas, usadas para garantir a tipagem nos componentes e estados.
- **Pages (pages)**: Contém todas as páginas da aplicação, como a página principal, página de login, meu perfil, etc.
- **Styles (styles)**: Arquivo de configuração para **Tailwind CSS**.

### Backend & Frontend Integração

- **Autenticação com Token**: Após o login, um **JWT Token** é gerado e usado para autenticar todas as requisições subsequentes. Caso o token não seja encontrado, o usuário será redirecionado para a página de login.
- **Rotas protegidas**: Qualquer tentativa de acessar páginas sem o token gerará um redirecionamento automático para a tela de login.

## Diferenciais Implementados

1. **Login com Token**:

   - A autenticação é feita por **JWT tokens**.
   - Se o token não for encontrado, o usuário é redirecionado automaticamente para a tela de login.

2. **Tela de Receitas**:

   - Para receitas criadas pelo usuário, há a opção de **editar** ou **excluir** a receita diretamente da tela de visualização.
   - As receitas são apresentadas de forma clara, com a possibilidade de aplicar filtros e paginação.

3. **Perfil do Usuário**:

   - Os usuários podem alterar seu **nome** e **email** diretamente na página de perfil.
   - A navegação pelas receitas do usuário é semelhante à tela principal, com filtros e paginação.

4. **Responsividade**:
   - Toda a aplicação foi construída com **Tailwind CSS**, garantindo que ela seja totalmente **responsiva**, ou seja, otimizada para diferentes tamanhos de tela (desktop, tablet e mobile).

## Como Rodar o Projeto

### Backend

1. Navegue até a pasta `backend`.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute o servidor:
   ```bash
   npm run start:dev
   ```

### Frontend

1. Navegue até a pasta `frontend`.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## Dependências Utilizadas

- **Nest.js**: Framework Node.js para criar aplicações backend eficientes.
- **Prisma**: ORM utilizado para gerenciar o banco de dados **PostgreSQL**.
- **Next.js**: Framework React para desenvolvimento frontend.
- **Tailwind CSS**: Framework CSS para criar interfaces responsivas e bonitas.
- **JWT**: Utilizado para a autenticação via token.

## Contribuindo

Se você deseja contribuir para este projeto, por favor siga os seguintes passos:

1. Faça um fork deste repositório.
2. Crie uma nova branch para suas alterações (`git checkout -b feature/nova-funcionalidade`).
3. Faça as alterações e commit.
4. Envie um pull request explicando suas mudanças.

---

Desenvolvido por Emanuel Costa.
