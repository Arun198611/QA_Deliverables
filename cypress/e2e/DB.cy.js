describe("DB Test", () => {
  it("runs a query", () => {
    const expectedColumnValue = 'chatgpt'
    cy.task("queryDatabase", {
      query: "SELECT * FROM useracc",
    }).then((rows) => {
      expect(rows).to.not.be.null;
      cy.log("Rows:", JSON.stringify(rows));
      const actualColumnValue = rows[0].name;
      expect(actualColumnValue).to.equal(expectedColumnValue);
    });
  });
});