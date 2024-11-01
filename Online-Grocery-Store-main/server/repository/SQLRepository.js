const mysql = require("mysql2/promise");

class SQLRepository {
  async getConnection() {
    try {
      const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "react_db",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
      console.log("Connected to MySQL");
      return connection;
    } catch (error) {
      console.error("Error connecting to MySQL:", error.message);
      throw error;
    }
  }

  async queryExecutor(query, data) {
    try {
      const connection = await this.getConnection();
      const [rows, fields] = data
        ? await connection.execute(query, data)
        : await connection.execute(query);
      connection.end();
      return rows;
    } catch (error) {
      console.error("Error executing query in repository:", error.message);
      return error;
    }
  }

}
module.exports = SQLRepository;
