import request from 'supertest'
import { expect } from 'chai'
require('dotenv').config()

//Mocha: para estruturação e execução dos testes
describe('Transferências', () => {
    describe('POST /transferencias', () => {
        it('Deve retornar sucesso 201 com 201 quando o valor da transferencia for igual ou acima de R$ 10.00', async () => {
            //Captura Token
            const respostaLogin = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'julio.lima',
                    'senha': '123456'
                })
            const token = respostaLogin.body.token

            //Supertest - Requisição via POST com dados válidos
            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'contaOrigem': 1,
                    'contaDestino': 2,
                    'valor': 11,
                    'token': ""
                })
            //Chai - Verificação da resposta
            expect(resposta.status).to.equal(201)            
        })
        
        it('Deve retornar erro 422 com mensagem de erro quando o valor da transferencia for abaixo de R$ 10.00', async () => {
                        //Captura Token
            const respostaLogin = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'julio.lima',
                    'senha': '123456'
                })
            const token = respostaLogin.body.token

            //Supertest - Requisição via POST com dados válidos
            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'contaOrigem': 1,
                    'contaDestino': 3,
                    'valor': 8,
                    'token': ''
                })
            //Chai - Verificação da resposta
            expect(resposta.status).to.equal(422)            
        })
    }); 
});