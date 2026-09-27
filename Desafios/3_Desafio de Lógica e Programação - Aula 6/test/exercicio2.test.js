const assert = require("assert");
const gerarRelatorioTestes = require("../src/exercicio2");

describe("Exercício 2 - Relatório de testes", function () {

    it("deve calcular corretamente 3 sucessos, 2 falhas e 60% de aprovação", function () {
        const logs = ["pass", "fail", "pass", "fail", "pass"];

        const resultado = gerarRelatorioTestes(logs);

        console.log("Entrada:", logs);
        console.log("Resultado:", resultado);

        assert.strictEqual(resultado.total, 5);
        assert.strictEqual(resultado.sucessos, 3);
        assert.strictEqual(resultado.falhas, 2);
        assert.strictEqual(resultado.passRate, 60);
    });

    it("deve retornar 100% de aprovação quando todos os testes passarem", function () {
        const logs = ["pass", "pass", "pass", "pass"];

        const resultado = gerarRelatorioTestes(logs);

        console.log("Entrada:", logs);
        console.log("Resultado:", resultado);

        assert.strictEqual(resultado.total, 4);
        assert.strictEqual(resultado.sucessos, 4);
        assert.strictEqual(resultado.falhas, 0);
        assert.strictEqual(resultado.passRate, 100);
    });

    it("deve retornar 0% de aprovação quando todos os testes falharem", function () {
        const logs = ["fail", "fail", "fail"];

        const resultado = gerarRelatorioTestes(logs);

        console.log("Entrada:", logs);
        console.log("Resultado:", resultado);

        assert.strictEqual(resultado.total, 3);
        assert.strictEqual(resultado.sucessos, 0);
        assert.strictEqual(resultado.falhas, 3);
        assert.strictEqual(resultado.passRate, 0);
    });

});