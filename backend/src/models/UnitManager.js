const AbstractManager = require("./AbstractManager");

class UnitManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "unit" as configuration
    super({ table: "unit" });
  }

  // The C of CRUD - Create operation

  async create(unit) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, mesure_unit) VALUES (?,?);`,
      [unit.name, unit.mesureUnit]
    );
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async readAll() {
    const [result] = await this.database.query(`SELECT * from ${this.table}`);
    return result;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT mesure_unit FROM ${this.table} WHERE id=?`,
      [id]
    );
    return rows[0];
  }

  // The U of CRUD - Update operation

  async update(unit, id) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET mesure_unit=? WHERE id=?`,
      [unit, id]
    );
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result.affectedRows;
  }
}

module.exports = UnitManager;
