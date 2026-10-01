//Exemplo: ["pass", "fail", "pass", "fail", "pass"]

function gerarRelatorioTestes(logs) {
    const total = logs.length;

    let sucessos = 0;
    let falhas = 0;

    for (let log of logs) {
        if (log === "pass") {
            sucessos++;
        }

        if (log === "fail") {
            falhas++;
        }
    }

    const passRate = (sucessos / total) * 100;

    return {
        total: total,
        sucessos: sucessos,
        falhas: falhas,
        passRate: passRate
    };
}

module.exports = gerarRelatorioTestes;