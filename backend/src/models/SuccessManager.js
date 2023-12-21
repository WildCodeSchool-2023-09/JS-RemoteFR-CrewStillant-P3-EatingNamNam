const AbstractManager = require("./AbstractManager");

class SuccessManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "success" as configuration
    super({ table: "success" });
  }

  // The C of CRUD - Create operation

  async create(success) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (success) VALUES (?)`,
      [success]
    );
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async readAll() {
    const [result] = await this.database.query(`SELECT * from ${this.table}`);

    return result;
  }

  // The U of CRUD - Update operation
  // The D of CRUD - Delete operation
}

module.exports = SuccessManager;
