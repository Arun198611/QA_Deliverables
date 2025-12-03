describe('fullusers',()=>{

it('fullusersapi',()=>
{

cy.request('GET','https://formatjsononline.com/api/users').then((response)=>
    {

       expect(response.status).to.eq(200);
       expect(response.body.data.users).to.be.an('array');
       expect(response.body.data.users[0]).have.property('id');
       expect(response.body.data.users[0].id).to.eql('usr_1');
       expect(response.body.data.pagination.totalItems).to.eql(3);
       expect(response.body.data.users[2].status).to.eql('inactive');
       expect(response.body.data.users[1].lastName).to.eql('Smith');
       expect(response.body.data.users[2].email).to.eql('mike.johnson@example.com');
       expect(response.body.meta.requestId).to.contain('req_');
       const arraydata=response.body.data.users;
       const length=arraydata.length;
       cy.log('Length of users arrary is:',length);
       

})

})

})