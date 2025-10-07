describe("hover",()=>{
it("hover web",()=>
{

cy.visit("https://www.telerik.com/support/demos")
cy.get('a[href="/kendo-vue-ui"]').invoke('show').should('exist')
cy.get('a[href="/kendo-vue-ui"]').invoke('show').click({ force: true });
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})


})

})