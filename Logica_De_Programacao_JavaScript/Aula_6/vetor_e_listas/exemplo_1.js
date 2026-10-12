const listaNomeMeninos = ['Douglas', 'Renan', 'Caio', 'Luiz'];
const listaNomeMeninas = ['Lucia', 'Mariana', 'Natalia', 'Sofia'];

const listaTodosNomes = [];

// Adiciona os nomes dos meninos
for (let i = 0; i < listaNomeMeninos.length; i++) {
    listaTodosNomes.push(listaNomeMeninos[i]);
}

// Adiciona os nomes das meninas
for (let i = 0; i < listaNomeMeninas.length; i++) {
    listaTodosNomes.push(listaNomeMeninas[i]);
}

// Exibe todos os nomes
console.log(listaTodosNomes);

// Exibe cada nome com seu índice
for (let i = 0; i < listaTodosNomes.length; i++) {
    console.log(i + ' - ' + listaTodosNomes[i]);
}