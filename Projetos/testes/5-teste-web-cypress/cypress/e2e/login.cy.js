describe('Login', () => {

    beforeEach(() => {
        //Arrange
        cy.visit('http://localhost:4000')
        cy.screenshot('apos-visitar-pagina')
    })
    
    it('Login com dados validos deve permitir entrada no sistema', () => {
        //Act
        cy.get('#username').click().type('julio.lima')
        cy.get('#senha').click().type('123456')
        cy.contains('button', 'Entrar').click()
        cy.screenshot('preencher-dados-validos')
        
        //Assert
        cy.contains('h4', 'Realizar Transferência').should('be.visible')
        cy.screenshot('login-realizado-com-sucesso')
    });

    it('Login com dados invalidos deve apresentar mensagem de erro', () => {
        //Act
        cy.get('#username').click().type('julio.lima')
        cy.get('#senha').click().type('654321')
        cy.contains('button', 'Entrar').click()

        //Assert
        cy.get('.toast').should('be.visible', 'Erro no login. Tente novamente')
    });
});