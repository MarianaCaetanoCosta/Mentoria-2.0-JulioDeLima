import request from 'supertest'
import { expect } from 'chai'
import 'dotenv/config'
import { obterToken } from '../helpers/autenticacao.js'

import { describe, it, beforeEach } from 'mocha'

// Mocha: para estruturação e execução dos testes
describe('Contas', () => {

    let token

    beforeEach(async () => {
        // Captura Token
        token = await obterToken('julio.lima', '123456')
    })

    describe('GET /contas/{id}', () => {
        it('Deve retornar sucesso 200 com os dados da conta', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/contas/1')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
            
             // Chai - Verificação da resposta
            expect(resposta.status).to.equal(200)

            // Validação do valor e do tipo do ID
            expect(resposta.body.id).to.equal(1)
            expect(resposta.body.id).to.be.a('number')

            // Validação dos valores e tipos
            expect(resposta.body.titular).to.equal('João da Silva')
            expect(resposta.body.titular).to.be.a('string')

            expect(resposta.body.saldo).to.equal('14221.01')
            expect(resposta.body.saldo).to.be.a('string')

            expect(resposta.body.ativa).to.equal(1)
            expect(resposta.body.ativa).to.be.a('number')
        })
    })

    describe('GET /contas', () => {
        it('Deve respeitar o limite de até 10 registros na paginação', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/contas?page=1&limit=10')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)

            // Chai - Verificação da resposta
            expect(resposta.status).to.equal(200)

            // Contas é um vetor de objetos.
            // Deve retornar no máximo 10 registros.
            expect(resposta.body.contas.length).to.be.at.most(10)
        })
    })
})