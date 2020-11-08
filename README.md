# README - DESAFIO

# Descrição do projeto

> Gerenciamento de Estabelecimento.

Os links para cada projeto estão abaixo:

- Backend API NodeJS: [https://github.com/MaikeRds/desafio-backend.git](https://github.com/MaikeRds/desafio-backend.git)
- Frontend Angular:  [https://github.com/MaikeRds/desafio-frontend.git](https://github.com/MaikeRds/desafio-frontend.git)

![https://i.ibb.co/VNPBWMN/Untitled.png](https://i.ibb.co/VNPBWMN/Untitled.png)

![https://i.ibb.co/Y8wGY6T/Untitled-1.png](https://i.ibb.co/Y8wGY6T/Untitled-1.png)

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- Docker
- Docker-Compose
- Node.js
- Angular
- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- Authentication - JWT
- Swagger

## Como instalar

---

### 🎲 Backend (API)

- Para baixar o projeto siga as instruções abaixo:

```bash
$ git clone https://github.com/MaikeRds/desafio-backend.git
$ cd desafio-backend
```

- Instalar usando docker para realizar processo automatizado de inicialização.

```bash
# Criar volume para persistir os dados do banco
$ docker volume create --name=dbdata

# Iniciar a construção de containers
$ docker-compose up

# O servidor inciará na porta:3000 - acesse <http://localhost:3000>
```

- Ou instale as dependências manual e inicie o servidor:

```bash
# Install the dependencies
$ npm install

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Frontend (Angular)

Este projeto foi gerado com Angular CLI version 10.0.8.

- Para baixar o projeto siga as instruções abaixo:

```bash
$ git https://github.com/MaikeRds/desafio-frontend.git
$ cd desafio-frontend
```

- Instalar usando docker para realizar processo automatizado de inicialização.

```bash
# Iniciar a construção de containers
$ docker-compose up

# O servidor inciará na porta:4200 - acesse <http://localhost:4200>
```

or

```bash
$ npm install
$ ng serve
```
