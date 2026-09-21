import assert from 'node:assert'
import { verificaAprovacao } from '../source/verificaAprovacao.js'

describe('verificaAprovacao', function() {
    it('Caso de Teste', function() {
        const resultadoEsperado = 'Aprovado';
        let resultadoEncontrado = verificaAprovacao(9, 90);
        assert.strictEqual(resultadoEncontrado, resultadoEsperado);
    })
})