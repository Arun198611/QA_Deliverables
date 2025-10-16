const { defineConfig } = require("cypress");
const sql = require("mssql");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/json',
    overwrite: false,
    html: false,
    json: true, // ✅ generate JSON files for merging
  },

  e2e: {
    setupNodeEvents(on, config) {
      // ✅ Setup Mochawesome plugin
      require('cypress-mochawesome-reporter/plugin')(on);

      // ✅ MSSQL Database task
      on("task", {
        async queryDatabase({ query }) {
          const dbConfig = {
            user: "arunuser",            // SQL login username
            password: "arunuser",        // SQL login password
            server: "Dell\\SQLEXPRESS",  // double backslash required in JS
            port: 1433,
            database: "Bankacc",
            options: {
              encrypt: true,
              trustServerCertificate: true,
            },
          };

          try {
            // Create a new connection pool
            const pool = await new sql.ConnectionPool(dbConfig).connect();

            // Execute the query
            const result = await pool.request().query(query);

            // Close the pool
            await pool.close();

            // Return rows to Cypress
            return result.recordset;
          } catch (err) {
            console.error("SQL error:", err);
            return null; // always return something
          }
        },
      });

      // Return config to Cypress
      return config;
    },

    // Optional: specify which spec files to run
    specPattern: [
    "cypress/e2e/reg.cy.js",
    "cypress/e2e/2.cy.js",
    "cypress/e2e/1.cy.js",
     "cypress/e2e/DB.cy.js",
     "cypress/e2e/api.cy.js",
     "cypress/e2e/newaccount.cy.js",
     "cypress/e2e/sample.cy.js",
     "cypress/e2e/apifullusers.cy.js",
     "cypress/e2e/postapi.cy.js",
     "cypress/e2e/dynamicidgetapi.cy.js"
  ],
  },
});
 