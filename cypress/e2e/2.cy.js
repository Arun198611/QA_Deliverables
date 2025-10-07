import TransferFunds from "../Pageobjects/TransferFunds"

describe ('transfer',()=>
{
it('transferfund',()=>
    
       {

         cy.Login()
         TransferFunds.transfer();
         TransferFunds.elements.amount().type(1234);
      
             

      })

})