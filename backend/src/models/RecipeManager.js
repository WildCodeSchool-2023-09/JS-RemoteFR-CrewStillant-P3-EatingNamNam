const AbstractManager = require("./AbstractManager");

class ItemManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "item" as configuration
    super({ table: "item" });
  }

  // The C of CRUD - Create operation

  async create(recipe) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (title, cooking_time, preparation_time, difficulty) VALUES (?, ?, ?, ?)`,
      [
        recipe.title,
        recipe.cooking_time,
        recipe.preparation_time,
        recipe.difficulty,
      ]
    );
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id=?`,
      [id]
    );
    return rows[0];
  }

  // The U of CRUD - Update operation

  async update(recipe, id) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET title=?, cooking_time=?, preparation_time=?, difficulty=? WHERE id=?`,
      [
        recipe.title,
        recipe.cooking_time,
        recipe.preparation_time,
        recipe.difficulty,
        id,
      ]
    );
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id=?`,
      [id]
    );
    return result.affectedRows;
  }
}

module.exports = ItemManager;
