export function calcularSomaPedidosCafe(listaDePedidos){
    let valorAcumulado = 0;

    listaDePedidos.forEach(pedido => {
        console.log('Estou no item: ' + pedido.nome)
        if(pedido.nome === 'café'){
            valorAcumulado = valorAcumulado + pedido.valor
            console.log('Total do valor acumulado '+ valorAcumulado)
        }
    });

    return valorAcumulado
}