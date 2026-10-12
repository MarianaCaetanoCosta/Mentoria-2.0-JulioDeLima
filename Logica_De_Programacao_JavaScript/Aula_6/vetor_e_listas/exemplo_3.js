const listaTodosNomes = ['Renan', 'Caio', 'Luiz', 'Lucia', 'Mariana', 'Natalia', 'Sofia'];

//para (variável de controle; critério de controle; incremento)
// i => index / indice

let quantidadeVezesQueMeuNomeAparece = 0;

for (let i = 0; i < listaTodosNomes.length; i++) {
    if (listaTodosNomes[i] === 'Lucia' || listaTodosNomes[i] === 'Natalia') {
        quantidadeVezesQueMeuNomeAparece++;
    }
    else{
        console.log('Não é meu nome.')
    }
}
console.log('Os nomes foram encontrados: ' + quantidadeVezesQueMeuNomeAparece + ' vezes.')