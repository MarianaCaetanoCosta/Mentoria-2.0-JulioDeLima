import { strict as assert } from "node:assert";
import { describe, it } from "mocha";

import {
    avaliarFilme,
    avaliarFilmes,
    filmes
} from "../src/avaliacaoFilmes.js";

describe("Avaliação de filmes", function () {

    it("CT01 - deve recomendar filme com média maior ou igual a 4", function () {
        const resultado = avaliarFilme(filmes[0]);

        assert.equal(resultado.quantidadeVotos, 5);
        assert.equal(resultado.media, 4.4);
        assert.equal(resultado.classificacao, "Filme recomendado");
    });

    it("CT02 - deve classificar filme com média entre 3 e 4 como razoável", function () {
        const resultado = avaliarFilme(filmes[1]);

        assert.equal(resultado.quantidadeVotos, 5);
        assert.equal(resultado.media, 3.2);
        assert.equal(resultado.classificacao, "Filme razoável");
    });

    it("CT03 - deve classificar filme com média menor que 3 como ruim", function () {
        const resultado = avaliarFilme(filmes[2]);

        assert.equal(resultado.quantidadeVotos, 3);
        assert.equal(resultado.media, 2);
        assert.equal(resultado.classificacao, "Filme ruim");
    });

    it("CT04 - deve recomendar filme com média exatamente igual a 4", function () {
        const resultado = avaliarFilme({
            nome: "Filme de teste",
            avaliacoes: [4, 4, 4]
        });

        assert.equal(resultado.media, 4);
        assert.equal(resultado.classificacao, "Filme recomendado");
    });

    it("CT05 - deve avaliar todos os filmes do vetor", function () {
        const resultados = avaliarFilmes(filmes);

        assert.equal(resultados.length, 3);
    });

    it("CT06 - deve rejeitar avaliações vazias", function () {
        assert.throws(
            () => avaliarFilme({
                nome: "Filme",
                avaliacoes: []
            }),
            { name: "RangeError" }
        );
    });

    it("CT07 - deve rejeitar notas fora do intervalo permitido", function () {
        assert.throws(
            () => avaliarFilme({
                nome: "Filme",
                avaliacoes: [4, 6]
            }),
            { name: "RangeError" }
        );
    });

    it("CT08 - deve rejeitar avaliações que não sejam um vetor", function () {
        assert.throws(
            () => avaliarFilme({
                nome: "Filme",
                avaliacoes: "4,5"
            }),
            { name: "TypeError" }
        );
    });
});