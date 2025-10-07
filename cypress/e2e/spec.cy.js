describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
     cy.readFile('cypress/fixtures/userData.json').then((data) => {
    cy.log("Using userId: " + data.user);
  })
})
})