# Pokemon Capture API

API REST simples para registrar pokémons capturados por treinadores (Kanto 150). O banco é mantido em memória.

Principais pontos:
- Linguagem: Node.js + Express
- Autenticação: JWT (Bearer token) via middleware
- Senhas: armazenadas com bcrypt (hash)
- Dados dos 150 pokémons de Kanto: `src/resources/pokemons.json`
- Estrutura em camadas: routes, controllers, services, models, middleware
- Documentação Swagger em `src/resources/swagger.yaml` (acessível em /docs quando o app estiver rodando)

Instalação e execução

1. Baixe o projeto no GitHub:

```text
https://github.com/igor-de-andrade/pokemon-api
```

2. Abra o projeto no Visual Studio Code:

```powershell
code .
```

3. Instale dependências:

```powershell
npm install
```

4. Execute a API REST:

```powershell
npm run start:rest
```

> Abra a documentação Swagger em: http://localhost:3000/api-docs/

5. Execute a API GraphQL:

```powershell
npm run start:graphql
```

> Abra o Apollo Studio em: https://studio.apollographql.com/sandbox/explorer

6. Execute os testes:

```powershell
npm run test:graphql
```

Endpoints principais

- POST /trainers/register
  - Body: { login, password, nickname, sex, initialPokemon }
  - Retorna trainer (sem password) e token JWT

- POST /auth/login
  - Body: { login, password }
  - Retorna token JWT

- GET /pokemons (protegido)
  - Lista capturas do treinador autenticado

- POST /pokemons (protegido)
  - Body: { pokemonId, sex, level }
  - O campo captureId é gerado automaticamente pela API.

- PUT /pokemons/:captureId/level (protegido)
  - Body: { level }

- DELETE /pokemons/:captureId (protegido)

- GET /pokemons/species/count (protegido)
  - Retorna { captured, total }

Observações

- Use o header `Authorization: Bearer <token>` para acessar rotas protegidas.
- O token é emitido no login e no register. Cada treinador tem sua própria lista de capturas; não é possível acessar ou modificar registros de outro treinador.
- A totalização de espécies (endpoint /pokemons/species/count) conta apenas espécies distintas (pokemonId únicos) capturadas pelo treinador.

Próximos passos sugeridos

- Persistência em arquivo ou banco real
- Validações mais completas e testes automatizados
- Dockerfile e integração contínua

---

## API GraphQL (Apollo Server)

A API GraphQL está na pasta `src/graphql/` e utiliza Apollo Server + Express.

### Instalação das dependências GraphQL

```powershell
npm install apollo-server-express@3.12.0 express@4.18.2 bcryptjs jsonwebtoken uuid
```

### Como rodar a API GraphQL

```powershell
npm run start:graphql
```

Acesse o playground em:
- http://localhost:4000/graphql

### Exemplos de Queries e Mutations

#### Login
```graphql
mutation Login($login: String!, $password: String!) {
  login(login: $login, password: $password) {
    token
  }
}
```

Variáveis:
```json
{
  "login": "ash",
  "password": "pikachu123"
}
```

#### Listar capturas (autenticado)
```graphql
query Captures {
  captures {
    sex
    level
    captureId
    pokemonId
  }
}
```

#### Adicionar captura (autenticado)
```graphql
mutation AddCapture($pokemonId: Int!, $sex: String!, $level: Int!) {
  addCapture(pokemonId: $pokemonId, sex: $sex, level: $level) {
    captureId
    pokemonId
    sex
    level
  }
}
```

Variáveis:
```json
{
  "pokemonId": 7,
  "sex": "M",
  "level": 5
}
```

#### Atualizar nível de captura (autenticado)
```graphql
mutation UpdateCaptureLevel($captureId: ID!, $level: Int!) {
  updateCaptureLevel(captureId: $captureId, level: $level) {
    captureId
    pokemonId
    sex
    level
  }
}
```

Variáveis:
```json
{
  "captureId": "init-1",
  "level": 99
}
```

#### Perfil do usuário (autenticado)
```graphql
query UserProfile {
  captures {
    sex
    level
    captureId
    pokemonId
  }
  me {
    login
    nickname
    sex
  }
}
```

#### Excluir captura (autenticado)
```graphql
mutation {
  deleteCapture(captureId: "<id>")
}
```

#### Contagem de espécies capturadas (autenticado)
```graphql
query {
  speciesCount {
    captured
    total
  }
}
```

### Autenticação nas Mutations
Para Mutations protegidas, envie o token JWT no header:
```
Authorization: Bearer <token>
```

---
