# 🛒 Carrinho de Supermercado

Exercício de lógica de programação em JavaScript desenvolvido durante a mentoria de Testes de Software.

## 📌 Descrição do exercício

Você tem um vetor de preços de produtos em um carrinho de supermercado. Some o resultado total das compras.

**Entrada:**

```javascript
[
    {nome: 'Arroz', preco: 22.00},
    {nome: 'Feijão', preco: 3.50},
    {nome: 'Macarrão', preco: 7}
]
```

**Saída esperada:**

```text
32.50
```

### Desafio

Adicionar um desconto de **10%** se o total da compra for superior a **R$ 200,00**.

O projeto deve ser criado em Node.js, seguindo a estrutura apresentada na aula 4, contendo o código da aplicação/fonte e os arquivos de teste, com **no mínimo 3 casos de teste**.

---

## 🎯 Planejamento

A solução foi dividida em:

- calcular o total dos produtos do carrinho;
- verificar se o total é superior a R$ 200,00;
- aplicar 10% de desconto quando a regra for atendida;
- retornar o valor final da compra.

Foram criados três cenários de teste:

1. Compra abaixo de R$ 200,00;
2. Compra acima de R$ 200,00 com aplicação do desconto;
3. Compra exatamente de R$ 200,00, sem aplicação do desconto.

---

## 📁 Estrutura

```text
carrinho-supermercado/
├── src/
│   └── calcularTotalCompra.js
├── test/
│   └── calcularTotalCompra.test.js
├── package.json
└── package-lock.json
```

---

## 💻 Código da aplicação

```javascript
export function calcularTotalCompra(listaProdutos){
    let totalCompra = 0

    listaProdutos.forEach(produto => {
        totalCompra = totalCompra + produto.preco
    })

    if(totalCompra > 200){
        totalCompra = totalCompra - (totalCompra * 0.10)
    }

    return totalCompra
}
```

---

## 🧪 Testes

Os testes foram desenvolvidos utilizando **Mocha** e `assert` do Node.js, seguindo a estrutura **Arrange, Act e Assert**.

### Casos de teste

| Caso | Cenário | Resultado |
|---|---|---:|
| CT01 | Compra abaixo de R$ 200 | R$ 32,50 |
| CT02 | Compra acima de R$ 200 | R$ 225,00 |
| CT03 | Compra igual a R$ 200 | R$ 200,00 |

---

## 📥 Como executar

Clone o projeto:

```bash
git clone URL_DO_REPOSITORIO
```

Acesse a pasta:

```bash
cd carrinho-supermercado
```

Instale as dependências:

```bash
npm install
```

Execute os testes:

```bash
npm test
```

---

## 📊 Como visualizar o relatório

Após executar:

```bash
npm test
```

o **Mochawesome** gera o relatório dos testes.

O arquivo HTML fica na pasta:

```text
mochawesome-report/
└── mochawesome.html
```

Para visualizar:

1. Abra a pasta `mochawesome-report` no projeto.
2. Localize o arquivo `mochawesome.html`.
3. Abra o arquivo no navegador.

O relatório apresenta o resultado da execução dos testes de forma visual, incluindo os casos **passou/falhou** e os detalhes da execução.