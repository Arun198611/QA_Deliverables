describe('dynamic',()=>{

it('dynamicidget',()=>{

cy.fixture('resp.json').then((data)=>{

const urlapi = `https://api.restful-api.dev/objects/${data.response.body.id}`;

cy.request('GET',urlapi).then((response)=>{


    expect(response.status).to.eql(200);
    expect(response.body.data.price).to.eql(5849.99);
})





})





})



})