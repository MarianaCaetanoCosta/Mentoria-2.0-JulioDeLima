# Exercícios JavaScript + Mocha

Projeto desenvolvido durante a **Mentoria de Teste de Software 2.0 — Júlio de Lima** para praticar **testes automatizados com JavaScript, Node.js e Mocha**.

O projeto contém dois exercícios envolvendo lógica de programação e validação automatizada de resultados, utilizando casos de teste com `assert`.

## 🛠️ Tecnologias

- JavaScript
- Node.js
- npm
- Mocha
- Assert (Node.js)

## 📁 Estrutura

```text
Exercicios-JavaScript-Mocha/
│
├── src/
│   ├── exercicio1.js
│   └── exercicio2.js
│
├── test/
│   ├── exercicio1.test.js
│   └── exercicio2.test.js
│
├── node_modules/
├── package-lock.json
├── package.json
└── README.md
```

- **`src/`** — contém as funções dos exercícios.
- **`test/`** — contém os testes automatizados.
- **`package.json`** — configura o projeto, dependências e scripts.
- **`README.md`** — documentação do projeto.

---

# Exercício 1 — Contagem de pedidos de café

### Objetivo

Receber uma lista de pedidos de uma cafeteria e identificar quantos pedidos de **café** foram realizados.

### Exemplo

**Entrada:**

```javascript
["café", "cha", "bolo de cenoura", "café", "suco de laranja"]
```

**Resultado esperado:**

```text
2
```

### Casos de teste

| # | Entrada | Esperado |
|---|---|---:|
| 1 | `["café", "cha", "café"]` | `2` |
| 2 | `["cha", "bolo", "suco"]` | `0` |
| 3 | `["café", "café", "café"]` | `3` |

---

# Exercício 2 — Relatório de execução de testes

### Objetivo

Analisar um log de execução contendo `pass` e `fail` e gerar:

- Total de testes;
- Total de sucessos;
- Total de falhas;
- Taxa de aprovação (*Pass Rate*).

### Exemplo

**Entrada:**

```javascript
["pass", "fail", "pass", "fail", "pass"]
```

**Resultado esperado:**

```text
Total de testes: 5
Total de sucessos: 3
Total de falhas: 2
Pass rate: 60%
```

A função retorna:

```javascript
{
    total: 5,
    sucessos: 3,
    falhas: 2,
    passRate: 60
}
```

### Cálculo do Pass Rate

```text
Pass Rate = (sucessos / total de testes) × 100
```

### Casos de teste

| # | Entrada | Total | Sucessos | Falhas | Pass Rate |
|---|---|---:|---:|---:|---:|
| 1 | `["pass", "fail", "pass", "fail", "pass"]` | 5 | 3 | 2 | 60% |
| 2 | `["pass", "pass", "pass", "pass"]` | 4 | 4 | 0 | 100% |
| 3 | `["fail", "fail", "fail"]` | 3 | 0 | 3 | 0% |

---

# 📦 Instalação

Após clonar ou baixar o projeto, instale as dependências com:

```bash
npm install
```

O comando instala as dependências definidas no `package.json`, incluindo o **Mocha**.

---

# ▶️ Como executar

Para executar todos os testes automatizados:

```bash
npm test
```

O comando utiliza o script configurado no `package.json`:

```json
"scripts": {
    "test": "mocha"
}
```

## 🧪 Testes automatizados

Cada exercício possui **3 casos de teste**, totalizando **6 testes automatizados**.

Os testes utilizam:

- `describe()` — agrupa testes relacionados;
- `it()` — define cada caso de teste;
- `assert.strictEqual()` — compara o resultado obtido com o esperado;
- `console.log()` — exibe informações durante a execução.

O `console.log()` é utilizado apenas para visualização. A validação automática é realizada pelo `assert`.

### Resultado

```text
6 passing
```

- Exercício 1: **3 testes aprovados**
- Exercício 2: **3 testes aprovados**
- Total: **6 testes aprovados**

---

# 📚 Conhecimentos praticados

- Criação de projeto Node.js;
- JavaScript;
- Funções;
- Arrays;
- `for...of`;
- Estruturas condicionais;
- Contadores;
- Cálculos;
- `module.exports`;
- `require`;
- Mocha;
- `describe()` e `it()`;
- `assert.strictEqual()`;
- Testes automatizados;
- Execução de testes com `npm test`.