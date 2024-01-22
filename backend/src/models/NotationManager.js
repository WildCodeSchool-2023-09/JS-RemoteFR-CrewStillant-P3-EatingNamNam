const AbstractManager = require("./AbstractManager");

class NotationManager extends AbstractManager {
  constructor() {
    super({ table: "notation" });
  }

  // CRUD
  async create(newNote) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (text) VALUES(?)`,
      [newNote.text]
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

  async update(text, id) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET text = ? WHERE id = ?`,
      [text, id]
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

module.exports = NotationManager;
