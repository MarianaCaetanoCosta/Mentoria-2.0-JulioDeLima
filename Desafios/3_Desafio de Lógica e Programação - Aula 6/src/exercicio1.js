//Exemplo: ["café", "cha", "bolo de cenoura", "café", "suco de laranja"]

function contarPedidosCafe(pedidos) {
    let quantidade = 0;

    for (let pedido of pedidos) {
        if (pedido === "café") {
            quantidade++;
        }
    }

    return quantidade;
}

module.exports = contarPedidosCafe;