class Reg {

elements=
       {

     registerlink : ()=> cy.get("a[href]").contains('Register'),
     firstname: ()=> cy.get("input[id='customer.firstName']"),
     lastname: ()=> cy.get("input[id='customer.lastName']"),
     address: ()=> cy.get("input[id='customer.address.street']"),
     city :()=> cy.get("input[id='customer.address.city']"),
     state: ()=> cy.get("input[id='customer.address.state']"),
     zipcode: ()=>cy.get("input[id='customer.address.zipCode']"),
     phone: ()=> cy.get("input[id='customer.phoneNumber']"),
     ssn: ()=> cy.get("input[id='customer.ssn']"),
     username: ()=> cy.get("input[id='customer.username']"),
     password: ()=> cy.get("input[id='customer.password']"),
     confirmpass: ()=> cy.get("input[id='repeatedPassword']"),
     submit: ()=> cy.get("input[value='Register']"),
     title: ()=> cy.get("h1[class='title']")

         }

register()
        {
    this.elements.registerlink().click();

  
        }


}

module.exports= new Reg();