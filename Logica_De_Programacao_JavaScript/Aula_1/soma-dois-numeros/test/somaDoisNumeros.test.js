import assert from 'node:assert';
import somaDoisNumeros from '../src/somaDoisNumeros.js';

describe('somaDoisNumeros', function() {

    it('deve somar dois números positivos', function() {
        const resultadoEsperado = 7;
        const resultadoEncontrado = somaDoisNumeros(3, 4);

        assert.strictEqual(resultadoEncontrado, resultadoEsperado);
    });

    it('deve somar dois números iguais', function() {
        const resultadoEsperado = 10;
        const resultadoEncontrado = somaDoisNumeros(5, 5);

        assert.strictEqual(resultadoEncontrado, resultadoEsperado);
    });

    it('deve somar um número positivo e zero', function() {
        const resultadoEsperado = 5;
        const resultadoEncontrado = somaDoisNumeros(5, 0);

        assert.strictEqual(resultadoEncontrado, resultadoEsperado);
    });

});