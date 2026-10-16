import request from 'supertest'
import { expect } from 'chai'
import 'dotenv/config'

import postLogin from '../fixtures/postLogin.json' with { type: 'json' }

//Mocha: para estruturação e execução dos testes
describe('Login', () => {
    describe('POST /login', () => {
        it('Deve retornar 200 com um token em string quando usar credenciais válidas', async () => {

            //clonar o postLogin
            const bodyLogin = { ...postLogin }

            //Supertest - Requisição via POST com credenciais válidas
            const resposta = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)

            //Chai - Verificação da resposta
            expect(resposta.status).to.equal(200)
            expect(resposta.body.token).to.be.a('string')
        })
    })
})