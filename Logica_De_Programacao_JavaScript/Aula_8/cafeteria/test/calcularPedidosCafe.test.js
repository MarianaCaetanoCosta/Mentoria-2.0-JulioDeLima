import { calcularPedidosCafe, calcularPedidosBaseadoNumItem } from '../src/calcularPedidosCafe.js'
import assert from 'node:assert'

describe('Calculo de Cafes', function(){
    it('CT01 - Caminho feliz', function(){
        // Arrange - > Organizar
        const resultadoEsperado = 2
        const listaDePedidos = ['café', 'cha', 'bolo de cenoura', 
'café', 'suco de laranja']
        // Act -> Ação
        let resultadoEncontrado = calcularPedidosCafe(listaDePedidos)
        // Assert -> Verificar
        assert.equal(resultadoEncontrado, resultadoEsperado)
    })

    it('CT02 - Nenhum café', function(){
        // Arrange - > Organizar
        const resultadoEsperado = 0
        const listaDePedidos = ['cha', 'bolo de cenoura', 
 'suco de laranja']
        // Act -> Ação
        let resultadoEncontrado = calcularPedidosCafe(listaDePedidos)
        // Assert -> Verificar
        assert.equal(resultadoEncontrado, resultadoEsperado)
    })

    it('CT03 - Nenhuma venda no dia', function(){
        // Arrange - > Organizar
        const resultadoEsperado = 0
        const listaDePedidos = []
        // Act -> Ação
        let resultadoEncontrado = calcularPedidosCafe(listaDePedidos)
        // Assert -> Verificar
        assert.equal(resultadoEncontrado, resultadoEsperado)
    })
})


describe('Calculo de Items', function(){
    it('CT01.1 - Caminho feliz cafe', function(){
        // Arrange - > Organizar
        const resultadoEsperado = 2
        const listaDePedidos = ['café', 'cha', 'bolo de cenoura', 
'café', 'suco de laranja']
        const itemPesquisado = 'café'
        // Act -> Ação
        let resultadoEncontrado = calcularPedidosBaseadoNumItem(listaDePedidos, itemPesquisado)
        // Assert -> Verificar
        assert.equal(resultadoEncontrado, resultadoEsperado)
    })

    it('CT01.2 - Caminho feliz cha', function(){
        // Arrange - > Organizar
        const resultadoEsperado = 1
        const listaDePedidos = ['café', 'cha', 'bolo de cenoura', 
'café', 'suco de laranja']
        const itemPesquisado = 'cha'
        // Act -> Ação
        let resultadoEncontrado = calcularPedidosBaseadoNumItem(listaDePedidos, itemPesquisado)
        // Assert -> Verificar
        assert.equal(resultadoEncontrado, resultadoEsperado)
    })

    it('CT02 - Nenhum cha', function(){
        // Arrange - > Organizar
        const resultadoEsperado = 0
        const listaDePedidos = ['café', 'bolo de cenoura', 'suco de laranja']
        const itemPesquisado = 'cha'
        // Act -> Ação
        let resultadoEncontrado = calcularPedidosBaseadoNumItem(listaDePedidos, itemPesquisado)
        // Assert -> Verificar
        assert.equal(resultadoEncontrado, resultadoEsperado)
    })

    it('CT03 - Nenhuma venda no dia', function(){
        // Arrange - > Organizar
        const resultadoEsperado = 0
        const listaDePedidos = []
        const itemPesquisado = 'cha'
        // Act -> Ação
        let resultadoEncontrado = calcularPedidosBaseadoNumItem(listaDePedidos, itemPesquisado)
        // Assert -> Verificar
        assert.equal(resultadoEncontrado, resultadoEsperado)
    })
})