import request from 'supertest'
import { expect } from 'chai'
import 'dotenv/config'
import { obterToken } from '../helpers/autenticacao.js'

import postTransferencias from '../fixtures/postTransferencia.json' with { type: 'json' }
import atualizacaoTransferencia from '../fixtures/atualizacaoTransferencia.json' with { type: 'json' }

import { describe, it, beforeEach } from 'mocha'

// Mocha: para estruturação e execução dos testes
describe('Transferências', () => {

    let token
    let idTransferencia

    beforeEach(async () => {
        // Captura Token
        token = await obterToken('julio.lima', '123456')
    })

    describe('POST /transferencias', () => {
        it('Deve retornar sucesso 201 quando o valor da transferência for igual ou acima de R$ 10,00', async () => {

            // Clonar o postTransferencia
            const bodyTransferencias = { ...postTransferencias }

            // Supertest - Requisição via POST com dados válidos
            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias)

            // Chai - Verificação da resposta
            expect(resposta.status).to.equal(201)
        })

        it('Deve retornar erro 422 quando o valor da transferência for abaixo de R$ 10,00', async () => {

            // Clonar o postTransferencia
            const bodyTransferencias = { ...postTransferencias }
            bodyTransferencias.valor = 7

            // Supertest - Requisição via POST com dados inválidos
            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias)

            // Chai - Verificação da resposta
            expect(resposta.status).to.equal(422)
        })
    })

    describe('GET /transferencias/{id}', () => {
        it('Deve retornar sucesso 200 com os dados da transferência', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/transferencias/1')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)

            // Chai - Verificação da resposta
            expect(resposta.status).to.equal(200)

            // Validação dos valores e tipos
            expect(resposta.body.id).to.equal(1)
            expect(resposta.body.id).to.be.a('number')

            expect(resposta.body.conta_origem_id).to.equal(1)
            expect(resposta.body.conta_origem_id).to.be.a('number')

            expect(resposta.body.conta_destino_id).to.equal(2)
            expect(resposta.body.conta_destino_id).to.be.a('number')

            expect(resposta.body.valor).to.equal('100.00')
            expect(resposta.body.valor).to.be.a('string')
        })
    })

    describe('GET /transferencias', () => {
        it('Deve respeitar o limite de 10 registros na paginação', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/transferencias?page=1&limit=10')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)

            // Chai - Verificação da resposta
            expect(resposta.status).to.equal(200)

            // O limite solicitado deve ser 10
            expect(resposta.body.limit).to.equal(10)

            // Transferências é um vetor de objetos
            // Deve retornar exatamente 10 registros quando houver registros suficientes
            expect(resposta.body.transferencias).to.have.lengthOf(10)
        })
    })

    describe('PUT /transferencias/{id}', () => {
        it('Deve atualizar todosos dados da transferência com sucesso', async () => {

            // Clonar o putTransferencia
            const bodyTransferencia = { ...atualizacaoTransferencia }

            // Dados da transferência que será atualizada
            bodyTransferencia.contaOrigem = 1
            bodyTransferencia.contaDestino = 2
            bodyTransferencia.valor = 150.00

            // Supertest - Requisição via PUT com dados válidos
            const resposta = await request(process.env.BASE_URL)
                .put('/transferencias/1')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencia)

            // Chai - Verificação da resposta
            expect(resposta.status).to.equal(204)

            // Supertest - Consulta a transferência após a atualização
            const consulta = await request(process.env.BASE_URL)
                .get('/transferencias/1')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)

            // Chai - Verificação dos dados atualizados
            expect(consulta.status).to.equal(200)

            expect(consulta.body.id).to.equal(1)
            expect(consulta.body.id).to.be.a('number')

            expect(consulta.body.conta_origem_id).to.equal(1)
            expect(consulta.body.conta_origem_id).to.be.a('number')

            expect(consulta.body.conta_destino_id).to.equal(2)
            expect(consulta.body.conta_destino_id).to.be.a('number')

            expect(consulta.body.valor).to.equal('150.00')
            expect(consulta.body.valor).to.be.a('string')
        })
    })

    describe('PATCH /transferencias/{id}', () => {
        it('Deve atualizar parcialmente os dados da transferência com sucesso', async () => {

            // Clonar o atualizacaoTransferencia
            const bodyTransferencia = { ...atualizacaoTransferencia }

            // Dados da transferência
            bodyTransferencia.contaOrigem = 1
            bodyTransferencia.contaDestino = 2

            // Único campo alterado
            bodyTransferencia.valor = 200.00

            // Supertest - Requisição via PATCH
            const resposta = await request(process.env.BASE_URL)
                .patch('/transferencias/1')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencia)

            // Chai - Verificação da resposta
            expect(resposta.status).to.equal(204)

            // Supertest - Consulta a transferência após a atualização
            const consulta = await request(process.env.BASE_URL)
                .get('/transferencias/1')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)

            // Chai - Verificação dos dados atualizados
            expect(consulta.status).to.equal(200)

            expect(consulta.body.id).to.equal(1)
            expect(consulta.body.id).to.be.a('number')

            expect(consulta.body.conta_origem_id).to.equal(1)
            expect(consulta.body.conta_origem_id).to.be.a('number')

            expect(consulta.body.conta_destino_id).to.equal(2)
            expect(consulta.body.conta_destino_id).to.be.a('number')

            expect(consulta.body.valor).to.equal('200.00')
            expect(consulta.body.valor).to.be.a('string')
        })
    })

    describe('DELETE /transferencias/{id}', () => {
        it('Deve excluir a transferência com sucesso', async () => {
            // Supertest - Requisição via DELETE
            const resposta = await request(process.env.BASE_URL)
                .delete('/transferencias/1')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)

            // Chai - Verificação da resposta
            expect(resposta.status).to.equal(204)

            // Supertest - Consulta a transferência após a exclusão
            const consulta = await request(process.env.BASE_URL)
                .get('/transferencias/1')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)

            console.log('Status após DELETE:', consulta.status)
            console.log('Body após DELETE:', consulta.body)
        })
    })

})