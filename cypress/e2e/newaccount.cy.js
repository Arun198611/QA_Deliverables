import Opennewacc from "../Pageobjects/Opennewacc";
describe ('Newaccount',()=> {

it('newacc creation',()=>{

    cy.fixture('data.json').then((data)=>{

cy.Login();
Opennewacc.newaccount();
Opennewacc.elements.accounttype().select(data.acctype);
Opennewacc.elements.fromaccount().should('not.be.empty')
Opennewacc.elements.openaccountbtn().click();
Opennewacc.elements.msg1().should('be.text','Account Opened!');
Opennewacc.elements.msg2().should('exist'); 
cy.wait(500)

let accountNo;
  cy.get("a[id='newAccountId']")   
    .invoke('text')                
    .then((text) => {
      accountNo = text.trim();     
      cy.log("Captured Account No: " + accountNo);
    })
})


    }
    )
    })


