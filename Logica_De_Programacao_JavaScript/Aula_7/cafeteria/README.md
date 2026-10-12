# ☕ Cafeteria

Exercício de lógica de programação em JavaScript desenvolvido durante a mentoria de Testes de Software.

## 📌 Descrição do exercício

Criar uma função que receba uma lista de pedidos e conte quantos pedidos de **"café"** foram realizados.

Exemplo:

```javascript
["café", "cha", "bolo de cenoura", "café", "suco de laranja"]
```

Resultado esperado: `2`.

## 🎯 Planejamento

A solução foi dividida em:

- Receber a lista de pedidos.
- Percorrer os itens da lista.
- Verificar quais pedidos são iguais a `"café"`.
- Contabilizar a quantidade encontrada.
- Retornar o resultado.

Foram criados três casos de teste:

1. Dois pedidos de café.
2. Nenhum pedido de café.
3. Três pedidos de café.

## 📁 Estrutura do projeto

```text
cafeteria/
├── src/
│   └── cafeteria.js
├── test/
│   └── cafeteria.test.js
├── package.json
├── package-lock.json
└── README.md
```

## 💻 Código da aplicação

```javascript
//Exemplo: ["café", "cha", "bolo de cenoura", "café", "suco de laranja"]

function contarPedidosCafe(pedidos) {
    let quantidade = 0;

    for (let pedido of pedidos) {
        if (pedido === "café") {
            quantidade++;
        }
    }

    return quantidade;
}

module.exports = contarPedidosCafe;
```

## 🧪 Testes

Os testes foram desenvolvidos utilizando **Mocha** e `assert` do Node.js.

| Caso | Cenário | Resultado esperado |
|---|---|---:|
| CT01 | Dois pedidos de café | 2 |
| CT02 | Nenhum pedido de café | 0 |
| CT03 | Três pedidos de café | 3 |

## 📥 Como executar

Clone o projeto:

```bash
git clone URL_DO_REPOSITORIO
```

Acesse a pasta:

```bash
cd cafeteria
```

Instale as dependências:

```bash
npm install
```

## ▶️ Executar os testes

```bash
npm test
```

## 📊 Relatório de testes

O projeto utiliza **Mochawesome** para geração do relatório dos testes.

Após executar:

```bash
npm test
```

o relatório HTML será gerado na pasta:

```text
mochawesome-report/
```

Abra o arquivo `.html` no navegador para visualizar o resultado dos testes.