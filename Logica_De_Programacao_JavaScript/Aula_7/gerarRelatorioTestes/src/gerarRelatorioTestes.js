export function gerarRelatorioTestes(listaTestes) {
    let quantidadeSucessos = 0
    let quantidadeFalhas = 0
    
    for(let i = 0; i < listaTestes.length; i++){
        if(listaTestes[i] === 'pass'){
            quantidadeSucessos++
        } 
        if (listaTestes[i] === 'fail') {
            quantidadeFalhas++
        }
    }

    let passRate = (quantidadeSucessos/listaTestes.length) * 100

    // let textoSemTemplate = 'Total de testes: ' + listaTestes.length 
    // + ' Total de sucessos: ' + quantidadeSucessos + ' Total de falhas: ' 
    // + quantidadeFalhas + ' Pass rate: ' + passRate

    let textoRetorno = `Total de testes: ${listaTestes.length} Total de sucessos: ${quantidadeSucessos} Total de falhas: ${quantidadeFalhas} Pass rate: ${passRate}`

    return textoRetorno

}