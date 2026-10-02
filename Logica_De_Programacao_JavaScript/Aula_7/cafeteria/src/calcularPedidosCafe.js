export function calcularPedidosCafe(listaDePedidos){
    let quantidadeCafe = 0;

    listaDePedidos.forEach(pedido => {
        if(pedido === 'café'){
            quantidadeCafe = quantidadeCafe + 1
        }
    });

    return quantidadeCafe
}

export function calcularPedidosBaseadoNumItem(listaDePedidos, itemPesquisado){
    let quantidadeItemPesquisado = 0;

    for(let i = 0; i < listaDePedidos.length; i++){
        if(listaDePedidos[i] === itemPesquisado){        
            quantidadeItemPesquisado = quantidadeItemPesquisado + 1
        }
    }
    return quantidadeItemPesquisado
}

