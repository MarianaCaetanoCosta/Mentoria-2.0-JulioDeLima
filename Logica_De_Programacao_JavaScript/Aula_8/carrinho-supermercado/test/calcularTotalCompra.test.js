import { calcularTotalCompra } from '../src/calcularTotalCompra.js'
import assert from 'node:assert'

describe('Calculo do Total da Compra', function(){

    it('CT01 - Caminho feliz', function(){
        // Arrange - > Organizar
        const resultadoEsperado = 32.50
        const listaProdutos = [
            {nome: 'Arroz', preco: 22.00},
            {nome: 'Feijão', preco: 3.50},
            {nome: 'Macarrão', preco: 7}
        ]

        // Act -> Ação
        let resultadoEncontrado = calcularTotalCompra(listaProdutos)

        // Assert -> Verificar
        assert.equal(resultadoEncontrado, resultadoEsperado)
    })

    it('CT02 - Compra superior a R$200 com desconto de 10%', function(){
        // Arrange - > Organizar
        const resultadoEsperado = 225
        const listaProdutos = [
            {nome: 'Arroz', preco: 100},
            {nome: 'Feijão', preco: 50},
            {nome: 'Macarrão', preco: 100}
        ]

        // Act -> Ação
        let resultadoEncontrado = calcularTotalCompra(listaProdutos)

        // Assert -> Verificar
        assert.equal(resultadoEncontrado, resultadoEsperado)
    })

    it('CT03 - Compra no valor exato de R$200 sem desconto', function(){
        // Arrange - > Organizar
        const resultadoEsperado = 200
        const listaProdutos = [
            {nome: 'Arroz', preco: 100},
            {nome: 'Feijão', preco: 50},
            {nome: 'Macarrão', preco: 50}
        ]

        // Act -> Ação
        let resultadoEncontrado = calcularTotalCompra(listaProdutos)

        // Assert -> Verificar
        assert.equal(resultadoEncontrado, resultadoEsperado)
    })

})