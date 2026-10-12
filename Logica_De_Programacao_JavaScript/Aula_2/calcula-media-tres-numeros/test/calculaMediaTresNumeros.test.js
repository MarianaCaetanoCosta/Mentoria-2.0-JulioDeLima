import assert from 'node:assert';
import calculaMediaTresNumeros from '../src/calculaMediaTresNumeros.js';

describe('calculaMediaTresNumeros', function () {

    it('deve calcular a média de 1, 2 e 3', function () {
        const resultadoEsperado = 2;
        const resultadoEncontrado = calculaMediaTresNumeros(1, 2, 3);

        assert.strictEqual(resultadoEncontrado, resultadoEsperado);
    });

    it('deve calcular a média de 4, 5 e 6', function () {
        const resultadoEsperado = 5;
        const resultadoEncontrado = calculaMediaTresNumeros(4, 5, 6);

        assert.strictEqual(resultadoEncontrado, resultadoEsperado);
    });

    it('deve calcular corretamente uma média decimal', function () {
        const resultadoEsperado = 5.333333333333333;
        const resultadoEncontrado = calculaMediaTresNumeros(4, 5, 7);

        assert.strictEqual(resultadoEncontrado, resultadoEsperado);
    });
});