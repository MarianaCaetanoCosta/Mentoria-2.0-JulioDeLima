Cypress.Commands.add('realizarTransferencia', (contaOrigem, contaDestino, valor) => {
        // Act
    cy.selecionarOpcaoNaCombobox('conta-origem', contaOrigem)
    cy.selecionarOpcaoNaCombobox('conta-destino', contaDestino)
    cy.get('#valor').click().type(valor)    
    cy.contains('button', 'Transferir').click()
})