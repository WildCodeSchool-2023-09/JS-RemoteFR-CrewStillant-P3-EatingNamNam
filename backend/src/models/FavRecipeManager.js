const AbstractManager = require("./AbstractManager");

// Provide database access through AbstractManager class

class FavRecipeManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "comments" as configuration
    super({ table: "favoriteRecipe_user" });
  }

  async create(userID, recipeID) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (user_id, recipe_id) VALUES (?, ?)`,
      [userID, recipeID]
    );
    return result.insertId;
  }

  async delete(ID) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE recipe_id=? AND user_id=?`,
      [ID, 1]
    );
    return result.affectedRows;
  }

  async readById(ID) {
    const [rows] = await this.database.query(
      `SELECT id, user_id  FROM ${this.table} WHERE recipe_id=? AND user_id=?`,
      [ID, 1]
    );
    return rows[0];
  }
}

// Ready to export
module.exports = FavRecipeManager;
