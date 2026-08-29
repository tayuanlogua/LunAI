const sql = require("mssql/msnodesqlv8");

const connectionString =
  "Driver={ODBC Driver 18 for SQL Server};" +
  "Server=localhost\\SQLEXPRESS;" +
  "Database=LunAI;" +
  "Trusted_Connection=Yes;" +
  "TrustServerCertificate=Yes;";

const config = {
  connectionString
};

const pool = new sql.ConnectionPool(config);

const conectarBaseDatos = async () => {
  try {
    await pool.connect();

    const resultado = await pool
      .request()
      .query("SELECT DB_NAME() AS baseDatos");

    console.log(
      `Conexión exitosa con SQL Server: ${resultado.recordset[0].baseDatos} 🌙`
    );
  } catch (error) {
    console.error("Error conectando con SQL Server:", error.message);
    throw error;
  }
};

module.exports = {
  sql,
  pool,
  conectarBaseDatos
};