# Avaliação de Filmes

## 1. Sobre o projeto

Este projeto tem como objetivo analisar as avaliações de filmes, calcular a média das notas recebidas e classificar cada filme de acordo com o resultado obtido.

A aplicação foi desenvolvida em JavaScript e utiliza testes automatizados para validar as regras de negócio e o tratamento de entradas inválidas.

## 2. Objetivos

- Calcular a média das avaliações de cada filme.
- Contabilizar a quantidade de votos recebidos.
- Classificar os filmes de acordo com a média calculada.
- Validar os dados de entrada.
- Automatizar os testes utilizando Mocha.
- Gerar um relatório HTML com os resultados dos testes utilizando Mochawesome.

## 3. Regras de negócio

A classificação dos filmes segue os seguintes critérios:

| Média das avaliações | Classificação |
|---|---|
| Maior ou igual a 4 | Filme recomendado |
| Maior ou igual a 3 e menor que 4 | Filme razoável |
| Menor que 3 | Filme ruim |

### Validações implementadas

A aplicação verifica se:

- O filme possui um nome válido.
- As avaliações são fornecidas em um vetor.
- O vetor de avaliações não está vazio.
- Todas as notas são números válidos entre 1 e 5.
- A lista de filmes recebida para processamento é um vetor.

Quando os dados não atendem aos critérios estabelecidos, a aplicação lança uma exceção apropriada.

## 4. Tecnologias e ferramentas

- **JavaScript:** linguagem de programação utilizada.
- **Node.js:** ambiente de execução JavaScript.
- **npm:** gerenciamento de dependências e execução dos scripts do projeto.
- **Mocha:** framework utilizado para executar os testes automatizados.
- **Mochawesome:** ferramenta para geração do relatório HTML dos testes.
- **Visual Studio Code:** editor utilizado para desenvolver o projeto e executar os testes pelo terminal.
- **IntelliJ IDEA:** ambiente de desenvolvimento que permite executar os testes pelo terminal integrado ou pela opção Run, conforme a configuração.

## 5. Estrutura do projeto

```text
avaliacao-filmes/
├── src/
│   └── avaliacaoFilmes.js
├── test/
│   └── avaliacaoFilmes.spec.js
├── mochawesome-report/
│   └── mochawesome.html
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

**Observação:** a pasta `mochawesome-report` e o arquivo HTML são gerados durante a execução dos testes. Portanto, podem não existir antes da primeira execução bem-sucedida.

## 6. Pré-requisitos

Antes de executar o projeto, é necessário ter o Node.js instalado, incluindo o npm.

Para verificar se estão instalados, abra um terminal e execute:

```bash
node -v
npm -v
```

Os comandos devem apresentar as versões instaladas.

## 7. Instalação do projeto

Independentemente da ferramenta utilizada, a instalação das dependências deve ser realizada antes da execução dos testes.

1. Abra a pasta `avaliacao-filmes` no VS Code ou no IntelliJ IDEA.
2. Abra o terminal integrado da ferramenta.
3. Confirme que o terminal está na pasta raiz do projeto, onde está localizado o arquivo `package.json`.
4. Execute:

```bash
npm install
```

5. Aguarde a conclusão da instalação.

Esse comando instala as dependências definidas no `package.json`, incluindo Mocha e Mochawesome.

## 8. Execução dos testes no Visual Studio Code

No Visual Studio Code, a execução dos testes é realizada pelo terminal integrado.

### 8.1 Abrir o projeto

1. Abra o Visual Studio Code.
2. Acesse **File → Open Folder**.
3. Localize e selecione a pasta `avaliacao-filmes`.
4. Aguarde o carregamento dos arquivos.

### 8.2 Instalar as dependências

1. Acesse **Terminal → New Terminal**.
2. Confirme que o terminal está na pasta raiz do projeto.
3. Execute:

```bash
npm install
```

4. Aguarde a instalação das dependências.

### 8.3 Executar os testes

No terminal integrado, execute:

```bash
npm test
```

Aguarde a execução dos casos de teste. O resultado será apresentado no terminal, indicando os testes aprovados e eventuais falhas.

### 8.4 Visualizar o relatório

1. No painel Explorer, localize a pasta `mochawesome-report`.
2. Encontre o arquivo HTML gerado pelo Mochawesome.
3. Abra o arquivo no navegador de sua preferência.

O relatório apresenta os resultados da execução e os detalhes das falhas, quando existirem.

## 9. Execução dos testes no IntelliJ IDEA

No IntelliJ IDEA, os testes podem ser executados de duas maneiras: pelo terminal integrado ou diretamente pela IDE, utilizando a opção **Run**.

### 9.1 Abrir o projeto

1. Abra o IntelliJ IDEA.
2. Na tela inicial, clique em **Open**.
3. Localize e selecione a pasta `avaliacao-filmes`, que contém o arquivo `package.json`.
4. Aguarde o carregamento dos arquivos.
5. Caso seja solicitada confirmação de confiança no projeto, confirme se reconhecer a origem dos arquivos.

### 9.2 Instalar as dependências

1. Acesse **View → Tool Windows → Terminal**.
2. Confirme que o terminal está na pasta raiz do projeto, onde está o `package.json`.
3. Execute:

```bash
npm install
```

4. Aguarde a conclusão da instalação.

### 9.3 Executar os testes pelo terminal

1. Abra o terminal integrado do IntelliJ IDEA.
2. Execute:

```bash
npm test
```

3. Aguarde a execução dos testes.
4. Confira o resultado apresentado no terminal.

Essa forma utiliza o script definido no `package.json` e é recomendada para executar a suíte de testes e gerar o relatório Mochawesome.

### 9.4 Executar os testes pela própria IDE usando Run

Também é possível executar os testes diretamente pelo IntelliJ IDEA, sem digitar `npm test`.

1. No painel **Project**, localize a pasta `test`.
2. Abra o arquivo `avaliacaoFilmes.spec.js`.
3. Clique com o botão direito no arquivo ou no bloco `describe` que contém os testes.
4. Selecione **Run 'avaliacaoFilmes.spec.js'** ou a opção equivalente disponível na sua versão do IntelliJ.
5. Aguarde a execução.
6. Consulte os resultados na janela **Run**.

Se a opção Run não aparecer, pode ser necessário configurar o Node.js e a integração com o Mocha, dependendo da versão e dos recursos instalados no IntelliJ IDEA.

**Importante:** executar os testes diretamente pelo Run pode não gerar o relatório Mochawesome, pois isso depende da configuração de execução. Para garantir a geração do relatório pelo script do projeto, execute `npm test` pelo terminal integrado.

### 9.5 Visualizar o relatório no IntelliJ IDEA

Após executar `npm test`:

1. Localize a pasta `mochawesome-report` no painel Project.
2. Encontre o arquivo HTML gerado.
3. Abra o arquivo no navegador.

Se não houver uma opção para abrir o HTML no navegador pelo IntelliJ, utilize o explorador de arquivos do sistema operacional e abra o arquivo no navegador de sua preferência.

## 10. Relatório de testes com Mochawesome

O Mochawesome gera um relatório HTML com informações sobre a execução dos testes automatizados.

O relatório pode apresentar:

- Quantidade de testes executados.
- Quantidade de testes aprovados.
- Quantidade de testes reprovados.
- Tempo de execução.
- Detalhes dos testes que falharam.

Com o script padrão abaixo no `package.json`:

```json
"test": "npx mocha --reporter mochawesome"
```

O relatório normalmente será gerado em:

```text
mochawesome-report/mochawesome.html
```

Para gerar o relatório novamente, execute:

```bash
npm test
```

Se o nome do arquivo tiver sido personalizado no `package.json`, abra o arquivo correspondente à configuração utilizada.

## 11. Casos de teste automatizados

A suíte de testes contempla os seguintes cenários:

| ID | Cenário | Resultado esperado |
|---|---|---|
| CT01 | Média maior ou igual a 4 | Filme recomendado |
| CT02 | Média entre 3 e 4 | Filme razoável |
| CT03 | Média menor que 3 | Filme ruim |
| CT04 | Média exatamente igual a 4 | Filme recomendado |
| CT05 | Avaliação de todos os filmes | Retornar os resultados de todos os filmes |
| CT06 | Vetor de avaliações vazio | Lançar `RangeError` |
| CT07 | Nota fora do intervalo permitido | Lançar `RangeError` |
| CT08 | Avaliações que não são um vetor | Lançar `TypeError` |

## 12. Resultados esperados para os filmes cadastrados

| Filme | Quantidade de votos | Média | Classificação |
|---|---:|---:|---|
| Minha mãe é uma peça | 5 | 4,40 | Filme recomendado |
| Saneamento Básico | 5 | 3,20 | Filme razoável |
| Se eu fosse você | 3 | 2,00 | Filme ruim |

Os valores representam os resultados esperados para os dados cadastrados em `src/avaliacaoFilmes.js`.

## 13. Fluxo recomendado de execução

Para reproduzir a execução do projeto:

1. Abrir a pasta `avaliacao-filmes` na ferramenta escolhida.
2. Instalar as dependências com `npm install`.
3. Executar os testes com `npm test` ou, no IntelliJ IDEA, utilizar a opção Run quando estiver configurada.
4. Conferir os resultados apresentados pela ferramenta.
5. Abrir a pasta `mochawesome-report`.
6. Visualizar o relatório HTML no navegador.
7. Investigar eventuais falhas antes de considerar a execução concluída.

## 14. Controle de versão com Git

Para verificar as alterações do repositório:

```bash
git status
```

Para adicionar as alterações:

```bash
git add .
```

Para registrar um commit:

```bash
git commit -m "Atualiza documentação e testes de avaliação de filmes"
```

Para enviar as alterações à branch remota correspondente:

```bash
git push
```

Antes de executar o `git push`, confirme que está na branch correta e que o repositório remoto está configurado.

## 15. Considerações finais

O projeto demonstra a aplicação de regras de negócio em JavaScript, a validação de entradas e a utilização de testes automatizados com Mocha.

O Mochawesome complementa a execução ao disponibilizar um relatório HTML que facilita a análise dos resultados e a identificação de falhas.

No VS Code, os testes são executados pelo terminal integrado. No IntelliJ IDEA, é possível utilizar o terminal ou a opção Run, conforme a configuração disponível. Para gerar o relatório seguindo o script do projeto, recomenda-se executar `npm test`.
