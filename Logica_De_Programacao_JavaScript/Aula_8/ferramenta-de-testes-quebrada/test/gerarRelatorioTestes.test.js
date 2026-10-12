import {gerarRelatorioTestes} from '../src/gerarRelatorioTestes.js'
import assert from 'node:assert'

describe('Relatorios de Teste', function(){
    it('Caso de Teste', function (){
        //Arrange
        const listaTestes = ['pass', 'fail', 'pass', 'fail', 'pass']
        const resultadoEsperado = 'Total de testes: 5 Total de sucessos: 3 Total de falhas: 2 Pass rate: 60'
        //Act
        let resultadoEncontrado = gerarRelatorioTestes(listaTestes)
        //Assert
        assert.equal(resultadoEsperado, resultadoEncontrado)
    })
})