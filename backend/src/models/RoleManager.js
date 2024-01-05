const AbstractManager = require("./AbstractManager");

class RoleManager extends AbstractManager {
  constructor() {
    super({ table: "role" });
  }

  // CRUD
  async create(newRole) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (type) VALUES(?)`,
      [newRole]
    );
    return result.insertId;
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    return rows;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return rows[0];
  }

  async update(type, id) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET type = ? WHERE id = ?`,
      [type, id]
    );
    return result.affectedRows;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result.affectedRows;
  }
}

module.exports = RoleManager;
