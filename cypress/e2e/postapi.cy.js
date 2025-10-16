describe('post',()=>{

it('postapi',()=>{

cy.request({method:'POST',url:'https://api.restful-api.dev/objects',
    
    body:{
 
   name: 'Apple MacBook Pro 16',
   data: {
      year: 2019,
      price: 5849.99,
      "CPU model": "Intel Core i9",
      "Hard disk size": "1 TB"
   
}
    }

    }).then((response)=>
        
    {

   expect(response.status).to.eql(200);
   expect(response.body.name).to.eql('Apple MacBook Pro 16');
   expect(response.body.data.year).to.eql(2019);
   const newobject=response
            cy.writeFile('cypress/fixtures/resp.json', { response: newobject });

    })

})

})