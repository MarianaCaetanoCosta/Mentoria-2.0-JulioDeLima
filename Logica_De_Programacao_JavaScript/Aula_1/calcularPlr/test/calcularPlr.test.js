import { calculaSalarioPlr } from '../src/calculaPlr.js';
import assert  from 'node:assert';

describe('Testes de Calcular PLR', function () {
    it('Cenário 1: Senior com salário de 10.000', function () {
        let resultado = calculaSalarioPlr('senior', 10000);
        assert.equal(resultado, 20000);
    });

    it('Cenário 2: Pleno com salário de 6000', function () {
        let resultado = calculaSalarioPlr('pleno', 6000);
        assert.equal(resultado, 6000);
    });
});