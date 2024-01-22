// CRUD
const AbstractManager = require("./AbstractManager");

class IngredientManager extends AbstractManager {
  constructor() {
    super({ table: "ingredient" });
  }

  async create(ingredient) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, calories, fat, sugar, protein, recipe_id) VALUE(?, ?, ?, ?, ?, ?)`,
      [
        ingredient.name,
        ingredient.calories,
        ingredient.fat,
        ingredient.sugar,
        ingredient.protein,
        ingredient.recipe_id,
      ]
    );
    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      // `SELECT ingredient.*, unit.mesure_unit AS unit FROM ${this.table}
      // JOIN unit ON unit.id = ingredient.unit_id WHERE id = ?`,
      // `SELECT * FROM ${this.table} WHERE id = ?`,
      `SELECT ingredient.*, unit.mesure_unit AS unit FROM ${this.table} JOIN unit ON unit.id = ingredient.unit_id WHERE ingredient.id = ? `,
      [id]
    );
    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(
      `SELECT ingredient.*, unit.mesure_unit AS units FROM ${this.table} JOIN unit ON unit.id = ingredient.unit_id`
    );
    return rows;
  }

  async update(id, ingredient) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET name=?, calories=?, fat=?, sugar=?, protein=?  WHERE id = ?`,
      [
        ingredient.name,
        ingredient.calories,
        ingredient.fat,
        ingredient.sugar,
        ingredient.protein,
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
