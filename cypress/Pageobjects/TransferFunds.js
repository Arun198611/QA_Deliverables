class TransferFund
{
    elements =
    {

        transferfund :()=> cy.get("ul>li>a[href='transfer.htm']"),
        amount:()=> cy.get("input#amount")

    }

    transfer()
    {

        this.elements.transferfund().click();
       
    }

}
module.exports= new TransferFund();