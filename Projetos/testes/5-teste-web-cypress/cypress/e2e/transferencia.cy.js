describe("Transferencia", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.fazerLoginComCredenciaisValidas()
  });
  it("Deve transferir quando informa dados e valor validos", () => {
    // Act
    cy.realizarTransferencia('João','Maria', '11')
    // Assert
    cy.verificarMensagemToast('Transferência realizada!')
  });

    it("Deve apresentar erro quando tentar transferir mais de 5 mil sem o token", () => {
    // Act
    cy.realizarTransferencia('João','Maria', '6000')
    // Assert
    cy.verificarMensagemToast('Autenticação necessária para transferências acima de R$5.000,00.')
  });
});
