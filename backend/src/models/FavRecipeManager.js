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

  async delete(recipeID, userID) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE recipe_id=? AND user_id=?`,
      [recipeID, userID]
    );
    return result.affectedRows;
  }

  async readById(recipeID, userID) {
    const [rows] = await this.database.query(
      `SELECT id, user_id  FROM ${this.table} WHERE recipe_id=? AND user_id=?`,
      [recipeID, userID]
    );
    return rows[0];
  }

  async readByUserID(userID) {
    const [rows] = await this.database.query(
      `SELECT fr.id, fr.recipe_id, r.title FROM ${this.table} AS fr JOIN recipe AS r ON r.id = fr.recipe_id WHERE fr.user_id=?`,
      [userID]
    );
    return rows;
  }
}

// Ready to export
module.exports = FavRecipeManager;
