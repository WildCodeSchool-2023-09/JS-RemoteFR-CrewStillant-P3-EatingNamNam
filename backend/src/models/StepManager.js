const AbstractManager = require("./AbstractManager");

class StepManager extends AbstractManager {
  constructor() {
    super({ table: "step" });
  }

  // CRUD
  async create(newStep) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (text) VALUES(?)`,
      [newStep.text]
    );
    return result.insertId;
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    return rows;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT step.id, step.text FROM ${this.table} WHERE recipe_id = ?`,
      [id]
    );

    return rows;
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

module.exports = StepManager;
