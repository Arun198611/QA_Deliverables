describe('template spec', () => {
it('passes', () => {

cy.request('GET', 'https://formatjsononline.com/api/users/usr_1').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.duration).to.be.below(1500);
      expect(response.body.data.email).to.eql('john.doe@example.com');
      expect(response.body.data.role).to.eql('admin');
      expect(response.body.data.profile.website).to.eql('https://johndoe.dev');
      const ResponseTime=response.duration;
      cy.log(ResponseTime);
})
})
})