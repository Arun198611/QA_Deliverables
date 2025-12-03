
import Register, { register } from "../Pageobjects/Register"

describe('Register',()=>{

         it('Register a new user',()=>{
      

    
cy.fixture('data.json').then((data)=>{

cy.visit("https://parabank.parasoft.com/parabank/index.htm")

 const timestamp = Date.now();
      
           Register.register()
           Register.elements.firstname().type(data.firstnm)
           Register.elements.lastname().type(data.lastnm)
           Register.elements.address().type(data.address)
           Register.elements.city().type(data.city)
           Register.elements.state().type(data.state)
           Register.elements.zipcode().type(data.zipcode)
           Register.elements.phone().type(data.phone)
           Register.elements.ssn().type(data.ssn)
           Register.elements.username().type(data.usrname+ timestamp)
           Register.elements.password().type(data.passwd)
           Register.elements.confirmpass().type(data.confpass)
           Register.elements.submit().click()
           Register.elements.title().contains('Welcome'+" "+data.usrname+timestamp)
           const user=data.usrname+timestamp
            cy.writeFile('cypress/fixtures/userData.json', { user: user });

})


          })


})