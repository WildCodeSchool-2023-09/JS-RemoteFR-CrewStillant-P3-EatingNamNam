const AbstractManager = require("./AbstractManager");

class IngredientRecipeManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "comments" as configuration
    super({ table: "ingredient_recipe" });
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT i.id, i.name, ir.quantity, i.calories, i.fat, i.protein, i.sugar 
      FROM ${this.table} AS ir JOIN ingredient AS i ON i.id = ir.ingredient_id WHERE recipe_id=?`,
      [id]
    );
    return rows;
  }

  async create(commentID, userID, recipeID) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (comment_id, user_id, recipe_id) VALUES (?,?,?)`,
      [commentID, userID, recipeID]
    );
    return result.insertId;
  }
}

module.exports = IngredientRecipeManager;
