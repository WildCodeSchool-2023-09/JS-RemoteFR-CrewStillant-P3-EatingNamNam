const AbstractManager = require("./AbstractManager");

class NotationManager extends AbstractManager {
  constructor() {
    super({ table: "notation" });
  }

  // CRUD
  async create(note, recipeID, userID) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (note, recipe_id, user_id) VALUES(?, ?, ?)`,
      [note, recipeID, userID]
    );
    return result.insertId;
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    return rows;
  }

  async readByRecipe(id) {
    const [rows] = await this.database.query(
      `SELECT AVG(note) AS average_note, COUNT(note) AS total_note, recipe_id FROM ${this.table} WHERE recipe_id = ?`,
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
