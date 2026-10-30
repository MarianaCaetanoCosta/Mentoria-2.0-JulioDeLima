# Aula 9 - Testes de login com Cucumber e Selenium

Projeto de automação de testes de interface para o fluxo de login. Os cenários são escritos em Gherkin e executados pelo Cucumber; o Selenium WebDriver controla o Google Chrome e interage com a aplicação.

## Tecnologias

- Node.js e npm
- [Cucumber.js](https://cucumber.io/docs/installation/javascript/)
- Selenium WebDriver
- Google Chrome

## Pré-requisitos

- Node.js 20 ou superior e npm.
- Google Chrome instalado.
- Os projetos `Projetos/banco-api` e `Projetos/banco-web` disponíveis no repositório.
- A API REST e a aplicação web iniciadas antes de executar os testes. O frontend fica em `http://localhost:4000/` e usa a API em `http://localhost:3000/`.

O Selenium Manager, incluído no Selenium WebDriver, resolve o driver do navegador automaticamente nas versões atuais.

## Instalação

Instale as dependências dos três projetos, cada um no seu diretório. A partir da raiz do repositório:

```bash
cd Projetos/banco-api
npm install

cd ../banco-web
npm install

cd ../../Aula_9_Cucumber
npm install
```

Se quiser instalar exatamente as versões registradas no `package-lock.json`, use `npm ci` no lugar de `npm install`.

## Como executar

Antes dos testes, inicie a API e o frontend em terminais separados. Os comandos abaixo partem da raiz do repositório:

**Terminal 1 - API REST** (`Projetos/banco-api`):

```bash
cd Projetos/banco-api
npm run rest-api
```

A API REST usa a porta `3000`. Caso necessário, configure as variáveis de ambiente e pré-requisitos da API conforme o [README do banco-api](../Projetos/banco-api/README.md).

**Terminal 2 - aplicação web** (`Projetos/banco-web`):

```bash
cd Projetos/banco-web
npm run server
```

O servidor web usa a porta `4000` e, por padrão, consome a API em `http://localhost:3000/`. Acesse `http://localhost:4000/` para confirmar que a aplicação abriu.

**Terminal 3 - testes Cucumber** (`Aula_9_Cucumber`):

```bash
cd Aula_9_Cucumber
npx cucumber-js features/login.feature --require features/step_definitions/loginSteps.js --format progress
```

O Cucumber abre o Chrome, acessa a página de login e executa as etapas do arquivo `features/login.feature`. Mantenha os terminais da API e do servidor web em execução enquanto os testes rodam. Para executar todos os arquivos `.feature` encontrados pelo Cucumber, remova `features/login.feature` do comando.

## Estrutura do projeto

```text
Aula_9_Cucumber/
├── cucumber.js
├── features/
│   ├── login.feature
│   └── step_definitions/
│       └── loginSteps.js
├── package.json
└── package-lock.json
```

- `features/login.feature`: descreve o comportamento esperado em Gherkin (`Given`, `When` e `Then`).
- `features/step_definitions/loginSteps.js`: associa cada etapa do Gherkin a uma função JavaScript e contém as interações com o navegador e as verificações.
- `cucumber.js`: arquivo de configuração do Cucumber.
- `package.json` e `package-lock.json`: dependências e configuração do projeto npm.

## Como obter os métodos/steps pelo terminal

Ao adicionar uma etapa ao `.feature`, escreva sua frase em Gherkin e rode o comando de execução. Se o Cucumber não encontrar uma definição correspondente, ele informa que a etapa está indefinida e imprime um snippet de JavaScript sugerido no terminal.

Por exemplo, para uma nova etapa:

```gherkin
When informo meu usuário
```

O Cucumber sugere uma definição semelhante a esta:

```js
When("informo meu usuário", async function () {
  return "pending";
});
```

Copie o snippet para `features/step_definitions/loginSteps.js`, junto dos imports do Cucumber, e substitua o retorno `"pending"` pela ação real. A frase usada no `Given`, `When` ou `Then` precisa corresponder à etapa no `.feature`.

## Como implementar as ações

O arquivo `loginSteps.js` já contém um exemplo completo do fluxo:

1. **Preparar o navegador:** os hooks `Before` e `After` iniciam e encerram o WebDriver.
2. **Acessar a tela:** o `Given` maximiza a janela e navega até `http://localhost:4000/`.
3. **Executar o login:** o `When` recebe a tabela de dados com `dataTable.rowsHash()`, localiza os campos pelo ID (`username` e `senha`), preenche os valores e clica no botão `Entrar`.
4. **Validar o resultado:** o `Then` lê o texto da página e usa `assert.ok` para confirmar que `Realizar Transferência` aparece após o login.

Exemplo de interação com os elementos:

```js
const data = dataTable.rowsHash();

await driver.findElement(By.id("username")).sendKeys(data.usuario);
await driver.findElement(By.id("senha")).sendKeys(data.senha);
await driver.findElement(By.xpath("//button[text()='Entrar']")).click();
```

Use localizadores (`By.id`, `By.css`, `By.xpath`, entre outros) que correspondam aos elementos reais da aplicação. Para uma nova condição esperada, implemente a verificação no `Then` com `assert` e uma mensagem que ajude a identificar a falha.

> **Atenção aos dados do cenário:** o `When` atual recebe uma tabela fixa (`usuario` e `senha`) e a converte com `rowsHash()`. Os valores da tabela `Examples` de um `Scenario Outline` só são usados quando aparecem como parâmetros, por exemplo `<usuario>` e `<senha>`, no texto das etapas. No estado atual, esses valores de `Examples` não substituem a tabela fixa do `When`.
