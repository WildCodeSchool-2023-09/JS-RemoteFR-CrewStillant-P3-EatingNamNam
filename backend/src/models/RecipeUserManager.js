const AbstractManager = require("./AbstractManager");

class RecipeManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "item" as configuration
    super({ table: "recipe_user" });
  }

  // The C of CRUD - Create operation

  async create(recipeuser) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (user_id, recipe_id) VALUES (?, ?)`,
      [recipeuser.user_id, recipeuser.recipe_id]
    );
    return result.insertId;
  }
}

module.exports = RecipeManager;
