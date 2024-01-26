const AbstractManager = require("./AbstractManager");

class RecipeUserManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "comments" as configuration
    super({ table: "recipe_user" });
  }

  async readByUserID(id) {
    const [rows] = await this.database.query(
      `SELECT ru.id, ru.recipe_id , r.title FROM ${this.table} AS ru JOIN recipe AS r ON r.id = ru.recipe_id WHERE ru.user_id=?`,
      [id]
    );
    return rows;
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
