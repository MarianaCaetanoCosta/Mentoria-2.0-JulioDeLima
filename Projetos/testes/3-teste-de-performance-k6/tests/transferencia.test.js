import http from 'k6/http'
import { sleep, check } from 'k6'
import { obterToken } from '../helpers/autenticacao.js'

export const options = {
    iterations: 1
}

//Testes
export default function () {
    //Obter token
    const token = obterToken();

    const url = 'http://localhost:3000/transferencias';

    const payload = JSON.stringify({
        "contaOrigem": 1,
        "contaDestino": 2,
        "valor": 11,
        "token": ""
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
    };

    const resposta = http.post(url, payload, params)

    check(resposta, {
        'Valida que o Status é 201': (r) => r.status === 201
    })

    sleep(1)
}