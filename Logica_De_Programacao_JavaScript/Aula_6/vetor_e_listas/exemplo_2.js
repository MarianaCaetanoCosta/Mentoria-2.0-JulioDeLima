const listaTodosNomes = ['Renan', 'Caio', 'Luiz', 'Lucia', 'Mariana', 'Natalia', 'Sofia'];

for (let i = 0; i < listaTodosNomes.length; i++) {
    if (listaTodosNomes[i] === 'Mariana') {
        console.log('Encontrei meu nome!')
        break
    }
    else{
        console.log('Não é meu nome.')
    }
}