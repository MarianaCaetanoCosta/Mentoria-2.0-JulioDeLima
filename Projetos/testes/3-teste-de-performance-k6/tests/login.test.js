import http from 'k6/http'
import { sleep, check } from 'k6'

export const options = {
    iterations: 50,
    thresholds: {
        http_req_duration: ['p(90)<10', 'max<1'],
        http_req_failed: ['rate<0.1']
    }
}

export default function () {
    //Testes
    const url = 'http://localhost:3000/login';

    const payload = JSON.stringify({
        username: 'julio.lima',
        senha: '123456',
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const resposta = http.post(url, payload, params)

    check(resposta, {
        'Valida que o Status é 200': (r) => r.status === 200,
        'Valida que o Token é string': (r) => typeof r.json().token === 'string'
    })

    sleep(1)
}

/*

* Executar

- Abra o terminal
- Clique no login.test.js > botão direito > copiar caminho relativo
- Cole no terminal: k6 run tests/clearlogin.test.js

* Gerar Relatório

1. K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run tests/login.test.js

2. Alterar idioma para português
lang="pt-BR"

*/