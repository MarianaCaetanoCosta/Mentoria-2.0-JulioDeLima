export function calcularTotalCompra(listaProdutos){
    let totalCompra = 0

    listaProdutos.forEach(produto => {
        totalCompra = totalCompra + produto.preco
    })

    if(totalCompra > 200){
        totalCompra = totalCompra - (totalCompra * 0.10)
    }

    return totalCompra
}