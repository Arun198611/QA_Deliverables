// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('Login',()=>
  {

            cy.fixture('data.json').then((data)=>
            { 
              cy.readFile('cypress/fixtures/userData.json').then((datafile) => {

              cy.visit("https://parabank.parasoft.com/parabank/index.htm")
              //cy.get("input[name='username']").type(data.username);
              cy.get("input[name='username']").type(datafile.user);
              cy.get("input[name='password']").type(data.password);
              cy.get("input[type='submit']").click();
              cy.get("h2").contains('Account Services');
            
            })

            })
             
  })


