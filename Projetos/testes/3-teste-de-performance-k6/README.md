# Testes de Performance com k6

## 1. Introdução

Este projeto foi desenvolvido como parte da Mentoria 2.0 para praticar testes de performance com Grafana k6. Os scripts enviam requisições HTTP para os endpoints de login e transferência de uma API de estudo, executam verificações (*checks*) e, no teste de login, avaliam critérios de desempenho (*thresholds*).

Os cenários permitem praticar a execução de testes, a reutilização da autenticação e a análise dos resultados no terminal e no dashboard web do k6.

## 2. Tecnologias utilizadas

- **JavaScript (módulos ES):** linguagem usada nos scripts de teste.
- **Grafana k6:** ferramenta de execução de testes de carga e análise de métricas.
- **JSON:** formato usado para a configuração local e os dados de login.
- **API de estudo:** aplicação que deve estar em execução para receber as requisições.

Documentação oficial: [Grafana k6](https://grafana.com/docs/k6/latest/).

## 3. Estrutura do repositório

```text
3-teste-de-performance-k6/
├── config/
│   └── config.local.json
├── fixtures/
│   └── postLogin.json
├── helpers/
│   └── autenticacao.js
├── tests/
│   ├── login.test.js
│   └── transferencia.test.js
├── Utils/
│   └── variaveis.js
├── Como executar e gera relatório.txt
└── html-report.html
```

## 4. Objetivo de cada grupo de arquivos

| Grupo/arquivo | Objetivo |
| --- | --- |
| `config/config.local.json` | Define a URL padrão da API, atualmente `http://localhost:3000`. |
| `fixtures/postLogin.json` | Guarda os dados de login utilizados pelo teste e pelo helper de autenticação. |
| `helpers/autenticacao.js` | Centraliza a requisição de login e retorna o token para ser usado em outras rotinas. |
| `tests/login.test.js` | Executa um cenário de carga para `POST /login), verifica o status HTTP 200 e se o campo `token` é uma string. Também define thresholds para duração e falhas das requisições. |
| `tests/transferencia.test.js` | Obtém um token, envia uma requisição para `POST /transferencias` e verifica se o status HTTP é 201. Atualmente, está configurado para uma iteração. |
| `Utils/variaveis.js` | Disponibiliza `pegarBaseUrl()`, que prioriza a variável de ambiente `BASE_URL` e usa a configuração local como alternativa. |
| `Como executar e gera relatório.txt` | Arquivo de apoio com orientações de execução e geração de relatório. |
| `html-report.html` | Arquivo HTML de relatório já presente no repositório; novas execuções podem gerar outro relatório com o mesmo nome. |

## 5. Modo de instalação e de execução do projeto

### 5.1 Pré-requisitos

1. Instale o [Grafana k6](https://grafana.com/docs/k6/latest/set-up/install-k6/).
2. Inicie a API de estudo e confirme que está acessível.
3. Confirme que a API disponibiliza os endpoints `POST /login` e `POST /transferencias`.
4. Confira se as credenciais em `fixtures/postLogin.json` são válidas para a API em execução.

A URL padrão configurada no projeto é:

```text
http://localhost:3000
```

### 5.2 Baixar o projeto

Clone o repositório e entre na pasta do projeto:

```bash
git clone https://github.com/MarianaCaetanoCosta/Mentoria-2.0-JulioDeLima.git
cd Mentoria-2.0-JulioDeLima/Projetos/testes/3-teste-de-performance-k6
```

Para usar a branch que contém o projeto, execute antes de entrar na pasta:

```bash
git checkout teste-performance
```

### 5.3 Executar o teste de login

No terminal aberto na pasta `3-teste-de-performance-k6`, execute:

```bash
k6 run tests/login.test.js
```

O cenário está configurado com estes estágios:

- 5 segundos para aumentar até 10 usuários virtuais (VUs);
- 20 segundos mantendo 10 VUs;
- 5 segundos para reduzir até 0 VUs.

O script valida o status HTTP 200 e se o campo `token` é uma string. Ele também aplica os thresholds descritos a seguir na saída do k6.

### 5.4 Executar o teste de transferência

```bash
k6 run tests/transferencia.test.js
```

O script solicita um token ao endpoint de login, envia a transferência e verifica o status HTTP 201. Como está configurado para apenas uma iteração, esse cenário serve como uma verificação pontual e não como um teste de carga abrangente.

### 5.5 Configurar a URL da API

A variável `BASE_URL` permite usar outra URL sem modificar os scripts. Exemplo no Git Bash:

```bash
k6 run -e BASE_URL=http://localhost:3000 tests/login.test.js
```

Substitua o endereço pelo ambiente de teste autorizado que deseja utilizar. Quando `BASE_URL` não é informada, o script utiliza `config/config.local.json`.

### 5.6 Thresholds do teste de login

| Métrica | Critério | Significado |
| --- | --- | --- |
| `http_req_duration` | `p(90)<3000` | 90% das requisições devem durar menos de 3 segundos. |
| `http_req_duration` | `max<5000` | A duração máxima deve ser inferior a 5 segundos. |
| `http_req_failed` | `rate<0.1` | A taxa de requisições com falha deve ficar abaixo de 10%. |

Os thresholds não substituem os checks funcionais. Analise também o status das validações, a quantidade de requisições executadas e eventuais erros de script. Métricas zeradas após uma falha que impediu o envio das requisições não significam que o teste passou.

## 6. Execução do k6 com acompanhamento do relatório em tempo real e exportação do mesmo

O k6 oferece um dashboard web para acompanhar métricas enquanto o teste está em execução. Também é possível exportar automaticamente um relatório HTML ao final da execução. Consulte a [documentação oficial do dashboard web](https://grafana.com/docs/k6/latest/results-output/web-dashboard/).

### 6.1 Acompanhar o teste de login em tempo real e exportar o HTML

No Git Bash, com a API em execução e estando na pasta do projeto, execute:

```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run tests/login.test.js
```

Durante a execução, abra no navegador:

```text
http://127.0.0.1:5665
```

O dashboard mostra as métricas em tempo real. Ao término do teste, o k6 exporta o relatório para `html-report.html` na pasta de onde o comando foi executado, substituindo um arquivo de mesmo nome se já existir.

### 6.2 Acompanhar o teste de transferência e exportar o HTML

```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run tests/transferencia.test.js
```

O dashboard fica disponível em `http://127.0.0.1:5665` enquanto o teste estiver rodando. O relatório é exportado ao final, se houver dados suficientes para gerá-lo.

**Importante:** o teste de transferência tem somente uma iteração. Execuções muito curtas podem não gerar um relatório HTML com gráficos ou podem ser consideradas insuficientes. Para análise de desempenho, use um cenário de duração apropriada; não interprete a falta de gráficos como aprovação do teste.

### 6.3 Onde encontrar o relatório

Depois que o comando terminar, procure o arquivo `html-report.html` na pasta atual do terminal. Abra-o em um navegador para consultar o relatório salvo. Se desejar preservar relatórios de execuções diferentes, altere o nome de exportação, por exemplo:

```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=relatorio-login.html k6 run tests/login.test.js
```

Se a porta 5665 já estiver sendo usada, feche a execução anterior do k6 ou configure outra porta para o dashboard.

### Boas práticas

- Não versione senhas, tokens ou outros segredos reais. Use credenciais específicas de teste e mantenha informações sensíveis fora do repositório.
- Execute testes de carga somente em ambientes autorizados.
- Confirme que a API está disponível antes de iniciar os scripts.
- Analise checks, thresholds, quantidade de requisições e erros em conjunto.
- Mantenha dados de contas e valores de transferência adequados ao ambiente de teste.

---

Projeto de estudo — Mentoria 2.0 | Testes de Performance com k6.
