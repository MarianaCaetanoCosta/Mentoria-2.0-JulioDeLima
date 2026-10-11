import http from 'k6/http'
import { sleep, check } from 'k6'

export const options = {
    vus: 10,
    duration: '30s',
    thresholds: {
        http_req_duration: ['p(90)<3000', 'max<5000'],
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