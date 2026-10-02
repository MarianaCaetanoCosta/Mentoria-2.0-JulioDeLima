import assert from 'node:assert';
import contarPedidosCafe from '../src/cafeteria.js';

describe("Exercício 1 - Contar pedidos de café", function () {

    it("deve retornar 2 quando houver dois pedidos de café", function () {
        const pedidos = ["café", "cha", "café"];

        const resultado = contarPedidosCafe(pedidos);

        console.log("Entrada:", pedidos);
        console.log("Resultado esperado:", 2);
        console.log("Resultado obtido:", resultado);

        assert.strictEqual(resultado, 2);
    });

    it("deve retornar 0 quando não houver pedidos de café", function () {
        const pedidos = ["cha", "bolo", "suco"];

        const resultado = contarPedidosCafe(pedidos);

        console.log("Entrada:", pedidos);
        console.log("Resultado esperado:", 0);
        console.log("Resultado obtido:", resultado);

        assert.strictEqual(resultado, 0);
    });

    it("deve retornar 3 quando houver três pedidos de café", function () {
        const pedidos = ["café", "café", "café"];

        const resultado = contarPedidosCafe(pedidos);

        console.log("Entrada:", pedidos);
        console.log("Resultado esperado:", 3);
        console.log("Resultado obtido:", resultado);

        assert.strictEqual(resultado, 3);
    });

});


