import { calcularSomaPedidosCafe } from '../src/calcularSomaPedidos.js'
import assert from 'node:assert'

describe('Calculo de Soma de Cafes', function(){
    it('CT01 - Caminho feliz', function(){
        // Arrange - > Organizar
        const resultadoEsperado = 17
        const listaDePedidosJson = [
            {nome: 'café', valor: 8.50}, 
            {nome: 'cha', valor: 3.50},
            {nome: 'bolo de cenoura', valor: 5},
            {nome: 'café', valor: 8.50}, 
            {nome: 'suco de laranja', valor: 7}
        ]

        // Act -> Ação
        let resultadoEncontrado = calcularSomaPedidosCafe(listaDePedidosJson)
        
        // Assert -> Verificar
        assert.equal(resultadoEncontrado, resultadoEsperado)
    })
})