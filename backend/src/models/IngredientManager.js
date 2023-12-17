// CRUD
const AbstractManager = require("./AbstractManager");

class IngredientManager extends AbstractManager {
  constructor() {
    super({ table: "ingredient" });
  }

  async create(ingredient) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, nutritional_value, international_unit, imperial_unit) VALUE(?, ?, ?, ?)`,
      [
        ingredient.name,
        ingredient.nutritional_value,
        ingredient.international_unit,
        ingredient.imperial_unit,
      ]
    );
    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  async update(id, ingredient) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET name=?, nutritional_value=?, international_unit=?, imperial_unit=?  WHERE id = ?`,
      [
        ingredient.name,
        ingredient.nutritional_value,
        ingredient.international_unit,
        ingredient.imperial_unit,
        id,
      ]
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

module.exports = IngredientManager;
