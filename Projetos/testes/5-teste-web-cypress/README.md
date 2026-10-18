# Testes Web com Cypress

Projeto de testes automatizados de interface, desenvolvido em JavaScript com Cypress para demonstrar aos alunos da **Mentoria 2.0** como estruturar e executar testes de ponta a ponta (E2E). Os exemplos cobrem fluxos de login e transferência da aplicação bancária, usando Custom Commands para reutilizar ações e facilitar a leitura dos cenários.

## Pré-requisitos

- Node.js e npm instalados.
- A [API do banco](https://github.com/MarianaCaetanoCosta/Mentoria-2.0-JulioDeLima/tree/main/Projetos/banco-api) em execução na pasta `Projetos/banco-api`.
- A [aplicação Web do banco](https://github.com/MarianaCaetanoCosta/Mentoria-2.0-JulioDeLima/tree/main/Projetos/banco-web) em execução na pasta `Projetos/banco-web` e acessível em `http://localhost:4000`.

Antes de executar os testes, abra **dois terminais** na raiz do repositório clonado e inicie os serviços, um em cada terminal:

**Terminal 1 — API:**

```bash
cd Projetos/banco-api
npm run rest-api
```

**Terminal 2 — aplicação Web:**

```bash
cd Projetos/banco-web
npm run server
```

Mantenha os dois processos em execução enquanto os testes Cypress estiverem rodando. A aplicação Web deve estar acessível em `http://localhost:4000`.

## Instalação

1. Clone o repositório e acesse a pasta do projeto:

   ```bash
   git clone https://github.com/MarianaCaetanoCosta/Mentoria-2.0-JulioDeLima.git
   cd Mentoria-2.0-JulioDeLima/Projetos/testes/5-teste-web-cypress
   ```

2. Instale as dependências listadas no `package.json`:

   ```bash
   npm install
   ```

   Para instalar exatamente as versões registradas no `package-lock.json`, use `npm ci`.

3. Inicie a API e a aplicação Web com os comandos da seção [Pré-requisitos](#pré-requisitos). Confirme que a aplicação Web está disponível em `http://localhost:4000`, endereço configurado como `baseUrl` do Cypress.

## Executar os testes

Com a API e a aplicação Web ainda em execução nos dois primeiros terminais, abra um **terceiro terminal** na raiz do repositório e acesse a pasta de testes:

```bash
cd Projetos/testes/5-teste-web-cypress
```

Execute todos os testes no terminal, em modo headless:

```bash
npm test
```

Para abrir a interface do Cypress, escolher os testes e executá-los pelo Test Runner:

```bash
npm run cy:open
```

No Test Runner, selecione **E2E Testing**, escolha um navegador e clique na especificação que deseja executar (`login.cy.js` ou `transferencia.cy.js`). Também é possível usar `npm run cy:headed` para executar todos os testes no terminal com o navegador visível.

Os demais scripts disponíveis são:

| Comando | Descrição |
| --- | --- |
| `npm run test-qa` | Executa `cypress run` (mesma configuração de `npm test`). |
| `npm run test-prod` | Executa `cypress run` (mesma configuração de `npm test`). |

Os scripts `test-qa` e `test-prod` atualmente executam o mesmo comando e não configuram ambientes diferentes.

## Estrutura do projeto

```text
.
├── cypress.config.js
├── cypress/
│   ├── e2e/
│   │   ├── login.cy.js
│   │   └── transferencia.cy.js
│   ├── fixtures/
│   │   └── credenciais.json
│   ├── reports/
│   │   └── mochawesome/
│   │       ├── mochawesome.html
│   │       └── mochawesome.json
│   ├── screenshots/
│   │   └── <capturas-geradas-quando-um-teste-falha>/
│   ├── support/
│   │   ├── e2e.js
│   │   ├── commands.js
│   │   └── commands/
│   │       ├── common.js
│   │       ├── login.js
│   │       └── transferencia.js
│   └── videos/
│       ├── login.cy.js.mp4
│       └── transferencia.cy.js.mp4
├── package.json
└── package-lock.json
```

- **`cypress.config.js`**: configura o Cypress, a URL base (`http://localhost:4000`), gravação de vídeos, captura de screenshots em falhas e o reporter Mochawesome.
- **`cypress/e2e/`**: contém as especificações dos testes automatizados.
- **`cypress/fixtures/credenciais.json`**: fornece dados de login válidos e inválidos aos testes.
- **`cypress/reports/mochawesome/`**: recebe o relatório HTML (`mochawesome.html`) e os dados JSON (`mochawesome.json`) produzidos pelo reporter.
- **`cypress/screenshots/`**: recebe as capturas de tela feitas quando um teste falha.
- **`cypress/videos/`**: recebe os vídeos gravados durante a execução dos testes.
- **`cypress/support/e2e.js`**: carrega os Custom Commands e registra o reporter no navegador.
- **`cypress/support/commands.js`**: importa e organiza os arquivos de comandos personalizados.
- **`cypress/support/commands/`**: implementa comandos reutilizáveis para ações comuns, login e transferência.
- **`package.json` e `package-lock.json`**: declaram as dependências e os scripts disponíveis para instalar e executar o projeto.

## Testes automatizados

### Login — `cypress/e2e/login.cy.js`

- **Login com credenciais válidas:** verifica que o usuário entra no sistema e visualiza a área de realização de transferência.
- **Login com credenciais inválidas:** verifica a mensagem de erro `Erro no login. Tente novamente.`.

### Transferência — `cypress/e2e/transferencia.cy.js`

Os testes fazem login antes de cada cenário e verificam o resultado apresentado pela aplicação:

- **Transferência com dados e valor válidos:** verifica a mensagem `Transferência realizada!`.
- **Transferência acima de R$ 5.000 sem token:** verifica a mensagem de que é necessária autenticação para esse valor.

## Custom Commands

Os comandos são registrados com `Cypress.Commands.add` e carregados automaticamente pelo suporte E2E.

| Comando | Arquivo | Responsabilidade |
| --- | --- | --- |
| `cy.verificarMensagemToast(mensagem)` | `cypress/support/commands/common.js` | Localiza a notificação `.toast` e verifica se seu texto corresponde à mensagem esperada. |
| `cy.selecionarOpcaoNaCombobox(labelDoCampo, opcao)` | `cypress/support/commands/common.js` | Localiza uma combobox pelo `label`, abre as opções e seleciona a opção informada. |
| `cy.fazerLoginComCredenciaisValidas()` | `cypress/support/commands/login.js` | Lê as credenciais válidas do fixture e realiza o login. |
| `cy.fazerLoginComCredenciaisInvalidas()` | `cypress/support/commands/login.js` | Lê as credenciais inválidas do fixture e tenta realizar o login. |
| `cy.realizarTransferencia(contaOrigem, contaDestino, valor)` | `cypress/support/commands/transferencia.js` | Seleciona as contas de origem e destino, preenche o valor e aciona a transferência. |

## Relatórios e artefatos

O reporter configurado é o `cypress-mochawesome-reporter`. Ao executar `cypress run`, ele gera os relatórios HTML e JSON em:

```text
cypress/reports/mochawesome/
```

O relatório HTML é `cypress/reports/mochawesome/mochawesome.html`. A configuração habilita gráficos e screenshots incorporadas no relatório. O Cypress também está configurado para gravar vídeos dos testes em `cypress/videos/` e capturar screenshots de falhas em `cypress/screenshots/`.