const sql = require("mssql");

const dbConfig = {
  user: "arunuser",
  password: "arunuser",
  server: "Dell\\SQLEXPRESS",
  port: 1433,
  database: "Bankacc",
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

async function testDB() {
  try {
    const pool = await new sql.ConnectionPool(dbConfig).connect();
    console.log("Connected!");
    const result = await pool.request().query("SELECT TOP 1 * FROM sys.tables");
    console.log("Result:", result.recordset);
    await pool.close();
  } catch (err) {
    console.error("DB Error:", err);
  }
}

testDB();