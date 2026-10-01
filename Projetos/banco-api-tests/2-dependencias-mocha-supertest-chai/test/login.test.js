import request from 'supertest'
import { expect } from 'chai'
require('dotenv').config()

//Mocha: para estruturação e execução dos testes
describe('Login', () => {
    describe('POST /login', () => {
        it('Deve retornar 200 com um token em string quando usar credenciais válidas', async () => {
            //Supertest - Requisição via POST com credenciais válidas
            const resposta = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'julio.lima',
                    'senha': '123456'
                })
            //Chai - Verificação da resposta
            expect(resposta.status).to.equal(200)
            expect(resposta.body.token).to.be.a('string')
        })
    })
})