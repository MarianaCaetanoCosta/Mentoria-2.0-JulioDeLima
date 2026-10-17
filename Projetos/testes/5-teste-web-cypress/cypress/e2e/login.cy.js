describe('Login', () => {

    beforeEach(() => {
        //Arrange
        cy.visit('/')
        cy.screenshot('apos-visitar-pagina')
    })
    
    it('Login com dados validos deve permitir entrada no sistema', () => {
        //Act

        //Credenciais
        cy.fixture('credenciais').then((credenciais) => {
            cy.get('#username').click().type(credenciais.valida.usuario)
            cy.get('#senha').click().type(credenciais.valida.senha)
        })

        cy.contains('button', 'Entrar').click()
        cy.screenshot('preencher-dados-validos')
        
        //Assert
        cy.contains('h4', 'Realizar Transferência').should('be.visible')
        cy.screenshot('login-realizado-com-sucesso')
    });

    it('Login com dados invalidos deve apresentar mensagem de erro', () => {
        //Act

        //Credenciais
        cy.fixture('credenciais').then((credenciais) => {
            cy.get('#username').click().type(credenciais.invalida.usuario)
            cy.get('#senha').click().type(credenciais.invalida.senha)
        })

        cy.contains('button', 'Entrar').click()

        //Assert
        cy.get('.toast').should('be.visible', 'Erro no login. Tente novamente')
    });
});