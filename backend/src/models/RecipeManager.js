const AbstractManager = require("./AbstractManager");

class RecipeManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "item" as configuration
    super({ table: "recipe" });
  }

  // The C of CRUD - Create operation

  async create(recipe) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (title, cooking_time, preparation_time, difficulty, image, type) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        recipe.title,
        recipe.cooking_time,
        recipe.preparation_time,
        recipe.difficulty,
        recipe.image,
        recipe.type,
      ]
    );
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async readAll() {
    // si limit affiche les 5 sinon affiche normalement
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT r.id, r.title, r.cooking_time, r.preparation_time, r.difficulty, r.image,
          GROUP_CONCAT(ir.quantity) AS quantity,
          GROUP_CONCAT(i.name) AS ingredient, GROUP_CONCAT(i.calories) AS calories, GROUP_CONCAT(i.fat) AS fats, GROUP_CONCAT(i.sugar) AS sugars, GROUP_CONCAT(i.protein) AS proteins
          FROM ${this.table} AS r 
          JOIN ingredient_recipe AS ir ON ir.recipe_id = r.id 
          JOIN ingredient AS i ON i.id = ir.ingredient_id 
          WHERE r.id= ?`,
      [id]
    );
    return rows[0];
  }

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

module.exports = RecipeManager;
