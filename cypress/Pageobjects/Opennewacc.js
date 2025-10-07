class newacc {

elements=
{

    opennewaccount: ()=> cy.get("div[id='bodyPanel']>div[id='leftPanel']>ul>li>a[href='openaccount.htm']"),
    accounttype:()=> cy.get("select[id='type']"),
    fromaccount:()=> cy.get("select[id='fromAccountId']"),
    openaccountbtn:()=> cy.get("input[type='button']"),
    msg1:()=>   cy.get("div[id='openAccountResult']>h1[class='title']"),
    msg2:()=> cy.get("a[id='newAccountId']")


}

newaccount()
{

this.elements.opennewaccount().click();


}

}

module.exports=new newacc();