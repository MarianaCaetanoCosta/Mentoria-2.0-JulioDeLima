/*
 * Exercicio 2: Calcular a média de três números
 * 
 *            | Entrada    | Processamento         | Saída
 * * ---------------------------------------------------------
 * Definição | n1, n2, n3 | (n1 + n2 + n3) / 3     | media
 * ---------------------------------------------------------
 * Exemplo | 1,2,3   | (1 + 2 + 3) / 3         | 2
 *         | 4,5,6   | (4 + 5 + 6) / 3         | 5
 */

function calculaMediaTresNumeros(n1, n2,n3){
    return (n1 + n2 + n3) / 3;
}

console.log(calculaMediaTresNumeros(1,2,3));
calculaMediaTresNumeros(4,5,6);