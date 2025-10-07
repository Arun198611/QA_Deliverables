describe('template spec', () => {
it('passes', () => {

cy.request('GET', 'https://formatjsononline.com/api/users/usr_1').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.duration).to.be.below(1000);
      const ResponseTime=response.duration;
      cy.log(ResponseTime);
})
})
})