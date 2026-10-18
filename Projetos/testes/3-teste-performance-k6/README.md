# Testes de Performance com k6

## 1. Introdução

Este projeto faz parte da **Mentoria 2.0** e tem como objetivo praticar testes de performance com o [Grafana k6](https://grafana.com/docs/k6/latest/). Os scripts enviam requisições HTTP para os endpoints de login e transferência de uma API de estudo, executam *checks* funcionais e, no cenário de login, avaliam critérios de desempenho por meio de *thresholds*.

O projeto também demonstra a reutilização da autenticação entre cenários, a configuração da URL da API e a geração de relatórios HTML para análise dos resultados.

## 2. Tecnologias utilizadas

- **JavaScript (ES modules):** implementação dos scripts de teste.
- **Grafana k6:** execução dos testes e coleta de métricas.
- **JSON:** configuração local e dados utilizados no login.
- **API de estudo:** aplicação que recebe as requisições de teste.

Documentação oficial: [Grafana k6](https://grafana.com/docs/k6/latest/).

## 3. Estrutura do projeto

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

## 4. Responsabilidade dos arquivos

| Arquivo ou pasta | Descrição |
| --- | --- |
| `config/config.local.json` | Armazena a URL padrão da API, configurada como `http://localhost:3000`. |
| `fixtures/postLogin.json` | Contém os dados de login utilizados pelo cenário de autenticação. |
| `helpers/autenticacao.js` | Centraliza a chamada de login e retorna o token de autenticação para outros cenários. |
| `tests/login.test.js` | Executa o cenário de carga do login, verifica o status HTTP 200 e se o campo `token` é uma string. Também define os *thresholds* de desempenho. |
| `tests/transferencia.test.js` | Obtém um token, envia uma requisição para `POST /transferencias` e verifica o status HTTP 201. Está configurado para uma iteração. |
| `Utils/variaveis.js` | Disponibiliza `pegarBaseUrl()`, que prioriza a variável de ambiente `BASE_URL` e, se ela não estiver definida, utiliza a configuração local. |
| `Como executar e gera relatório.txt` | Reúne orientações adicionais para executar os testes e gerar relatórios. |
| `html-report.html` | Relatório HTML existente no repositório. Uma nova exportação com o mesmo nome pode substituí-lo. |

## 5. Instalação e execução

### 5.1 Pré-requisitos

1. Instale o [Grafana k6](https://grafana.com/docs/k6/latest/set-up/install-k6/).
2. Inicie a API de estudo e confirme que ela está acessível.
3. Confirme que a API disponibiliza os endpoints `POST /login` e `POST /transferencias`.
4. Verifique se os dados de autenticação em `fixtures/postLogin.json` são válidos para a API em execução.

A URL padrão utilizada pelo projeto é:

```text
http://localhost:3000
```

### 5.2 Clonar o repositório

No terminal, execute:

```bash
git clone https://github.com/MarianaCaetanoCosta/Mentoria-2.0-JulioDeLima.git
cd Mentoria-2.0-JulioDeLima
git checkout teste-performance
cd Projetos/testes/3-teste-de-performance-k6
```

> A branch `teste-performance` contém a versão documentada neste projeto. Se ela já estiver selecionada no seu ambiente, não é necessário executar novamente o comando `git checkout`.

### 5.3 Executar o teste de login

Na pasta `3-teste-de-performance-k6`, execute:

```bash
k6 run tests/login.test.js
```

O cenário está configurado com os seguintes estágios:

- **Ramp-up:** 5 segundos para aumentar até 10 usuários virtuais (VUs).
- **Carga constante:** 20 segundos mantendo 10 VUs.
- **Ramp-down:** 5 segundos para reduzir a quantidade de VUs até zero.

O script valida o status HTTP 200 e se o campo `token` retornado é uma string. Também verifica os *thresholds* descritos na seção 5.6.

### 5.4 Executar o teste de transferência

```bash
k6 run tests/transferencia.test.js
```

O script realiza o login para obter um token, envia a requisição de transferência e verifica se a resposta possui status HTTP 201. Como o cenário está configurado para uma única iteração, ele funciona como uma verificação pontual; não representa, por si só, um teste de carga abrangente.

### 5.5 Configurar a URL da API

A variável de ambiente `BASE_URL` permite apontar os testes para outra instância da API sem alterar os scripts. Exemplo no Git Bash:

```bash
k6 run -e BASE_URL=http://localhost:3000 tests/login.test.js
```

Substitua a URL pelo endereço do ambiente de teste autorizado. Se `BASE_URL` não for informada, o projeto utiliza a URL definida em `config/config.local.json`.

### 5.6 Critérios de desempenho (*thresholds*)

O teste de login possui os seguintes critérios:

| Métrica | Critério | Interpretação |
| --- | --- | --- |
| `http_req_duration` | `p(90)<3000` | 90% das requisições devem durar menos de 3 segundos. |
| `http_req_duration` | `max<5000` | A duração máxima deve ser inferior a 5 segundos. |
| `http_req_failed` | `rate<0.1` | A taxa de requisições com falha deve ficar abaixo de 10%. |

Os *thresholds* avaliam critérios de desempenho e não substituem os *checks* funcionais. Ao interpretar a execução, confira também a quantidade de requisições realizadas e possíveis erros de script. Se o script falhar antes de enviar requisições, métricas zeradas não significam que o teste foi aprovado.

## 6. Dashboard em tempo real e relatórios HTML

O k6 permite acompanhar métricas em um dashboard web durante a execução e exportar um relatório HTML ao final. Consulte a [documentação oficial do Web Dashboard](https://grafana.com/docs/k6/latest/results-output/web-dashboard/).

### 6.1 Executar o login e gerar relatório

No Git Bash, a partir da pasta do projeto e com a API em execução, execute:

```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=relatorio-login.html k6 run tests/login.test.js
```

Durante a execução, acesse o dashboard no navegador:

```text
http://127.0.0.1:5665
```

Ao final, o relatório será exportado para `relatorio-login.html` na pasta atual do terminal.

### 6.2 Executar a transferência e gerar relatório

```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=relatorio-transferencia.html k6 run tests/transferencia.test.js
```

O dashboard fica disponível em `http://127.0.0.1:5665` enquanto o teste estiver em execução. O relatório é salvo como `relatorio-transferencia.html` ao final, quando houver dados suficientes para a exportação.

> **Atenção:** o teste de transferência possui somente uma iteração e pode ser curto demais para produzir um relatório com gráficos detalhados. Isso não deve ser interpretado como aprovação ou reprovação automática do desempenho. Para avaliar carga, é necessário definir um cenário com volume e duração adequados ao objetivo do teste.

### 6.3 Localizar os relatórios

Os arquivos `relatorio-login.html` e `relatorio-transferencia.html` são gerados no diretório em que o comando foi executado. Abra cada arquivo em um navegador para consultar os resultados.

Use nomes diferentes para preservar relatórios de execuções distintas. Se a porta 5665 já estiver ocupada, encerre a execução anterior do k6 ou configure uma porta diferente para o dashboard, conforme a documentação oficial.

## 7. Boas práticas

- Utilize credenciais específicas para testes e não versione senhas, tokens ou outros segredos reais.
- Execute testes de carga somente em ambientes nos quais você tenha autorização.
- Confirme que a API está disponível antes de iniciar os scripts.
- Analise em conjunto os *checks*, os *thresholds*, a quantidade de requisições e os erros apresentados.
- Garanta que as contas e os valores de transferência sejam adequados ao ambiente de teste.

---

**Projeto de estudo — Mentoria 2.0 | Testes de Performance com k6**
