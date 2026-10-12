/**
 * Analisa as avaliações de um filme.
 *
 * Regras:
 * Média >= 4: Filme recomendado
 * Média >= 3 e < 4: Filme razoável
 * Média < 3: Filme ruim
 */

export function avaliarFilme(filme) {
    if (!filme || typeof filme.nome !== "string" || !filme.nome.trim()) {
        throw new TypeError("O filme deve possuir um nome válido.");
    }

    if (!Array.isArray(filme.avaliacoes)) {
        throw new TypeError("As avaliações devem ser um vetor.");
    }

    if (filme.avaliacoes.length === 0) {
        throw new RangeError("O filme deve possuir avaliações.");
    }

    const notasValidas = filme.avaliacoes.every(
        nota =>
            typeof nota === "number" &&
            Number.isFinite(nota) &&
            nota >= 1 &&
            nota <= 5
    );

    if (!notasValidas) {
        throw new RangeError("As notas devem ser números entre 1 e 5.");
    }

    const quantidadeVotos = filme.avaliacoes.length;

    const somaNotas = filme.avaliacoes.reduce(
        (soma, nota) => soma + nota,
        0
    );

    const media = somaNotas / quantidadeVotos;

    let classificacao;

    if (media >= 4) {
        classificacao = "Filme recomendado";
    } else if (media >= 3) {
        classificacao = "Filme razoável";
    } else {
        classificacao = "Filme ruim";
    }

    return {
        nome: filme.nome,
        quantidadeVotos,
        media: Number(media.toFixed(2)),
        classificacao
    };
}

export function avaliarFilmes(listaFilmes) {
    if (!Array.isArray(listaFilmes)) {
        throw new TypeError("A entrada deve ser um vetor de filmes.");
    }

    return listaFilmes.map(filme => avaliarFilme(filme));
}

export const filmes = [
    {
        nome: "Minha mãe é uma peça",
        avaliacoes: [5, 4, 4, 4, 5]
    },
    {
        nome: "Saneamento Básico",
        avaliacoes: [3, 4, 2, 3, 4]
    },
    {
        nome: "Se eu fosse você",
        avaliacoes: [1, 2, 3]
    }
];