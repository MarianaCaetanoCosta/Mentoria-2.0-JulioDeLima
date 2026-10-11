import http from 'k6/http'
import { sleep, check } from 'k6'

const postLogin = JSON.parse(open('../fixtures/postLogin.json'))

export const options = {
    stages: [
        { duration: '5s', target: 10 },
        { duration: '20s', target: 10 },
        { duration: '5s', target: 0 },
    ],

    iterations: 1,

    thresholds: {
        http_req_duration: ['p(90)<3000', 'max<5000'],
        http_req_failed: ['rate<0.1']
    }
}

export default function () {
    //Testes
    const url = 'http://localhost:3000/login';

    postLogin.username = 'junior.lima';
    console.log(postLogin);

    const payload = JSON.stringify(postLogin);

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const resposta = http.post(url, payload, params)

    console.log(`Status HTTP: ${resposta.status}`);
    console.log(`Corpo da resposta: ${resposta.body}`);

    check(resposta, {
        'Valida que o Status é 200': (r) => r.status === 200,
        'Valida que o Token é string': (r) => typeof r.json().token === 'string'
    })

    sleep(1)
}