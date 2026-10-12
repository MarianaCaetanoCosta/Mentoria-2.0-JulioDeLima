# Testes de Performance com k6

Projeto de testes de performance desenvolvido com [k6](https://grafana.com/docs/k6/latest/), como parte da Mentoria 2.0. Os scripts exercitam os endpoints de login e transferência de uma API local, com verificações funcionais básicas e critérios de desempenho.

## Objetivos

- Executar requisições HTTP para os endpoints de login e transferência.
- Validar respostas por meio de checks do k6.
- Reutilizar a autenticação por meio de um helper.
- Carregar dados de login de uma fixture JSON.
- Permitir a troca da URL da API por variável de ambiente.
- Definir thresholds para acompanhar o tempo de resposta e a taxa de falhas.

## Tecnologias

- JavaScript (módulos ES)
- [Grafana k6](https://grafana.com/docs/k6/latest/)
- API de estudo executada localmente ou em um ambiente acessível

## Estrutura do projeto

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

### Responsabilidade dos arquivos

| Arquivo | Descrição |
| --- | --- |
| `tests/login.test.js` | Executa o teste de carga do endpoint `POST /login`, validando status e token. |
| `tests/transferencia.test.js` | Obtém um token, envia uma transferência para `POST /transferencias` e valida o status `201`. |
| `helpers/autenticacao.js` | Centraliza a chamada de login e retorna o token para outros testes. |
| `fixtures/postLogin.json` | Armazena os dados utilizados na autenticação. |
| `Utils/variaveis.js` | Define a função `pegarBaseUrl()`, priorizando a variável de ambiente `BASE_URL` e usando a configuração local como fallback. |
| `config/config.local.json` | Guarda a URL padrão da API. |

## Pré-requisitos

1. Instale o [Grafana k6](https://grafana.com/docs/k6/latest/set-up/install-k6/).
2. Tenha a API da mentoria em execução e acessível.
3. Confirme que a API utiliza os endpoints `POST /login` e `POST /transferencias`.
4. Verifique se as credenciais da fixture são válidas para a API em execução.

A configuração local atual aponta para:

```text
http://localhost:3000
```

O valor está definido em `config/config.local.json`:

```json
{
  "baseUrl": "http://localhost:3000"
}
```

## Como executar

Abra um terminal na pasta `3-teste-de-performance-k6).

### 1. Teste de login

```bash
k6 run tests/login.test.js
```

O cenário está configurado com os seguintes estágios:

- 5 segundos para aumentar até 10 usuários virtuais (VUs);
- 20 segundos mantendo 10 VUs;
- 5 segundos para reduzir até 0 VUs.

O script valida se o endpoint retorna status HTTP `200` e se o campo `token` é uma string.

### 2. Teste de transferência

```bash
k6 run tests/transferencia.test.js
```

O teste obtém um token pelo helper de autenticação, envia uma requisição para `POST /transferencias) e verifica se o status HTTP é `201`. Atualmente, esse script está configurado para executar uma iteração.

> O teste de transferência depende de credenciais válidas e de uma API que aceite os dados de conta e valor configurados no script.

## Variáveis de ambiente

A variável `BASE_URL` permite selecionar o endereço da API sem alterar os scripts. Quando ela não é informada, o projeto utiliza `config/config.local.json`.

Exemplo no Git Bash:

```bash
k6 run -e BASE_URL=http://localhost:3000 tests/login.test.js
```

Para executar contra outro ambiente, informe a URL disponibilizada pela equipe responsável:

```bash
k6 run -e BASE_URL=https://seu-ambiente-de-testes.example tests/login.test.js
```

Substitua o endereço ilustrativo pelo endereço real do ambiente. A variável de ambiente tem prioridade sobre a configuração local.

## Thresholds do teste de login

O script `tests/login.test.js` possui estes critérios:

| Métrica | Critério | Significado |
| --- | --- | --- |
| `http_req_duration` | `p(90)<3000` | 90% das requisições devem ter duração inferior a 3 segundos. |
| `http_req_duration` | `max<5000` | A duração máxima deve ser inferior a 5 segundos. |
| `http_req_failed` | `rate<0.1` | A taxa de requisições HTTP com falha deve ficar abaixo de 10%. |

Os thresholds aprovados, isoladamente, não comprovam que a funcionalidade está correta. Confira também os checks, a quantidade de requisições executadas e a ausência de erros no script. Se uma exceção ocorrer antes do envio das requisições, métricas zeradas não representam um teste bem-sucedido.

## Dashboard e relatório HTML

Para executar o teste de login com o dashboard web habilitado e solicitar a exportação do relatório:

```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run tests/login.test.js
```

Durante a execução, o dashboard pode ser acessado em:

```text
http://127.0.0.1:5665
```

Para solicitar a exportação no teste de transferência:

```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run tests/transferencia.test.js
```

A exportação depende da versão do k6 e da duração/quantidade de dados coletados. Como o teste de transferência está configurado com apenas uma iteração, o k6 pode informar que a execução foi curta demais para gerar o relatório. Nesse caso, use o resultado de terminal para a execução rápida ou configure um cenário mais longo quando o objetivo for analisar desempenho.

## Boas práticas

- Não versione senhas, tokens ou outros segredos reais. Utilize credenciais de teste e, quando possível, injete valores sensíveis por variáveis de ambiente.
- Execute testes de carga somente em ambientes autorizados.
- Confirme que a API está disponível antes de iniciar o teste.
- Analise checks, thresholds, número de requisições e erros do script em conjunto.
- Mantenha os dados de contas e valores de transferência adequados ao ambiente de teste.

## Limitações atuais

Este projeto é um exercício de estudo com cenários específicos para login e transferência. O teste de transferência executa uma única iteração e valida somente o status HTTP `201`; não representa, por si só, uma avaliação abrangente de carga nem valida todos os campos da resposta.

---

Projeto de estudo — Mentoria 2.0 | Testes de Performance com k6.
