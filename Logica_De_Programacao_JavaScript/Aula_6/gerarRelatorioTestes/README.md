# 🧪 Relatório de Testes

Exercício de lógica de programação em JavaScript desenvolvido durante a mentoria de Testes de Software.

## 📌 Descrição do exercício

Criar uma função que receba uma lista de logs de testes, contendo `"pass"` e `"fail"`, e gere um relatório com:

- Total de testes.
- Quantidade de sucessos.
- Quantidade de falhas.
- Percentual de aprovação.

Exemplo:

```javascript
["pass", "fail", "pass", "fail", "pass"]
```

Resultado esperado:

```javascript
{
    total: 5,
    sucessos: 3,
    falhas: 2,
    passRate: 60
}
```

## 🎯 Planejamento

A solução foi dividida em:

- Receber a lista de logs.
- Percorrer os resultados.
- Contabilizar os testes `"pass"` e `"fail"`.
- Calcular o percentual de aprovação.
- Retornar o relatório.

Foram criados três casos de teste:

1. Três sucessos e duas falhas.
2. Todos os testes com sucesso.
3. Todos os testes com falha.

## 📁 Estrutura do projeto

```text
relatorio-testes/
├── src/
│   └── gerarRelatorioTestes.js
├── test/
│   └── gerarRelatorioTestes.test.js
├── package.json
├── package-lock.json
└── README.md
```

## 💻 Código da aplicação

```javascript
//Exemplo: ["pass", "fail", "pass", "fail", "pass"]

function gerarRelatorioTestes(logs) {
    const total = logs.length;

    let sucessos = 0;
    let falhas = 0;

    for (let log of logs) {
        if (log === "pass") {
            sucessos++;
        }

        if (log === "fail") {
            falhas++;
        }
    }

    const passRate = (sucessos / total) * 100;

    return {
        total: total,
        sucessos: sucessos,
        falhas: falhas,
        passRate: passRate
    };
}

module.exports = gerarRelatorioTestes;
```

## 🧪 Testes

Os testes foram desenvolvidos utilizando **Mocha** e `assert` do Node.js.

| Caso | Cenário | Resultado esperado |
|---|---|---:|
| CT01 | 3 sucessos e 2 falhas | 60% |
| CT02 | Todos os testes com sucesso | 100% |
| CT03 | Todos os testes com falha | 0% |

## 📥 Como executar

Clone o projeto:

```bash
git clone URL_DO_REPOSITORIO
```

Acesse a pasta:

```bash
cd relatorio-testes
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