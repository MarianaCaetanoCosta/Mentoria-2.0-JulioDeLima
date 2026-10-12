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

//Testes
export default function () {
    check(resposta, {
        'Valida que o Status é 200': (r) => r.status === 200,
        'Valida que o Token é string': (r) => typeof r.json().token === 'string'
    })

    sleep(1)
}