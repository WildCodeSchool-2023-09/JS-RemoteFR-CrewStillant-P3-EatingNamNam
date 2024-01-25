const AbstractManager = require("./AbstractManager");

class RecipeUserManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "comments" as configuration
    super({ table: "recipe_user" });
  }

  async create(recipeID, userID) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (user_id, recipe_id) VALUES (?,?)`,
      [userID, recipeID]
    );
    return result.insertId;
  }
}

module.exports = RecipeUserManager;
